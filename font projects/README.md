# Dyslexia Font Optimization Projects

This folder contains projects for optimizing typography for individuals with dyslexia.

---

## Projects

| Project | Status | Description |
|---------|--------|-------------|
| 📁 **[dyslexia-font-org/](./dyslexia-font-org/)** | 🚀 MVP Development | Open-source web platform for personalized font optimization |
| 📁 **[john-doe-font/](./john-doe-font/)** | ⏸️ Paused → Alpha Test | John Doe = "Alpha User #1" for platform |

### 🔄 Project Relationship Update (January 16, 2026)

**Strategy Change:** Rather than completing John Doe's testing separately, we're building the DyslexiaFont.org MVP first. John Doe will be "Alpha User #1" who tests the platform.

**Benefits:**
- John Doe tests with the same UI everyone else will use
- No divergence between pilot methodology and platform
- Single codebase, no wasted effort
- DOE design and passages from John Doe project are reused in platform

**Timeline:** ~12 days to MVP → John Doe alpha test

---

## Project Overview

### 1. John Doe Font Optimization

**Purpose:** Create a personalized font optimized for John Doe's specific visual processing needs using Design of Experiments (DOE) methodology.

**Current Phase:** Phase 1 - Screening  
Testing three key parameters:
- Letter Spacing (+25%)
- Word Spacing (+40%)
- Glyph Weight (Heavy)

**Key Files:**
- [JOHN_DOE_FONT_PROJECT.md](./john-doe-font/JOHN_DOE_FONT_PROJECT.md) - Full documentation
- [RANDOMIZATION_KEY.md](./john-doe-font/RANDOMIZATION_KEY.md) - Sample → Font mapping
- Font variants in `john-doe-font/font/variants/`

**Quick Start:**
1. Navigate to `john-doe-font/font/variants/`
2. Install fonts on your system (right-click → Install)
3. Follow testing protocol in JOHN_DOE_FONT_PROJECT.md

---

### 2. DyslexiaFont.org Platform

**Purpose:** An open-source web application where individuals with dyslexia can discover their optimal reading configuration through guided DOE experiments.

**Status:** Planning / Early Development  
**Organization:** Non-profit

**Key Features (Planned):**
- Adaptive DOE testing engine
- CSS-based real-time font parameter preview
- Custom font file generation (OTF/TTF/WOFF)
- Personalized readability profile report
- Document settings recommendations

**Key File:**
- [dyslexiafont.org-project-plan.md](./dyslexia-font-org/dyslexiafont.org-project-plan.md) - Comprehensive development plan

**Tech Stack (Planned):**
- Next.js + TypeScript (frontend)
- PostgreSQL (database)
- opentype.js / fonttools (font manipulation)

---

## Folder Structure

```
font projects/
├── README.md                           # This file
│
├── 📁 john-doe-font/                   # John Doe Personalized Font Project
│   ├── JOHN_DOE_FONT_PROJECT.md        # Full project documentation
│   ├── RANDOMIZATION_KEY.md            # Sample → Font mapping (confidential)
│   ├── test_document.html              # HTML test document (deprecated)
│   ├── create_font_variants.py         # Python script for spacing variants
│   ├── create_weighted_font_variants.py # Python script for weight variants
│   ├── create_final_doe_fonts.py       # Python script for final DOE fonts
│   ├── opendyslexic-0.92.zip           # Original OpenDyslexic download
│   └── font/
│       ├── OpenDyslexic-*.otf          # Original OpenDyslexic fonts
│       └── variants/                   # Generated font variants
│
└── 📁 dyslexia-font-org/               # DyslexiaFont.org Platform Project
    └── dyslexiafont.org-project-plan.md # Comprehensive development plan
```

---

## Technical Requirements

### For John Doe Testing
- Python 3.12+ (for font generation scripts)
- fonttools library (`pip install fonttools`)
- Word processor (Word, Google Docs, etc.)

### For DyslexiaFont.org Development
- Node.js 18+
- Python 3.12+ (optional, for server-side font generation)
- PostgreSQL (for production)

---

## Research Foundation

These projects are based on peer-reviewed research:

| Study | Key Finding |
|-------|-------------|
| Zorzi et al. (2012) | 20% improvement with increased letter spacing |
| Schneps et al. (2013) | 27% improvement with increased line height; screens effective |
| Rello & Baeza-Yates (2013) | Sans-serif, larger sizes preferred |

