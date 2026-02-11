# Font Design Studies: Analysis of Existing Dyslexia Fonts

This document analyzes existing dyslexia fonts, their design principles, research evaluations, and what we can learn for parameter selection.

---

## Overview of Major Dyslexia Fonts

### 1. OpenDyslexic

**Designer:** Abelardo Gonzalez (2011)

**License:** Open source (SIL Open Font License)

**Website:** opendyslexic.org

**Design Features:**
| Feature | Implementation | Rationale |
|---------|---------------|-----------|
| Bottom-heavy weighting | Heavy stroke at base of letters | "Gravity" anchors letters to baseline |
| Unique letterforms | b/d/p/q have distinct shapes | Reduce mirror-image confusion |
| Increased x-height | Slightly taller lowercase | Improve letter recognition |
| Open counters | Larger interior spaces | Reduce visual crowding |
| Built-in spacing | Wider letter/word spacing | Reduce crowding between letters |

**Research Evaluation:**
- Wery & Diliberto (2017): No significant group-level benefit
- Rello & Baeza-Yates (2013): Some users reported preference
- Mixed results - helps some individuals, not others

**What We Learn:**
- Bottom-weighting is distinctive but unproven
- Spacing may be the active ingredient (per Marinus 2016)
- Individual variation in response is substantial

---

### 2. Dyslexie

**Designer:** Christian Boer (2008)

**License:** Commercial (€79-299)

**Website:** dyslexiefont.com

**Design Features:**
| Feature | Implementation | Rationale |
|---------|---------------|-----------|
| Heavy baseline | Thick bottom strokes | Anchor letters visually |
| Varied ascenders | Different heights per letter | Increase letter distinctiveness |
| Tilted letters | Slight baseline variation | Prevent visual "floating" |
| Unique tails | Distinctive serifs/tails | Differentiate similar letters |
| Increased spacing | Built-in letter/word spacing | Reduce crowding |
| Bold punctuation | Heavier periods, commas | Improve sentence parsing |

**Research Evaluation:**
- Kuster et al. (2018): No significant benefit in controlled study
- Some users report strong preference
- More "designed" look than OpenDyslexic

**What We Learn:**
- Commercial fonts invest heavily in design but not proven better
- Multiple differentiation strategies combined
- User preference doesn't always correlate with performance

---

### 3. Lexie Readable

**Designer:** Keith Bates (2004)

**License:** Free for personal use

**Design Features:**
| Feature | Implementation | Rationale |
|---------|---------------|-----------|
| Comic Sans-inspired | Informal, handwritten style | Based on anecdotal Comic Sans benefits |
| Distinct letterforms | Each letter clearly different | Reduce confusion |
| Open counters | Larger interior spaces | Improve letter recognition |
| No bottom-weighting | Uniform stroke weight | Cleaner aesthetic |

**Research Evaluation:**
- Limited formal research
- Based on Comic Sans preferences reported by dyslexic users

**What We Learn:**
- "Informal" style may help some readers
- Not all dyslexia fonts use bottom-weighting
- Alternative design philosophy exists

---

### 4. Sylexiad

**Designer:** Robert Hillier (2006-2008)

**License:** Free (academic origin)

**Design Features:**
| Feature | Implementation | Rationale |
|---------|---------------|-----------|
| Two versions | Serif and Sans-serif | Test which works better |
| Handwritten inspiration | Mimics pen strokes | Natural reading feel |
| Variable stroke | Thick/thin variation | Like calligraphy |
| Clear letter shapes | Emphasis on distinctiveness | Reduce confusion |

**Research Evaluation:**
- Academic origin with some controlled testing
- Limited to UK studies

**What We Learn:**
- Serif vs sans-serif both viable approaches
- Handwritten style is legitimate design direction
- Variable stroke is a testable parameter

---

### 5. Read Regular

**Designer:** Natascha Frensch (2003)

**License:** Free

**Design Features:**
| Feature | Implementation | Rationale |
|---------|---------------|-----------|
| Large x-height | Tall lowercase letters | Core design principle |
| Open counters | Very large interior spaces | Maximize letter clarity |
| Sans-serif | Clean, simple shapes | Reduce visual complexity |
| No special weighting | Uniform strokes | Clean aesthetic |

**What We Learn:**
- x-height and counters can be primary focus
- "Clean" approach alternative to "weighted" approach

---

### 6. Comic Sans (Microsoft)

**Designer:** Vincent Connare (1994)

**License:** Microsoft (widely available)

