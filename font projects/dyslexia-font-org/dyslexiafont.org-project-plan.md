# DyslexiaFont.org - Project Plan
## Personalized Font Optimization Platform for Dyslexia

**Version:** 1.8  
**Created:** January 10, 2026  
**Last Updated:** January 16, 2026  
**Status:** Planning / Early Development

---

## ⚠️ Pre-Implementation Technical Check

**Best Practice:** Before starting any development work, verify technical requirements first.

### Required Tools for Font Generation
```bash
# Python environment
python --version          # Expected: Python 3.10+
pip show fonttools        # Expected: fonttools installed

# Install if missing:
pip install fonttools
pip install fonttools[ufo,unicode]  # Optional advanced features
```

### Key Dependencies
| Component | Purpose | Required? |
|-----------|---------|-----------|
| Python 3.10+ | Font manipulation scripts | Yes |
| fonttools | Font table modification | Yes |
| opentype.js | Client-side font manipulation | Yes (for web) |
| FontForge | Complex glyph outline modification | Optional |

### Lessons Learned (from John Doe project)

**Issue #1: Browser @font-face Font Loading**
> **Problem:** HTML font rendering was inconsistent due to browser @font-face loading issues.  
> **Solution:** Use CSS-based parameter application during testing (letter-spacing, word-spacing properties), then generate custom font only for download.

**Issue #2: HTML Print Rendering**
> **Problem:** HTML test document displayed correctly in browser (different fonts rendered as expected), but when printed, all samples looked identical except for bold weight differences. The browser print pipeline does not preserve custom `@font-face` fonts reliably.  
> **Cause:** Browser print rendering substitutes fonts during the print process, overriding the custom font variants loaded via CSS.  
> **Solution:** For print-based testing, use Word documents with system-installed fonts instead of printing HTML. Browser testing should remain on-screen only; if users need print output, they should use the generated custom font file in Word/Pages and print from there.  
> **Implication for DyslexiaFont.org:** Testing will be screen-based (supported by Schneps 2013 research). Users who want to print should download the custom font file and install it system-wide, then use it in their word processor.

