# iOS App Store Deployment Guide

This guide walks you through deploying Lexisolve to the iOS App Store using Capacitor.

## Prerequisites

### On Your Mac
- macOS Monterey (12.0) or later
- Xcode 14.0 or later (download from Mac App Store)
- Apple Developer Account ($99/year): https://developer.apple.com/programs/
- CocoaPods: `sudo gem install cocoapods`
- Node.js 18+ and npm

### Already Completed (on PC)
- ✅ Capacitor core and CLI installed
- ✅ `capacitor.config.ts` configured
- ✅ Web app ready for build

---

## Step 1: Transfer Project to Mac

### Option A: Git (Recommended)
```bash
# On PC - commit and push
git add .
git commit -m "Add Capacitor configuration"
git push

# On Mac - clone or pull
git clone https://github.com/YOUR_USERNAME/Lexisolve-org.git
# or if already cloned:
git pull
```

### Option B: USB/Cloud Drive
Copy the entire `Lexisolve-org` folder to your Mac.

---

## Step 2: Install Dependencies on Mac

```bash
# Navigate to the app directory
cd Lexisolve-org/app

# Install npm dependencies
npm install

# Install iOS-specific Capacitor package
npm install @capacitor/ios
```

---

## Step 3: Configure Next.js for Static Export

Ensure `next.config.js` has static export enabled:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  // ... other config
};
```

---

## Step 4: Build the Web App

```bash
# Build Next.js for static export
npm run build

# This creates the 'out' directory that Capacitor will use
```

---

## Step 5: Add iOS Platform

```bash
# Add iOS platform to Capacitor
npx cap add ios

# Sync web assets to iOS project
npx cap sync ios
```

This creates an `ios/` folder with a complete Xcode project.

---

## Step 6: Configure iOS Permissions

Edit `ios/App/App/Info.plist` to add camera permissions for OCR:

```xml
<key>NSCameraUsageDescription</key>
<string>Lexisolve needs camera access to capture images for text recognition.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Lexisolve needs photo library access to select images for text recognition.</string>
```

---

## Step 7: Open in Xcode

```bash
npx cap open ios
```

This opens the project in Xcode.

---

## Step 8: Configure Xcode Signing

1. In Xcode, select the **App** target in the left sidebar
2. Go to **Signing & Capabilities** tab
3. Check **Automatically manage signing**
4. Select your **Team** (your Apple Developer account)
5. The **Bundle Identifier** should be `org.lexisolve.app`

### If you don't see your team:
1. Xcode menu → **Preferences** → **Accounts**
2. Click **+** to add your Apple ID
3. Sign in with your Apple Developer account

---

## Step 9: Create App Icons

iOS requires specific icon sizes. Place icons in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`:

| Size      | Filename      | Use                |
| --------- | ------------- | ------------------ |
| 20x20     | Icon-20.png   | iPad Notifications |
| 29x29     | Icon-29.png   | Settings           |
| 40x40     | Icon-40.png   | Spotlight          |
| 60x60     | Icon-60.png   | iPhone App         |
| 76x76     | Icon-76.png   | iPad App           |
| 83.5x83.5 | Icon-83.5.png | iPad Pro App       |
| 1024x1024 | Icon-1024.png | App Store          |

**Tip:** Use a tool like https://appicon.co to generate all sizes from a single 1024x1024 image.

---

## Step 10: Test on Simulator

1. In Xcode, select a simulator from the device dropdown (e.g., "iPhone 15 Pro")
2. Click the **Play** button (▶) or press `Cmd+R`
3. The app should build and launch in the simulator

### Common Issues:
- **Build failed**: Check that all CocoaPods are installed (`cd ios/App && pod install`)
- **White screen**: Ensure `npm run build` was run and `out/` exists

---

## Step 11: Test on Physical Device

1. Connect your iPhone/iPad via USB
2. Trust the computer on your device
3. Select your device from Xcode's device dropdown
4. Click **Play** (▶)

**First time?** You may need to:
- On device: Settings → General → VPN & Device Management → Trust your developer certificate

---

## Step 12: Create App Store Connect Listing

1. Go to https://appstoreconnect.apple.com
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platform**: iOS
   - **Name**: Lexisolve
   - **Primary Language**: English (U.S.)
   - **Bundle ID**: org.lexisolve.app
   - **SKU**: lexisolve-001 (any unique string)

---

## Step 13: Prepare App Store Metadata

### Required Information:
- **Subtitle**: "Personalized Reading Fonts"
- **Description**: 
  ```
  Lexisolve helps readers with dyslexia find their optimal font settings 
  through a personalized reading assessment. Using advanced typography 
  research, the app adjusts letter spacing, weight, and openings to 
  improve reading comfort and speed.
  
  Features:
  • Personalized font optimization test
  • OCR tool to convert images to readable text
  • Adjustable font parameters
  • Privacy-focused (all data stays on your device)
  ```
- **Keywords**: dyslexia, reading, fonts, accessibility, OCR, text recognition
- **Support URL**: https://lexisolve.org
- **Privacy Policy URL**: https://lexisolve.org/privacy

### Screenshots Required:
- iPhone 6.7" (1290 x 2796) - for iPhone 15 Pro Max
- iPhone 6.5" (1284 x 2778) - for older Pro Max
- iPad 12.9" (2048 x 2732) - for iPad Pro

**Tip:** Use Xcode Simulator to capture screenshots: `Cmd+S` in simulator

---

## Step 14: Archive and Upload

### Create Archive:
1. In Xcode, select **Any iOS Device (arm64)** as the target
2. Menu: **Product** → **Archive**
3. Wait for build to complete (may take several minutes)

### Upload to App Store Connect:
1. When Archive completes, the **Organizer** window opens
2. Select your archive
3. Click **Distribute App**
4. Choose **App Store Connect** → **Upload**
5. Follow the prompts (accept defaults)
6. Wait for upload and processing (10-30 minutes)

---

## Step 15: Submit for Review

1. In App Store Connect, go to your app
2. Click **+ Version or Platform** if needed
3. Fill in **What's New in This Version**
4. Select your uploaded build
5. Answer the **App Review Information** questions
6. Click **Submit for Review**

### Review Timeline:
- Initial review: 24-48 hours typically
- May take longer if issues found
- You'll receive email updates

---

## Updating the App

After making changes to the web app:

```bash
# 1. Build the web app
npm run build

# 2. Sync to iOS
npx cap sync ios

# 3. Open Xcode and archive/upload
npx cap open ios
```

---

## Troubleshooting

### "No signing certificate found"
- Ensure you're enrolled in Apple Developer Program
- Xcode → Preferences → Accounts → Download certificates

### "Build failed with CocoaPods error"
```bash
cd ios/App
pod install --repo-update
```

### "App crashes on launch"
- Check Xcode console for errors
- Ensure `out/` directory exists with built files
- Verify `capacitor.config.ts` has correct `webDir: 'out'`

### "Assets not loading"
- Run `npx cap sync ios` after any web changes
- Check that fonts are copied to iOS bundle

---

## Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)