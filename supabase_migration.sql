-- ============================================================================
-- LexiCipher Research Telemetry Migration
-- Run this in the Supabase SQL Editor
-- ============================================================================

-- 1. Create the telemetry table
CREATE TABLE research_telemetry (
    id                        UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_hash              TEXT NOT NULL UNIQUE,

    -- Environment (broad categorical, no fingerprinting)
    os_family                 TEXT NOT NULL,   -- Windows | macOS | Linux | iOS | Android | Other
    device_type               TEXT NOT NULL,   -- Desktop | Mobile | Tablet

    -- Session metadata (from setup phase)
    age_group                 TEXT NOT NULL,   -- child | teen | adult
    reading_level             TEXT NOT NULL,   -- 3rd | 5th | 8th

    -- DOE results
    significant_factors_count INTEGER NOT NULL,              -- 0-7
    significant_factors       TEXT NOT NULL,                 -- comma-separated factor names
    optimization_completed    BOOLEAN NOT NULL,              -- false if user skipped

    -- Optimal value buckets (normalized 0-1 → low | medium-low | medium-high | high)
    letter_spacing_bucket     TEXT NOT NULL,
    word_spacing_bucket       TEXT NOT NULL,
    line_height_bucket        TEXT NOT NULL,
    font_weight_bucket        TEXT NOT NULL,
    font_size_bucket          TEXT NOT NULL,
    paragraph_width_bucket    TEXT NOT NULL,
    bwgt_bucket               TEXT NOT NULL,

    -- Timing
    completion_time_seconds   INTEGER NOT NULL,

    created_at                TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 2. Enable Row Level Security (strict default-deny)
-- The Next.js API route uses the Service Role key which bypasses RLS.
-- No anon/authenticated policies are created — direct DB access is fully denied.
ALTER TABLE research_telemetry ENABLE ROW LEVEL SECURITY;

-- 3. Indexes
CREATE INDEX idx_telemetry_created_at ON research_telemetry(created_at);
-- UNIQUE index on session_hash is created automatically by the UNIQUE constraint above

-- ============================================================================
-- Public Storage Bucket for Open Dataset
-- ============================================================================

-- 4. Create public bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('open-data', 'open-data', true);

-- 5. Restrict to CSV/JSON only, max 50MB
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['text/csv', 'application/json'],
    file_size_limit = 52428800
WHERE id = 'open-data';

-- 6. Deny public uploads (only Service Role can write via the cron route)
CREATE POLICY "deny_public_uploads"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (false);
