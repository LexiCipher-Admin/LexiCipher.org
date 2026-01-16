# DyslexiaFont.org

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)

**Personalized Font Optimization Platform for Dyslexia**

DyslexiaFont.org helps individuals with dyslexia discover their optimal reading configuration through guided Design of Experiments (DOE) testing. Get a custom font file personalized for your unique visual processing.

## 🎯 Features

- **Science-Based Testing** - Uses DOE methodology to efficiently identify what works for YOU
- **Personalized Results** - Not one-size-fits-all; optimized for individual preferences
- **Custom Font Generation** - Download an OTF/TTF file with your optimal settings baked in
- **Accessibility First** - WCAG 2.1 AA compliant, dyslexia-friendly design
- **Privacy Focused** - Data stored locally; no account required

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/dyslexiafont.org.git
cd dyslexiafont.org/app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dyslexia-font-org/
├── app/                    # Next.js application
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utilities (DOE engine, font generation)
│   └── public/fonts/       # OpenDyslexic font files
├── LICENSE                 # MIT License
├── CONTRIBUTING.md         # Contribution guidelines
├── CODE_OF_CONDUCT.md      # Community standards
└── dyslexiafont.org-project-plan.md  # Detailed project specification
```

## 🔬 How It Works

1. **Screening Phase** - Test 8+ typography parameters with minimal experiments
2. **Optimization Phase** - Focus on YOUR significant factors at multiple levels
3. **Confirmation Phase** - Validate the predicted optimal configuration
4. **Download** - Get your personalized font file

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font Manipulation**: opentype.js
- **Base Font**: OpenDyslexic (SIL OFL)

## 📚 Research Background

Based on peer-reviewed research:

- Zorzi et al. (2012) - "Extra-large letter spacing improves reading in dyslexia"
- Schneps et al. (2013) - "E-Readers Are More Effective than Paper for some with dyslexia"
- Rello & Baeza-Yates (2013) - "Good Fonts for Dyslexia"

See the [project plan](dyslexiafont.org-project-plan.md) for full research references.

## ⚠️ Important Disclaimer

**This tool is NOT a diagnostic tool for dyslexia.** Only qualified professionals can diagnose dyslexia. DyslexiaFont.org helps discover typographic preferences that may improve reading comfort.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting PRs.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The OpenDyslexic font is licensed under the [SIL Open Font License](https://opendyslexic.org/).

---

Made with ❤️ for the dyslexia community
