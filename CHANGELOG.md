# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Vercel Deployment Documentation** - Created comprehensive `VERCEL_DEPLOYMENT.md` guide with configuration instructions, troubleshooting, and best practices.

### Fixed
- **Vercel Deployment Configuration** - Fixed "No Next.js version detected" error by updating `vercel.json` to work with monorepo structure where Next.js app lives in `app/` subdirectory. Commands simplified to work with Root Directory setting.

### Changed
- **Project Rebranding**: Renamed project from **Lexisolve** to **LexiCipher** to address intellectual property considerations and finalize branding.
- **Font Renaming**: 
    - Updated internal font metadata (Name Table) in variable font binaries (`LexiCipher-BWGT-VF.ttf`).
    - Updated font source files (`.ufo`, `.designspace`) and master paths.
- **Global Identity Update**:
    - Updated `package.json`, `capacitor.config.ts`, and Chrome Extension manifests.
    - Updated all source code references, documentation, and feature descriptions.
    - Reorganized file structure to use `lexicipher` naming conventions.
