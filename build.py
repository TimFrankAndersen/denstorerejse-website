#!/usr/bin/env python3
"""Build site/ from the iWeb export of www.denstorerejse.com.

Usage: python3 build.py [path-to-original-mirror]

The source is the untouched One.com mirror (kept in iCloud, not in git).
Everything this script does is a small, explicit fix on top of that copy:

1. Absolute http://www.denstorerejse.com/... URLs become root-relative
   (they would be blocked as mixed content on https).
2. Links to the dead www.denstorerejse.dk domain become root-relative, and
   the old 2007 entry filenames are mapped to the files that exist.
3. hej@denstorerejse.dk (dead domain) becomes hej@denstorerejse.com.
4. The two QuickTime <object> films on Film.html become <video> tags with
   MP4 files converted from the original AVIs (macOS avconvert).
5. Root and Den_store_rejse/ index pages point at Velkommen.html with a
   root-relative meta refresh (vercel.json adds real 301s on top).
6. The dead MobileMe comment script (http://www.me.com, service closed 2012) is
   removed from the 204 blog pages; https would block it anyway.
7. The iWeb Google Map widget on Krabi.html and Fraser_island.html loaded its map
   through MobileMe (dead since 2012, frames were empty). Replaced with an
   OpenStreetMap embed of the same size, centre, zoom and marker.
"""
import os, re, shutil, subprocess, sys, unicodedata, urllib.parse, json

SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser(
    "~/Library/Mobile Documents/com~apple~CloudDocs/Jobs/Claude Code/denstorerejse-port/original-mirror")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")
TEXT = (".html", ".htm", ".js", ".xml", ".css")
SKIP = (".AVI", ".DS_Store")

report = {"rewritten_files": 0, "com_urls": 0, "dk_urls": 0, "dk_mapped": {}, "dk_unmapped": [], "mail": 0}

# ---------- 2. map old .dk entry filenames to existing files ----------
STOP = {"optegnelse", "fra", "til", "pa", "og", "en", "et", "i", "med", "det", "er", "den", "de", "at", "om", "af", "the"}

def norm_tokens(name):
    name = unicodedata.normalize("NFKD", name)
    name = "".join(c for c in name if not unicodedata.combining(c))
    return set(t for t in re.split(r"[^a-z0-9]+", name.lower()) if t and t not in STOP)

# Old 2007 filenames whose target is ambiguous by token overlap (checked by hand)
MANUAL = {
    "/Den_store_rejse/Rejsedagbog/Optegnelser/2007/11/10_Fra_Koh_Mook_til_Emeralds_Cave.html":
        "/Den_store_rejse/Rejsedagbog/Optegnelser/2007/11/10_Pa_udflugt_til_Emeralds_Cave.html",
}

def map_dk_path(path):
    """path like /Den_store_rejse/Rejsedagbog/Optegnelser/2007/11/20_Første_dag.html"""
    local = os.path.join(SRC, path.lstrip("/"))
    if os.path.exists(local):
        return path
    if path in MANUAL:
        return MANUAL[path]
    d, fname = os.path.split(path)
    m = re.match(r"(\d+)_(.*)\.html$", fname)
    srcdir = os.path.join(SRC, d.lstrip("/"))
    if not m or not os.path.isdir(srcdir):
        return None
    day = m.group(1)
    cands = [f for f in os.listdir(srcdir) if f.startswith(day + "_") and f.endswith(".html")]
    if not cands:
        return None
    if len(cands) == 1:
        return d + "/" + cands[0]
    want = norm_tokens(m.group(2))
    best = max(cands, key=lambda f: len(want & norm_tokens(f[:-5])))
    if len(want & norm_tokens(best[:-5])) == 0:
        return None
    return d + "/" + best

def fix_dk(mo):
    raw = mo.group(2)                      # path part after host
    path = urllib.parse.unquote(raw)
    mapped = map_dk_path(path)
    report["dk_urls"] += 1
    if mapped is None:
        report["dk_unmapped"].append(path)
        return "/" + raw.lstrip("/")       # keep root-relative even if dead
    if mapped != path:
        report["dk_mapped"][path] = mapped
    return urllib.parse.quote(mapped, safe="/!,()'._-")

