# John Doe - Personalized Font Optimization Project
## Custom Dyslexia Font Development Through DOE Testing

**Project Start Date:** January 10, 2026  
**Current Phase:** ⏸️ PAUSED - Migrating to Platform  
**Status:** 🔄 John Doe = "Alpha User #1" for DyslexiaFont.org MVP  
**Last Updated:** January 16, 2026

---

## 🔄 Strategy Update (January 16, 2026)

**Decision:** Rather than completing John Doe's testing separately, we're building the **DyslexiaFont.org MVP** first. John Doe will be "Alpha User #1" who tests the platform.

**Benefits:**
- John Doe tests with the same UI everyone else will use
- No divergence between pilot methodology and platform
- Single codebase, no wasted effort
- DOE design and passages from this project are reused in platform

**What's Being Reused:**
| Asset | Platform Use |
|-------|--------------|
| 5-font DOE design (Section 4) | Screening engine |
| Effect calculation formulas (Section 6) | Analysis module |
| 3rd grade passages (test_document.html) | Passage bank |
| Rating protocol (1-10, baseline=5) | UI design |

**Timeline:** ~12 days to MVP → John Doe alpha test

**See:** `../dyslexia-font-org/dyslexiafont.org-project-plan.md` → Appendix E for MVP execution plan

---

## ⚠️ PRE-IMPLEMENTATION CHECKLIST

**IMPORTANT:** Before starting any development or font modification work, run this technical verification:

### Required Tools Check
```powershell
# Run these commands in PowerShell to verify setup:
python --version          # Expected: Python 3.10+
pip show fonttools        # Expected: fonttools installed
```

### Current Environment Status (Last Checked: January 11, 2026)
| Component | Status | Version/Notes |
|-----------|--------|---------------|
| Python | ✅ Installed | 3.12.1 |
| fonttools | ✅ Installed | 4.61.1 |
| FontForge | ✅ Installed | Version 20251009 at `C:\Program Files\FontForgeBuilds\bin\fontforge.exe` |
| Base Font | ✅ Available | `font/OpenDyslexic-Regular.otf` |
| Output Dir | ✅ Writable | `font/variants/` |

### If Missing Components:
```powershell
# Install fonttools if missing:
pip install fonttools

# Install optional dependencies for advanced features:
pip install fonttools[ufo,unicode]
```

