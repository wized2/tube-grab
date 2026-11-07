# Tube Grab 🎬

A beautiful, single-file YouTube downloader web app.

Built with **HTML5 + vanilla JS**, styled with a **Claude-inspired warm palette** (Lora serif, Poppins headings, coral accent) and **Material 3** structure (app bar, filled cards, pill segmented control, tonal status chips, elevated result cards). Icons via [Lucide](https://lucide.dev).

> **Live demo:** https://wized2.github.io/tube-grab/

---

## Features

- **Paste or search** — drop a YouTube link or type a search term
- **Audio / Video toggle** — M3 pill segmented control
- **Rich preview card** — thumbnail, title, duration
- **One-tap download** — streams the media via the proxy
- **Responsive** — designed mobile-first, looks great on desktop too
- **Single file** — no build step, no dependencies to install

---

## Usage

### Option 1 — Open directly

1. Download `index.html`
2. Open it in any modern browser

> Some browsers block `file://` pages from making network requests. If **Fetch Info** fails, use Option 2.

### Option 2 — Serve locally


bash
# Python
python3 -m http.server 8080

# or Node
npx serve .Then open http://localhost:8080.Option 3 — Live siteJust visit https://wized2.github.io/tube-grab/How it worksThe app talks to a public YouTube-download API:EndpointPurposeGET /youtube?url=<link-or-search>&format=audio|videoReturns metadata + a direct download URLGET /youtube/download?url=<encoded-download-url>Streams the actual media fileBase URL is set at the top of the <script> block:jsCopyDownloadconst API_BASE = 'https://you-tube-dl-psi.vercel.app';Response shape from /youtube:jsonCopyDownload{
  "status": true,
  "creator": "Ainz",
  "data": {
    "yts": [],
    "ytdl": {
      "title": "...",
      "duration": 213,
      "url": "https://www.youtube.com/watch?v=...",
      "thumbnail": "https://i.ytimg.com/...",
      "download": "https://cdn.../file.mp3"
    }
  }
}CustomizationEverything lives in index.html:Colors — CSS variables at the top of <style> (--canvas, --coral, --ink, …)Fonts — Google Fonts import in <head>API base — const API_BASE in the scriptIcons — swap any data-lucide="..." attributeDesign notesTokenValueUseCanvas#faf9f5Page backgroundSurface#f0eee6CardsInk#141413Primary textCoral#cc785cPrimary actionCoral active#a9583ePressed stateOlive#5e5d59Secondary textHairline#e8e6dcBordersTypography: Lora (body), Poppins (headings/buttons), JetBrains Mono (labels/meta).⚠️ DisclaimerThis project is for personal and educational use only.Only download content you own or have explicit permission to download.Respect YouTube's Terms of Service and copyright law in your jurisdiction.The download API is a third-party public proxy and is not affiliated with this project. It may rate-limit, change, or go offline at any time.The author is not responsible for misuse.LicenseMIT