DK = re.compile(r"https?://(www\.)?denstorerejse\.dk(/[^\"'<> )#]*)")
COM = re.compile(r"https?:(?:\\/\\/|//)(?:www\.)?denstorerejse\.com")

MOVIES = []   # (source path in SRC, target mp4 path in OUT) collected while rewriting, converted in main()

def fix_film_js(txt):
    """Replace every iWeb writeMovieN() (QuickTime <object>, three browser branches) with
    a <video> tag when the original movie file exists, else with its poster image."""
    def repl(mo):
        n, body = mo.group(1), mo.group(0)
        src = re.search(r'name="src" value="(Media/[^"]+)"', body).group(1)     # e.g. Media/MVI_0980.AVI
        w, h = re.search(r'width="(\d+)" height="(\d+)"', body).groups()
        style = re.search(r'style="([^"]*)"', body).group(1)
        poster = re.search(r'value="([^"]*_files/[^"]+\.jpg)"', body)
        poster = poster.group(1) if poster else ""
        name = os.path.splitext(os.path.basename(src))[0]
        avi = os.path.join(SRC, "Den_store_rejse", src)
        if os.path.exists(avi):
            MOVIES.append((avi, os.path.join(OUT, "Den_store_rejse/Media", name + ".mp4")))
            html = ('<video controls preload="metadata" width="%s" height="%s" poster="%s" style="%s">'
                    '<source src="Media/%s.mp4" type="video/mp4" /></video>' % (w, h, poster, style, name))
        else:
            # movie was never uploaded to the host (404 on the old site too): show the still instead
            html = '<img src="%s" alt="" width="%s" height="%s" style="%s" />' % (poster, w, h, style)
            report.setdefault("movies_missing_shown_as_still", []).append(src)
        return "function writeMovie%s()\n{document.write('%s');}\n" % (n, html)
    # each function body ends with the IE/other/else branches closing: "');}}\n"
    return re.sub(r"function writeMovie(\d+)\(\)\n\{.*?\}\}\n", repl, txt, flags=re.S)

# ---------- 7. iWeb Google Map widget (served via MobileMe, dead) -> OpenStreetMap embed ----------
import math

def osm_bbox(lat, lon, zoom, w, h):
    """Web-mercator bounding box (minlon,minlat,maxlon,maxlat) for a w×h px map at zoom around lat/lon."""
    n = 256 * 2 ** zoom
    x = (lon + 180) / 360 * n
    y = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n
    def to_lon(px): return px / n * 360 - 180
    def to_lat(py): return math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * py / n))))
    return to_lon(x - w / 2), to_lat(y + h / 2), to_lon(x + w / 2), to_lat(y - h / 2)

def fix_maps(txt):
    m = re.search(r"new GoogleMap\('(widget\d+)'.*?(\{.*?\})\);", txt, re.S)
    if not m:
        return txt
    wid, cfg = m.group(1), json.loads(m.group(2))
    div = re.search(r'<div class="com-apple-iweb-widget-GoogleMap[^"]*" id="%s" style="([^"]*)"></div>' % wid, txt)
    w = int(re.search(r"width: (\d+)px", div.group(1)).group(1))
    h = int(re.search(r"height: (\d+)px", div.group(1)).group(1))
    lat, lon = map(float, cfg["center"].split(","))
    mlat, mlon = map(float, cfg.get("locatedAddressPoint", cfg["center"]).split(","))
    minlon, minlat, maxlon, maxlat = osm_bbox(lat, lon, int(cfg["zoomLevel"]), w, h)
    bbox = "%.5f,%.5f,%.5f,%.5f" % (minlon, minlat, maxlon, maxlat)
    if not (minlat <= mlat <= maxlat and minlon <= mlon <= maxlon):
        mlat, mlon = lat, lon           # geocoded point is off-map (Krabi): mark the centre instead
    iframe = ('<iframe title="Kort: %s" src="https://www.openstreetmap.org/export/embed.html?bbox=%s&amp;layer=mapnik&amp;marker=%.5f,%.5f" '
              'style="width:100%%;height:100%%;border:0;display:block;" loading="lazy"></iframe>'
              % (cfg.get("locatedAddress", ""), bbox, mlat, mlon))
    txt = txt.replace(div.group(0), div.group(0)[:-len("</div>")] + iframe + "</div>")
    # drop the widget bootstrap (would try to load the dead MobileMe map frame)
    txt = re.sub(r"<script type=\"text/javascript\"><!--//--><!\[CDATA\[//><!--\s*new GoogleMap\('%s'.*?//--><!\]\]></script>" % wid, "", txt, flags=re.S)
    report["maps"] = report.get("maps", 0) + 1
    return txt

