# Hosting notes

This project is static. Upload the contents of this folder to any static hosting provider (for example, GitHub Pages or a basic web server). Keep the relative `src/` directory path intact.

The Google Fonts import in `src/styles.css` is cosmetic only; the game works with system-font fallbacks and does not load any game assets. To make the project fully offline, remove the `@import` line from the stylesheet.
