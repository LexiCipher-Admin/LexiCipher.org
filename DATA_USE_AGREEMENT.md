# LexiCipher Open Dyslexia Research Dataset
## Data Use Agreement (DUA) & IRB Guidance

This dataset is provided by LexiCipher.org to aid the academic and medical communities in understanding the relationship between typography, visual processing, and dyslexia.

By downloading or using this dataset, you agree to the terms below.

---

### 1. Data Collection & De-Identification Methodology

LexiCipher uses a "Privacy by Design" architecture engineered to align with the HIPAA Safe Harbor de-identification standard. The dataset contains no Personally Identifiable Information (PII) or Protected Health Information (PHI).

The following technical controls are enforced at collection time:

- **No Network Identifiers:** IP addresses are extracted solely for rate-limiting and are immediately discarded. They are never stored in the database.
- **No Direct Identifiers:** The application has no user accounts, names, or email addresses.
- **Random Session Identifier:** A one-time random identifier is generated in the user's browser using the Web Crypto API (`crypto.getRandomValues`). It is used only for deduplication and is stripped from public exports.
- **Data Bucketing:** Continuous typographic values (e.g., normalized 0–1 letter spacing) are grouped into four broad categories (`low`, `medium-low`, `medium-high`, `high`) to substantially mitigate re-identification risk.
- **Categorical Environment Detection:** OS and device type are detected from the User-Agent string and collapsed into broad categories (e.g., `Windows`, `macOS`, `Desktop`, `Mobile`). Exact UA strings are never stored.

---

### 2. Dataset Schema

| Column | Type | Description |
|---|---|---|
| `os_family` | TEXT | Windows \| macOS \| Linux \| iOS \| Android \| Other |
| `device_type` | TEXT | Desktop \| Mobile \| Tablet |
| `age_group` | TEXT | child \| teen \| adult |
| `reading_level` | TEXT | 3rd \| 5th \| 8th grade |
| `significant_factors_count` | INTEGER | Number of typography factors (0–7) that showed significant effect |
| `significant_factors` | TEXT | Comma-separated list of significant factor names |
| `optimization_completed` | BOOLEAN | Whether Bayesian fine-tuning was completed (vs. skipped) |
| `letter_spacing_bucket` | TEXT | Optimal letter spacing tier (low–high) |
| `word_spacing_bucket` | TEXT | Optimal word spacing tier |
| `line_height_bucket` | TEXT | Optimal line height tier |
| `font_weight_bucket` | TEXT | Optimal font weight tier |
| `font_size_bucket` | TEXT | Optimal font size tier |
| `paragraph_width_bucket` | TEXT | Optimal paragraph width tier |
| `bwgt_bucket` | TEXT | Optimal bottom-weight variable axis tier |
| `completion_time_seconds` | INTEGER | Time from session start to results (capped at 3600s) |
| `created_at` | TIMESTAMP | UTC timestamp of submission (date precision sufficient for most analyses) |

---

### 3. Institutional Review Board (IRB) Guidance

Because this dataset is fully de-identified, publicly available, and collected without interaction with identifiable individuals, research using this dataset typically qualifies for one of the following IRB determinations:

- **Not Human Subjects Research (NHSR):** The data lacks identifiable private information as defined under 45 CFR 46.102(e).
- **Exempt Status — Exemption 4:** Secondary research involving existing data recorded such that subjects cannot be identified directly or through identifiers linked to subjects.

Researchers should consult their institutional IRB to confirm the appropriate determination for their specific protocol.

---

### 4. Terms of Use

By accessing this dataset, you agree to:

1. **No Re-Identification:** Make no attempt to re-identify any individual, nor cross-reference this dataset with other datasets to ascertain identities.
2. **No Clinical Diagnosis:** This data reflects user-selected typographic preferences from a Design of Experiments (DOE) interface. It is not clinical or diagnostic data and must not be used as such.
3. **Open Access:** Publications, tools, or models trained on this data are strongly encouraged to be published in open-access formats.
4. **Attribution:** Any publication, tool, or model using this data must cite LexiCipher.org as the data source.

---

### 5. Consent

All data is collected via explicit, affirmative opt-in by end-users at the conclusion of their testing session. Users are fully informed of the anonymized nature of the data prior to submission.

---

### 6. Data License

This dataset is released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). You are free to share and adapt the data for any purpose, provided appropriate credit is given.

---

### 7. Data Retention & Versioning

- The raw telemetry table retains records indefinitely to support longitudinal research.
- The public dataset (`lexicipher-dataset-latest.csv`) is regenerated and overwritten daily at 00:00 UTC.
- Researchers requiring a point-in-time snapshot should download and archive the dataset at the time of their study.

---

### 8. Contact

For questions about this dataset or data use agreement, open an issue at [github.com/LexiCipher-org](https://github.com/LexiCipher-org) or contact the maintainers via the repository.