**Note:** Not designed for dyslexia but frequently cited by dyslexic users

**Design Features:**
| Feature | Implementation | Rationale |
|---------|---------------|-----------|
| Informal style | Handwritten/comic appearance | Originally for comic speech bubbles |
| Unique letterforms | Every letter distinct | No mirror-image pairs |
| Asymmetric shapes | a, g, b, d all different | Natural distinctiveness |
| Variable width | Different letter widths | Creates natural rhythm |

**Research Evaluation:**
- British Dyslexia Association acknowledges user preferences
- No controlled studies proving superiority
- Widely despised by designers but loved by some dyslexics

**What We Learn:**
- User preferences matter even without "scientific" design
- Distinctiveness can emerge naturally (not just through heavy-handed design)
- "Comic" aesthetic acceptable for accessibility purposes

---

## Design Feature Analysis: Commonalities & Differences

### Features Used by MOST Dyslexia Fonts (High Confidence)

| Feature | Fonts Using | Evidence Level | Platform Priority |
|---------|-------------|----------------|-------------------|
| Increased letter spacing | ALL | Strong | ⭐⭐⭐⭐⭐ Tier 1 |
| Increased word spacing | ALL | Strong | ⭐⭐⭐⭐⭐ Tier 1 |
| Unique b/d/p/q shapes | ALL | Moderate | ⭐⭐⭐⭐ Test |
| Large/open counters | 5/6 | Moderate | ⭐⭐⭐⭐ Test |
| Large x-height | 4/6 | Moderate | ⭐⭐⭐⭐ Test |

### Features Used by SOME Fonts (Variable Approaches)

| Feature | Fonts Using | Evidence Level | Platform Priority |
|---------|-------------|----------------|-------------------|
| Bottom-heavy weighting | 2/6 | Weak | ⭐⭐⭐ Test extreme |
| Variable stroke (thick/thin) | 2/6 | Theoretical | ⭐⭐⭐ Test |
| Tilted/slanted elements | 1/6 | Theoretical | ⭐⭐ Future |
| Bold punctuation | 1/6 | None | ⭐ Future |
| Serif elements | 1/6 (plus hybrid) | Mixed | ⭐⭐ Future |

### Features NOT Typically Modified (Research Gap)

| Feature | Current State | Our Opportunity |
|---------|---------------|-----------------|
| Color differentiation | Not in fonts | Test with CSS |
| Ascender/descender ratio | Fixed per font | Test with FontForge |
| Letter width proportions | Fixed | Test extreme variations |
| Stroke uniformity | Either uniform or variable | Test full range |

---

## Key Insights for Platform Design

### 1. No "Winner" in Font Wars
Every dyslexia font has been shown to have limited group-level benefits. This supports our personalization thesis.

### 2. Spacing is Likely Key
Research (Marinus 2016) suggests spacing, not unique shapes, drives most benefits. But individuals may still respond to shape changes.

### 3. Multiple Design Philosophies Exist
- **Weighted approach:** OpenDyslexic, Dyslexie (bottom-heavy)
- **Clean approach:** Read Regular, Lexie Readable (uniform strokes)
- **Informal approach:** Sylexiad, Comic Sans (handwritten style)

### 4. Untested Parameters Exist
Many design decisions are made without evidence. Our platform can systematically test parameters never compared before.

---

## Citations for This Analysis

Boer, C. (2016). Dyslexie font. Retrieved from https://www.dyslexiefont.com

Gonzalez, A. (2011). OpenDyslexic. Retrieved from https://opendyslexic.org

Hillier, R. (2008). Sylexiad: A typeface for the adult dyslexic reader. Journal of Writing in Creative Practice, 1(3), 275-291.

Kuster, S. M., van Weerdenburg, M., Gompel, M., & Bosman, A. M. (2018). Dyslexie font does not benefit reading in children with or without dyslexia. Annals of Dyslexia, 68(1), 25-42.

Marinus, E., Mostard, M., Segers, E., Schuber, T. M., Madelaine, A., & Wheldall, K. (2016). A special font for people with dyslexia: Does it work and, if so, why? Dyslexia, 22(3), 233-244.

Rello, L., & Baeza-Yates, R. (2013). Good fonts for dyslexia. Proceedings of ASSETS '13.

Wery, J. J., & Diliberto, J. A. (2017). The effect of a specialized dyslexia font, OpenDyslexic, on reading rate and accuracy. Annals of Dyslexia, 67(2), 114-127.

---

*Last Updated: January 11, 2026*
