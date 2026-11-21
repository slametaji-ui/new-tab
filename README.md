# Lumina Tab

A simple, elegant, privacy-first **New Tab** browser extension inspired by Tabliss. Built with zero external dependencies using WebExtension Manifest V3 so it runs fast and works across all modern browsers.

## Features

- **Clean Glassmorphic UI**: Minimalist clock, date, time-aware greeting, and subtle backdrop scrim.
- **Quick Search**: Switch between Google, DuckDuckGo, Bing, Perplexity, YouTube, and GitHub (press `/` anywhere to focus).
- **Quick Links**: Customizable bookmark chips with automatic favicons.
- **Daily Focus**: Set and check off your main focus for the day.
- **Live Weather**: Powered by Open-Meteo (no API key required) using GPS or a custom city.
- **Customizable Backgrounds**: Curated mesh gradients, daily photography, custom URLs, or local image uploads with adjustable blur & dimmer sliders.
- **Bilingual**: English and Bahasa Indonesia support.
- **Backup & Restore**: Export or import your settings as JSON.

## Installation

### Chrome / Edge / Brave / Opera / Vivaldi (Chromium)
1. Open your browser's extensions page (`chrome://extensions`, `edge://extensions`, `brave://extensions`).
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this `new-tab` folder.
4. Open a new tab!

### Firefox (109+)
1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select `manifest.json` inside this `new-tab` folder.

### Safari (macOS)
1. Run Apple's converter in Terminal:
   ```bash
   xcrun safari-web-extension-converter /path/to/new-tab
   ```
2. Build & run the generated Xcode project and enable the extension in Safari Settings.
