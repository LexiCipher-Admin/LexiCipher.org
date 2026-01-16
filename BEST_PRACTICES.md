# Universal Best Practices for Learning Projects

This document contains project-agnostic best practices that apply across all projects in this workspace. Individual projects may have additional domain-specific practices in their own documentation.

**Applies To:** All projects in `learning/`  
**Last Updated:** January 12, 2026

---

## Table of Contents

1. [Project State Persistence](#1-project-state-persistence-best-practices)
2. [Documentation Standards](#2-documentation-standards)
3. [Iterative Experiment Design](#3-iterative-experiment-design-best-practices)
4. [Research Translation](#4-research-translation-best-practices)

---

## 1. Project State Persistence Best Practices

**Why This Matters:**
Long-running projects span multiple chat sessions, days, or weeks. Good state persistence ensures:
- Quick re-onboarding when returning to a project
- No lost context between work sessions
- Clear handoff documentation for collaborators or future self
- Accurate tracking of time investment and productivity

---

### 1.1 Chat Session On-boarding Protocol

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

### 1.2 Chat Session Close-out Protocol

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
| [Finding 1] | [Project doc] | ✅ Done / ⏳ Pending |
| [Finding 2] | [README.md] | ✅ Done / ⏳ Pending |

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

### 1.3 Session Log & Metrics Tracking

Maintain a session log in your project documentation to track time investment and productivity:

```markdown
## Session Log

| Session # | Date | Duration | LOC | Focus Area | Key Accomplishments |
|-----------|------|----------|-----|------------|---------------------|
| 1 | Jan 10, 2026 | 45 min | 250 | Setup | Initial project structure |
| 2 | Jan 11, 2026 | 30 min | 180 | Development | Core functionality |
| 3 | Jan 11, 2026 | 25 min | 0 | Planning | Next phase planning |
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

### 1.4 Documentation Structure for Easy Re-onboarding

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

### 1.5 Environment State Snapshots

Before starting technical work, verify and document your environment:

```markdown
### Environment Status (Last Verified: [Date])
| Component | Status | Version | Notes |
|-----------|--------|---------|-------|
| Python | ✅ | 3.12.1 | |
| Node.js | ✅ | 18.x | |
| [Tool] | ✅/❌ | x.x.x | Path or notes |
```

**When to Re-verify:**
- Starting a new phase
- After system updates
- If something "worked before" but now fails

---

### 1.6 Session Management Tips

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

## 2. Documentation Standards

**What to Document:**
- ✅ Project goals and methodology
- ✅ Technical setup requirements
- ✅ Step-by-step protocols/procedures
- ✅ Analysis methods and interpretation guides
- ✅ Lessons learned and issues encountered
- ✅ Revision history with dates

---

### 2.1 Lessons Learned Format

```markdown
**Issue: [Brief Title]**
- **Problem:** What went wrong
- **Cause:** Why it happened
- **Solution:** How it was fixed
- **Future Improvement:** How to prevent it
```

---

### 2.2 Revision History

Include in every major document:

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Date | Initial creation |
| 1.1 | Date | What changed |

---

### 2.3 Status Emoji Conventions

Use consistent status indicators across all projects:

| Emoji | Meaning |
|-------|---------|
| 🔲 | Not started / Pending |
| 🟡 | In progress / Active |
| ✅ | Complete / Done |
| ❌ | Blocked / Failed |
| ⚠️ | Warning / Attention needed |
| 📋 | Planned / Backlog |
| ⏳ | Waiting / On hold |

---

## 3. Iterative Experiment Design Best Practices

**Why This Matters:**
Experiments (DOE, A/B testing, iterative development) often require pivoting based on results. Knowing when to expand vs. optimize is crucial for efficient progress.

---

### 3.1 Interpreting "Null Results"

**Null results are valuable data, not failures:**

| Finding | Interpretation | Next Step |
|---------|----------------|-----------|
| All scores = baseline | These parameters don't affect the outcome | Test different parameters |
| All scores similar but ≠ baseline | Consistent shift but no differentiation | Consider if shift is meaningful |
| High variance, no pattern | Measurement noise too high | Improve testing protocol |

**Document null results:**
```markdown
### Phase 1 Findings
**Null Results:**
- Parameter A: No significant effect
- Parameter B: No significant effect

**Implication:** These parameters don't matter for this case.
This is valuable information for future work.
```

---

### 3.2 When to Expand Screening vs. Optimize

**Expand Screening (add more parameters) when:**
- Current parameters show no/minimal effects
- You haven't found the "lever" that matters
- Resources allow additional testing rounds

**Move to Optimization (fine-tune parameters) when:**
- At least one parameter shows significant effect
- You've identified the key factors
- Ready to find optimal levels of those factors

**Decision Tree:**
```
Phase N Results
    │
    ├─ Strong effects found?
    │     └─ YES → Move to Optimization (Phase N+1)
    │     
    ├─ Moderate effects found?
    │     └─ YES → Consider optimization OR expand to find stronger factors
    │     
    └─ No significant effects?
          └─ Expand screening with different parameters (Phase Na)
```

---

### 3.3 Phase Naming Conventions

**Use clear, hierarchical naming:**

| Phase | Meaning | Example |
|-------|---------|---------|
| Phase 1 | First screening round | Initial parameters |
| Phase 1a | Expanded screening (same level) | Additional parameters |
| Phase 1b | Further expanded screening | More parameters |
| Phase 2 | Optimization of significant factors | Fine-tune what works |
| Phase 3 | Confirmation/validation | Verify final solution |

---

### 3.4 Documenting Pivots

**When changing direction, document the reasoning:**

```markdown
## Phase Transition: Phase 1 → Phase 1a

**Decision Date:** [Date]

**Phase 1 Summary:**
- Tested: [What was tested]
- Results: [Summary of results]
- Key finding: [Main takeaway]

**Pivot Rationale:**
[Why are we changing direction?]

**Phase 1a Plan:**
- [New approach]
- [New parameters to test]
- [Goal for this phase]
```

---

## 4. Research Translation Best Practices

**Why This Matters:**
Projects built on published research must properly translate population-level findings to specific cases. What works on average may not work for individuals.

---

### 4.1 Adapting Population-Level Findings

**Research findings are averages across many people/cases:**

| Research Says | Individual Reality |
|---------------|-------------------|
| "X improves outcome by 20%" | Some cases see 50%, others see 0% |
| "Method A is preferred" | Some individuals prefer Method B |
| "Optimal setting is Y" | Optimal varies by individual |

**Translation Approach:**
1. Use research as a starting point, not an endpoint
2. Test research-backed parameters first (higher probability of success)
3. Don't assume research findings apply to your specific case
4. Document when findings do/don't match your case

---

### 4.2 Citing Sources in Project Documentation

**Standard citation format for project docs:**

```markdown
## Research Foundation

| Parameter | Research Support | Citation |
|-----------|------------------|----------|
| [Param 1] | [Finding] | Author et al. (Year) |
| [Param 2] | [Finding] | Author et al. (Year) |

**Full References:**
- Author, A., et al. (Year). Title. *Journal*.
- Author, B., et al. (Year). Title. *Conference*.
```

---

### 4.3 Tracking Research Applicability

**Document which research findings apply to your specific case:**

```markdown
## Research Applicability for [Project/Subject]

| Finding | Applies? | Evidence |
|---------|----------|----------|
| [Research finding 1] | ✅/❌/⏳ | [Your evidence] |
| [Research finding 2] | ✅/❌/⏳ | [Your evidence] |

**Interpretation:** [What this means for your project]
```

---

### 4.4 Contributing Back to Research

**If your project generates novel findings:**

- Document unexpected results thoroughly
- Consider sharing (anonymized) findings with researchers
- Note potential confounds that might affect generalizability
- Distinguish between n=1 findings and population trends

---

## Quick Reference

### Trigger Phrases for AI Assistant

| Phrase | Action |
|--------|--------|
| "Let's close out this session" | Generate SESSION CLOSE summary |
| "Session close-out please" | Generate SESSION CLOSE summary |
| [Paste SESSION START block] | AI understands project context immediately |

### Checklist: Starting a New Project

- [ ] Create project folder with descriptive name
- [ ] Create README.md with status badge and overview
- [ ] Link to this BEST_PRACTICES.md for universal guidelines
- [ ] Add project-specific best practices as needed
- [ ] Initialize session log table
- [ ] Document environment requirements

### Checklist: Ending Each Session

- [ ] Request SESSION CLOSE summary
- [ ] Review learnings captured
- [ ] Verify documentation updates made
- [ ] Note items for next session
- [ ] Update session log

---

*This document is referenced by all projects in the learning workspace.*