### Technical Approach for Glyph Modification
Since FontForge is not available on Windows without complex setup, we use fonttools with:
- `fontTools.pens` module for glyph outline manipulation
- `fontTools.ttLib` for font table access
- Transform matrices for scaling/positioning

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Background](#2-background)
3. [Goals & Objectives](#3-goals--objectives)
4. [Phase 1: Screening Design](#4-phase-1-screening-design)
5. [Testing Protocol](#5-testing-protocol)
6. [Analysis Methodology](#6-analysis-methodology)
7. [Results & Findings](#7-results--findings)
8. [Phase 2 Planning](#8-phase-2-planning)
9. [Final Deliverables](#9-final-deliverables)
10. [Project Files](#10-project-files)

---

## 1. Project Overview

### Purpose
Create a personalized font optimized specifically for John Doe's reading needs by systematically testing typographic parameters using Design of Experiments (DOE) methodology.

### Why Personalization Matters
Research shows that:
- Individual variation in dyslexia is significant
- What helps one person may not help another
- Population-average fonts like OpenDyslexic work well for some, but not optimally for all
- Personalized optimization can yield 20-50% improvement beyond generic solutions

### Project Approach
1. **Baseline**: OpenDyslexic font (already shown to help John)
2. **Method**: Systematic DOE testing of key parameters
3. **Analysis**: Statistical identification of significant factors
4. **Output**: Custom font file with John's optimal settings

---

## 2. Background

### About John Doe
*(Fill in relevant details)*

| Attribute | Value |
|-----------|-------|
| Age | ___ |
| Grade Level | ___ |
| Dyslexia Diagnosis | Yes / Suspected / No formal diagnosis |
| Current Accommodations | ___ |
| Current Font Used | OpenDyslexic |
| Reading Level | 3rd Grade (for testing purposes) |
| Preferred Medium | Print / Screen / Both |

### Current Status with OpenDyslexic
- OpenDyslexic has shown **improvement** for John compared to standard fonts
- Baseline readability score: **5** (on 1-10 scale)
- Goal: Find modifications that could improve beyond the baseline

### Known Challenges
*(Note specific reading difficulties John experiences)*
- [ ] Letter reversal (b/d, p/q)
- [ ] Word skipping
- [ ] Line tracking issues
- [ ] Visual crowding
- [ ] Fatigue during reading
- [ ] Other: ___

---

## 3. Goals & Objectives

### Primary Goal
Identify which typographic parameters significantly impact John's reading comfort and optimize them to create a personalized font.

### Specific Objectives

| Objective | Success Metric |
|-----------|----------------|
| Identify significant factors | At least 1-2 parameters show p < 0.1 |
| Quantify improvement | Score improvement of ≥1.5 points over baseline |
| Create custom font | Downloadable OTF file with optimized settings |
| Document recommendations | Clear guidelines for font size, line length, etc. |

### Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Screening | 1 session (~20 min) | 🔲 Ready |
| Analysis | 1 day | 🔲 Pending |
| Phase 2: Optimization | 1 session (~25 min) | 🔲 Planned |
| Phase 3: Confirmation | 1 session (~10 min) | 🔲 Planned |
| Final Font Creation | 1 day | 🔲 Planned |

---

## 4. Phase 1: Screening Design

### Parameters Under Test

Based on strong scientific evidence, we are testing these parameters:

| Parameter | Low Level | Baseline | High Level | Rationale |
|-----------|-----------|----------|------------|-----------|
| **Letter Spacing** | -10% | 0% | +25% | Zorzi et al.: 20% reading improvement |
| **Word Spacing** | -15% | 0% | +40% | Reduces visual crowding |
| **Glyph Weight** | Standard | Standard | Heavy | Tests stroke thickness preference |

> **Note on Deferred Parameters:** 
> - **Line Height** - Replaced with Glyph Weight in Phase 1. Can be adjusted via CSS/document settings without font modification. Deferred to Phase 2.
> - **Font Size** - Another Tier 1 parameter (Rello 2013: optimal 14-18pt). Can be tested via document settings without font modification. Deferred to Phase 2.
> 
> **Rationale:** Glyph Weight requires baked-in font changes, while Line Height and Font Size can be easily adjusted in Word/CSS. Testing Glyph Weight in Phase 1 captures font-specific effects.

### DOE Design: 5-Font Factorial

| Font # | Sample | Letter Space | Word Space | Glyph Weight | Purpose |
|--------|--------|--------------|------------|--------------|---------|
| 1 | B | 0% | 0% | Standard | **BASELINE (Control)** |
| 2 | D | +25% | 0% | Standard | Test letter spacing alone |
| 3 | A | 0% | +40% | Standard | Test word spacing alone |
| 4 | E | 0% | 0% | Heavy | Test glyph weight alone |
| 5 | C | +25% | +40% | Heavy | Test combination (interaction) |

### Randomization
To prevent order bias, fonts are presented in randomized order:
- **Sample A** = Font 3 (Word Spacing)
- **Sample B** = Font 1 (Baseline/Control) ← Reference point
- **Sample C** = Font 5 (Combination)
- **Sample D** = Font 2 (Letter Spacing)
- **Sample E** = Font 4 (Glyph Weight)

### Font Files Created

| File | Parameters |
|------|------------|
| `ODx-Font1_Control.otf` | Baseline OpenDyslexic (Standard weight) |
| `ODx-Font2_LetterSpace.otf` | +25% letter spacing (Standard weight) |
| `ODx-Font3_WordSpace.otf` | +40% word spacing (Standard weight) |
| `ODx-Font4_GlyphWeight.otf` | Heavy weight (Bold-based) |
| `ODx-Font5_Combination.otf` | +25% letter, +40% word, Heavy weight |

### Font Files Location

**Standard weight variants:** `font/variants/`
- `ODx-Font1_Control.otf`
- `ODx-Font2_LetterSpace.otf`
- `ODx-Font3_WordSpace.otf`

**Heavy weight variants:** `font/variants/weighted/`
- `ODx-Weight-Standard.otf` - Base for control
- `ODx-Weight-Heavy.otf` - Base for glyph weight testing

---

## 5. Testing Protocol

### Pre-Test Setup
1. **Environment**: Quiet, well-lit room
2. **Print Document**: `test_document.html` (print all pages)
3. **Materials**: Printed pages, pen/pencil for marking
4. **Timing**: Not timed, but note start/end times

### Instructions for John
1. Read the instructions on the cover page
2. Read Sample B first (this is the baseline = score of 5)
3. Read each subsequent sample (A, C, D, E)
4. After each sample, rate readability on 1-10 scale:
   - **1-2**: Very difficult, causes strain
   - **3-4**: Harder than baseline
   - **5**: Same as baseline (Sample B)
   - **6-7**: Easier than baseline
   - **8-9**: Significantly easier
   - **10**: Ideal, effortless
5. Note any specific observations
6. Complete the summary page

### Important Notes
- No time pressure - read at comfortable pace
- Take breaks if needed
- Honest responses are most valuable
- There are no "right" answers

### Data to Collect

| Sample | Score (1-10) | Notes |
|--------|--------------|-------|
| A | ___ | ___ |
| B | **5** (fixed) | Baseline reference |
| C | ___ | ___ |
| D | ___ | ___ |
| E | ___ | ___ |

---

## 6. Analysis Methodology

### Main Effect Calculations

After testing, calculate the effect of each parameter:

**Letter Spacing Effect:**
```
Letter_Effect = Average(D, C) - Average(A, B, E)
             = (Score_D + Score_C) / 2 - (Score_A + Score_B + Score_E) / 3
```

**Word Spacing Effect:**
```
Word_Effect = Average(A, C) - Average(B, D, E)
           = (Score_A + Score_C) / 2 - (Score_B + Score_D + Score_E) / 3
```

**Glyph Weight Effect:**
```
Weight_Effect = Average(C, E) - Average(A, B, D)
             = (Score_C + Score_E) / 2 - (Score_A + Score_B + Score_D) / 3
```

### Interpreting Effects

| Effect Size | Interpretation | Action |
|-------------|----------------|--------|
| > +2.0 | Strong positive | Include in final font, optimize further in Phase 2 |
| +1.0 to +2.0 | Moderate positive | Include in final font |
| -1.0 to +1.0 | Minimal/None | May not matter for John |
| -1.0 to -2.0 | Moderate negative | Avoid this modification |
| < -2.0 | Strong negative | Definitely avoid |

### Interaction Check

The combination font (Sample C) tests whether parameters work better together:

```
Expected_C = Baseline + Letter_Effect + Word_Effect + Weight_Effect
Actual_C = Score_C

Interaction = Actual_C - Expected_C
```

| Interaction | Interpretation |
|-------------|----------------|
| Positive (Actual > Expected) | Synergy - parameters work better together |
| Near zero | Additive - effects are independent |
| Negative (Actual < Expected) | Antagonism - parameters interfere with each other |

---

## 7. Results & Findings

### Phase 1 Results

**Testing Date:** January 11, 2026  
**Testing Method:** Printed HTML document  
**Status:** ⚠️ INVALID - Requires Re-test On-Screen

> **⚠️ INVALIDATION NOTICE (January 12, 2026):**
> The original Phase 1 testing was conducted using printed HTML pages. While the HTML displayed correctly in the browser (each font sample visually different), when printed, all samples looked identical except for the bold weight. The browser print pipeline does not preserve custom `@font-face` fonts reliably.
>
> **Action Required:** Re-test Phase 1 on-screen using `test_document.html` viewed in browser (not printed). This aligns with research (Schneps 2013) showing screens are effective for dyslexia reading.

### Phase 1 Re-test Protocol (On-Screen)

1. **Open `test_document.html`** in a web browser (Chrome/Firefox/Edge)
2. **Verify fonts rendered correctly** - samples should look visibly different
3. **Read Sample B first** (baseline = score of 5)
4. **Read each subsequent sample** (A, C, D, E) directly on screen
5. **Rate each sample** on 1-10 scale relative to baseline
6. **Record scores** below in Phase 1 Re-test Results section

### Phase 1 Re-test Results (On-Screen)

**Testing Date:** ___________  
**Testing Method:** On-screen HTML in browser  
**Status:** 🔲 PENDING

| Sample | Font | Score |
|--------|------|-------|
| A | Word Spacing +40% | ___ |
| B | Baseline | **5** |
| C | Combination | ___ |
| D | Letter Spacing +25% | ___ |
| E | Glyph Weight (Heavy) | ___ |

*(Calculate effects using formulas in Section 6 after re-test is complete)*

---

### Phase 1 Original Results (INVALID - Print Test)

**Testing Date:** January 11, 2026  
**Testing Method:** Printed HTML document (INVALID - fonts didn't print correctly)  
**Status:** ❌ INVALID

**Raw Scores:**
| Sample | Font | Score |
|--------|------|-------|
| A | Word Spacing +40% | 5 |
| B | Baseline | 5 |
| C | Combination | 5 |
| D | Letter Spacing +25% | 5 |
| E | Glyph Weight (Heavy) | 4 |

**Calculated Effects:**

*Letter Spacing Effect:*
```
Letter_Effect = (D + C) / 2 - (A + B + E) / 3
             = (5 + 5) / 2 - (5 + 5 + 4) / 3
             = 5.0 - 4.67
             = +0.33 (minimal)
```

*Word Spacing Effect:*
```
Word_Effect = (A + C) / 2 - (B + D + E) / 3
           = (5 + 5) / 2 - (5 + 5 + 4) / 3
           = 5.0 - 4.67
           = +0.33 (minimal)
```

*Glyph Weight Effect:*
```
Weight_Effect = (C + E) / 2 - (A + B + D) / 3
             = (5 + 4) / 2 - (5 + 5 + 5) / 3
             = 4.5 - 5.0
             = -0.5 (slight negative)
```

| Parameter | Effect | Significant? |
|-----------|--------|--------------|
| Letter Spacing | +0.33 | ❌ No (within noise) |
| Word Spacing | +0.33 | ❌ No (within noise) |
| Glyph Weight | -0.5 | ⚠️ Borderline negative |

**Interaction Effect:**
- Expected Score C = 5 + 0.33 + 0.33 + (-0.5) = 5.16
- Actual Score C = 5
- Interaction = -0.16 (essentially zero - additive, no synergy/antagonism)

**Key Findings:**
1. **Spacing modifications (letter +25%, word +40%) showed NO significant improvement** - All spacing variants scored same as baseline (5)
2. **Heavy glyph weight was slightly worse (4 vs 5)** - OpenDyslexic Bold base may not suit John
3. **No interaction effects detected** - Parameters are independent for John
4. **Phase 1 parameters (spacing, weight) don't help John** - Need to explore different parameters

**Interpretation:**
The Phase 1 results suggest that **spacing and stroke weight are NOT the key factors** for John's reading comfort. This is valuable information - it means:
- Standard OpenDyslexic spacing is already appropriate for John
- Making text heavier (bolder) slightly harms readability
- We need to explore **different parameters** in Phase 1a: glyph shape modifications

### Research Context
This finding aligns with research showing:
- Individual variation is significant - what helps population averages may not help individuals
- Spacing helps SOME dyslexic readers (Zorzi 2012) but not ALL
- Different dyslexia subtypes respond to different interventions

---

## 8. Phase 1a: Glyph Modification Screening

### Why Phase 1a?

Phase 1 tested spacing and weight parameters - the "Tier 1" evidence-based factors. Results showed these don't significantly help John. Before moving to Phase 2 optimization, we expand screening to test **glyph shape modifications** - parameters that require FontForge and modify the actual letter outlines.

### Phase 1a Design: 7-Variant Extreme Screening

Based on analysis of 6 major dyslexia fonts (OpenDyslexic, Dyslexie, Lexie Readable, Sylexiad, Read Regular, Comic Sans), these glyph modifications are common across fonts:

| Font # | Sample | Key Feature | Extreme Level | Rationale |
|--------|--------|-------------|---------------|-----------|
| 1 | F | **Baseline** | OpenDyslexic unchanged | Control |
| 2 | G | **Extreme x-Height** | +40% taller lowercase | Used by Read Regular, may improve recognition |
| 3 | H | **Extreme Counter Size** | +40% larger "holes" in letters | Reduces visual crowding |
| 4 | I | **Extreme Bottom-Heavy** | +50% weight at bottom | OpenDyslexic's signature feature - test more extreme |
| 5 | J | **b/d Asymmetric Serifs** | Add small markers to distinguish | Most commonly confused letter pair |
| 6 | K | **Variable Stroke** | Thick/thin like calligraphy | Used by Sylexiad font |
| 7 | L | **Combination** | x-height + counter + b/d distinction | Test interaction effects |

### Implementation Requirements

| Requirement | Status | Notes |
|-------------|--------|-------|
| FontForge | ✅ Available | `C:\Program Files\FontForgeBuilds\bin\fontforge.exe` |
| Python scripting | ✅ Available | FontForge has Python interface |
| Base font | ✅ Available | `OpenDyslexic-Regular.otf` |

### Technical Approach

FontForge Python scripting will:
1. Load OpenDyslexic-Regular.otf
2. For x-Height: Scale all lowercase glyphs vertically
3. For Counter Size: Scale inner contours of letters with holes
4. For Bottom-Heavy: Apply gradient transform (scale bottom more than top)
5. For b/d Distinction: Add small serif path to 'b' only
6. For Variable Stroke: Apply expansion/contraction to strokes
7. Export modified font files

### Files to Create

| File | Purpose |
|------|---------|
| `create_glyph_variants_phase1a.py` | FontForge script to generate 7 font variants |
| `test_document_phase1a.html` | Test document with samples F-L |
| Font variants in `font/variants/phase1a/` | 7 new font files |

### Testing Protocol (Same as Phase 1)

- Sample F = Baseline (OpenDyslexic unchanged) → Reference score of **5**
- Samples G-L rated relative to F
- Print Word documents with system-installed fonts
- Record scores and calculate effects

---

## 8b. Phase 2 Planning

### Based on Phase 1 + 1a Results

*(To be developed after Phase 1a testing)*

**Significant Factors to Optimize (from Phase 1):**
- [ ] Letter Spacing (if significant in Phase 1)
- [ ] Word Spacing (if significant in Phase 1)
- [ ] Glyph Weight (if significant in Phase 1)

**Deferred Tier 1 Parameters (to test in Phase 2):**
- [ ] **Font Size** - Test 12pt, 16pt, 20pt (Rello 2013: optimal 14-18pt)
- [ ] **Line Height** - Test 100%, 150%, 200% (Schneps 2013: 27% improvement)

> **Testing Method for Deferred Parameters:** These can be tested via document settings (no font modification needed). Simply create Word documents with different font sizes and line spacing settings.

**Proposed Phase 2 Design:**

If 2 factors are significant, use L9 Taguchi array:

| Run | Factor 1 | Factor 2 |
|-----|----------|----------|
| 1 | Low | Low |
| 2 | Low | Medium |
| 3 | Low | High |
| 4 | Medium | Low |
| 5 | Medium | Medium |
| 6 | Medium | High |
| 7 | High | Low |
| 8 | High | Medium |
| 9 | High | High |

**Level Definitions (to be set based on Phase 1):**

| Factor | Low | Medium | High |
|--------|-----|--------|------|
| ??? | ??? | ??? | ??? |

---

## 9. Final Deliverables

### For John Doe

1. **Custom Font File** (`JohnDoe-Optimized.otf`)
   - All optimal parameters baked into the font
   - Ready for installation on Windows/Mac/Linux

2. **Installation Guide**
   - Step-by-step instructions for installing the font
   - How to set as default in common applications

3. **Document Settings Recommendations**
   - Optimal font size
   - Line length (characters per line)
   - Margin settings
   - Page background color (if relevant)

4. **Personal Readability Profile**
   - Summary of which parameters help John most
   - Explanation in plain language
   - Tips for various reading contexts

### File Formats Provided
- OTF (OpenType) - Desktop installation
- TTF (TrueType) - Alternative desktop format
- WOFF/WOFF2 - Web use (if John uses web applications)

---

## 10. Project Files

### Current Directory Structure

```
john-doe-font/                           # This project folder
├── JOHN_DOE_FONT_PROJECT.md             # This document
├── RANDOMIZATION_KEY.md                 # Phase 1 key and analysis formulas
├── test_document.html                   # Printable test document for Phase 1
├── create_font_variants.py              # Script for spacing variants
├── create_weighted_font_variants.py     # Script for glyph weight variants
├── create_final_doe_fonts.py            # Script for final DOE fonts
├── opendyslexic-0.92.zip                # Original OpenDyslexic download
│
└── font/
    ├── OpenDyslexic-Regular.otf         # Original font (Standard weight base)
    ├── OpenDyslexic-Bold.otf            # Original Bold (Heavy weight base)
    ├── OpenDyslexic-Italic.otf
    ├── OpenDyslexic-BoldItalic.otf
    │
    └── variants/
        ├── OpenDyslexic-Original.otf    # Unmodified copy
        ├── ODx-Font1_Control.otf        # Baseline (Standard weight)
        ├── ODx-Font2_LetterSpace.otf    # Letter spacing +25%
        ├── ODx-Font3_WordSpace.otf      # Word spacing +40%
        ├── ODx-Font4_GlyphWeight.otf    # Heavy weight ✅
        ├── ODx-Font5_Combination.otf    # All combined ✅
        ├── font test doc files/         # Word document samples
        │
        └── weighted/
            ├── ODx-Weight-Standard.otf  # Standard weight base
            ├── ODx-Weight-Heavy.otf     # Heavy weight base
            └── CSS_WEIGHT_TESTING_GUIDE.md
```

### How to Run Phase 1 Test

**⚠️ Important:** The HTML test document (`test_document.html`) has browser font rendering issues. Use the Word document approach instead:

1. **Install fonts** from `font/variants/` and `font/variants/weighted/` on your system (right-click → Install)
2. **Create Word documents** for each sample (A-E) using the correct font:
   - Sample A: `ODx-Font3_WordSpace.otf` (Word Spacing +40%)
   - Sample B: `ODx-Font1_Control.otf` (Baseline - Standard weight)
   - Sample C: `ODx-Font5_Combination.otf` (Letter +25%, Word +40%, Heavy weight)
   - Sample D: `ODx-Font2_LetterSpace.otf` (Letter Spacing +25%)
   - Sample E: `ODx-Font4_GlyphWeight.otf` (Heavy glyph weight)
3. **Print the Word documents** (recommended) or test on screen
4. Have John read and rate each sample
5. Record scores in Section 7 of this document
6. Calculate effects using formulas in Section 6
7. Determine which parameters are significant
8. Plan Phase 2 based on findings

> **All font variants are now created.** If you need to regenerate them, run:
> 1. `python create_font_variants.py` (spacing variants)
> 2. `python create_weighted_font_variants.py` (weight base files)
> 3. `python create_final_doe_fonts.py` (Font4 and Font5)

---

## Appendix A: Scientific Basis

### Research Supporting Our Approach

| Study | Finding | Application to John |
|-------|---------|---------------------|
| Zorzi et al. (2012) | +2.5 extra spacing improved reading by 20% | Testing letter spacing |
| Schneps et al. (2013) | Larger line spacing improved reading by 27% | Testing line height |
| Rello (2013) | Word spacing helps visual segmentation | Testing word spacing |
| Multiple studies | Individual variation is significant | Why we personalize |

### Why This Works

Traditional dyslexia fonts assume:
> "One design helps everyone equally"

But research shows:
> "Individual differences are large... what works for one person may not work for another."

Our approach:
> "Test systematically, measure objectively, optimize individually"

---

## Appendix B: Troubleshooting

### Common Issues

**Q: The fonts look the same in the test document**
- A: Make sure to load the page in a browser that supports local fonts, or print directly

**Q: John can't perceive differences between samples**
- A: This is valid data! It may mean these parameters don't strongly affect John, or the differences need to be larger

**Q: All samples score the same as baseline**
- A: Consider testing larger parameter ranges in Phase 2, or different parameters altogether

**Q: One sample scored much worse than others**
- A: This is valuable! It tells us what to avoid in the final font

---

## Appendix C: Lessons Learned

### January 12, 2026 - Phase 1 Testing Invalid

**Issue: HTML Print Rendering Failure**
- **Problem:** HTML test document displayed correctly in browser (different font samples visually distinct), but when printed, all samples looked identical except for the bold weight.
- **Cause:** Browser print pipeline does not preserve custom `@font-face` fonts reliably. Fonts are substituted during the print rendering process.
- **Solution:** Re-test Phase 1 on-screen using browser instead of print. Research (Schneps 2013) confirms screens are effective for dyslexia reading.
- **Future Improvement:** For print testing, use Word documents with system-installed fonts. For screen testing, HTML is acceptable.
- **Key Insight:** Screen-based testing is valid for dyslexia font optimization (Schneps et al. 2013: "E-Readers Are More Effective than Paper for some with dyslexia").

---

### January 10, 2026 - Phase 1 Preparation

**Issue: HTML Font Rendering Inconsistency**
- **Problem:** Font samples appeared virtually identical in `test_document.html` when viewed in browser
- **Cause:** Browser `@font-face` loading can be inconsistent; CSS may override font-level spacing settings
- **Solution:** Use Word documents with system-installed fonts for reliable rendering
- **Future Improvement:** For DyslexiaFont.org platform, use CSS-based parameter application (letter-spacing, word-spacing properties) during testing, then generate custom font only for download

**Infrastructure Check Best Practice**
- **Problem:** Python installation issues caused delays during development
- **Solution:** Verify required tools (Python, pip, fonttools) exist BEFORE starting implementation
- **Future Improvement:** Always run infrastructure checks in Plan mode before switching to Act mode

**Documentation Value**
- Creating comprehensive project plans (README.md, PROJECT_PLAN.md, JOHN_DOE_FONT_PROJECT.md) helps:
  - Preserve context across conversation sessions
  - Provide clear reference for testing protocols
  - Enable easy handoff or review

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 10, 2026 | Initial document creation |
| | | Phase 1 fonts and test document created |
| 1.1 | Jan 10, 2026 | Updated testing protocol (Word docs instead of HTML) |
| | | Added Appendix C: Lessons Learned |
| | | Added status badges and last updated date |
| 1.2 | Jan 11, 2026 | **Added Glyph Weight as DOE parameter** (replaced Line Height) |
| | | Added Pre-Implementation Checklist section |
| | | Created glyph weight variants (Standard/Heavy) |
| | | Created `create_weighted_font_variants.py` script |
| | | Created `create_final_doe_fonts.py` script |
| | | Generated Font4 (Heavy) and Font5 (Combination) |
| | | Updated all formulas and analysis methodology |
| | | Status changed to 🟢 Ready for Testing |
| 1.3 | Jan 11, 2026 | Documented deferred Tier 1 parameters (Font Size, Line Height) |
| | | Added Phase 2 planning for Font Size (12/16/20pt) and Line Height (100/150/200%) |
| | | Added testing method note for document-based parameter testing |
| 1.4 | Jan 11, 2026 | **Phase 1 testing COMPLETED** |
| | | Recorded test results: A=5, B=5, C=5, D=5, E=4 |
| | | Calculated main effects and interactions |
| | | Key finding: Spacing/weight don't help John; need glyph modifications |
| | | Updated FontForge status to ✅ Installed (v20251009) |
| | | **Added Phase 1a plan** (7-variant glyph modification screening) |
| | | Updated status to "Phase 1 COMPLETE → Planning Phase 1a" |
| 1.5 | Jan 12, 2026 | **Phase 1 print results INVALIDATED** |
| | | HTML displayed correctly in browser but printed identically |
| | | Added Phase 1 Re-test Protocol (On-Screen) section |
| | | Added lessons learned for HTML Print Rendering Failure |
| | | Status changed to "⚠️ Phase 1 REDO REQUIRED" |
| | | Screen testing validated by Schneps 2013 research |

---

*This document will be updated as the project progresses through each phase.*
