// LexiPage Chrome Extension - Content Script
// Applies reading settings to web pages

(function () {
    'use strict';

    // State
    let settings = null;
    let globalEnabled = true;
    let disabledSites = [];
    let styleElement = null;
    let fontFaceAdded = false;

    // Default settings
    const DEFAULT_SETTINGS = {
        letterSpacing: 0.06,
        wordSpacing: 0.10,
        lineHeight: 1.6,
        fontWeight: 400,
        maxWidth: 60,
        bwgt: 50
    };

    // Initialize
    init();

    async function init() {
        // Load settings from storage
        await loadSettings();

        // Apply styles if enabled
        applyStyles();

        // Listen for settings updates from popup
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === 'SETTINGS_UPDATED') {
                settings = message.settings;
                globalEnabled = message.globalEnabled;
                disabledSites = message.disabledSites;
                applyStyles();
            }
            sendResponse({ received: true });
        });

        // Listen for storage changes
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === 'sync') {
                if (changes.settings) {
                    settings = changes.settings.newValue;
                }
                if (changes.globalEnabled) {
                    globalEnabled = changes.globalEnabled.newValue;
                }
                if (changes.disabledSites) {
                    disabledSites = changes.disabledSites.newValue;
                }
                applyStyles();
            }
        });
    }

    async function loadSettings() {
        try {
            const data = await chrome.storage.sync.get(['settings', 'globalEnabled', 'disabledSites']);
            settings = data.settings || DEFAULT_SETTINGS;
            globalEnabled = typeof data.globalEnabled === 'boolean' ? data.globalEnabled : true;
            disabledSites = Array.isArray(data.disabledSites) ? data.disabledSites : [];
        } catch (error) {
            console.error('LexiPage: Error loading settings:', error);
            settings = DEFAULT_SETTINGS;
        }
    }

    function shouldApplyStyles() {
        if (!globalEnabled) return false;
        const hostname = window.location.hostname;
        return !disabledSites.includes(hostname);
    }

    function applyStyles() {
        if (!shouldApplyStyles()) {
            removeStyles();
            return;
        }

        if (!settings) return;

        // Add font face if not already added
        if (!fontFaceAdded) {
            addFontFace();
        }

        // Create or update style element
        const css = generateCSS(settings);

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'lexipage-styles';
            styleElement.setAttribute('data-lexipage', 'true');
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = css;
    }

    function removeStyles() {
        if (styleElement) {
            styleElement.remove();
            styleElement = null;
        }
    }

    function addFontFace() {
        try {
            const fontUrl = chrome.runtime.getURL('fonts/Lexisolve-BWGT-VF.ttf');
            const fontFaceCSS = `
        @font-face {
          font-family: 'Lexisolve';
          src: url('${fontUrl}') format('truetype-variations');
          font-weight: 100 900;
          font-style: normal;
          font-display: swap;
        }
      `;

            const fontStyle = document.createElement('style');
            fontStyle.id = 'lexipage-font';
            fontStyle.textContent = fontFaceCSS;
            document.head.appendChild(fontStyle);
            fontFaceAdded = true;
        } catch (error) {
            console.error('LexiPage: Error adding font face:', error);
        }
    }

    function generateCSS(s) {
        // Target text elements
        const textSelectors = [
            'p',
            'article',
            'section',
            '.article',
            '.content',
            '.post',
            '.entry-content',
            '.post-content',
            '.story-body',
            'main p',
            'main article',
            '[role="main"] p',
            '[role="article"]',
            '.prose',
            '.text-content',
            '.body-text',
            '.article-body',
            '.story-content'
        ].join(', ');

        // Heading selectors for font only
        const headingSelectors = 'h1, h2, h3, h4, h5, h6';

        return `
      /* LexiPage Reading Enhancements */
      
      /* Apply to main text content */
      ${textSelectors} {
        font-family: 'Lexisolve', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        letter-spacing: ${s.letterSpacing}em !important;
        word-spacing: ${s.wordSpacing}em !important;
        line-height: ${s.lineHeight} !important;
        font-weight: ${s.fontWeight} !important;
        font-variation-settings: 'BWGT' ${s.bwgt} !important;
      }
      
      /* Limit paragraph width for readability */
      ${textSelectors} {
        max-width: ${s.maxWidth}ch;
      }
      
      /* Apply font to headings but preserve their weight */
      ${headingSelectors} {
        font-family: 'Lexisolve', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        letter-spacing: ${Math.max(0, s.letterSpacing - 0.02)}em !important;
        font-variation-settings: 'BWGT' ${s.bwgt} !important;
      }
      
      /* Wikipedia specific */
      .mw-parser-output p,
      .mw-parser-output li,
      #mw-content-text p {
        font-family: 'Lexisolve', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        letter-spacing: ${s.letterSpacing}em !important;
        word-spacing: ${s.wordSpacing}em !important;
        line-height: ${s.lineHeight} !important;
        font-weight: ${s.fontWeight} !important;
        font-variation-settings: 'BWGT' ${s.bwgt} !important;
      }
      
      /* News sites */
      .story-body__inner p,
      .article__body p,
      .article-content p,
      .c-article-body p {
        font-family: 'Lexisolve', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        letter-spacing: ${s.letterSpacing}em !important;
        word-spacing: ${s.wordSpacing}em !important;
        line-height: ${s.lineHeight} !important;
        font-weight: ${s.fontWeight} !important;
        font-variation-settings: 'BWGT' ${s.bwgt} !important;
      }
      
      /* Medium/Substack style sites */
      .graf,
      .paragraph,
      .post-content p,
      .body-markup p {
        font-family: 'Lexisolve', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        letter-spacing: ${s.letterSpacing}em !important;
        word-spacing: ${s.wordSpacing}em !important;
        line-height: ${s.lineHeight} !important;
        font-weight: ${s.fontWeight} !important;
        font-variation-settings: 'BWGT' ${s.bwgt} !important;
      }
    `;
    }

})();