# 🎉 Birthday Gift Website

An interactive, personalized birthday surprise experience built with vanilla HTML, CSS, and JavaScript.

## Features

- 🔐 **Passcode Protection** — Secure entry with hint-based access
- 🎈 **Dynamic Screens** — Multi-screen experience with smooth transitions
- 🎁 **Interactive Gifts** — Clickable gift boxes that reveal surprises
- 🎂 **Birthday Cake** — Animated cake with candles you can blow out
- 📸 **Photo Gallery** — Film strip-styled photo collection with modal viewer
- 🎬 **Video Player** — Embedded media playback with controls
- 💌 **Personalized Letter** — Heartfelt message with animations
- 🎵 **Background Music** — Toggle-able audio that plays throughout the experience

## Project Structure

```
├── index.html              # Main HTML file with all screens
├── README.md              # This file
└── src/
    ├── css/
    │   └── styles.css     # All styling and animations
    ├── js/
    │   └── app.js         # Core interactivity and logic
    ├── img/               # Images and GIFs
    │   └── photosession/  # Photo gallery images
    ├── music/             # Background audio
    └── video/             # Video content
```

## Getting Started

### View the Website

1. Open `index.html` in any modern web browser
2. Enter the passcode (hint provided on screen)
3. Navigate through the screens using the "Next" buttons

### Customize

**Change the Passcode:**
- Edit `src/js/app.js`, line 19:
  ```javascript
  const CORRECT = '2004';  // Change this value
  ```

**Update Images & Media:**
- Replace files in `src/img/`, `src/music/`, and `src/video/` directories
- Keep filenames the same or update references in `index.html`

**Modify Text Content:**
- Edit screen text directly in `index.html`
- Update the letter body (lines 338–350) with your own message

**Styling:**
- All CSS is in `src/css/styles.css`
- Includes animations, gradients, and responsive design

## Screen Guide

| Screen | Purpose | Interactive Elements |
|--------|---------|----------------------|
| **Passcode** | Entry point | Keypad input, hint text |
| **Greeting** | Welcome message | "Next" button, balloons |
| **Choice** | Confirmation prompt | "YES" / "NO" buttons |
| **Dare** | Playful rejection response | "TRY AGAIN" button |
| **Gifts** | Main reveal section | 3 clickable gift boxes |
| **Cake** | Birthday celebration | "BLOW!" button, confetti |
| **Photo Gallery** | Memory collection | Clickable photos, modal viewer |
| **Video** | Media playback | HTML5 video controls |
| **Disclaimer** | Optional continuation | "Continue" button |
| **Letter** | Personal message | Scrollable text, hearts |

## Technical Details

- **No Build Tools** — Pure vanilla HTML/CSS/JS, ready to use immediately
- **No Dependencies** — Works offline once loaded
- **Responsive** — Optimized for desktop and mobile devices
- **Animations** — CSS keyframes for smooth, performant transitions
- **Browser Support** — Modern browsers (Chrome, Firefox, Safari, Edge)

## Tips

- Use headphones/earphones for the best audio experience
- The music can be toggled via the 🎵 button in the corner
- All transitions are smooth — take your time exploring each screen
- The photo gallery supports modal expansion for full-size viewing

## Development

To edit and test:

1. Open `index.html` in your browser
2. Use browser DevTools to inspect and debug
3. Hot-reload by saving and refreshing the page
4. Test passcode entry, all button flows, and media playback

---

**Created with 💕 as a personalized birthday surprise**