**Key Insight:** Individual variation is significant - personalization is essential.

---

## Best Practices

> 📘 **Universal Best Practices:** See [BEST_PRACTICES.md](../BEST_PRACTICES.md) for project-agnostic guidelines including:
> - Session management (SESSION START/CLOSE protocols)
> - Documentation standards
> - Iterative experiment design
> - Research translation
>
> The sections below contain **font-project-specific** best practices.

---

### 1. Pre-Implementation Checklist ⚠️

**Always verify your environment BEFORE starting development work:**

```powershell
# Required: Verify Python environment
python --version          # Expected: Python 3.10+
pip show fonttools        # Expected: fonttools installed

# Install if missing:
pip install fonttools
pip install fonttools[ufo,unicode]  # Optional advanced features
```

**Environment Status Template:**
| Component | Status | Version | Notes |
|-----------|--------|---------|-------|
| Python | ✅/❌ | x.x.x | |
| fonttools | ✅/❌ | x.x.x | |
| Base Font | ✅/❌ | - | Path verified |
| Output Dir | ✅/❌ | - | Write permissions |

---

### 2. Font File Management

**Naming Conventions:**
- Use descriptive prefixes: `ODx-` for OpenDyslexic variants
- Include parameter info in filename: `ODx-Font2_LetterSpace.otf`
- Number variants sequentially: `Font1`, `Font2`, etc.
- Indicate weight: `Weight-Standard.otf`, `Weight-Heavy.otf`

**Version Control:**
- Font files (.otf, .ttf) are binary - avoid frequent commits
- Keep original/unmodified fonts in separate folder
- Document which scripts generate which fonts

**Backup Strategy:**
- Keep original font downloads (zip files)
- Document regeneration steps in case variants are lost

---

### 3. Testing Best Practices

**Why Word Documents > HTML/Browser:**
- Browser `@font-face` loading is inconsistent
- CSS may override font-level spacing settings
- Word uses system-installed fonts reliably

**CSS-Based vs Font-Baked Parameters:**
| Parameter | Testing Phase | Download Phase |
|-----------|---------------|----------------|
| Letter Spacing | CSS `letter-spacing` | Bake into font |
| Word Spacing | CSS `word-spacing` | Bake into font |
| Line Height | CSS `line-height` | Document setting |
| Font Size | CSS `font-size` | Document setting |
| Glyph Weight | Different font file | Different font file |

**Test Passage Guidelines:**
- Use age-appropriate reading level (e.g., 3rd grade)
- Keep passages consistent length (~200 words)
- Use neutral, engaging content
- Avoid complex vocabulary that adds confounds

**Rating Scale Best Practices:**
- Always establish a baseline reference first (= score of 5)
- Use 1-10 scale with clear anchors
- No time pressure during testing
- Encourage honest feedback - no "right" answers

---

### 4. Documentation Standards

**What to Document:**
- ✅ Project goals and methodology
- ✅ Technical setup requirements
- ✅ Step-by-step testing protocols
- ✅ Analysis formulas and interpretation guides
- ✅ Lessons learned and issues encountered
- ✅ Revision history with dates

**Lessons Learned Format:**
```markdown
**Issue: [Brief Title]**
- **Problem:** What went wrong
- **Cause:** Why it happened
- **Solution:** How it was fixed
- **Future Improvement:** How to prevent it
```

**Revision History:**
| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Date | Initial creation |
| 1.1 | Date | What changed |

---

### 5. DOE Methodology Best Practices

**Randomization:**
- Always randomize presentation order
- Prevent learning/fatigue bias
- Document the randomization key separately (confidential)

**Baseline Reference:**
- Include a control/baseline condition
- Assign it a fixed score (e.g., 5)
- All ratings are relative to baseline

**Effect Size Interpretation:**
| Effect | Interpretation | Action |
|--------|----------------|--------|
| > +2.0 | Strong positive | Include, optimize further |
| +1.0 to +2.0 | Moderate positive | Include in final font |
| -1.0 to +1.0 | Minimal/None | May not matter |
| < -1.0 | Negative | Avoid this modification |

**Interaction Effects:**
- Test combinations to check for synergy/antagonism
- Expected = sum of individual effects
- Compare actual vs expected scores

