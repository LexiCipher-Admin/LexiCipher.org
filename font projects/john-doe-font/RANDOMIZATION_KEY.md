# Randomization Key - CONFIDENTIAL
## Font Readability DOE Study - Phase 1

**DO NOT SHARE WITH PARTICIPANT UNTIL TESTING IS COMPLETE**

---

## Sample to Font Mapping

| Sample | Font File | Description | Parameters |
|--------|-----------|-------------|------------|
| **A** | ODx-Font3_WordSpace.otf | Word Spacing Only | Letter: 0%, Word: +40%, Line: 130% |
| **B** | ODx-Font1_Control.otf | **BASELINE (OpenDyslexic)** | Letter: 0%, Word: 0%, Line: 130% |
| **C** | ODx-Font5_Combination.otf | All Parameters Combined | Letter: +25%, Word: +40%, Line: 170% |
| **D** | ODx-Font2_LetterSpace.otf | Letter Spacing Only | Letter: +25%, Word: 0%, Line: 130% |
| **E** | ODx-Font4_LineHeight.otf | Line Height Only | Letter: 0%, Word: 0%, Line: 170% |

---

## DOE Design Analysis Guide

### How to Interpret Results

After John completes the test, enter his scores here:

| Sample | Font | Score (1-10) |
|--------|------|--------------|
| A | Word Space +40% | ___ |
| B | **Baseline** | **5** |
| C | Combination (all) | ___ |
| D | Letter Space +25% | ___ |
| E | Line Height 170% | ___ |

### Calculating Main Effects

**Effect of Letter Spacing (+25%):**
```
Letter Effect = (Score_D + Score_C) / 2 - (Score_A + Score_B + Score_E) / 3
```

**Effect of Word Spacing (+40%):**
```
Word Effect = (Score_A + Score_C) / 2 - (Score_B + Score_D + Score_E) / 3
```

**Effect of Line Height (170%):**
```
Line Effect = (Score_C + Score_E) / 2 - (Score_A + Score_B + Score_D) / 3
```

### Interpreting the Effects

| Effect Value | Interpretation |
|--------------|----------------|
| > +2 | Strong positive effect - this parameter helps significantly |
| +1 to +2 | Moderate positive effect - worth exploring further |
| -1 to +1 | Minimal effect - parameter may not matter for John |
| -1 to -2 | Moderate negative effect - this parameter may hurt readability |
| < -2 | Strong negative effect - avoid this parameter |

### Interaction Check

If Score_C is much higher than expected (higher than D + A individually would predict), 
there's a **positive synergy** between letter spacing and word spacing.

Expected Score_C (additive model) ≈ Baseline + Letter_Effect + Word_Effect + Line_Effect
Actual Score_C = ___

If Actual > Expected: Positive interaction (synergy)
If Actual < Expected: Negative interaction (antagonism)

---

## Phase 2 Planning

Based on Phase 1 results:

1. If Letter Spacing shows strong effect → Test +15%, +25%, +35%
2. If Word Spacing shows strong effect → Test +20%, +40%, +60%
3. If Line Height shows strong effect → Test 140%, 170%, 200%
4. If Combination (C) scores highest → Focus on optimizing the interaction

---

## File Locations

- Font variants: `font/variants/`
- Test document: `test_document.html`
- Original OpenDyslexic: `font/OpenDyslexic-Regular.otf`

---

## Notes

- Sample B is intentionally placed second (not first or last) to reduce order effects
- All passages use the same 3rd-grade text (~200 words) to control for content
- Line length is fixed at ~55 characters per line in the HTML document
- Font size is fixed at 16pt

---

*Generated: Phase 1 - DOE Font Optimization Study*
