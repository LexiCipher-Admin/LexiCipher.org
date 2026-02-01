# FK Score Calibration Guide

A comprehensive guide for calibrating reading passages to target Flesch-Kincaid grade levels.

## The FK Formula

```
FK = 0.39 × (words/sentence) + 11.8 × (syllables/word) - 15.59
```

Two main levers:
1. **Sentence length** (words per sentence) - moderate impact (0.39 multiplier)
2. **Word complexity** (syllables per word) - stronger impact (11.8 multiplier)

The 11.8 syllable multiplier makes word choice extremely sensitive compared to sentence length adjustments.

---

## Target Patterns by Grade Level

| Grade | FK Target | Words/Sentence | Syllable Strategy |
|-------|-----------|----------------|-------------------|
| 3rd | 2.5-3.5 | 8-10 | Almost all 1-syllable words |
| 5th | 4.5-5.5 | 10-12 | Mix of 1-2 syllable words |
| 8th | 7.5-8.5 | 13-16 | Can use 2-3 syllable words |

---

## Syllable Impact Table

| Word Type | Example Words | FK Impact |
|-----------|---------------|-----------|
| 1-syllable | look, make, help, work | Drops FK fast |
| 2-syllable | people, markets, findings, patterns | Neutral/moderate |
| 3-syllable | policies, decisions, affect | Raises FK moderately |
| 4+ syllable | significantly, employment, international | Raises FK dramatically |

---

## Key Insights

1. **Iterative approach works best** - Fix one passage, validate, then scale
2. **Easy to overcorrect** - Sentences that are too short drop FK too low
3. **Compound/complex sentences raise FK** - Split them to lower scores
4. **Multi-syllable words are powerful** - Words like "beautiful" (3 syl) raise FK significantly
5. **Short sentences + short words = very low FK** - Can easily go negative

---

## 8th Grade Detailed Strategy (FK 7.5-8.5)

### Target Sentence Structure
- ~16-18 words per sentence average
- Mix compound and simple sentences

### Word Selection Sweet Spot
- Foundation of 1-2 syllable words (~70%)
- Sprinkle of 3-syllable words (~25%)
- Very few 4+ syllable words (~5%)

### Danger Words to Avoid/Limit
These words have 4+ syllables and raise FK dramatically:
- significantly, considerably, approximately
- employment, international, government
- allocate, diminish, demonstrate
- environmental, particularly, unfortunately

### Safe Complexity Words
These 2-3 syllable words add appropriate complexity:
- examine, research, influence, conclude
- affect, improve, pattern, function
- findings, methods, purpose, culture
- design, create, value, challenge

---

## Case Study: 8n04 Economics

The volatility problem - this passage swung wildly through multiple revisions:

| Revision | FK Score | Problem |
|----------|----------|---------|
| v1 | 6.1 | Too simple (words like "look", "make", "work", "help") |
| v2 | 14.6 | Way too complex (words like "allocate", "significantly", "employment") |
| v3 | 12.8 | Still too high (kept multi-syllable academic vocabulary) |
| v4 | 5.6 | Overcorrected again with short words |
| v5 | 6.9 | Finally closer (balanced mix) |

**Lesson:** Small word changes cause large FK swings. The 11.8 multiplier amplifies every syllable decision.

---

## Calibration Process

### Step 1: Calculate Current FK
Run all passages through FK validation to identify:
- **Passing**: Within target range (no action needed)
- **Running High**: Above target (reduce syllables, split sentences)
- **Running Low**: Below target (add complexity words, combine short sentences)

### Step 2: Prioritize Revisions
Focus on passages furthest from target first.

### Step 3: Apply Changes Iteratively
- For high passages: Replace 4+ syllable words with 2-syllable equivalents
- For low passages: Add strategic 3-syllable words
- Validate after each change

### Step 4: Final Validation
Confirm all passages fall within target range.

---

## Progress Tracking Template

| Metric | Before | After |
|--------|--------|-------|
| Passages passing | X/30 | X/30 |
| Percentage | X% | X% |
| Average FK | X.X | X.X |
| Range | X.X-X.X | X.X-X.X |

---

## 8th Grade Calibration Progress

| Metric | Initial | Final |
|--------|---------|-------|
| Passages passing | 12/30 | 30/30 |
| Percentage | 40% | 100% |
| Average FK | 9.9 | 8.0 |
| Range | 5.3-9.8 | 7.5-8.5 |

### Key Calibration Techniques Used
1. **Replaced danger words** (4+ syllables) with 2-syllable equivalents
2. **Added "nervousness" (4 syl) → "nerves" → "nervousness"** - carefully balanced
3. **Changed "plant" → "factory"** (2 syl) for slight FK boost
4. **Changed "looks" → "examines"** (3 syl) for slight FK boost
5. **Iterative validation** after each change to avoid overcorrection