---

### 6. Font Rendering Considerations

**Browser @font-face Issues:**
- CORS can block font loading
- Cache issues may show old versions
- Different browsers render differently

**Cross-Platform Compatibility:**
- Test on Windows, Mac if possible
- OTF works on most modern systems
- TTF is Windows-preferred alternative

**Print vs Screen:**
- Research shows screens are effective (Schneps 2013)
- Print eliminates screen variability
- Test in the medium the user will primarily use

**File Formats by Use Case:**
| Format | Use Case | Size |
|--------|----------|------|
| OTF | Desktop (cross-platform) | ~200KB |
| TTF | Desktop (Windows) | ~200KB |
| WOFF | Web (modern browsers) | ~100KB |
| WOFF2 | Web (best compression) | ~80KB |

---

### 7. Project State Persistence Best Practices

**Why This Matters:**
Long-running projects span multiple chat sessions, days, or weeks. Good state persistence ensures:
- Quick re-onboarding when returning to a project
- No lost context between work sessions
- Clear handoff documentation for collaborators or future self
- Accurate tracking of time investment and productivity

---

#### 7.1 Chat Session On-boarding Protocol

When starting a new chat session, include this **SESSION START** block so the AI assistant can quickly understand your project state:

```markdown
---SESSION START---
**Project:** [Project Name]
**Current Phase:** [Phase X.X]
**Status:** [Status emoji + description]
**Last Session:** [Date] | Duration: [XX min] | Session #[N]
**Cumulative Stats:** [Total time] | [Total LOC generated]

**Context Files to Read:**
- [Primary doc path]
- [Secondary doc if needed]

**Immediate Goal This Session:**
[What you want to accomplish in this ~20-min session]

**Blockers/Questions:**
[Any issues or decisions needed]
---END SESSION START---
```

**Example:**
```markdown
---SESSION START---
**Project:** John Doe Font Optimization
**Current Phase:** Phase 1a - Glyph Modification Screening
**Status:** 🟡 Planning Phase 1a implementation
**Last Session:** Jan 11, 2026 | Duration: 25 min | Session #3
**Cumulative Stats:** 1 hr 40 min | 430 LOC

**Context Files to Read:**
- font projects/README.md
- font projects/john-doe-font/JOHN_DOE_FONT_PROJECT.md

**Immediate Goal This Session:**
Create FontForge script for Phase 1a glyph variants

**Blockers/Questions:**
None - ready to implement
---END SESSION START---
```

---

#### 7.2 Chat Session Close-out Protocol

Before ending a session (especially at the ~20 min mark), request a **SESSION CLOSE** summary:

```markdown
---SESSION CLOSE---
**Session #[N]:** [Date] | Duration: [XX min]
**LOC Generated This Session:** [XXX lines]

**Completed This Session:**
- [x] Task 1
- [x] Task 2

**In Progress (Incomplete):**
- [ ] Task that needs continuation

**Files Modified:**
- `path/to/file1.py` - [brief description of changes]
- `path/to/file2.md` - [brief description of changes]

---

### 📚 Session Review: Learnings & Documentation

**New Learnings/Insights Discovered:**
- [Key insight 1 from this session]
- [Key insight 2 from this session]
- [Technical discovery or gotcha encountered]

**Findings to Document:**
| Finding | Document to Update | Status |
|---------|-------------------|--------|
| [Finding 1] | [JOHN_DOE_FONT_PROJECT.md] | ✅ Done / ⏳ Pending |
| [Finding 2] | [README.md Best Practices] | ✅ Done / ⏳ Pending |

**Lessons Learned (if any issues encountered):**
- **Issue:** [Brief description]
- **Cause:** [Why it happened]
- **Solution:** [How it was resolved]
- **Prevention:** [How to avoid in future]

**Documentation Updates Made This Session:**
- [ ] Project status updated in main docs
- [ ] Results/findings recorded
- [ ] Lessons learned added (if applicable)
- [ ] Revision history updated with date

**Documentation Still Needed:**
- [ ] [Specific doc update that didn't get done]

---

**Next Session Priority:**
1. [First thing to do next time]
2. [Second priority]

**Cumulative Stats Update:**
- Total Sessions: [N]
- Total Time: [X hr Y min]
- Total LOC: [XXXX lines]

**Notes for Next Session:**
[Any important context that might be lost]
---END SESSION CLOSE---
```

