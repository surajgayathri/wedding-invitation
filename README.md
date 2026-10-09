# Gayathri & Sooraj — Wedding Invitation

A responsive, animated Kerala-style wedding invitation (HTML + CSS + vanilla JS), ready for GitHub Pages / Netlify.
Wedding: Sunday, 25 October 2026, Muhurtham 11:05–11:40 AM IST, Anaswara Auditorium, Bhanu Junction, Sasthamcotta.

## Structure
```
index.html
css/style.css
js/script.js
assets/couple.jpg          (included)
assets/wedding-music.mp3   (YOU MUST ADD THIS)
favicon.ico
```

## Assets
- **couple.jpg** – already included (the supplied photograph).
- **wedding-music.mp3** – not included. Use a track you are licensed to use (a licensed instrumental or a song the family supplies). If the file is missing the site still works; the music button simply won't play.
  Do not hot-link or copy another person's audio without permission.

## Edit details
- Wording, venue, dates: `index.html`
- Countdown target: `target` in `js/script.js` (`2026-10-25T11:05:00+05:30`)
- Colours: CSS variables at the top of `css/style.css`
- Maps: the two "Get Directions" buttons use the Google Maps short links supplied.

## Deploy — GitHub Pages
1. Create a GitHub repository and upload all files (keep the folder structure).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Wait a minute, then open the published URL on mobile and desktop.

## Deploy — Netlify
Drag the project folder onto https://app.netlify.com/drop.

## Notes
- Music starts only after the visitor taps **Open Wedding Invitation** (browser autoplay rules).
- Animations are reduced automatically when the visitor's device requests reduced motion.
