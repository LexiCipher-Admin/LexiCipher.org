import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'org.lexisolve.app',
    appName: 'Lexisolve',
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