**Trigger Phrase:** Say "Let's close out this session" or "Session close-out please" to request this summary.

**What the Session Review Should Capture:**
1. **Learnings** - New knowledge gained during the session (technical, methodological, domain)
2. **Findings** - Experiment results, test outcomes, discoveries about the project
3. **Lessons Learned** - Issues encountered and how they were resolved
4. **Documentation Status** - What was documented and what still needs to be documented

**Why This Matters:**
- Chat sessions contain valuable insights that can be lost when the session ends
- Forcing a review ensures learnings are captured in permanent documentation
- Prevents "rediscovering" the same issues in future sessions
- Builds institutional knowledge over time

---

#### 7.3 Session Log & Metrics Tracking

Maintain a session log in your project documentation to track time investment and productivity:

```markdown
## Session Log

| Session # | Date | Duration | LOC | Focus Area | Key Accomplishments |
|-----------|------|----------|-----|------------|---------------------|
| 1 | Jan 10, 2026 | 45 min | 250 | Phase 1 Setup | Created font variants, test docs |
| 2 | Jan 11, 2026 | 30 min | 180 | Phase 1 Testing | Completed Phase 1, analyzed results |
| 3 | Jan 11, 2026 | 25 min | 0 | Planning | Planned Phase 1a approach |
| ... | ... | ... | ... | ... | ... |

**Cumulative Totals:** 3 sessions | 1 hr 40 min | 430 LOC
```

**What Counts as LOC (Lines of Code):**
- Python scripts (.py)
- HTML/CSS/JS files
- Configuration files
- Exclude: Markdown documentation, comments-only changes

**Time Tracking Tips:**
- Use 20-minute session blocks as your unit
- Round to nearest 5 minutes
- Include planning/discussion time (valuable work!)

---

#### 7.4 Documentation Structure for Easy Re-onboarding

Structure your project docs so returning after days/weeks is seamless:

**At the Top of Main Docs:**
- ✅ Status badges with emojis (🔲 🟡 ✅ ❌)
- ✅ "Last Updated" timestamp
- ✅ Current Phase clearly stated
- ✅ Table of Contents for long documents

**Quick Orientation Section:**
- What is this project?
- Where are we now?
- What's the next step?

**File Location References:**
- Document where key files live
- Use relative paths from project root
- Note which scripts generate which outputs

---

#### 7.5 Environment State Snapshots

Before starting technical work, verify and document your environment:

```markdown
### Environment Status (Last Verified: [Date])
| Component | Status | Version | Notes |
|-----------|--------|---------|-------|
| Python | ✅ | 3.12.1 | |
| fonttools | ✅ | 4.61.1 | |
| FontForge | ✅ | 20251009 | Path: C:\Program Files\... |
| Node.js | ❌ | - | Not needed for current phase |
```

**When to Re-verify:**
- Starting a new phase
- After system updates
- If something "worked before" but now fails

---

#### 7.6 Session Management Tips

**20-Minute Session Blocks:**
- Natural checkpoint for context preservation
- Prevents information overload in chat history
- Encourages focused, goal-oriented work

**Before Starting a Session:**
1. Review last SESSION CLOSE summary
2. Prepare SESSION START block
3. Have specific goal in mind

**During a Session:**
- Stay focused on session goal
- Note any scope creep for next session
- Request SESSION CLOSE at ~18-20 min mark

**Between Sessions:**
- Review SESSION CLOSE summary
- Update session log if not done automatically
- Plan next session's goal

---

### 8. FontForge/fonttools Development Best Practices

**Why This Matters:**
Phase 1a and beyond require glyph-level modifications using FontForge or fonttools. These are powerful but complex tools with potential pitfalls.

---

#### 8.1 Testing Before Batch Processing

**Always test on a single glyph before batch operations:**

```python
# Test on one letter first
test_glyphs = ['a']  # Start small
# test_glyphs = list('abcdefghijklmnopqrstuvwxyz')  # Expand after verification

for glyph_name in test_glyphs:
    # Your transformation code here
    pass
```

**Verification Steps:**
1. Generate font with single modified glyph
2. Install and test in Word document
3. Compare visually with original
4. If correct, expand to full glyph set

---

#### 8.2 Font File Validation

