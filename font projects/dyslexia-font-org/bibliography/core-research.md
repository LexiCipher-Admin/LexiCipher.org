# Core Research: Typography and Dyslexia

This document contains foundational research that informs the DyslexiaFont.org platform design.

---

## 1. Letter Spacing Studies

### Zorzi, M., Barbiero, C., Facoetti, A., Lonciari, I., Carrozzi, M., Montico, M., ... & Ziegler, J. C. (2012)

**Title:** Extra-large letter spacing improves reading in dyslexia

**Publication:** Proceedings of the National Academy of Sciences (PNAS), 109(28), 11455-11459

**DOI:** 10.1073/pnas.1205566109

**Key Findings:**
- Extra-large letter spacing (+2.5 standard spacing) improved reading performance in dyslexic children
- Reading speed improved without accuracy decrease
- Effect observed in both Italian and French samples
- Average improvement: ~20% in reading speed

**How We Use It:**
- **Justifies letter spacing as Tier 1 parameter** - strongest evidence base
- **Informs our test range:** We test from -10% to +40% letter spacing
- **Supports "more extreme" testing approach** - the study used very large spacing (+150% beyond default)

**Limitations:**
- Group-level study - individual responses varied
- Did not test intermediate values (only baseline vs. extra-large)
- Limited to children (ages 8-14)

**Quote for Citation:**
> "The present findings open up the possibility that a simple manipulation of letter spacing may directly help dyslexic children to read better."

---

### Perea, M., Panadero, V., Moret-Tatay, C., & Gómez, P. (2012)

**Title:** The effects of inter-letter spacing in visual-word recognition: Evidence with young normal readers and developmental dyslexics

**Publication:** Learning and Instruction, 22(6), 420-430

**DOI:** 10.1016/j.learninstruc.2012.04.001

**Key Findings:**
- Increased letter spacing benefited dyslexic readers in lexical decision tasks
- Benefits were more pronounced for dyslexic readers than typical readers
- Supports "crowding reduction" hypothesis

**How We Use It:**
- **Cross-validates Zorzi findings** in different experimental paradigm
- **Supports mechanism:** Letter spacing helps by reducing visual crowding

**Limitations:**
- Laboratory task (lexical decision) rather than naturalistic reading
- Single spacing increment tested

---

## 2. Line Spacing / Line Height Studies

### Schneps, M. H., Thomson, J. M., Chen, C., Sonnert, G., & Pomplun, M. (2013)

**Title:** E-readers are more effective than paper for some with dyslexia

**Publication:** PLOS ONE, 8(9), e75634

**DOI:** 10.1371/journal.pone.0075634

**Key Findings:**
- E-readers with short lines (1/3 screen width) improved reading for dyslexic participants
- Line length and line spacing both contributed to improvements
- ~27% improvement in reading speed observed
- Screen-based reading was MORE effective than paper for many participants

**How We Use It:**
- **Justifies line height as Tier 1 parameter**
- **Supports screen-based testing** - no need for print-only approach
- **Informs line height range:** We test 100% to 200% line height

**Limitations:**
- Conflated line length with line spacing (both changed together)
- Used specific e-reader format - may not generalize to all screens

**Quote for Citation:**
> "For some people with dyslexia, reading on paper may be particularly challenging, whereas they may find it easier to read on devices."

---

## 3. Visual Crowding Research (Theoretical Foundation)

### Martelli, M., Di Filippo, G., Spinelli, D., & Zoccolotti, P. (2009)

**Title:** Crowding, reading, and developmental dyslexia

**Publication:** Journal of Vision, 9(4), 14

**DOI:** 10.1167/9.4.14

**Key Findings:**
- Dyslexic readers show larger "crowding" effects than typical readers
- Letters are harder to identify when flanked by other letters
- Crowding effects extend over larger distances in dyslexic vision

**How We Use It:**
- **Theoretical basis for spacing interventions**
- **Explains WHY letter/word spacing helps** - reduces crowding interference
- **Supports counter size modifications** - larger letter interiors may reduce internal crowding

**Limitations:**
- Mechanistic study - doesn't directly test reading interventions
- Lab-based visual tasks

---

### Bouma, H. (1970)

**Title:** Interaction effects in parafoveal letter recognition

**Publication:** Nature, 226(5241), 177-178

**DOI:** 10.1038/226177a0

**Key Findings:**
- Classic paper establishing "lateral masking" phenomenon
- Adjacent letters interfere with each other's recognition
- Effect is stronger in peripheral vision

**How We Use It:**
- **Foundational citation** for crowding-based interventions
- **Historical context** for platform methodology

**Limitations:**
- Old study (1970) - methodology predates modern dyslexia research
- Did not specifically study dyslexic populations

---

## 4. Font Size Research

### Rello, L., & Baeza-Yates, R. (2013)

**Title:** Good fonts for dyslexia

**Publication:** Proceedings of the 15th International ACM SIGACCESS Conference on Computers and Accessibility (ASSETS '13)

**DOI:** 10.1145/2513383.2513447

**Key Findings:**
- Larger font sizes (14-18pt) were preferred and performed better
- Sans-serif fonts generally preferred
- Italic fonts significantly worse for dyslexic readers
- No single "best" font - preferences varied

**How We Use It:**
- **Informs default font size:** We start at 16pt (middle of optimal range)
- **Supports sans-serif base font choice** (OpenDyslexic is sans-serif)
- **Key insight on individual variation:** "preferences varied" supports personalization

**Limitations:**
- Self-reported preferences mixed with performance measures
- Web-based study with limited control

**Quote for Citation:**
> "There was no single font type that was significantly better for all participants with dyslexia."

---

## 5. Word Spacing Studies

### Marinus, E., Mostard, M., Segers, E., Schuber, T. M., Madelaine, A., & Wheldall, K. (2016)

**Title:** A special font for people with dyslexia: Does it work and, if so, why?

**Publication:** Dyslexia, 22(3), 233-244

**DOI:** 10.1002/dys.1527

**Key Findings:**
- Word spacing (not letter differentiation) drove reading improvements
- The "dyslexia font" benefits came from spacing, not unique letterforms
- Supports "crowding reduction" over "letter confusion" hypothesis

**How We Use It:**
- **Justifies word spacing as Tier 1 parameter**
- **Challenges assumption** that unique letterforms are primary benefit
- **Suggests spacing modifications may be more impactful than shape changes**

**Limitations:**
- Specific to one font (Dyslexie)
- May not generalize to all dyslexia subtypes

**Quote for Citation:**
> "The reading benefit of Dyslexie can be accounted for by the increased inter-letter and inter-word spacing."

---

## Summary: How Core Research Shapes Our Platform

| Research Finding | Platform Application |
|------------------|---------------------|
| Letter spacing improves reading ~20% | Test letter spacing from -10% to +40% |
| Line spacing improves reading ~27% | Test line height from 100% to 200% |
| Crowding reduction is key mechanism | Include counter size and spacing parameters |
| Optimal font size is 14-18pt | Default to 16pt, allow customization |
| Individual responses vary significantly | Use DOE to personalize for each user |
| Spacing may matter more than letterforms | Prioritize spacing parameters in screening |

---

*Last Updated: January 11, 2026*
