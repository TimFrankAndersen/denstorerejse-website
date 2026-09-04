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

VIDEO_TMPL = ("<video controls preload=\"metadata\" width=\"{w}\" height=\"{h}\" "
              "poster=\"Film_files/{name}.jpg\" style=\"width:{w}px;height:{h}px;\">"
              "<source src=\"Media/{name}.mp4\" type=\"video/mp4\" />"
              "</video>")

def fix_film_js(txt):
    # each writeMovieN() has three document.write branches; replace whole function bodies
    def repl(mo):
        n = mo.group(1)
        name, w, h = {"1": ("MVI_0980", 300, 241), "2": ("MVI_0778", 305, 245)}[n]
        return ("function writeMovie%s()\n{document.write('%s');}\n"
                % (n, VIDEO_TMPL.format(name=name, w=w, h=h)))
    # each function body ends with the IE/other/else branches closing: "');}}\n"
    return re.sub(r"function writeMovie([12])\(\)\n\{.*?\}\}\n", repl, txt, flags=re.S)

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
    if rel.endswith("Film_files/Film.js"):
        txt = fix_film_js(txt)
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
    # 4. films
    for name in ("MVI_0980", "MVI_0778"):
        avi = os.path.join(SRC, "Den_store_rejse/Media", name + ".AVI")
        mp4 = os.path.join(OUT, "Den_store_rejse/Media", name + ".mp4")
        if os.path.exists(avi):
            # avconvert insists on an .m4v extension; the container is plain MP4, so rename afterwards
            tmp = mp4[:-4] + ".m4v"
            subprocess.run(["avconvert", "--preset", "PresetAppleM4V480pSD", "--source", avi, "--output", tmp],
                           check=True, capture_output=True)
            os.replace(tmp, mp4)
            report.setdefault("films", []).append({"file": name + ".mp4", "bytes": os.path.getsize(mp4)})
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
