// LexiPage Chrome Extension - Background Service Worker

// Initialize default settings on install
chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install') {
        // Set default settings
        const defaultSettings = {
            settings: {
                letterSpacing: 0.06,
                wordSpacing: 0.10,
                lineHeight: 1.6,
                fontWeight: 400,
                maxWidth: 60,
                bwgt: 50
            },
            globalEnabled: true,
            disabledSites: []
        };

        await chrome.storage.sync.set(defaultSettings);
        console.log('LexiPage: Default settings initialized');
    }
});

// Handle extension icon click - open popup (default behavior)
// This is mainly here for future enhancements

// Listen for tab updates to potentially refresh content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        // Don't inject on chrome:// pages or extensions
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
            return;
        }

        // Content script should auto-load via manifest, but we can send a ping
        // to refresh settings if needed
        chrome.tabs.sendMessage(tabId, { type: 'TAB_READY' }).catch(() => {
            // Content script not ready, that's fine
        });
    }
});