def rewrite(rel, txt):
    before = txt
    n_com = len(COM.findall(txt)); report["com_urls"] += n_com
    txt = COM.sub("", txt)                 # -> \/Den_store_rejse\/... or /Den_store_rejse/...
    txt = DK.sub(fix_dk, txt)
    n_mail = txt.count("denstorerejse.dk"); report["mail"] += n_mail
    txt = txt.replace("hej@denstorerejse.dk", "hej@denstorerejse.com")
    # 6. MobileMe comment script (service closed 2012): dead http:// reference that https blocks
    n_me = txt.count('src="http://www.me.com/1/up/comments/scripts/search.js"')
    report["me_com_scripts"] = report.get("me_com_scripts", 0) + n_me
    txt = txt.replace('<script type="text/javascript" src="http://www.me.com/1/up/comments/scripts/search.js"></script>', "")
    if rel.endswith(".js") and "function writeMovie" in txt:
        txt = fix_film_js(txt)
    if rel.endswith(".html") and "new GoogleMap(" in txt:
        txt = fix_maps(txt)
    if rel in ("index.html", "Den_store_rejse/index.html"):
        txt = re.sub(r'content="0;url=[^"]*"', 'content="0;url=/Den_store_rejse/Velkommen.html"', txt)
    if txt != before:
        report["rewritten_files"] += 1
    return txt

def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    for dp, dn, fn in os.walk(SRC):
        for f in fn:
            if f.endswith(SKIP):
                continue
            src = os.path.join(dp, f)
            rel = os.path.relpath(src, SRC)
            dst = os.path.join(OUT, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            if f.lower().endswith(TEXT):
                txt = open(src, encoding="utf-8", errors="surrogateescape").read()
                txt = rewrite(rel.replace(os.sep, "/"), txt)
                open(dst, "w", encoding="utf-8", errors="surrogateescape").write(txt)
            else:
                shutil.copy2(src, dst)
    # 4. films (collected by fix_film_js while rewriting the page scripts)
    for avi, mp4 in sorted(set(MOVIES)):
        # avconvert insists on an .m4v extension; the container is plain MP4, so rename afterwards
        tmp = mp4[:-4] + ".m4v"
        subprocess.run(["avconvert", "--preset", "PresetAppleM4V480pSD", "--source", avi, "--output", tmp],
                       check=True, capture_output=True)
        os.replace(tmp, mp4)
        report.setdefault("films", []).append({"file": os.path.basename(mp4), "bytes": os.path.getsize(mp4)})
    # leftover check: any denstorerejse.com/.dk host references
    left = 0
    for dp, dn, fn in os.walk(OUT):
        for f in fn:
            if f.lower().endswith(TEXT):
                t = open(os.path.join(dp, f), encoding="utf-8", errors="ignore").read()
                left += len(re.findall(r"denstorerejse\.(com|dk)", t))
    report["remaining_host_refs"] = left
    json.dump(report, open(os.path.join(os.path.dirname(OUT), "build-report.json"), "w"), indent=1, ensure_ascii=False)
    print(json.dumps({k: v for k, v in report.items() if k not in ("dk_mapped",)}, indent=1, ensure_ascii=False))
    print("dk mapped:", len(report["dk_mapped"]))

if __name__ == "__main__":
    main()
