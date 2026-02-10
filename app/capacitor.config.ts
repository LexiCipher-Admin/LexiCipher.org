import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'org.lexicipher.app',
    appName: 'LexiCipher',
    webDir: 'out',
    server: {
        androidScheme: 'https'
    },
    ios: {
        contentInset: 'automatic',
        allowsLinkPreview: false,
        scrollEnabled: true
    },
    plugins: {
        // Camera permissions for OCR feature
        Camera: {
            // iOS permission descriptions (shown to user)
            presentationStyle: 'fullscreen',
        }
    }
};

export default config;