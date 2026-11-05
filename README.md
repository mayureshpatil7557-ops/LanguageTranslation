# 🌐 LinguaFlow — AI-Powered Language Translation Web Application

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](#)

> **Break every language barrier. Translate anything, instantly.**  
> LinguaFlow is a modern, responsive, and lightweight client-side language translation web application supporting **50+ international and regional languages**. Equipped with automatic language detection, real-time speech synthesis (Text-to-Speech), character counting, confidence matching, and one-click clipboard copying.

---

## ✨ Features

- 🌍 **50+ Languages Supported**: Translate across major global languages (English, Spanish, French, German, Mandarin, Japanese, Russian, Arabic) and regional languages (Hindi, Marathi, Bengali, Tamil, Telugu, and more).
- 🔍 **Auto-Detection**: Automatic detection of the source language with flexible pairing.
- 🔊 **Text-to-Speech (TTS)**: Integrated Web Speech API (`SpeechSynthesis`) for listening to source inputs and translated outputs in native accents.
- ⚡ **Real-Time Performance**: High-speed translation powered by the MyMemory API with live latency tracking in milliseconds.
- 🎯 **Confidence Scoring**: Dynamic translation quality indicator (High, Medium, Low) based on API match quality.
- 📋 **One-Click Copy**: Instant clipboard copying with visual feedback and toast notifications.
- 🔄 **Quick Language Swap**: Swap source and target languages (and flip translated text) with a single click.
- ⚡ **Quick-Select Chips**: Instant one-tap target switching for popular languages (Spanish, French, German, Japanese, Chinese, Arabic, Hindi, Russian).
- ⌨️ **Keyboard Shortcut**: Translate quickly with <kbd>Ctrl</kbd> + <kbd>Enter</kbd> (or <kbd>Cmd</kbd> + <kbd>Enter</kbd> on macOS).
- 🎨 **Modern Glassmorphism UI**: Beautiful UI featuring ambient background orbs, animated floating language glyphs, smooth skeleton loaders, and full responsiveness across mobile, tablet, and desktop.
- 🔒 **No API Key Required**: Works out-of-the-box with zero configuration or backend servers.

---

## 📸 Interface Preview

```text
┌────────────────────────────────────────────────────────────────────────┐
│  🌐 LinguaFlow   AI-Powered Translation               [ 50+ Languages ] │
│  Break every language barrier. Translate anything, instantly.          │
├────────────────────────────────────────────────────────────────────────┤
│  [ 🔍 Source Language: Auto Detect ▾ ]   ⇄   [ 🇪🇸 Target: Spanish ▾ ]   │
├───────────────────────────────────┬────────────────────────────────────┤
│  ORIGINAL TEXT         [ 0 / 500 ]│  TRANSLATION       [ High Match ● ]│
│  Hello, welcome to LinguaFlow!    │  ¡Hola, bienvenido a LinguaFlow!   │
│                                   │                                    │
│  [ 🔊 Listen ]      [ Translate ] │  [ 🔊 Listen ]       [ 📋 Copy ]   │
├───────────────────────────────────┴────────────────────────────────────┤
│  Quick Switch: [ 🇪🇸 Spanish ] [ 🇫🇷 French ] [ 🇩🇪 German ] [ 🇯🇵 Japanese ]...
│  ⚡ Avg Speed: < 1s  |  🌍 50+ Languages  |  ✍️ Live Char Count  | 🔒 Free │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Semantic Elements, Responsive Grid/Flexbox
- **Styles**: CSS3 (Custom Variables, Backdrop Filter Glassmorphism, CSS Grid, Custom Keyframes)
- **Typography**: Google Fonts ([Inter](https://fonts.google.com/specimen/Inter) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk))
- **Scripting**: Vanilla JavaScript (ES6+, Async/Await, AbortController)
- **APIs**:
  - [MyMemory Translation API](https://mymemory.translated.net/) for translation data
  - Native [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for speech synthesis
  - Native [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) for copy utilities

---

## 📂 Project Structure

```bash
LanguageTranslation/
├── index.html        # Main application structure, layouts & controls
├── style.css         # Styling, glassmorphic UI, animations & responsive breakpoints
├── app.js            # Translation engine, API calls, TTS & event handlers
├── .gitignore        # Git ignore rules for system/editor files
└── README.md         # Comprehensive project documentation
```

---

## 🚀 Getting Started

No dependencies, Node modules, or compilation required! You can run the application directly in any modern browser.

### Option 1: Direct File Open
Double-click `index.html` or open it directly in your browser:
```powershell
# On Windows (PowerShell)
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

### Option 2: Run with Local Development Server
For the best experience (e.g. using VS Code Live Server or a simple HTTP server):

```bash
# Using Python 3
python -m http.server 3000

# Using Node.js (npx)
npx serve .
```
Then visit `http://localhost:3000` in your browser.

---

## ⌨️ Shortcuts & Controls

| Action | Shortcut / Trigger |
| :--- | :--- |
| **Translate Text** | <kbd>Ctrl</kbd> + <kbd>Enter</kbd> or click **Translate** |
| **Swap Languages** | Click the **⇄** swap button in the language bar |
| **Clear Text** | Click the **✕** button on the input header |
| **Copy Translation** | Click the **📋** icon button on the output card |
| **Listen (TTS)** | Click **Listen** under source or target pane |

---

## 🌐 Supported Languages (Sample)

| Code | Language | Code | Language | Code | Language |
| :---: | :--- | :---: | :--- | :---: | :--- |
| `en` | English 🇬🇧 | `es` | Spanish 🇪🇸 | `fr` | French 🇫🇷 |
| `de` | German 🇩🇪 | `it` | Italian 🇮🇹 | `pt` | Portuguese 🇵🇹 |
| `ru` | Russian 🇷🇺 | `zh` | Chinese 🇨🇳 | `ja` | Japanese 🇯🇵 |
| `ko` | Korean 🇰🇷 | `ar` | Arabic 🇸🇦 | `hi` | Hindi 🇮🇳 |
| `mr` | Marathi 🇮🇳 | `bn` | Bengali 🇧🇩 | `tr` | Turkish 🇹🇷 |
| `nl` | Dutch 🇳🇱 | `sv` | Swedish 🇸🇪 | `pl` | Polish 🇵🇱 |

*Plus 30+ additional global languages available in the dropdown selector.*

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Mayuresh Patil**
- GitHub: [@mayureshpatil7557-ops](https://github.com/mayureshpatil7557-ops)
- Email: mayureshpatil7557@gmail.com
