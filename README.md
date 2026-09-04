# denstorerejse.com

Statisk kopi af familiens rejsesite fra 2007/2008 (Apple iWeb 3.0.4, sidst publiceret juni 2012),
flyttet fra One.com til Vercel.

- `site/` er det, Vercel serverer. Mappestrukturen er identisk med det gamle site, så alle gamle
  URL'er virker uændret (`/Den_store_rejse/...`).
- `build.py` genererer `site/` fra den urørte One.com-spejling (ligger i iCloud under
  `Jobs/Claude Code/denstorerejse-port/original-mirror/`, ikke i git). Scriptet dokumenterer
  præcis hvad der er ændret i forhold til originalen: absolutte URL'er gjort relative, døde
  links til denstorerejse.dk repareret, mailadresse rettet, to QuickTime-film konverteret til MP4.
- `build-report.json` viser resultatet af seneste byg, inkl. mapping af gamle blog-links.
- `vercel.json` sætter rod-redirect til `/Den_store_rejse/Velkommen.html`, bevarer `.html`-URL'er
  og cacher billeder.

Genbyg:

```bash
python3 build.py
```
