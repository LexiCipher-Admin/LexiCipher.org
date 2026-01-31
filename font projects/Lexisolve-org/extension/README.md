# LexiPage Chrome Extension

Apply your personalized reading settings from lexisolve.org to any website.

## Features

- **Import Settings**: Import your optimized settings JSON from lexisolve.org
- **Global Toggle**: Enable/disable the extension across all sites
- **Per-Site Control**: Disable specific sites while keeping others enhanced
- **Real-Time Adjustments**: Fine-tune settings via sliders in the popup
- **Synced Settings**: Settings sync across devices via Chrome Sync

## Installation (Developer Mode)

1. **Generate Icons** (required before loading):
   - Create PNG icons at 16x16, 32x32, 48x48, and 128x128 pixels
   - Save them to `extension/icons/` as `icon16.png`, `icon32.png`, `icon48.png`, `icon128.png`
   - Use a blue background (#2563eb) with white "L" for branding consistency

2. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `extension/` folder

3. **Test**:
   - Navigate to any text-heavy website (e.g., Wikipedia, news sites)
   - Click the LexiPage icon in the toolbar
   - Adjust settings or import your lexisolve.org JSON

## File Structure

```
extension/
├── manifest.json          # Extension configuration
├── background/
│   └── background.js      # Service worker for initialization
├── content/
│   └── content.js         # Injected into pages, applies styles
├── popup/
│   ├── popup.html         # Settings UI
│   ├── popup.css          # Popup styling
│   └── popup.js           # Popup logic
├── fonts/
│   └── Lexisolve-BWGT-VF.ttf  # Variable font
├── icons/
│   └── (PNG icons needed)
└── README.md              # This file
```

## How It Works

1. **Content Script**: Injected into every page, adds CSS rules to enhance readability
2. **Popup**: Provides UI for adjusting and importing settings
3. **Storage**: Uses `chrome.storage.sync` to persist settings across devices
4. **Font**: Bundles the Lexisolve variable font for consistent typography

## Settings

| Setting        | Description               | Range    |
| -------------- | ------------------------- | -------- |
| Letter Spacing | Space between letters     | 0-0.2em  |
| Word Spacing   | Space between words       | 0-0.3em  |
| Line Height    | Space between lines       | 1.0-2.5  |
| Font Weight    | Text thickness            | 300-700  |
| Max Width      | Maximum paragraph width   | 40-100ch |
| BWGT           | Bold Weight variable axis | 0-100    |

## Importing Settings from lexisolve.org

1. Complete the reading assessment at lexisolve.org
2. On the results page, click "Export as JSON"
3. In the extension popup, click "Import from lexisolve.org"
4. Select your downloaded JSON file
5. Settings are applied immediately

## Privacy

- **No data collection**: All settings stored locally/synced via Chrome
- **No external requests**: Font and styles are bundled
- **Open source**: Full code visibility

## Future Enhancements

- [ ] Per-site custom settings
- [ ] Keyboard shortcuts
- [ ] Reader mode toggle
- [ ] Text highlighting options
- [ ] Font alternatives (OpenDyslexic, etc.)

## License

MIT License - Part of the Lexisolve.org project