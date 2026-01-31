// LexiPage Chrome Extension - Popup Script

// Default settings
const DEFAULT_SETTINGS = {
    letterSpacing: 0.06,
    wordSpacing: 0.10,
    lineHeight: 1.6,
    fontWeight: 400,
    maxWidth: 60,
    bwgt: 50
};

// DOM Elements
let globalToggle, importFile, siteToggle, currentDomainEl;
let sliders = {};

// Current state
let settings = { ...DEFAULT_SETTINGS };
let globalEnabled = true;
let disabledSites = [];
let currentDomain = '';

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
    // Get DOM elements
    globalToggle = document.getElementById('globalToggle');
    importFile = document.getElementById('importFile');
    siteToggle = document.getElementById('siteToggle');
    currentDomainEl = document.getElementById('currentDomain');

    // Get all slider elements
    sliders = {
        letterSpacing: {
            input: document.getElementById('letterSpacing'),
            value: document.getElementById('letterSpacingValue')
        },
        wordSpacing: {
            input: document.getElementById('wordSpacing'),
            value: document.getElementById('wordSpacingValue')
        },
        lineHeight: {
            input: document.getElementById('lineHeight'),
            value: document.getElementById('lineHeightValue')
        },
        fontWeight: {
            input: document.getElementById('fontWeight'),
            value: document.getElementById('fontWeightValue')
        },
        maxWidth: {
            input: document.getElementById('maxWidth'),
            value: document.getElementById('maxWidthValue')
        },
        bwgt: {
            input: document.getElementById('bwgt'),
            value: document.getElementById('bwgtValue')
        }
    };

    // Load saved settings
    await loadSettings();

    // Get current tab domain
    await getCurrentDomain();

    // Update UI
    updateUI();

    // Set up event listeners
    setupEventListeners();
});

// Load settings from chrome.storage.sync
async function loadSettings() {
    try {
        const data = await chrome.storage.sync.get(['settings', 'globalEnabled', 'disabledSites']);
        if (data.settings) {
            settings = { ...DEFAULT_SETTINGS, ...data.settings };
        }
        if (typeof data.globalEnabled === 'boolean') {
            globalEnabled = data.globalEnabled;
        }
        if (Array.isArray(data.disabledSites)) {
            disabledSites = data.disabledSites;
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save settings to chrome.storage.sync
async function saveSettings() {
    try {
        await chrome.storage.sync.set({
            settings,
            globalEnabled,
            disabledSites
        });
        // Notify content scripts
        notifyContentScripts();
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// Get current tab domain
async function getCurrentDomain() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.url) {
            const url = new URL(tab.url);
            currentDomain = url.hostname;
        }
    } catch (error) {
        console.error('Error getting current domain:', error);
        currentDomain = 'unknown';
    }
}

// Update UI with current settings
function updateUI() {
    // Global toggle
    globalToggle.checked = globalEnabled;

    // Current domain
    currentDomainEl.textContent = currentDomain || 'No site';

    // Site toggle
    const siteEnabled = !disabledSites.includes(currentDomain);
    updateSiteToggleButton(siteEnabled);

    // Sliders
    updateSlider('letterSpacing', settings.letterSpacing, v => `${v.toFixed(2)}em`);
    updateSlider('wordSpacing', settings.wordSpacing, v => `${v.toFixed(2)}em`);
    updateSlider('lineHeight', settings.lineHeight, v => v.toFixed(1));
    updateSlider('fontWeight', settings.fontWeight, v => v.toString());
    updateSlider('maxWidth', settings.maxWidth, v => `${v}ch`);
    updateSlider('bwgt', settings.bwgt, v => v.toString());
}

// Update a single slider
function updateSlider(name, value, formatter) {
    if (sliders[name]) {
        sliders[name].input.value = value;
        sliders[name].value.textContent = formatter(value);
    }
}

// Update site toggle button appearance
function updateSiteToggleButton(enabled) {
    if (enabled) {
        siteToggle.textContent = '✓ Enabled';
        siteToggle.className = 'site-toggle-btn enabled';
    } else {
        siteToggle.textContent = '✗ Disabled';
        siteToggle.className = 'site-toggle-btn disabled';
    }
}

// Set up event listeners
function setupEventListeners() {
    // Global toggle
    globalToggle.addEventListener('change', () => {
        globalEnabled = globalToggle.checked;
        saveSettings();
    });

    // Import file
    importFile.addEventListener('change', handleImport);

    // Site toggle
    siteToggle.addEventListener('click', toggleCurrentSite);

    // Slider events
    Object.keys(sliders).forEach(name => {
        sliders[name].input.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            settings[name] = value;
            updateSliderDisplay(name, value);
        });

        sliders[name].input.addEventListener('change', () => {
            saveSettings();
        });
    });
}

// Update slider display value
function updateSliderDisplay(name, value) {
    const formatters = {
        letterSpacing: v => `${v.toFixed(2)}em`,
        wordSpacing: v => `${v.toFixed(2)}em`,
        lineHeight: v => v.toFixed(1),
        fontWeight: v => v.toString(),
        maxWidth: v => `${v}ch`,
        bwgt: v => v.toString()
    };
    if (sliders[name] && formatters[name]) {
        sliders[name].value.textContent = formatters[name](value);
    }
}

// Handle JSON import
async function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const text = await file.text();
        const data = JSON.parse(text);

        // Validate it's from lexisolve.org
        if (data.generator !== 'lexisolve.org') {
            alert('This file does not appear to be from lexisolve.org');
            return;
        }

        // Extract settings
        if (data.settings) {
            const s = data.settings;

            // Parse letter spacing (e.g., "0.06em" -> 0.06)
            if (s.letterSpacing) {
                settings.letterSpacing = parseFloat(s.letterSpacing) || DEFAULT_SETTINGS.letterSpacing;
            }
            if (s.wordSpacing) {
                settings.wordSpacing = parseFloat(s.wordSpacing) || DEFAULT_SETTINGS.wordSpacing;
            }
            if (s.lineHeight) {
                settings.lineHeight = parseFloat(s.lineHeight) || DEFAULT_SETTINGS.lineHeight;
            }
            if (s.fontWeight) {
                settings.fontWeight = parseInt(s.fontWeight) || DEFAULT_SETTINGS.fontWeight;
            }
            if (s.maxWidth) {
                settings.maxWidth = parseInt(s.maxWidth) || DEFAULT_SETTINGS.maxWidth;
            }
            if (typeof s.bwgt === 'number') {
                settings.bwgt = s.bwgt;
            }
        }

        // Update UI and save
        updateUI();
        await saveSettings();

        alert('Settings imported successfully!');
    } catch (error) {
        console.error('Error importing settings:', error);
        alert('Error importing settings. Please check the file format.');
    }

    // Reset file input
    event.target.value = '';
}

// Toggle current site enabled/disabled
async function toggleCurrentSite() {
    if (!currentDomain) return;

    const index = disabledSites.indexOf(currentDomain);
    if (index === -1) {
        // Currently enabled, disable it
        disabledSites.push(currentDomain);
        updateSiteToggleButton(false);
    } else {
        // Currently disabled, enable it
        disabledSites.splice(index, 1);
        updateSiteToggleButton(true);
    }

    await saveSettings();
}

// Notify content scripts of settings change
async function notifyContentScripts() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.id) {
            chrome.tabs.sendMessage(tab.id, {
                type: 'SETTINGS_UPDATED',
                settings,
                globalEnabled,
                disabledSites
            });
        }
    } catch (error) {
        // Content script may not be ready, ignore error
        console.log('Could not notify content script:', error);
    }
}