**Key Research Finding: Screen-Based Testing is Valid**
> **Source:** Schneps et al. (2013) - "E-Readers Are More Effective than Paper for some with dyslexia" (PLOS ONE)  
> **Finding:** Screens are not inferior to paper for dyslexia reading; in fact, e-readers with customizable typography showed improvements.  
> **Implication:** DyslexiaFont.org can confidently use screen-based testing. This simplifies implementation (no print verification needed) and aligns with how most users will consume digital content. Users who primarily read on paper can still benefit by downloading and installing their custom font.

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Solution Overview](#3-solution-overview)
4. [User Data Collection Requirements](#4-user-data-collection-requirements) ⭐ NEW
5. [Legal Disclaimers & Compliance](#5-legal-disclaimers--compliance) ⭐ NEW
6. [User Journey](#6-user-journey)
7. [Technical Architecture](#7-technical-architecture)
8. [DOE Engine Specifications](#8-doe-engine-specifications)
9. [Font Generation Module](#9-font-generation-module)
10. [Parameters to Optimize](#10-parameters-to-optimize)
11. [UI/UX Requirements](#11-uiux-requirements)
12. [Database Schema](#12-database-schema)
13. [API Endpoints](#13-api-endpoints)
14. [Development Phases](#14-development-phases)
15. [Open Questions](#15-open-questions)
16. [Research References](#16-research-references)

---

## 1. Executive Summary

**DyslexiaFont.org** is an open-source web application that helps individuals with dyslexia discover their optimal reading configuration through guided Design of Experiments (DOE). Unlike one-size-fits-all dyslexia fonts, this platform recognizes that each person's visual processing is unique and provides personalized optimization.

### Key Outputs for Users:
1. **Personalized Readability Profile** - A detailed report explaining which typographic parameters impact their reading and by how much
2. **Custom Font File** - A downloadable OTF/TTF/WOFF file with optimized settings baked into the font
3. **Document Recommendations** - Optimal settings for font size, line length, margins, and contrast

### Why This Doesn't Exist Yet:
- Current dyslexia fonts (OpenDyslexic, Dyslexie) are static, one-size-fits-all solutions
- Research shows individual variation is significant - what helps one person may not help another
- No tool systematically optimizes typography for individuals using scientific DOE methods

---

## 2. Problem Statement

### The Challenge:
- **10-15% of the population** has some form of dyslexia
- Existing solutions are generic and based on population averages
- Research shows **letter spacing, word spacing, and line height** can improve readability by 20-30% for many dyslexic readers
- But the optimal values vary significantly between individuals
- There's no way for a person to discover their personal optimal configuration

### Current Solutions and Their Limitations:

| Solution | Limitation |
|----------|------------|
| OpenDyslexic font | One-size-fits-all; no personalization |
| Browser accessibility settings | Limited parameters; no systematic optimization |
| E-reader settings | Trial and error; no guidance |
| Academic research | Group-level findings; not individualized |

---

## 3. Solution Overview

### Core Concept:
Apply **Design of Experiments (DOE)** methodology - commonly used in manufacturing and scientific research - to systematically optimize typography for individual users.

### How It Works:
```
┌─────────────────────────────────────────────────────────────────┐
│                    SCREENING PHASE                              │
│  Test 8+ parameters with minimal experiments (8-12 tests)       │
│  Identify which 2-4 factors significantly affect this user      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   OPTIMIZATION PHASE                            │
│  Focus on significant factors only                              │
│  Test at multiple levels to find optimal values (9-15 tests)    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   CONFIRMATION PHASE                            │
│  Validate the predicted optimal configuration (2-3 tests)       │
│  Compare to baseline with statistical confidence                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      OUTPUT PHASE                               │
│  Generate personalized profile, custom font, recommendations    │
└─────────────────────────────────────────────────────────────────┘
```

### Key Innovation:
- **Adaptive testing**: The system learns from each response and adjusts the experiment
- **Statistical rigor**: Uses p-values and confidence intervals to determine significance
- **Stopping criteria**: Knows when to stop testing (when further changes aren't significant)

---

## 4. User Data Collection Requirements

**Purpose:** Collect essential information from users to provide age-appropriate reading passages and personalized testing experience.

### 4.1 Required Data Fields

| Field | Purpose | How It's Used |
|-------|---------|---------------|
| **Age or Grade Level** | Select appropriate reading passages | 3rd grade passages for younger users, 8th grade for adults |
| **Consent Acknowledgment** | Legal requirement | Must accept terms before proceeding |

### 4.2 Optional Data Fields (Improve Experience)

| Field | Options | Purpose | Privacy Level |
|-------|---------|---------|---------------|
| **Native Language** | English, Spanish, etc. | Future: multi-language support | Low |
| **Diagnosis Status** | "Diagnosed dyslexia", "Suspected", "Self-identified", "Testing for someone else" | Tailor messaging, research data | Medium |
| **Who is this for?** | "Myself", "My child", "My student", "Someone I care for" | Adjust language (you vs. they) | Low |
| **Current Accommodations** | Free text or checklist | Know what's already working | Medium |
| **Preferred Reading Medium** | "Mostly screen", "Mostly print", "Both equally" | Inform recommendations | Low |
| **Primary Use Case** | "School/Education", "Work", "Leisure reading", "All of the above" | Tailor final recommendations | Low |

### 4.3 Age/Grade Level Mapping for Passage Selection

| Age Range | Typical Grade | Passage Level to Use |
|-----------|---------------|---------------------|
| 6-8 years | K-2nd | Pre-reader or 1st grade |
| 8-10 years | 3rd-4th | 3rd grade (Flesch-Kincaid ~3.0) |
| 10-12 years | 5th-6th | 5th grade (Flesch-Kincaid ~5.0) |
| 12-14 years | 7th-8th | 7th grade (Flesch-Kincaid ~7.0) |
| 14+ years / Adults | 9th+ | 8th grade (Flesch-Kincaid ~8.0) |

**Implementation Note:** For children under 13, consider COPPA compliance requirements (see Legal section).

### 4.4 Data Collection UI Placement

```
Landing Page → [Get Started] → 
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ USER INTAKE FORM (Before any testing)                          │
│                                                                 │
│ REQUIRED:                                                       │
│ • Age range or grade level (dropdown)                           │
│ • "I accept the terms and understand this is not diagnostic"    │
│                                                                 │
│ OPTIONAL (expandable section):                                  │
│ • Diagnosis status                                              │
│ • Who is this for?                                              │
│ • Current accommodations                                        │
│ • [Font Clue Questions - existing Section 4.3]                  │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
Calibration → Testing → Results
```

### 4.5 Data Storage Considerations

| Data Type | Storage Approach | Retention |
|-----------|------------------|-----------|
| Age/Grade | Session only (no account) OR saved with account | Session: 30 days; Account: indefinite |
| Diagnosis status | Optional; anonymized for research | Research data: indefinitely |
| Test results | Linked to session | Session: 30 days; Account: indefinite |
| Custom font file | Temporary storage | 24 hours then deleted |

---

## 5. Legal Disclaimers & Compliance

**Purpose:** Protect users and the organization with clear, honest communication about what this tool is and isn't.

### 5.1 Required Disclaimers

#### 5.1.1 NOT A DIAGNOSTIC TOOL ⚠️

**Display Location:** Landing page, intake form, results page

**Suggested Wording:**
> **Important:** DyslexiaFont.org is **NOT a diagnostic tool** for dyslexia or any reading disorder. Only qualified professionals (psychologists, educational specialists, or medical doctors) can diagnose dyslexia.
>
> This tool helps you discover typographic preferences that may improve your reading comfort. It does not assess, diagnose, or treat dyslexia.

#### 5.1.2 Experimental Nature

**Display Location:** Landing page footer, intake form

**Suggested Wording:**
> **Experimental Tool:** DyslexiaFont.org provides experimental typography optimization based on published research. Individual results may vary significantly. The effectiveness of any typographic modification has not been clinically validated as a treatment for dyslexia.

#### 5.1.3 No Medical or Clinical Advice

**Display Location:** Footer, terms of service

**Suggested Wording:**
> **No Medical Advice:** This website does not provide medical, clinical, therapeutic, or educational advice. The information and tools provided are for informational and experimental purposes only. Always consult qualified professionals for advice about dyslexia, reading difficulties, or educational accommodations.

#### 5.1.4 No Warranty / As-Is

**Display Location:** Terms of service

**Suggested Wording:**
> **No Warranty:** DyslexiaFont.org is provided "as is" without warranty of any kind, express or implied. We make no guarantees about the accuracy of results, the effectiveness of generated fonts, or the suitability for any particular purpose.

#### 5.1.5 Research Basis Transparency

**Display Location:** About page, methodology section

**Suggested Wording:**
> **Based on Research:** Our approach is based on peer-reviewed research showing that typographic parameters like letter spacing, word spacing, and line height can improve reading for some individuals with dyslexia. However, research also shows that no single solution works for everyone—which is why we personalize.
>
> Key studies: Zorzi et al. (2012), Schneps et al. (2013), Rello & Baeza-Yates (2013). See our Research page for full citations.

### 5.2 Data Privacy Disclosures

#### 5.2.1 What We Collect

**Display Location:** Privacy policy, intake form summary

**Suggested Wording:**
> **Data We Collect:**
> - Age range or grade level (to select appropriate reading passages)
> - Optional: diagnosis status, reading preferences, accommodations
> - Test responses (your ratings of font samples)
> - Generated font preferences
>
> **We do NOT collect:** Your name, address, email (unless you create an account), or any personally identifiable information unless you voluntarily provide it.

#### 5.2.2 How We Use Data

**Suggested Wording:**
> **How We Use Your Data:**
> - To provide personalized font recommendations
> - To generate your custom font file
> - (With consent) Anonymized aggregate data may be used for research to improve dyslexia support tools

#### 5.2.3 Data Retention

**Suggested Wording:**
> **Data Retention:**
> - Anonymous sessions: Data deleted after 30 days
> - Accounts: Data retained until you delete your account
> - Custom font files: Stored temporarily (24 hours) for download, then deleted

### 5.3 Age-Related Compliance

#### 5.3.1 COPPA Considerations (Children Under 13 - USA)

If users under 13 may use the platform:

| Requirement | Implementation |
|-------------|----------------|
| Parental consent | Require parent email verification before child can proceed |
| Minimal data collection | Collect only age/grade; no PII for children |
| No persistent tracking | Session-only data for children |
| Clear privacy notice | Child-friendly language version |

**Alternative Approach:** Require age 13+ to use independently; under 13 must have parent/guardian present (honor system with "I am 13 or older OR using this with a parent/guardian" checkbox).

#### 5.3.2 GDPR Considerations (European Users)

| Requirement | Implementation |
|-------------|----------------|
| Lawful basis | Consent for optional data; legitimate interest for essential function |
| Right to erasure | "Delete my data" button |
| Data portability | Export results as PDF/JSON |
| Cookie consent | Cookie banner for analytics/tracking cookies |

### 5.4 Terms of Service Summary

Key clauses to include in full Terms of Service:

1. **Acceptance of Terms** - By using the site, you agree to these terms
2. **Service Description** - What the tool does and doesn't do
3. **User Responsibilities** - Accurate information, appropriate use
4. **Intellectual Property** - Generated fonts are for personal use; OpenDyslexic is under SIL OFL
5. **Disclaimers** - Not diagnostic, no warranty, no medical advice
6. **Limitation of Liability** - Platform not liable for outcomes
7. **Privacy Policy Reference** - Link to full privacy policy
8. **Modifications** - We may update terms with notice
9. **Governing Law** - Jurisdiction for disputes

### 5.5 Consent Checkboxes (Intake Form)

**Required:**
- [ ] I understand that DyslexiaFont.org is NOT a diagnostic tool for dyslexia and does not provide medical advice.
- [ ] I am 13 years or older, OR I am using this tool with a parent/guardian.

**Optional:**
- [ ] I consent to my anonymized test results being used for research to improve dyslexia support tools.

### 5.6 Footer Links

Every page should include footer links to:
- Terms of Service
- Privacy Policy
- Accessibility Statement
- Research/Methodology
- Contact

---

## 6. User Journey

### 4.1 Detailed Flow

```
START
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: LANDING PAGE                                            │
│ - Introduction to the platform                                  │
│ - Explanation of the process (~15-30 min total)                 │
│ - Privacy information                                           │
│ - "Get Started" CTA                                             │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: ONBOARDING QUESTIONNAIRE (Optional)                     │
│ - Age range                                                     │
│ - Dyslexia diagnosis status                                     │
│ - Current accommodations used                                   │
│ - Preferred reading device (screen/paper/both)                  │
│ - Baseline font preference                                      │
│ - **FONT CLUE QUESTIONS** (see Section 4.3)                     │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: CALIBRATION                                             │
│ - Adjust screen brightness to comfortable level                 │
│ - Set viewing distance                                          │
│ - Baseline reading test (establish personal baseline score)     │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: SCREENING TESTS (Phase 1)                               │
│ - 8-12 reading samples                                          │
│ - Each sample tests multiple parameters (orthogonal design)     │
│ - User rates each: 1-10 readability scale                       │
│ - ~5-8 minutes                                                  │
│                                                                 │
│ SYSTEM ANALYZES:                                                │
│ → Which parameters have statistically significant effects       │
│ → Filters down to 2-4 significant factors                       │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: OPTIMIZATION TESTS (Phase 2)                            │
│ - 9-15 reading samples (only significant factors)               │
│ - Tests at 3+ levels per factor                                 │
│ - May include interaction tests                                 │
│ - ~8-12 minutes                                                 │
│                                                                 │
│ SYSTEM ANALYZES:                                                │
│ → Optimal level for each significant factor                     │
│ → Checks for interaction effects (synergies)                    │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 6: CONFIRMATION TESTS (Phase 3)                            │
│ - 2-3 reading samples                                           │
│ - Compare predicted optimal vs. baseline                        │
│ - Statistical validation                                        │
│ - ~2-3 minutes                                                  │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 7: RESULTS DASHBOARD                                       │
│ - Summary of findings                                           │
│ - Visualization of parameter effects                            │
│ - Comparison: your optimal vs. baseline vs. population average  │
│ - Confidence level of results                                   │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 8: DOWNLOAD CENTER                                         │
│ - Custom font file (OTF/TTF/WOFF/WOFF2)                         │
│ - Installation instructions by OS                               │
│ - PDF report of personalized profile                            │
│ - Document settings recommendations                             │
│ - Optional: CSS snippet for web use                             │
└─────────────────────────────────────────────────────────────────┘
  │
  ▼
END (Optional: Create account to save results)
```

### 4.2 Time Estimates

| Phase | Tests | Time |
|-------|-------|------|
| Onboarding | - | 2 min |
| Calibration | 1 | 2 min |
| Screening | 8-12 | 5-8 min |
| Optimization | 9-15 | 8-12 min |
| Confirmation | 2-3 | 2-3 min |
| Results | - | 3 min |
| **Total** | **~25** | **~20-30 min** |

### 4.3 Font Clue Questionnaire (Finding Individual Hints)

**Purpose:** Gather information that may indicate which parameters to prioritize or explore more deeply for this individual. These questions help find "clues" about what might help.

**Questions:**

1. **Font Experience**
   - "Have you ever found a particular font noticeably easier to read than others?"
   - [ ] Yes, specify: _______
   - [ ] No, they all seem similar
   - [ ] Not sure

2. **Font Difficulty**
   - "Are there any fonts you find particularly difficult or uncomfortable to read?"
   - [ ] Yes, specify: _______
   - [ ] No
   - [ ] Not sure

3. **Confusable Letters**
   - "Which letters do you most often confuse or misread?" (Select all that apply)
   - [ ] b and d
   - [ ] p and q
   - [ ] m and n
   - [ ] w and m
   - [ ] a and o
   - [ ] c and e
   - [ ] Other: _______
   - [ ] None specifically

4. **Reading Challenges**
   - "What type of reading material is most challenging for you?"
   - [ ] Dense paragraphs (textbooks, articles)
   - [ ] Small print (footnotes, captions)
   - [ ] Handwritten text
   - [ ] All-caps text
   - [ ] Italic text
   - [ ] Screens (vs. paper)
   - [ ] Other: _______

5. **Visual Comfort**
   - "Do any of these visual factors affect your reading comfort?" (Select all that apply)
   - [ ] Text that feels "too close together"
   - [ ] Letters that seem to "jump" or move
   - [ ] Glare or brightness on screen
   - [ ] Black text on white background
   - [ ] Lines that seem too close together
   - [ ] Small words running together
   - [ ] None of these

6. **Known Preferences**
   - "Have you discovered any settings or adjustments that help you read better?"
   - Free text: _______

**How Clue Responses Guide Testing:**

| Clue Response | Testing Implication |
|---------------|---------------------|
| Prefers Comic Sans | May respond to informal style, unique letterforms |
| Confuses b/d frequently | Prioritize b/d distinction parameter |
| "Too close together" | Likely benefits from spacing; test extreme ranges |
| Letters "jump" | May have visual stress; consider contrast/color |
| Prefers larger text | Font size likely significant |
| Difficulty with dense text | Line height and spacing probably important |

---

## 5. Technical Architecture

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│                    (Next.js + React)                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │  Testing UI │ │  Results    │ │  Download   │               │
│  │  Component  │ │  Dashboard  │ │  Center     │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│  ┌─────────────────────────────────────────────┐               │
│  │     Font Preview Engine (opentype.js)       │               │
│  └─────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                 │
│                    (Node.js / Python)                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ DOE Engine  │ │  Font       │ │  Stats      │               │
│  │ (designs)   │ │  Generator  │ │  Analysis   │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│  ┌─────────────────────────────────────────────┐               │
│  │           User Session Manager              │               │
│  └─────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE                                 │
│                    (PostgreSQL)                                 │
│  - User sessions                                                │
│  - Test results                                                 │
│  - Generated fonts (temp storage)                               │
│  - Anonymized aggregate data (research)                         │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Technology Stack (Recommended)

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14 + TypeScript | SSR, great DX, easy deployment |
| **Styling** | Tailwind CSS | Rapid development, accessibility utilities |
| **State** | Zustand or React Context | Simple, lightweight |
| **Font Manipulation (Client)** | opentype.js | Browser-based font editing |
| **Font Manipulation (Server)** | Python fonttools | More powerful, fallback option |
| **Backend** | Node.js (Express) or Python (FastAPI) | TBD based on preference |
| **Statistics** | jStat (JS) or scipy (Python) | DOE calculations |
| **Database** | PostgreSQL | Robust, free, great for structured data |
| **ORM** | Prisma (Node) or SQLAlchemy (Python) | Type-safe queries |
| **Hosting** | Vercel (frontend) + Railway (backend) | Easy, scalable, free tier |
| **File Storage** | S3-compatible or local | Generated font files |

### 5.3 Repository Structure

```
DyslexiaFont.org/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/                # App router pages
│   │   ├── components/         # React components
│   │   │   ├── testing/        # Test interface components
│   │   │   ├── results/        # Results dashboard
│   │   │   └── common/         # Shared components
│   │   ├── lib/                # Utilities
│   │   │   ├── doe/            # Client-side DOE helpers
│   │   │   └── font/           # Font manipulation
│   │   └── styles/             # CSS/Tailwind
│   │
│   └── api/                    # Backend API
│       ├── routes/             # API endpoints
│       ├── services/           # Business logic
│       │   ├── doe/            # DOE engine
│       │   ├── font/           # Font generation
│       │   └── stats/          # Statistical analysis
│       └── models/             # Database models
│
├── packages/
│   ├── doe-engine/             # Shared DOE algorithms
│   ├── font-utils/             # Font manipulation utilities
│   └── types/                  # Shared TypeScript types
│
├── docs/                       # Documentation
├── research/                   # Scientific references
└── tests/                      # Test suites
```

---

## 6. DOE Engine Specifications

### 6.1 Overview

The DOE Engine is the intellectual core of the platform. It determines:
1. Which experiments to run
2. In what order
3. How to analyze results
4. When to stop testing

### 6.2 Phase 1: Screening Design

**Goal:** Test many parameters efficiently to identify which ones matter for this individual.

**Method:** Plackett-Burman Design or Fractional Factorial

**Example: 8-Factor Plackett-Burman (12 runs)**

| Run | LetterSpace | WordSpace | LineHeight | FontSize | xHeight | Weight | Width | Contrast |
|-----|-------------|-----------|------------|----------|---------|--------|-------|----------|
| 1   | +           | +         | -          | +        | +       | +      | -     | -        |
| 2   | -           | +         | +          | -        | +       | +      | +     | -        |
| 3   | -           | -         | +          | +        | -       | +      | +     | +        |
| 4   | +           | -         | -          | +        | +       | -      | +     | +        |
| 5   | -           | +         | -          | -        | +       | +      | -     | +        |
| 6   | -           | -         | +          | -        | -       | +      | +     | -        |
| 7   | +           | -         | -          | +        | -       | -      | +     | -        |
| 8   | +           | +         | -          | -        | -       | -      | -     | +        |
| 9   | +           | +         | +          | -        | -       | +      | -     | -        |
| 10  | -           | +         | +          | +        | -       | -      | -     | +        |
| 11  | +           | -         | +          | +        | +       | -      | -     | -        |
| 12  | -           | -         | -          | -        | -       | -      | -     | -        |

*(+ = high level, - = low level)*

**Analysis:**
```javascript
function calculateMainEffects(results, designMatrix) {
  const effects = {};
  
  for (const factor of factors) {
    const highLevelAvg = average(results.filter(r => r[factor] === '+'));
    const lowLevelAvg = average(results.filter(r => r[factor] === '-'));
    effects[factor] = highLevelAvg - lowLevelAvg;
  }
  
  return effects;
}

function calculatePValues(effects, results) {
  // Use t-test or ANOVA to determine significance
  // Returns p-value for each factor
}

function getSignificantFactors(pValues, threshold = 0.1) {
  return factors.filter(f => pValues[f] < threshold);
}
```

### 6.3 Phase 2: Optimization Design

**Goal:** Find the optimal levels for significant factors.

**Methods:**
- **Taguchi L9/L18** (for 3-4 factors at 3 levels)
- **Central Composite Design** (for Response Surface)
- **Box-Behnken Design** (alternative RSM)

**Example: L9 Taguchi for 3 Factors at 3 Levels**

| Run | LetterSpace | WordSpace | LineHeight |
|-----|-------------|-----------|------------|
| 1   | Low (0%)    | Low (0%)  | Low (100%) |
| 2   | Low (0%)    | Med (20%) | Med (135%) |
| 3   | Low (0%)    | High (40%)| High (170%)|
| 4   | Med (15%)   | Low (0%)  | Med (135%) |
| 5   | Med (15%)   | Med (20%) | High (170%)|
| 6   | Med (15%)   | High (40%)| Low (100%) |
| 7   | High (30%)  | Low (0%)  | High (170%)|
| 8   | High (30%)  | Med (20%) | Low (100%) |
| 9   | High (30%)  | High (40%)| Med (135%) |

**Signal-to-Noise Ratio:**
```javascript
function calculateSNRatio(responses, type = 'larger-is-better') {
  if (type === 'larger-is-better') {
    // S/N = -10 * log10(mean(1/y^2))
    return -10 * Math.log10(mean(responses.map(y => 1/(y*y))));
  }
  // Other types: smaller-is-better, nominal-is-best
}

function findOptimalLevels(snRatios) {
  // For each factor, find the level with highest S/N ratio
}
```

### 6.4 Phase 3: Confirmation

**Goal:** Validate that the predicted optimal actually works.

**Method:** 
1. Generate font with predicted optimal settings
2. User rates it vs. baseline
3. Statistical test (paired t-test) to confirm improvement

**Stopping Criteria:**
```javascript
function shouldContinueTesting(results) {
  // Stop if:
  // 1. Improvement is statistically significant (p < 0.05)
  // 2. Effect size is meaningful (Cohen's d > 0.5)
  // 3. Confidence interval doesn't include zero
  
  const improvement = results.optimal.mean - results.baseline.mean;
  const pValue = pairedTTest(results.optimal, results.baseline);
  const effectSize = cohensD(results.optimal, results.baseline);
  
  return {
    shouldStop: pValue < 0.05 && effectSize > 0.5,
    confidence: 1 - pValue,
    improvement: improvement
  };
}
```

### 6.5 Adaptive Logic

```javascript
class AdaptiveDOE {
  constructor() {
    this.phase = 'screening';
    this.results = [];
    this.significantFactors = [];
  }
  
  getNextExperiment() {
    switch (this.phase) {
      case 'screening':
        return this.getScreeningExperiment();
      case 'optimization':
        return this.getOptimizationExperiment();
      case 'confirmation':
        return this.getConfirmationExperiment();
      case 'complete':
        return null;
    }
  }
  
  submitResult(experimentId, score) {
    this.results.push({ experimentId, score });
    this.analyzeAndAdvance();
  }
  
  analyzeAndAdvance() {
    if (this.phase === 'screening' && this.isScreeningComplete()) {
      this.significantFactors = this.analyzeScreening();
      this.phase = 'optimization';
    } else if (this.phase === 'optimization' && this.isOptimizationComplete()) {
      this.optimalSettings = this.analyzeOptimization();
      this.phase = 'confirmation';
    } else if (this.phase === 'confirmation' && this.isConfirmationComplete()) {
      this.finalResults = this.analyzeConfirmation();
      this.phase = 'complete';
    }
  }
}
```

---

## 7. Font Generation Module

### 7.1 Overview

The font generation module modifies a base font (OpenDyslexic) according to optimized parameters.

### 7.2 Modifiable Parameters

| Parameter | How It's Modified | Technical Implementation |
|-----------|-------------------|-------------------------|
| Letter Spacing | Increase glyph advance width | `hmtx` table modification |
| Word Spacing | Increase space character width | Modify `space` glyph in `hmtx` |
| Line Height | Adjust ascender/descender/lineGap | `hhea` and `OS/2` tables |
| x-Height | Scale lowercase letters | Glyph outline transformation |
| **Glyph Weight** | Use Regular vs Bold font base | Load different base font file |
| Width | Scale glyph horizontally | Glyph outline transformation |

### 7.2.1 Glyph Weight Implementation

**What is Glyph Weight?**
OpenDyslexic uses "bottom-weighted" glyphs where letters are heavier at the bottom to help anchor them visually and reduce letter reversal confusion. The **Glyph Weight** parameter tests whether users prefer:
- **Standard weight** (OpenDyslexic Regular) - Default bottom-weighted design
- **Heavy weight** (OpenDyslexic Bold) - Increased stroke thickness throughout

**Technical Approach:**

For **testing phase** (CSS-based):
```css
.test-standard-weight { 
  font-family: 'OpenDyslexic'; 
  font-weight: 400; 
}
.test-heavy-weight { 
  font-family: 'OpenDyslexic'; 
  font-weight: 700; 
}
```

For **font generation** (when creating downloadable font):
```python
from fontTools.ttLib import TTFont

def create_weighted_font(weight_level, spacing_params, output_path):
    """
    Create font with specific weight and spacing.
    
    weight_level: 'standard' or 'heavy'
    spacing_params: dict with letter_spacing, word_spacing percentages
    """
    # Select base font based on weight
    if weight_level == 'heavy':
        base_font = "OpenDyslexic-Bold.otf"
    else:
        base_font = "OpenDyslexic-Regular.otf"
    
    font = TTFont(base_font)
    
    # Apply spacing modifications
    hmtx = font['hmtx']
    letter_mult = 1 + (spacing_params['letter_spacing'] / 100)
    word_mult = 1 + (spacing_params['word_spacing'] / 100)
    
    for glyph_name in hmtx.metrics:
        width, lsb = hmtx.metrics[glyph_name]
        if glyph_name == 'space':
            new_width = int(width * word_mult)
        else:
            new_width = int(width * letter_mult)
        hmtx.metrics[glyph_name] = (new_width, lsb)
    
    font.save(output_path)
```

**Why Not Programmatically Modify Stroke Width?**
True glyph outline modification (changing stroke thickness) requires:
- FontForge or similar outline editor
- Complex path manipulation algorithms
- Careful handling of curves and intersections

Using Regular vs Bold as weight variants is:
- ✅ Simpler and more reliable
- ✅ Produces professionally-designed glyphs
- ✅ Consistent across all characters
- ✅ Available in OpenDyslexic's existing font family

### 7.3 Implementation Approaches

**Client-Side (opentype.js):**
```javascript
import opentype from 'opentype.js';

async function modifyFont(baseFont, params) {
  const font = await opentype.load(baseFont);
  
  // Modify letter spacing
  if (params.letterSpacing !== 0) {
    for (const glyph of Object.values(font.glyphs.glyphs)) {
      glyph.advanceWidth *= (1 + params.letterSpacing / 100);
    }
  }
  
  // Modify word spacing
  if (params.wordSpacing !== 0) {
    const spaceGlyph = font.charToGlyph(' ');
    spaceGlyph.advanceWidth *= (1 + params.wordSpacing / 100);
  }
  
  // Generate downloadable font
  const arrayBuffer = font.toArrayBuffer();
  return new Blob([arrayBuffer], { type: 'font/opentype' });
}
```

**Server-Side (Python fonttools):**
```python
from fontTools.ttLib import TTFont

def modify_font(base_path, params, output_path):
    font = TTFont(base_path)
    
    # Modify letter spacing
    if params['letter_spacing'] != 0:
        hmtx = font['hmtx']
        for glyph_name in hmtx.metrics:
            width, lsb = hmtx.metrics[glyph_name]
            new_width = int(width * (1 + params['letter_spacing'] / 100))
            hmtx.metrics[glyph_name] = (new_width, lsb)
    
    # Modify line height
    if params['line_height'] != 100:
        hhea = font['hhea']
        factor = params['line_height'] / 100
        extra_space = int((hhea.ascent - hhea.descent) * (factor - 1))
        hhea.lineGap += extra_space
    
    font.save(output_path)
```

### 7.4 Font File Formats

| Format | Use Case | Size |
|--------|----------|------|
| OTF | Desktop installation | ~200KB |
| TTF | Desktop (Windows preferred) | ~200KB |
| WOFF | Web use (modern browsers) | ~100KB |
| WOFF2 | Web use (best compression) | ~80KB |

### 7.5 Screen vs. Print: Research Findings

**Key Decision: Screen-only testing is appropriate for DyslexiaFont.org**

| Research | Finding |
|----------|---------|
| Schneps et al. (2013) | E-readers (screens) were MORE effective than paper for dyslexic readers |
| General accessibility | Screens allow dynamic customization not possible with print |
| User context | Most users will read on screens; print is secondary use case |

**Conclusion:** There is no strong evidence that print is fundamentally better than screen for dyslexia. What matters are the typographic parameters (spacing, size, etc.) which help on BOTH mediums. Users can export their optimized font for print use after testing on screen.

### 7.6 CSS-Based Parameter Testing (Recommended Approach)

**Problem Discovered:** Font files with baked-in parameters can render inconsistently across browsers due to:
- `@font-face` loading failures (CORS, path issues)
- Browser CSS overrides (line-height, letter-spacing)
- Subpixel rendering differences

**Solution: Hybrid CSS + Font Approach**

```
┌────────────────────────────────────────────────────────────────┐
│               TESTING PHASE (CSS-Based)                        │
│                                                                │
│  Base font: OpenDyslexic loaded once                           │
│  Parameters applied via CSS variables (real-time, reliable)    │
│                                                                │
│  .test-passage {                                               │
│    font-family: 'OpenDyslexic';                                │
│    letter-spacing: var(--letter-space);  /* Controllable */    │
│    word-spacing: var(--word-space);      /* Controllable */    │
│    line-height: var(--line-height);      /* Controllable */    │
│  }                                                             │
└────────────────────────────────────────────────────────────────┘
                              │
                              │ After optimization complete
                              ▼
┌────────────────────────────────────────────────────────────────┐
│               DOWNLOAD PHASE (Font-Based)                      │
│                                                                │
│  Take optimal values (e.g., letter: +22%, word: +35%)          │
│  Generate custom font file with values baked in                │
│  Preview the actual font file before download                  │
│  User downloads OTF/TTF/WOFF2 for use in other apps            │
└────────────────────────────────────────────────────────────────┘
```

**Implementation:**

```typescript
// CSS-based parameter application for testing
interface FontParameters {
  letterSpacing: number;  // percentage, e.g., 25 = +25%
  wordSpacing: number;    // percentage
  lineHeight: number;     // percentage, e.g., 170 = 170%
  fontSize: number;       // points
}

function applyParametersToElement(element: HTMLElement, params: FontParameters) {
  // Convert percentages to CSS values
  element.style.letterSpacing = `${params.letterSpacing / 100}em`;
  element.style.wordSpacing = `${params.wordSpacing / 100}em`;
  element.style.lineHeight = `${params.lineHeight / 100}`;
  element.style.fontSize = `${params.fontSize}pt`;
}

// React component example
function TestPassage({ parameters, text }: Props) {
  return (
    <div 
      style={{
        fontFamily: 'OpenDyslexic, sans-serif',
        letterSpacing: `${parameters.letterSpacing / 100}em`,
        wordSpacing: `${parameters.wordSpacing / 100}em`,
        lineHeight: parameters.lineHeight / 100,
        fontSize: `${parameters.fontSize}pt`,
      }}
    >
      {text}
    </div>
  );
}
```

**Benefits of This Approach:**
1. ✅ **Guaranteed consistent rendering** during testing
2. ✅ **Real-time parameter adjustments** without regenerating fonts
3. ✅ **Faster test iteration** (no font file generation per experiment)
4. ✅ **Users still get custom font file** for download/installation
5. ✅ **Font file works everywhere** (print, Word, other apps)

### 7.7 Font Rendering Verification

Before presenting a generated font for download, verify it renders correctly:

```typescript
import FontFaceObserver from 'fontfaceobserver';

async function loadAndVerifyFont(fontUrl: string, fontName: string): Promise<boolean> {
  // Dynamically create @font-face
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: '${fontName}';
      src: url('${fontUrl}') format('opentype');
      font-display: block;
    }
  `;
  document.head.appendChild(style);
  
  // Wait for font to load
  const observer = new FontFaceObserver(fontName);
  try {
    await observer.load(null, 5000); // 5 second timeout
    return true;
  } catch (e) {
    console.error('Font failed to load:', fontName);
    return false;
  }
}
```

---

## 8. Parameters to Optimize

### 8.1 Tier 1: Strong Scientific Evidence (Always Test)

| Parameter | Range | Default | Evidence |
|-----------|-------|---------|----------|
| **Letter Spacing** | -10% to +40% | 0% | Zorzi et al. 2012: 20% reading improvement |
| **Word Spacing** | -10% to +60% | 0% | Multiple studies confirm benefit |
| **Line Height** | 100% to 200% | 130% | Schneps et al. 2013: 27% improvement |
| **Font Size** | 12pt to 24pt | 16pt | Rello 2013: optimal 14-18pt |
| **Glyph Weight** | Standard to Heavy | Standard | Tests stroke thickness preference; anchoring effect |

#### Testing Strategy: Font-Based vs Document-Based Parameters

| Parameter | Testing Method | Rationale |
|-----------|----------------|-----------|
| Letter Spacing | **Font modification** | Baked into font for consistent cross-application use |
| Word Spacing | **Font modification** | Baked into font for consistent cross-application use |
| Glyph Weight | **Font modification** | Requires different base font file (Regular vs Bold) |
| Line Height | **CSS/Document settings** | Easily adjusted in Word/CSS without font modification |
| Font Size | **CSS/Document settings** | User-controllable in all applications |

> **Strategy Rationale:** Parameters that require font file modification (Letter Spacing, Word Spacing, Glyph Weight) should be tested first via font variants. Parameters easily adjustable via document settings (Line Height, Font Size) can be deferred to Phase 2 or provided as recommendations alongside the custom font.

### 8.2 Tier 2: Moderate Evidence (Screen for Significance)

| Parameter | Range | Default | Evidence |
|-----------|-------|---------|----------|
| **x-Height** | 80% to 120% | 100% | May affect letter recognition |
| **Contrast** | Low to High | Standard | Irlen syndrome research |
| **Width** | Condensed to Extended | Normal | Limited research |

### 8.3 Tier 2b: Glyph Shape Modifications (FontForge Required)

These parameters modify the actual glyph outlines, not just spacing. They require FontForge for implementation.

| Parameter | Range | Description | Evidence |
|-----------|-------|-------------|----------|
| **x-Height** | 80% to 140% | Scale lowercase letter height | Used by Read Regular; may improve recognition |
| **Counter Size** | 80% to 140% | Scale "holes" in letters (a, e, o, p, etc.) | Reduces crowding effect |
| **Bottom Weighting** | 50% to 150% | OpenDyslexic's signature feature | Divisive - helps some, not others |
| **b/d Distinction** | None to Extreme | Add asymmetric serifs/markers | Most common confusion reported |
| **Variable Stroke** | Uniform to Calligraphic | Thick/thin variation like handwriting | Used by Sylexiad font |

**Implementation Notes:**
- These modifications require FontForge Python scripting
- Test at EXTREME levels (30-50% changes) during screening
- May have interaction effects with spacing parameters

### 8.4 Future Parameters Parking Lot

Parameters to explore in future phases, not currently prioritized:

| Parameter | Category | Notes | Evidence Level |
|-----------|----------|-------|----------------|
| **Color Differentiation** | Visual | Different colors for confusable letters (e.g., blue 'b') | Theoretical |
| **Background Color** | Visual | Yellow/cream backgrounds often preferred | Moderate (Irlen) |
| **Foreground Color** | Visual | Dark blue sometimes preferred over black | Moderate |
| **Ascender/Descender Ratio** | Glyph Shape | Adjust relative heights | Limited |
| **Letter Slant** | Glyph Shape | Slight italic or reverse slant | Theoretical |
| **Serif vs Sans-serif** | Font Style | Research is mixed | Moderate |
| **Handwritten Style** | Font Style | Comic Sans-like informal style | Anecdotal positive |
| **Bold Punctuation** | Glyph Weight | Heavier periods/commas for sentence parsing | Used by Dyslexie font |
| **Letter Width Proportions** | Glyph Shape | Narrow vs wide letterforms | Limited |
| **Reading Ruler/Line Focus** | UI Feature | Highlight current line, dim others | Moderate |
| **Text-to-Speech Integration** | Multimodal | Combined visual + audio | Strong for some |

---

## 9. UI/UX Requirements

### 9.1 Design Principles

1. **Accessibility First** - WCAG 2.1 AA minimum, AAA preferred
2. **Dyslexia-Friendly** - Use OpenDyslexic for interface text
3. **Minimal Cognitive Load** - One task per screen
4. **Clear Progress** - Always show where user is in process
5. **Encouraging** - Positive, supportive language
6. **No Time Pressure** - No countdown timers

### 9.2 Key Screens

#### Landing Page
- Hero section with clear value proposition
- Brief explanation (video option)
- "Get Started" CTA prominent
- FAQ accordion
- Privacy/accessibility commitments

#### Testing Interface
- Large, centered reading passage
- Clear font sample label
- Simple rating mechanism (1-10 slider or buttons)
- Progress indicator
- "Take a break" option
- Minimal distractions

#### Results Dashboard
- Summary card with key findings
- Bar chart: effect of each parameter
- Before/after comparison
- Confidence indicators
- Plain language explanations

#### Download Center
- Font file download buttons (multiple formats)
- Installation guides (OS-specific)
- PDF report download
- CSS snippet for web
- "Share results" (optional)

### 9.3 Accessibility Requirements

- [ ] Keyboard navigation for all interactions
- [ ] Screen reader compatibility
- [ ] Color contrast ratios (4.5:1 minimum)
- [ ] Focus indicators
- [ ] Resizable text
- [ ] No flashing content
- [ ] Clear error messages
- [ ] Form labels and instructions

---

## 10. Database Schema

### 10.1 Core Tables

```sql
-- Users (optional - for saved sessions)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Sessions (tracks a single optimization run)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id), -- nullable for anonymous
  session_token VARCHAR(255) UNIQUE NOT NULL,
  current_phase VARCHAR(50) DEFAULT 'onboarding',
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  is_complete BOOLEAN DEFAULT FALSE
);

-- Onboarding Responses
CREATE TABLE onboarding_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  age_range VARCHAR(50),
  dyslexia_diagnosis VARCHAR(50),
  current_accommodations TEXT[],
  preferred_device VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Experiments (individual tests shown to user)
CREATE TABLE experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  phase VARCHAR(50) NOT NULL, -- 'screening', 'optimization', 'confirmation'
  experiment_number INTEGER NOT NULL,
  parameters JSONB NOT NULL, -- {"letterSpacing": 25, "wordSpacing": 0, ...}
  created_at TIMESTAMP DEFAULT NOW()
);

-- Responses (user ratings for each experiment)
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID REFERENCES experiments(id) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 10),
  response_time_ms INTEGER, -- how long user took to rate
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Results (final analysis for each session)
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  significant_factors TEXT[] NOT NULL,
  optimal_parameters JSONB NOT NULL,
  baseline_score DECIMAL(4,2),
  optimal_score DECIMAL(4,2),
  improvement_percent DECIMAL(5,2),
  confidence_level DECIMAL(4,3),
  p_value DECIMAL(6,5),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generated Fonts (temporary storage for downloads)
CREATE TABLE generated_fonts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  format VARCHAR(10) NOT NULL, -- 'otf', 'ttf', 'woff', 'woff2'
  file_path VARCHAR(500) NOT NULL,
  parameters JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '24 hours'
);

-- Aggregate Research Data (anonymized)
CREATE TABLE research_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  age_range VARCHAR(50),
  dyslexia_diagnosis VARCHAR(50),
  significant_factors TEXT[],
  optimal_parameters JSONB,
  improvement_percent DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 10.2 Indexes

```sql
CREATE INDEX idx_sessions_token ON sessions(session_token);
CREATE INDEX idx_experiments_session ON experiments(session_id);
CREATE INDEX idx_responses_experiment ON responses(experiment_id);
CREATE INDEX idx_results_session ON results(session_id);
```

---

## 11. API Endpoints

### 11.1 Session Management

```
POST   /api/sessions              # Create new session
GET    /api/sessions/:token       # Get session state
PATCH  /api/sessions/:token       # Update session (advance phase)
```

### 11.2 Testing Flow

```
GET    /api/sessions/:token/next-experiment    # Get next experiment
POST   /api/sessions/:token/responses          # Submit experiment response
GET    /api/sessions/:token/progress           # Get current progress
```

### 11.3 Results

```
GET    /api/sessions/:token/results            # Get analysis results
GET    /api/sessions/:token/report             # Generate PDF report
```

### 11.4 Font Generation

```
POST   /api/sessions/:token/generate-font      # Generate custom font
GET    /api/sessions/:token/fonts/:format      # Download font file
```

### 11.5 Example Payloads

**Create Session Response:**
```json
{
  "sessionId": "uuid",
  "sessionToken": "abc123xyz",
  "currentPhase": "onboarding",
  "totalPhases": 5
}
```

**Next Experiment Response:**
```json
{
  "experimentId": "uuid",
  "experimentNumber": 3,
  "totalInPhase": 12,
  "phase": "screening",
  "parameters": {
    "letterSpacing": 25,
    "wordSpacing": 0,
    "lineHeight": 170,
    "fontSize": 16,
    "weight": "normal"
  },
  "passage": {
    "text": "Max was a small brown dog...",
    "wordCount": 180,
    "readingLevel": "3rd grade"
  }
}
```

**Results Response:**
```json
{
  "complete": true,
  "significantFactors": ["letterSpacing", "wordSpacing"],
  "optimalParameters": {
    "letterSpacing": 22,
    "wordSpacing": 35,
    "lineHeight": 145,
    "fontSize": 16
  },
  "improvement": {
    "baselineScore": 5.0,
    "optimalScore": 7.8,
    "percentImprovement": 56,
    "confidence": 0.95,
    "pValue": 0.012
  },
  "factorEffects": {
    "letterSpacing": { "effect": 1.8, "pValue": 0.02, "significant": true },
    "wordSpacing": { "effect": 1.2, "pValue": 0.08, "significant": true },
    "lineHeight": { "effect": 0.4, "pValue": 0.45, "significant": false }
  }
}
```

---

## 12. Development Phases

### 🚀 MVP Strategy: Platform-First Approach (NEW - January 16, 2026)

**Key Decision:** Rather than completing John Doe's testing separately, we will build an MVP platform first and use John Doe as "Alpha User #1".

**Benefits:**
- No divergence between pilot methodology and platform
- John Doe tests with the same UI everyone else will use
- Single codebase, no wasted effort

**Reusable Assets from John Doe Project:**
| Asset | Source | Platform Use |
|-------|--------|--------------|
| 5-font DOE design | JOHN_DOE_FONT_PROJECT.md §4 | Screening engine |
| Effect calculation formulas | JOHN_DOE_FONT_PROJECT.md §6 | Analysis module |
| 3rd grade passages | test_document.html | Passage bank |
| Rating protocol (1-10) | JOHN_DOE_FONT_PROJECT.md §5 | UI design |
| Base fonts | john-doe-font/font/ | Font generation |

**MVP Timeline:** ~12 days to John Doe alpha test
- Days 1: Project setup
- Days 2-4: Testing UI
- Days 5-6: DOE engine
- Day 7: Results display
- Days 8-10: Custom font generation (opentype.js)
- Days 11-12: Deploy + John Doe test

**Tech Stack (MVP):** Next.js 14, Tailwind, opentype.js, localStorage (no backend), Vercel

See **Appendix E: MVP Execution Plan** for detailed implementation.

---

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up monorepo structure
- [ ] Initialize Next.js frontend
- [ ] Initialize backend API
- [ ] Set up PostgreSQL database
- [ ] Create basic routing and layouts
- [ ] Implement session management

### Phase 2: DOE Engine Core (Weeks 3-4)
- [ ] Implement Plackett-Burman design generator
- [ ] Implement Taguchi L9/L18 design generator
- [ ] Build statistical analysis functions
- [ ] Create adaptive phase transitions
- [ ] Write comprehensive tests

### Phase 3: Font Module (Weeks 5-6)
- [ ] Integrate opentype.js for client-side
- [ ] Implement all parameter modifications
- [ ] Add font format conversion
- [ ] Build download functionality
- [ ] Test across browsers

### Phase 4: Testing UI (Weeks 7-8)
- [ ] Build reading test component
- [ ] Create rating interface
- [ ] Implement progress tracking
- [ ] Add accessibility features
- [ ] Mobile responsive design

### Phase 5: Results & Polish (Weeks 9-10)
- [ ] Build results dashboard
- [ ] Create data visualizations
- [ ] Generate PDF reports
- [ ] Document settings recommendations
- [ ] User testing and iteration

### Phase 6: Launch Prep (Weeks 11-12)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Accessibility audit
- [ ] Documentation
- [ ] Deployment configuration
- [ ] Beta testing

---

## 13. Open Questions

### Technical Decisions Needed:

1. **Backend Language**: Node.js (JavaScript consistency) or Python (better stats libraries)?
   - Recommendation: Node.js with jStat, fallback to Python microservice if needed

2. **Font Generation Location**: Client-side only, server-side only, or hybrid?
   - Recommendation: Client-side primary (faster), server-side backup

3. **User Accounts**: Required or optional?
   - Recommendation: Optional - allow anonymous completion, accounts for saving

4. **Reading Passages**: Fixed set, user-provided, or AI-generated?
   - Recommendation: Fixed, curated set at multiple reading levels

5. **Data Retention**: How long to keep session data?
   - Recommendation: 30 days for anonymous, indefinite for accounts

### Product Decisions Needed:

1. **Monetization**: Completely free, donations, or premium features?
2. **Research Data**: Collect anonymized aggregate data for academic research?
3. **Partnerships**: E-reader integrations, browser extensions, school programs?
4. **Localization**: Multi-language support timeline?

---

## 14. Research References

### Key Studies:

1. **Zorzi et al. (2012)** - "Extra-large letter spacing improves reading in dyslexia"
   - PNAS, 109(28), 11455-11459
   - Finding: 20% improvement with increased spacing

2. **Rello & Baeza-Yates (2013)** - "Good Fonts for Dyslexia"
   - ASSETS '13 Conference
   - Finding: Sans-serif, larger sizes preferred

3. **Schneps et al. (2013)** - "E-Readers Are More Effective than Paper"
   - PLOS ONE
   - Finding: Short lines, larger text improve reading

4. **Wery & Diliberto (2017)** - "The effect of a specialized dyslexia font"
   - Annals of Dyslexia, 67(3), 342-358
   - Finding: OpenDyslexic not significantly better than Arial

5. **Kuster et al. (2018)** - "Dyslexie Font Does Not Benefit Reading"
   - Annals of Dyslexia, 68(2), 122-142
   - Finding: Commercial dyslexia fonts show no significant advantage

### Key Insight from Research:
> "Individual differences are large... what works for one person may not work for another."

This supports our personalized approach!

---

## Appendix A: Passage Bank

### A.1 Passage Content Guidelines

**Approved Topics:**
| Category | Examples |
|----------|----------|
| Nature & Animals | Wildlife, pets, gardens, weather, seasons |
| Everyday Activities | Cooking, sports, hobbies, school, family |
| Simple Science | Space, oceans, plants, simple technology |
| Adventure/Exploration | Travel, discovery, outdoor activities |
| Community & Helpers | Firefighters, teachers, neighbors, teamwork |

**Topics to Avoid:**
| Category | Reason |
|----------|--------|
| Violence/Conflict | May cause distress; inappropriate for children |
| Politics/Religion | Controversial; may bias responses |
| Death/Illness | Potentially triggering |
| Cultural-Specific References | May disadvantage some readers (e.g., US holidays) |
| Complex Technical Jargon | Confounds typography testing with comprehension difficulty |
| Food/Eating (excessive) | Sensitivity to eating disorders |

**Genre Mix:**
- **70% Narrative Fiction** - Engaging stories, easier to follow
- **30% Simple Non-fiction** - Factual content about nature, science, how things work

### A.2 Passage Selection Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Reading Level** | Match user's age/grade (Flesch-Kincaid verified) |
| **Word Count** | 50-100 words (see Appendix C) |
| **Vocabulary** | Grade-appropriate, no specialized terms |
| **Prior Knowledge** | Should not require topic expertise |
| **Cultural Neutrality** | Avoid idioms, regional expressions, cultural assumptions |
| **Complete Thought** | Passage should feel complete, not abruptly cut off |
| **Character Names** | Use diverse, easy-to-read names |

### A.3 Passage Bank Size Requirements

| Reading Level | Minimum Passages | Rationale |
|---------------|------------------|-----------|
| 3rd Grade | 30+ | ~25 tests + buffer for randomization |
| 5th Grade | 30+ | Same |
| 8th Grade | 30+ | Same |
| **Total** | **90+** | Ensures no repeat passages during testing |

**Why No Repeats?**
- Repeated passages allow memorization, confounding results
- Variety maintains engagement over 25+ tests
- Different passages reduce order effects

### A.4 Example Passages

#### 3rd Grade Level (Flesch-Kincaid ~3.0)

**Passage 1: "Max and Whiskers" (Fiction)**
> Max was a small brown dog who lived on a farm. Every morning, he would wake up early and run outside to play. He loved to chase the chickens around the yard. The chickens would cluck and flap their wings, but Max never hurt them. He just wanted to have fun.

*(72 words)*

**Passage 2: "The Red Bike" (Fiction)**
> Emma got a new red bike for her birthday. It was shiny and had a bell on the handlebars. She rode it to the park every day after school. Her friends liked to race with her on the path by the pond. Emma always wore her helmet, even for short rides.

*(55 words)*

**Passage 3: "How Bees Make Honey" (Non-fiction)**
> Bees are busy insects that live together in a hive. They fly from flower to flower collecting a sweet liquid called nectar. Back at the hive, they turn the nectar into honey. Bees store the honey in small wax rooms. One hive can make many jars of honey in a single summer.

*(56 words)*

#### 5th Grade Level (Flesch-Kincaid ~5.0)

**Passage 4: "The Old Lighthouse" (Fiction)**
> The lighthouse stood on a rocky cliff overlooking the ocean. For over a hundred years, its bright light had guided ships safely through the dangerous waters below. Sarah loved to visit her grandfather who was the lighthouse keeper. He would tell her stories about storms and the ships he had helped save.

*(56 words)*

**Passage 5: "The Tree House" (Fiction)**
> Marcus and his sister spent all summer building a tree house in the old oak behind their house. They used wooden planks from the hardware store and nails from their dad's workshop. When it was finished, they hung a rope ladder and painted the door bright blue. It became their favorite place to read.

*(58 words)*

**Passage 6: "Why the Sky Looks Blue" (Non-fiction)**
> The sky appears blue because of how sunlight travels through our atmosphere. Sunlight contains all the colors of the rainbow mixed together. When it hits tiny molecules in the air, blue light scatters more than other colors. This scattered blue light reaches our eyes from all directions, making the whole sky look blue.

*(57 words)*

#### 8th Grade Level (Flesch-Kincaid ~8.0)

**Passage 7: "The Discovery" (Fiction)**
> Dr. Chen examined the unusual specimen under her microscope, her eyes widening with each adjustment of the magnification. The cellular structure was unlike anything she had encountered in her twenty years of marine biology research. If her initial observations were correct, this organism could change everything scientists believed about deep-sea ecosystems.

*(54 words)*

**Passage 8: "The Storm Chasers" (Fiction)**
> The research van raced along the empty highway as the massive thunderstorm approached from the west. Maya checked the radar display while her colleague prepared the weather instruments. They had been tracking this storm system for three days across two states. Today's data could help predict future tornadoes with greater accuracy.

*(53 words)*

**Passage 9: "Ocean Currents" (Non-fiction)**
> Ocean currents are like rivers flowing through the sea. They move massive amounts of water around the globe, carrying warm water from the equator toward the poles and cold water back again. These currents affect weather patterns, marine life migration, and even the oxygen levels in different parts of the ocean.

*(54 words)*

### A.5 Passage Development Process

**For Creating New Passages:**
1. Write draft at target reading level
2. Verify Flesch-Kincaid score (use online calculator or Word)
3. Check word count (50-100 words)
4. Review against content guidelines (A.1)
5. Review against selection criteria (A.2)
6. Test with 2-3 readers at target age for comprehension
7. Add to passage bank with metadata

**Metadata to Track:**
```json
{
  "id": "3g-fiction-001",
  "title": "Max and Whiskers",
  "readingLevel": "3rd grade",
  "fleschKincaid": 3.2,
  "wordCount": 72,
  "genre": "fiction",
  "topic": "animals",
  "hasBeenUsed": false
}
```

---

## Appendix C: Passage Length Research Justification

**Decision: 50-100 words per passage (v1.6)**

### Research Support for Shorter Passages:

| Source | Passage Length Used | Context |
|--------|---------------------|---------|
| Zorzi et al. (2012) | ~24 words | Landmark letter spacing study; very short passages effective |
| Running records (education) | 100-150 words | Standard for reading assessment |
| Eye-tracking studies | 50-100 words | Common in typography research |
| Flesch-Kincaid | 100+ words | Minimum for reliable readability scoring |

### Rationale for 50-100 Words:

1. **Reduced fatigue** - Dyslexic readers tire faster; shorter passages sustain engagement
2. **Research precedent** - Major studies (Zorzi) used even shorter passages successfully
3. **Sufficient for preference rating** - Users are rating subjective comfort, not reading speed; 2-4 sentences provide enough exposure
4. **Practical testing load** - At 50-100 words × 25 tests = 1,250-2,500 total words vs. previous 4,000-6,000

### Total Reading Load Comparison:

| Version | Words/Passage | Tests | Total Reading |
|---------|---------------|-------|---------------|
| v1.5 | ~200 | 25 | 5,000 words |
| v1.6 | 50-100 | 25 | 1,250-2,500 words |
| **Reduction** | - | - | **50-75% less reading** |

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| **DOE** | Design of Experiments - statistical methodology for efficient testing |
| **Plackett-Burman** | Screening design for identifying significant factors with minimal runs |
| **Taguchi Method** | Robust design methodology using orthogonal arrays |
| **RSM** | Response Surface Methodology - optimization technique |
| **Main Effect** | The individual impact of a single factor |
| **Interaction Effect** | Combined effect of two or more factors together |
| **p-value** | Probability that results occurred by chance (lower = more significant) |
| **S/N Ratio** | Signal-to-Noise ratio - measure of quality in Taguchi methods |
| **OTF** | OpenType Font format |
| **WOFF** | Web Open Font Format |

---

## Appendix D: Design Decisions Log

**Purpose:** Document significant design decisions, including rejected features, to preserve institutional knowledge and prevent revisiting settled questions.

### D.1 User Topic Preference Feature - REJECTED

**Considered:** January 16, 2026  
**Decision:** Do not implement user topic selection for passages  
**Status:** ❌ Rejected

**Options Evaluated:**

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| **A. Topic selection from list** | User picks from curated topics (Nature, Sports, Science, etc.) | More engaging; user feels ownership | Quality still controlled |
| **B. AI-generated passages** | User types topic, AI generates passage on the fly | Maximum personalization; unlimited variety | Quality control risk; Flesch-Kincaid inconsistency; API cost/latency |
| **C. No topic preference** | Use neutral, curated passages only | Clean methodology; no confounding | Less engaging; may feel impersonal |

**Chosen:** Option C - No topic preference

**Rationale:**
1. **Confounding Risk:** Topic familiarity affects reading ease independent of typography. A user reading about their favorite hobby may rate it as "easier" even with poor typography.
2. **Methodology Concern:** Inconsistent topic familiarity across font variants could bias comfort ratings and introduce noise into DOE analysis.
3. **Research Alignment:** Major dyslexia typography studies (Zorzi et al., 2012) used neutral passages without user topic selection.
4. **Engagement Trade-off Acceptable:** While user-selected topics could increase engagement, the 50-100 word passage length (v1.6) already reduces fatigue. Curated topic variety (nature, adventure, science) maintains interest without introducing confounds.

**Potential Future Reconsideration:**
- If user feedback strongly indicates disengagement due to topics, consider Option A (curated list selection) with the caveat that the same topic should be used across all font variants for a given user.

---

---

## Appendix E: MVP Execution Plan

**Added:** January 16, 2026  
**Goal:** Build platform MVP, use John Doe as Alpha User #1

### E.1 MVP Phase 0: Project Setup (Day 1)

| Task | Details |
|------|---------|
| Create project folder | `dyslexiafont.org/` in font projects |
| Initialize Next.js + TypeScript | `npx create-next-app@latest` |
| Set up Tailwind CSS | Styling framework |
| Copy base fonts | OpenDyslexic Regular + Bold → `public/fonts/` |
| Copy reading passages | Extract from john-doe-font/test_document.html |
| Install opentype.js | `npm install opentype.js` |

### E.2 MVP Phase 1: Testing UI (Days 2-4)

- Landing page with "Start Test" button
- Baseline calibration screen (score 5 = reference)
- Test passage component with CSS-applied parameters
- Rating input (1-10)
- Progress indicator

### E.3 MVP Phase 2: DOE Engine (Days 5-6)

**5-Font Design Matrix:**
| Font | Letter Space | Word Space | Weight |
|------|--------------|------------|--------|
| 1 (Baseline) | 0% | 0% | Standard |
| 2 | +25% | 0% | Standard |
| 3 | 0% | +40% | Standard |
| 4 | 0% | 0% | Heavy |
| 5 | +25% | +40% | Heavy |

**Effect Calculations:**
```javascript
const letterEffect = (scores[2] + scores[5]) / 2 - (scores[1] + scores[3] + scores[4]) / 3;
const wordEffect = (scores[3] + scores[5]) / 2 - (scores[1] + scores[2] + scores[4]) / 3;
const weightEffect = (scores[4] + scores[5]) / 2 - (scores[1] + scores[2] + scores[3]) / 3;
```

### E.4 MVP Phase 3: Results Display (Day 7)

| Effect Size | Meaning |
|-------------|---------|
| > +2.0 | "Strongly helps your reading" |
| +1.0 to +2.0 | "Likely helpful" |
| -1.0 to +1.0 | "May not matter for you" |
| < -1.0 | "May hurt your reading" |

### E.5 MVP Phase 4: Custom Font Generation (Days 8-10)

Using opentype.js client-side:
1. Load base font (Regular or Bold based on weight effect)
2. Apply letter spacing (modify glyph advance widths)
3. Apply word spacing (modify space character)
4. Generate downloadable OTF blob

### E.6 MVP Phase 5: John Doe Alpha Test (Days 11-12)

1. Deploy to Vercel
2. John Doe completes Phase 1 via platform
3. Downloads personalized font
4. Collect feedback for platform improvements

### E.7 MVP Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 + TypeScript |
| Styling | Tailwind CSS |
| Font | opentype.js |
| State | localStorage (no backend) |
| Hosting | Vercel |

### E.8 React Component Structure

```
app/
├── page.tsx                    # Landing page with "Start Test" button
├── test/
│   ├── page.tsx                # Main test flow controller
│   ├── components/
│   │   ├── CalibrationScreen.tsx    # Baseline setup (Font 1 = reference)
│   │   ├── TestPassage.tsx          # Displays passage with CSS parameters
│   │   ├── RatingInput.tsx          # 5-point emoji rating buttons
│   │   └── ProgressBar.tsx          # Shows test progress (1/5, 2/5, etc.)
│   └── hooks/
│       └── useDOEEngine.ts          # State machine for DOE flow
├── results/
│   ├── page.tsx                # Results display
│   └── components/
│       ├── EffectChart.tsx          # Bar chart of parameter effects
│       └── DownloadButton.tsx       # Font file download
└── lib/
    ├── doe/
    │   ├── designMatrix.ts          # 5-font DOE matrix
    │   └── calculateEffects.ts      # Effect calculation formulas
    ├── font/
    │   └── generateFont.ts          # opentype.js font generation
    └── passages/
        └── passageBank.ts           # Passage data (TypeScript)
```

### E.9 localStorage Schema

```typescript
interface SessionData {
  // Session metadata
  sessionId: string;           // UUID
  startedAt: string;           // ISO timestamp
  currentPhase: 'calibration' | 'testing' | 'results';
  currentTest: number;         // 0-4 for 5 tests
  
  // User info (optional)
  ageRange?: string;
  
  // Test assignments (randomized order)
  testOrder: number[];         // e.g., [3, 1, 5, 2, 4] (Font IDs)
  passageAssignments: string[]; // Passage IDs for each test
  
  // Results (scores use -2 to +2 scale from emoji buttons)
  scores: {
    [fontId: number]: number;  // e.g., { 1: 0, 2: 1, 3: 0, 4: -1, 5: 2 }
  };
  
  // Calculated results (after testing complete)
  effects?: {
    letterSpacing: number;
    wordSpacing: number;
    glyphWeight: number;
  };
  optimalParams?: {
    letterSpacing: number;     // percentage
    wordSpacing: number;       // percentage
    weight: 'standard' | 'heavy';
  };
}
```

**Storage key:** `dyslexiafont_session`

### E.10 DOE State Machine

```
┌─────────────────────────────────────────────────────────┐
│ IDLE                                                    │
│ User lands on home page                                 │
└────────────────────────┬────────────────────────────────┘
                         │ click "Start Test"
                         ▼
┌─────────────────────────────────────────────────────────┐
│ INIT_SESSION                                            │
│ - Generate sessionId                                    │
│ - Randomize test order (shuffle [1,2,3,4,5])            │
│ - Assign passages to each test                          │
│ - Save to localStorage                                  │
└────────────────────────┬────────────────────────────────┘
                         │ auto
                         ▼
┌─────────────────────────────────────────────────────────┐
│ CALIBRATION                                             │
│ - Show Font 1 (Baseline) with assigned passage          │
│ - Explain: "This is your baseline reference"            │
│ - User acknowledges, score auto-set to 0 (Same)         │
└────────────────────────┬────────────────────────────────┘
                         │ user clicks "Continue"
                         ▼
┌─────────────────────────────────────────────────────────┐
│ TESTING (loops 4 times for remaining fonts)             │
│ - Show font[testOrder[currentTest]]                     │
│ - Show passage[currentTest]                             │
│ - User clicks emoji button (-2 to +2)                   │
│ - Save score, increment currentTest                     │
└────────────────────────┬────────────────────────────────┘
                         │ currentTest === 5
                         ▼
┌─────────────────────────────────────────────────────────┐
│ CALCULATE_RESULTS                                       │
│ - Apply effect formulas from Section 6                  │
│ - Determine significant factors                         │
│ - Calculate optimal parameters                          │
│ - Save to localStorage                                  │
└────────────────────────┬────────────────────────────────┘
                         │ auto
                         ▼
┌─────────────────────────────────────────────────────────┐
│ RESULTS                                                 │
│ - Display effect chart                                  │
│ - Show interpretation ("Letter spacing helps you")      │
│ - Generate custom font with optimal params              │
│ - Enable download button                                │
└─────────────────────────────────────────────────────────┘
```

### E.11 Error Handling

| Error Case | Handling |
|------------|----------|
| Font fails to load | Show message: "Font loading issue. Please refresh." + retry button |
| localStorage unavailable | Fall back to session state (no persistence across refresh) |
| opentype.js generation fails | Show error with option to download pre-made "best guess" font |
| User closes mid-test | On return, detect existing session, offer to resume or restart |

### E.12 Passage Bank Format

**Decision:** TypeScript with JSON-like structure

**Rationale:**
- Type safety at compile time
- IDE autocomplete for developers
- Helper functions included in same file
- Easy migration to API/CMS later (structure matches typical API response)
- Supports future i18n by adding `locale` field

**File:** `lib/passages/passageBank.ts`

```typescript
export interface Passage {
  id: string;
  title: string;
  text: string;
  wordCount: number;
  readingLevel: '3rd' | '5th' | '8th';
  genre: 'fiction' | 'nonfiction';
  topic: string;
}

export const passages: Passage[] = [
  {
    id: "3g-fiction-001",
    title: "Max and Whiskers",
    text: "Max was a small brown dog who lived on a farm...",
    wordCount: 72,
    readingLevel: "3rd",
    genre: "fiction",
    topic: "animals"
  },
  // ... more passages (30+ per reading level)
];

// Helper functions
export function getPassagesByLevel(level: Passage['readingLevel']): Passage[] {
  return passages.filter(p => p.readingLevel === level);
}

export function getRandomPassages(level: Passage['readingLevel'], count: number): Passage[] {
  const levelPassages = getPassagesByLevel(level);
  return shuffleArray(levelPassages).slice(0, count);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
```

### E.13 Rating UI Design

**Decision:** 5-point emoji clickable buttons (replaces 1-10 scale)

**Rationale:**
- Reduces cognitive load (10 options → 5 options)
- Visual anchoring with emoji reduces need to remember scale
- Single click = select + advance (faster flow)
- Internal values (-2, -1, 0, +1, +2) simplify effect calculations

**Design:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     How does this compare to the baseline?                  │
│                                                             │
│   ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐              │
│   │ 😟  │  │ 😕  │  │ 😐  │  │ 🙂  │  │ 😊  │              │
│   │     │  │     │  │     │  │     │  │     │              │
│   │Much │  │Worse│  │Same │  │Better│ │Much │              │
│   │Worse│  │     │  │     │  │     │  │Better│             │
│   └─────┘  └─────┘  └─────┘  └─────┘  └─────┘              │
│    [-2]     [-1]     [0]      [+1]     [+2]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Specs:**
- Large clickable buttons (min 48x48px touch target, recommended 64x64px)
- Emoji + text label below each
- Single click selects and auto-advances to next test
- Internal values: -2, -1, 0, +1, +2
- Keyboard accessible (1-5 keys or arrow keys + Enter)
- Visual feedback on hover/focus (subtle background change)

**Effect Calculation Update:**

With -2 to +2 scale (baseline = 0), the effect formulas remain the same structure but scores are already relative:

```javascript
// Scores are already relative to baseline (0 = same as baseline)
const letterEffect = (scores[2] + scores[5]) / 2 - (scores[1] + scores[3] + scores[4]) / 3;
const wordEffect = (scores[3] + scores[5]) / 2 - (scores[1] + scores[2] + scores[4]) / 3;
const weightEffect = (scores[4] + scores[5]) / 2 - (scores[1] + scores[2] + scores[3]) / 3;
```

| Effect Size | Interpretation |
|-------------|----------------|
| > +1.5 | "Strongly helps your reading" |
| +0.5 to +1.5 | "Likely helpful" |
| -0.5 to +0.5 | "May not matter for you" |
| < -0.5 | "May hurt your reading" |

---

*Document Version: 2.0*  
*Last Updated: January 16, 2026*
*Changes in v1.1: Added CSS-based testing approach, screen vs. print research findings, font rendering verification*  
*Changes in v1.2: Added Glyph Weight as Tier 1 parameter; added Section 7.2.1 with implementation details for weight-based font generation*  
*Changes in v1.3: Added Pre-Implementation Technical Check section; added Testing Strategy table (font-based vs document-based parameters); added lessons learned from John Doe project*  
*Changes in v1.4: Added Section 4.3 Font Clue Questionnaire; added Section 8.3 Glyph Shape Modifications (FontForge); added Section 8.4 Future Parameters Parking Lot; created bibliography/ folder with research references*  
*Changes in v1.5: Added Section 4 User Data Collection Requirements (age/grade for passage selection); Added Section 5 Legal Disclaimers & Compliance (not diagnostic, experimental, COPPA/GDPR); Added HTML Print Rendering issue to Lessons Learned*
*Changes in v1.6: Reduced passage length from ~200 words to 50-100 words based on research (Zorzi et al. used ~24 words); Added Appendix C: Passage Length Research Justification*
*Changes in v1.7: Expanded Appendix A with comprehensive passage content guidelines (A.1), selection criteria (A.2), bank size requirements (A.3), additional example passages (A.4), and passage development process (A.5)*
*Changes in v1.8: Added Appendix D: Design Decisions Log; documented rejection of user topic preference feature (confounding risk outweighs engagement benefit)*
*Changes in v2.0: Added detailed MVP implementation specs to Appendix E: E.8 React Component Structure, E.9 localStorage Schema, E.10 DOE State Machine, E.11 Error Handling, E.12 Passage Bank Format (TypeScript recommendation), E.13 Rating UI Design (5-point emoji buttons replacing 1-10 scale)*
