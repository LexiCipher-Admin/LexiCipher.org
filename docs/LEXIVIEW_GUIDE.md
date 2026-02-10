# LexiView User Guide

**LexiView** transforms any image of text into readable content using your personalized typography settings.

---

## Quick Start

1. **Take the Reading Test** (recommended first)
   - Go to [lexicipher.org/test](/test)
   - Complete the 16-comparison test (~10 minutes)
   - Your settings are automatically saved

2. **Open LexiView**
   - Go to [lexicipher.org/lexiview](/lexiview)
   - Your settings from the test are auto-applied
   - You'll see a green banner: "Your personalized settings have been applied"

3. **Scan or Upload**
   - **Take Photo**: Use your device camera
   - **Upload Image**: Select from your photo library

4. **Read with Comfort**
   - Text is rendered with your optimal font settings
   - Adjust sliders if needed

---

## Features

### 📷 Image Input
- **Camera**: Take a photo of printed text (books, worksheets, signs)
- **Upload**: Choose an existing image from your device
- **Formats**: JPG, PNG, GIF, BMP, WebP

### ⚙️ Typography Controls

**Always Visible:**
| Control | Range | What it does |
|---------|-------|--------------|
| Font Size | 14-32px | Make text larger or smaller |
| Line Height | 1.3-2.5 | Vertical space between lines |
| Letter Spacing | 0-0.25em | Space between characters |

**Show All Settings** (click to reveal):
| Control | Range | What it does |
|---------|-------|--------------|
| Word Spacing | 0-0.40em | Space between words |
| Font Weight | 300-700 | How bold the text appears |
| Bottom Weight | 0-100 | Weight at bottom of letters (BWGT axis) |
| Line Width | 40-80ch | Maximum characters per line |

### 🎯 Auto-Applied Settings

If you've completed the reading test, LexiView automatically loads:
- All 7 typography settings from your results
- The LexiCipher BWGT variable font
- Settings are stored locally (no account needed)

---

## How It Works

### OCR (Optical Character Recognition)

LexiView uses **Tesseract.js** for text recognition:

1. Your image is processed entirely on your device
2. No data is sent to any server
3. Text is extracted with confidence score
4. Paragraphs are preserved based on line breaks

### Privacy

- ✅ All processing happens locally
- ✅ Images never leave your device
- ✅ No account required
- ✅ Settings stored in localStorage only

---

## Tips for Best Results

### 📸 Taking Good Photos

| Do | Don't |
|-----|-------|
| Flat, well-lit surface | Curved pages, shadows |
| Perpendicular angle | Tilted or skewed |
| Fill frame with text | Too much margin |
| High contrast | Low light, glare |

### 📖 Best Source Materials

- ✅ Printed books and articles
- ✅ Worksheets and handouts
- ✅ Signs and notices
- ⚠️ Handwriting (results vary)
- ❌ Heavily styled/decorative fonts

### 🔄 Improving Results

If text doesn't look right:
1. Retake photo with better lighting
2. Crop to just the text area
3. Try adjusting contrast on original image
4. Check OCR confidence score (aim for 80%+)

---

## Accessibility

LexiView is designed for accessibility:

- **Large touch targets** for mobile/tablet
- **Dark mode support** (follows system preference)
- **Keyboard navigable** controls
- **Screen reader compatible** labels

---

## Troubleshooting

### "Text looks wrong"
- OCR may misread some characters
- Check the original image quality
- Try manual corrections after copying text

### "Settings not applied"
- Make sure you completed the reading test
- Check localStorage is enabled
- Click "Reset" and retake the test

### "Processing takes too long"
- Large images take longer
- Reduce image size before upload
- First-time use downloads OCR engine (~2MB)

---

## Technical Details

| Component | Technology |
|-----------|------------|
| OCR Engine | Tesseract.js v5 |
| Font | LexiCipher BWGT Variable Font |
| Settings Storage | localStorage |
| Processing | 100% client-side |

---

## Related Pages

- [Take the Reading Test](/test) - Discover your optimal settings
- [Install the Font](/next-steps/install-font) - Use on your computer
- [LexiPage Extension](/next-steps/lexipage) - Apply settings to any webpage
- [About the Research](/about/research) - Science behind LexiCipher

---

*Last updated: February 5, 2026*