**Always validate generated fonts before distribution:**

```powershell
# Using fonttools to validate
python -c "from fontTools.ttLib import TTFont; font = TTFont('output.otf'); print('Valid font')"

# Check font info
python -c "from fontTools.ttLib import TTFont; font = TTFont('output.otf'); print(font['name'].getDebugName(1), font['name'].getDebugName(2))"
```

**Common Validation Checks:**
- Font loads without errors
- Name table is correct (family name, style)
- Glyph count matches expected
- No missing required tables

---

#### 8.3 Backup Original Glyphs

**Before modifying any glyph outlines:**

```python
# Save original glyph data before modification
import copy

def modify_glyph_safely(font, glyph_name, transform_func):
    """Modify a glyph while preserving original."""
    glyph = font['glyf'][glyph_name]
    original = copy.deepcopy(glyph)  # Backup
    
    try:
        transform_func(glyph)
        return True
    except Exception as e:
        font['glyf'][glyph_name] = original  # Restore on error
        print(f"Error modifying {glyph_name}: {e}")
        return False
```

**File-Level Backups:**
- Keep original .otf in separate folder (never modify)
- Name modified versions descriptively
- Document which script generates which output

---

#### 8.4 Coordinate System Conventions

**Understanding font coordinate systems:**

| Concept | Description | Typical Values |
|---------|-------------|----------------|
| **Units per EM** | Font's coordinate space | Usually 1000 or 2048 |
| **Baseline** | y=0 line where text sits | y = 0 |
| **x-Height** | Height of lowercase letters | ~500 (varies by font) |
| **Cap Height** | Height of uppercase letters | ~700 (varies by font) |
| **Ascender** | Highest point of glyphs | ~800 |
| **Descender** | Lowest point (g, y, p) | ~-200 (negative) |

**Getting Font Metrics:**
```python
from fontTools.ttLib import TTFont

font = TTFont('OpenDyslexic-Regular.otf')
os2 = font['OS/2']
print(f"x-Height: {os2.sxHeight}")
print(f"Cap Height: {os2.sCapHeight}")
print(f"Units per EM: {font['head'].unitsPerEm}")
```

---

#### 8.5 Common Pitfalls

**Winding Direction Issues:**
- Outer contours should be clockwise
- Inner contours (holes) should be counter-clockwise
- Wrong direction = filled holes or hollow letters

**Contour Order:**
- Some operations depend on contour order
- First contour is usually the outer boundary
- Be careful when adding/removing contours

**Scaling Transforms:**
- Always scale from a consistent origin point
- Scaling from (0,0) vs glyph center gives different results
- Document your transform origin

**Font Table Dependencies:**
- Modifying `glyf` table may require `hmtx` updates (advance widths)
- Changing glyph bounds may require `head` table updates
- Use fonttools' built-in recalculation when possible

---

### 9. Iterative Experiment Design Best Practices

**Why This Matters:**
DOE experiments often require pivoting based on results. Knowing when to expand screening vs. move to optimization is crucial for efficient progress.

---

#### 9.1 Interpreting "Null Results"

**Null results are valuable data, not failures:**

| Finding | Interpretation | Next Step |
|---------|----------------|-----------|
| All scores = baseline | These parameters don't affect this person | Test different parameters |
| All scores similar but ≠ baseline | Consistent shift but no differentiation | Consider if shift is meaningful |
| High variance, no pattern | Measurement noise too high | Improve testing protocol |

**Document null results:**
```markdown
### Phase 1 Findings
**Null Results:**
- Letter spacing (+25%): No significant effect for John
- Word spacing (+40%): No significant effect for John

**Implication:** Spacing modifications not helpful for this individual.
This aligns with research showing significant individual variation.
```

---

#### 9.2 When to Expand Screening vs. Optimize

**Expand Screening (add more parameters) when:**
- Current parameters show no/minimal effects
- You haven't found the "lever" that matters
- Resources allow additional testing rounds

**Move to Optimization (fine-tune parameters) when:**
- At least one parameter shows significant effect (>1.5 improvement)
- You've identified the key factors
- Ready to find optimal levels of those factors

