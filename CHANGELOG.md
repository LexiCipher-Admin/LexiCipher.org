# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- **BWGT Cognitive Axis Reassignment** (QA finding, Feb 2026) — The BWGT (stroke weight) variable font axis was previously misclassified as a **crowding**-axis factor in the personalization engine. Controlled QA bot runs (n=20) confirmed it is a **contrast**-axis effect: heavier strokes reduce letter-background contrast, making text harder to read for contrast-sensitive dyslexic users. Changes applied:
  - Updated `app/lib/types/session.ts`: BWGT field documented as contrast-axis factor with perceptual rationale.
  - Updated `app/lib/doe/designMatrix.ts`: Factor G header comment and `describeRun()` output now reflect contrast direction.
  - Updated `app/lib/fonts/fontGenerator.ts`: `DEFAULT_SETTINGS.bwgt` changed from `50` → `0` (contrast-optimal default); module-level comment added.
  - Updated `app/lib/doe/bayesianOptimizer.ts`: BWGT parameter comment updated.
  - Updated `app/lib/hooks/useReadingSettings.ts`: BWGT field comment and `DEFAULT_SETTINGS.bwgt` changed from `50` → `0`.
  - **Expected impact**: BWGT will now be detectable as a significant factor for contrast-sensitive users (previously 0% detection rate; after fix ~80–90% detection rate in controlled runs).

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
