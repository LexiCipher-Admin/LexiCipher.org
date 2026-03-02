# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **LexiCipher Owl Logo** — Integrated the official owl logo across the entire project:
  - `app/public/logo-icon.svg` — owl only (used in site header)
  - `app/public/logo-stacked.svg` — owl + stacked text
  - `app/public/logo.svg` — full original layout
  - `app/public/icons/icon-192.png` & `icon-512.png` — PWA home screen icons
  - `extension/icons/icon16/48/128.png` — Chrome extension toolbar icons
  - `icon16/48/128.svg` — root repo SVG icons
- **`generate-logos.js`** — Reusable Node.js script to regenerate all SVG variants from the source `.ai`/SVG file. Run with `node generate-logos.js` from the repo root.
- **Aleo font** — Loaded from Google Fonts in `layout.tsx` to match the original logo typography ("LexiCipher.org" text uses Aleo Bold; tagline uses Roboto Condensed).
- **Vercel Deployment Documentation** - Created comprehensive `VERCEL_DEPLOYMENT.md` guide with configuration instructions, troubleshooting, and best practices.

### Changed
- **Site header** — Replaced plain text navbar with decoupled owl + HTML text layout. Owl (`logo-icon.svg`) and "LexiCipher.org" text are independent elements, allowing each to be sized separately.
- **Homepage** — Removed redundant `<h1>LexiCipher.org</h1>` (logo in header serves as primary brand identity). Changed from `justify-center` to top-anchored layout so logo and content zoom/scale consistently together.
- **Header background** — Matched to page background (`bg-cream` / `#fdfbf7`) for seamless appearance.

### Fixed
- **SVG viewBox clipping** — Adjusted `logo-icon.svg` and `logo-stacked.svg` viewBox top boundary (`y=38` → `y=20`) to show the full book pages at the top of the owl illustration.
- **Zoom anchoring** — Removed `justify-center` from homepage `<main>` so logo (top-anchored) and content (previously center-anchored) now move together when zooming in/out in the browser.
- **Vercel auto-deploy for `dev` branch** — Vercel only watches `main` by default. `dev` branch deployments must be triggered manually via deploy hook (see `VERCEL_DEPLOYMENT.md`).
- **Vercel Deployment Configuration** — Fixed "No Next.js version detected" error by updating `vercel.json` to work with monorepo structure where Next.js app lives in `app/` subdirectory.

### Changed
- **Project Rebranding**: Renamed project from **Lexisolve** to **LexiCipher** to address intellectual property considerations and finalize branding.
- **Font Renaming**: 
    - Updated internal font metadata (Name Table) in variable font binaries (`LexiCipher-BWGT-VF.ttf`).
    - Updated font source files (`.ufo`, `.designspace`) and master paths.
- **Global Identity Update**:
    - Updated `package.json`, `capacitor.config.ts`, and Chrome Extension manifests.
    - Updated all source code references, documentation, and feature descriptions.
    - Reorganized file structure to use `lexicipher` naming conventions.
