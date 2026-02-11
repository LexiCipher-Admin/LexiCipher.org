# LexiCipher Font Architecture

## Overview

LexiCipher uses **variable fonts** to deliver personalized typography. This document explains the key concepts and how they're implemented.

---

## Variable Font Concepts

### What is a Variable Font?

A variable font is a single font file that contains multiple stylistic variations along defined **axes**. Instead of shipping separate font files for each variation (light, regular, bold, etc.), one file can produce infinite variations.

### Masters

**Masters** are the hand-designed anchor points along an axis. The font software uses these as reference points to generate intermediate values.

For LexiCipher's BWGT (Bottom Weight) axis:

| Master   | BWGT Value | Description                             |
| -------- | ---------- | --------------------------------------- |
| Master 1 | 0          | Standard stroke distribution (baseline) |
| Master 2 | 50         | Moderate bottom-heavy weighting         |
| Master 3 | 100        | Maximum bottom-heavy weighting          |

### Interpolation

**Interpolation** is the mathematical process of calculating glyph outlines at any value between masters.

```
BWGT 29 = 29% between Master 1 (0) and Master 2 (50)
BWGT 75 = 50% between Master 2 (50) and Master 3 (100)
```

The font rendering engine handles this automatically—no additional processing needed.

### Instancing

**Instancing** creates a static font file with a specific axis value "baked in."

When a user downloads their personalized font, we instance the variable font at their optimal value (e.g., BWGT 29) to produce a standard OTF file.

---

## Processing Locations

### Development Time (Your Machine)

Build the variable font once during Phase 0A:

```
Developer Machine
├── Python environment
│   └── fonttools, fontmake
├── Source files
│   ├── master-0.ufo (BWGT 0)
│   ├── master-50.ufo (BWGT 50)
│   └── master-100.ufo (BWGT 100)
├── Designspace file
│   └── LexiCipherBWGT.designspace
└── Output
    └── LexiCipherBWGT.woff2 (~300-500KB)
```

The compiled `.woff2` file is committed to the repository and deployed with the website.

### Runtime (User's Browser)

No server-side processing—everything happens client-side:

| Operation          | Technology                    | Performance  |
| ------------------ | ----------------------------- | ------------ |
| Display variations | CSS `font-variation-settings` | Instant      |
| Generate download  | opentype.js                   | ~1-2 seconds |

#### CSS for Testing

```css
/* The browser interpolates automatically */
.test-passage {
  font-family: 'LexiCipherBWGT', sans-serif;
  font-variation-settings: 'BWGT' 29;
}
```

#### JavaScript for Download

```javascript
import opentype from 'opentype.js';

async function generateCustomFont(bwgtValue) {
  const font = await opentype.load('/fonts/LexiCipherBWGT.woff2');
  // Instance the variable font at the user's optimal value
  const instanced = instanceFont(font, { BWGT: bwgtValue });
  return instanced.toArrayBuffer();
}
```

---

## File Formats

| Format   | Use Case                  | Size       |
| -------- | ------------------------- | ---------- |
| `.woff2` | Web delivery (compressed) | ~300-500KB |
| `.otf`   | User download (standard)  | ~500-800KB |
| `.ttf`   | Alternative download      | ~500-800KB |

---

## MVP Axis Range

**BWGT (Bottom Weight):** 0 to 100

| Value | Effect                       |
| ----- | ---------------------------- |
| 0     | Standard stroke distribution |
| 50    | Moderate bottom emphasis     |
| 100   | Maximum bottom emphasis      |

---

## BWGT in DOE Testing

BWGT is integrated as the 7th factor in LexiCipher's DOE screening phase.

### Design Matrix Integration

The system uses a **2^(7-3) fractional factorial design** (Resolution IV):

| Factor | Parameter      | Low (-1) | High (+1) |
| ------ | -------------- | -------- | --------- |
| A      | letterSpacing  | 0        | 0.2em     |
| B      | wordSpacing    | 0        | 0.3em     |
| C      | lineHeight     | 1.5      | 2.0       |
| D      | fontWeight     | 300      | 500       |
| E      | fontSize       | 16px     | 24px      |
| F      | paragraphWidth | 45ch     | 75ch      |
| **G**  | **BWGT**       | **0**    | **100**   |

**Generator:** G = ACD (BWGT is aliased with the ACD interaction)

### CSS Implementation

```css
/* DOE screening uses binary values */
.test-passage-bwgt-low {
  font-variation-settings: 'BWGT' 0;
}

.test-passage-bwgt-high {
  font-variation-settings: 'BWGT' 100;
}

/* Bayesian optimization uses continuous values */
.optimized-passage {
  font-variation-settings: 'BWGT' 37.5;  /* Any value 0-100 */
}
```

### Why Resolution IV?

- **16 runs** instead of 128 (full factorial) or 32 (Resolution III)
- **Clean main effects** - no aliasing with two-factor interactions
- **Aliased 2FIs** - some two-factor interactions are confounded with each other
- **Practical for users** - 16 comparisons is manageable in ~15 minutes

### Future Extension (Post-Launch)

Extended range from -100 to +200:

| Value | Effect                     |
| ----- | -------------------------- |
| -100  | Top-heavy (inverse effect) |
| 0     | Standard                   |
| +100  | Bottom-heavy (current max) |
| +200  | Extreme bottom-heavy       |

This extension requires additional masters and is documented in the project plan backlog.

---

## Related Documentation

- `lexicipher.org-project-plan.md` - Full project plan with Phase 0A details
- `app/lib/passages/CALIBRATION_GUIDE.md` - Passage calibration methodology