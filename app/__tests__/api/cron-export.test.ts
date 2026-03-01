'use strict';
/**
 * cron-export.test.ts — Unit tests for GET /api/cron/export-dataset.
 *
 * Mocks: @supabase/supabase-js (DB select + storage upload)
 * The upload mock captures the CSV string so we can assert on its structure.
 *
 * Tests:
 *   - No Authorization header → 401
 *   - Wrong secret → 401
 *   - Correct secret, empty table → 200 {message: 'No data to export'}
 *   - Correct secret, data present → 200 {success: true}
 *   - CSV first line is exactly the 16-column header in EXPORT_COLUMNS order
 *   - CSV cells are double-quoted; embedded quotes are escaped as ""
 *
 * Run: npm test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Supabase mock — chainable query builder + storage upload capture
// ---------------------------------------------------------------------------

let capturedCsv = '';

const mockUpload = vi.fn((path: string, csv: string) => {
  capturedCsv = csv;
  return Promise.resolve({ error: null });
});

const mockQueryChain = (data: unknown[] | null, error: unknown = null) => ({
  select: vi.fn(() => ({
    order: vi.fn(() => ({
      limit: vi.fn(() => Promise.resolve({ data, error })),
    })),
  })),
});

let mockFromImpl = mockQueryChain([]);

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => mockFromImpl),
    storage: {
      from: vi.fn(() => ({ upload: mockUpload })),
    },
  })),
}));

process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
process.env.CRON_SECRET = 'my-cron-secret';

import { GET } from '@/app/api/cron/export-dataset/route';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const EXPECTED_HEADER =
  'os_family,device_type,age_group,reading_level,significant_factors_count,' +
  'significant_factors,optimization_completed,letter_spacing_bucket,' +
  'word_spacing_bucket,line_height_bucket,font_weight_bucket,font_size_bucket,' +
  'paragraph_width_bucket,bwgt_bucket,completion_time_seconds,created_at';

const SAMPLE_ROW = {
  os_family:                 'Windows',
  device_type:               'Desktop',
  age_group:                 'adult',
  reading_level:             '8th',
  significant_factors_count: 2,
  significant_factors:       'letterSpacing,lineHeight',
  optimization_completed:    true,
  letter_spacing_bucket:     'high',
  word_spacing_bucket:       'low',
  line_height_bucket:        'medium-high',
  font_weight_bucket:        'medium-low',
  font_size_bucket:          'low',
  paragraph_width_bucket:    'high',
  bwgt_bucket:               'medium-low',
  completion_time_seconds:   120,
  created_at:                '2026-01-01T00:00:00.000Z',
};

function makeRequest(authHeader?: string): Request {
  return new Request('http://localhost/api/cron/export-dataset', {
    method: 'GET',
    headers: authHeader ? { authorization: authHeader } : {},
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('GET /api/cron/export-dataset', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedCsv = '';
    mockFromImpl = mockQueryChain([]);
  });

  it('no Authorization header → 401', async () => {
    const res = await GET(makeRequest());
    expect(res.status).toBe(401);
  });

  it('wrong secret → 401', async () => {
    const res = await GET(makeRequest('Bearer wrong-secret'));
    expect(res.status).toBe(401);
  });

  it('correct secret + empty table → 200 with "No data" message', async () => {
    mockFromImpl = mockQueryChain([]);
    const res = await GET(makeRequest('Bearer my-cron-secret'));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.message).toMatch(/No data/i);
  });

  it('correct secret + data → 200 {success: true}', async () => {
    mockFromImpl = mockQueryChain([SAMPLE_ROW]);
    const res = await GET(makeRequest('Bearer my-cron-secret'));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true });
  });

  it('CSV first line is the exact 16-column header in EXPORT_COLUMNS order', async () => {
    mockFromImpl = mockQueryChain([SAMPLE_ROW]);
    await GET(makeRequest('Bearer my-cron-secret'));
    const firstLine = capturedCsv.split('\n')[0];
    expect(firstLine).toBe(EXPECTED_HEADER);
  });

  it('CSV cells are double-quoted and embedded quotes are escaped as ""', async () => {
    const rowWithQuote = { ...SAMPLE_ROW, significant_factors: 'letter"Spacing' };
    mockFromImpl = mockQueryChain([rowWithQuote]);
    await GET(makeRequest('Bearer my-cron-secret'));
    // The escaped value should appear in the CSV
    expect(capturedCsv).toContain('"letter""Spacing"');
  });
});