**Decision Tree:**
```
Phase N Results
    │
    ├─ Strong effects found (>+2.0)?
    │     └─ YES → Move to Optimization (Phase N+1)
    │     
    ├─ Moderate effects found (+1.0 to +2.0)?
    │     └─ YES → Consider optimization OR expand to find stronger factors
    │     
    └─ No significant effects?
          └─ Expand screening with different parameters (Phase Na)
```

---

#### 9.3 Phase Naming Conventions

**Use clear, hierarchical naming:**

| Phase | Meaning | Example |
|-------|---------|---------|
| Phase 1 | First screening round | Spacing + Weight |
| Phase 1a | Expanded screening (same level) | Glyph modifications |
| Phase 1b | Further expanded screening | Color/contrast |
| Phase 2 | Optimization of significant factors | Fine-tune letter spacing |
| Phase 3 | Confirmation/validation | Final font vs baseline |

---

#### 9.4 Documenting Pivots

**When changing direction, document the reasoning:**

```markdown
## Phase Transition: Phase 1 → Phase 1a

**Decision Date:** January 11, 2026

**Phase 1 Summary:**
- Tested: Letter spacing, word spacing, glyph weight
- Results: No significant effects (all within ±0.5 of baseline)
- Key finding: Spacing/weight not helpful for John

**Pivot Rationale:**
Phase 1 parameters (spacing, weight) don't help John. Research shows different
dyslexia subtypes respond to different interventions. Expanding to test
glyph shape modifications before moving to optimization.

**Phase 1a Plan:**
- Test 6 glyph modification parameters
- Use extreme levels to maximize signal detection
- Goal: Find at least one significant factor
```

---

### 10. Research Translation Best Practices

**Why This Matters:**
These projects are built on published research, but population-level findings don't always apply to individuals. Properly translating research to practice is essential.

---

#### 10.1 Adapting Population-Level Findings

**Research findings are averages across many people:**

| Research Says | Individual Reality |
|---------------|-------------------|
| "20% improvement with spacing" | Some people see 50%, others see 0% |
| "Sans-serif fonts preferred" | Some individuals prefer serif |
| "Larger font sizes help" | Some individuals find them distracting |

**Translation Approach:**
1. Use research as a starting point, not an endpoint
2. Test research-backed parameters first (higher probability of success)
3. Don't assume research findings apply to your specific case
4. Document when findings do/don't match your individual

---

#### 10.2 Citing Sources in Project Documentation

**Standard citation format for project docs:**

```markdown
## Research Foundation

| Parameter | Research Support | Citation |
|-----------|------------------|----------|
| Letter Spacing | +20% reading improvement | Zorzi et al. (2012) |
| Line Height | +27% reading improvement | Schneps et al. (2013) |
| Font Size | Optimal 14-18pt | Rello & Baeza-Yates (2013) |

**Full References:**
- Zorzi, M., et al. (2012). Extra-large letter spacing improves reading in dyslexia. *PNAS*.
- Schneps, M., et al. (2013). E-readers are more effective than paper for some with dyslexia. *PLoS ONE*.
- Rello, L., & Baeza-Yates, R. (2013). Good fonts for dyslexia. *ASSETS*.
```

---

#### 10.3 Tracking Research Applicability

**Document which research findings apply to your individual:**

```markdown
## Research Applicability for John Doe

| Finding | Applies? | Evidence |
|---------|----------|----------|
| Increased letter spacing helps | ❌ No | Phase 1: Score unchanged |
| Increased word spacing helps | ❌ No | Phase 1: Score unchanged |
| Heavier stroke weight helps | ❌ No | Phase 1: Score decreased |
| x-Height increase helps | ⏳ Untested | Phase 1a planned |
| Bottom-heavy glyphs help | ⏳ Untested | Phase 1a planned |

**Interpretation:** John may have a different dyslexia subtype than the
population averages in published studies. Individual optimization is essential.
```

---

#### 10.4 Contributing Back to Research

**If your project generates novel findings:**

- Document unexpected results thoroughly
- Consider sharing (anonymized) findings with researchers
- Note potential confounds that might affect generalizability
- Distinguish between n=1 findings and population trends

---

## License

- **OpenDyslexic Font**: SIL Open Font License (OFL)
- **Project Code & Documentation**: MIT License (proposed for DyslexiaFont.org)

---

## Contributing

These are currently personal projects. DyslexiaFont.org will be open-sourced once MVP is complete.

---

*Last Updated: January 16, 2026*
