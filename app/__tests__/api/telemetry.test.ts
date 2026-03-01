'use strict';
/**
 * telemetry.test.ts — Unit tests for POST /api/telemetry.
 *
 * Mocks: @supabase/supabase-js, @upstash/redis, @upstash/ratelimit
 * All network calls are intercepted — no real DB or Redis is touched.
 *
 * Tests:
 *   - Valid full payload → 201 {success:true}
 *   - Missing session_hash → 400
 *   - Invalid reading_level enum → 400
 *   - Negative significant_factors_count → 400
 *   - Unknown bucket value → 400
 *   - Rate limiter refuses → 429
 *   - Duplicate session_hash (upsert no-op) → 201
 *
 * Run: npm test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mock external dependencies before importing the route handler
// ---------------------------------------------------------------------------

const mockUpsert = vi.fn(() => ({ error: null }));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({ upsert: mockUpsert })),
  })),
}));

// Redis must be a real class (constructable) — arrow functions cannot be used
// with `new`, so vi.fn(() => ({})) would throw in Vitest v4.
vi.mock('@upstash/redis', () => ({
  Redis: class RedisMock {},
}));

// mockLimit must be defined inside vi.hoisted so it is accessible both inside
// the mock factory (hoisted before imports) and in the test body.
const mockLimit = vi.hoisted(() => vi.fn(() => Promise.resolve({ success: true })));

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: class RatelimitMock {
    limit = mockLimit;
    static slidingWindow = vi.fn();
  },
}));

// Provide required env vars before the module is imported
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io';
process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';

import { POST } from '@/app/api/telemetry/route';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VALID_PAYLOAD = {
  session_hash: 'abcdefghij1234567890',
  environment: { os_family: 'Windows', device_type: 'Desktop' },
  session_meta: { age_group: 'adult', reading_level: '8th', completion_time_seconds: 120 },
  doe_results: {
    significant_factors_count: 2,
    significant_factors: 'letterSpacing,lineHeight',
    optimization_completed: true,
    letter_spacing_bucket:  'high',
    word_spacing_bucket:    'low',
    line_height_bucket:     'medium-high',
    font_weight_bucket:     'medium-low',
    font_size_bucket:       'low',
    paragraph_width_bucket: 'high',
    bwgt_bucket:            'medium-low',
  },
};

function makeRequest(body: unknown, headers?: Record<string, string>): Request {
  return new Request('http://localhost/api/telemetry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': '1.2.3.4',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('POST /api/telemetry', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLimit.mockResolvedValue({ success: true });
    mockUpsert.mockReturnValue({ error: null });
  });

  it('valid full payload → 201 {success: true}', async () => {
    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ success: true });
  });

  it('missing session_hash → 400', async () => {
    const { session_hash: _omit, ...body } = VALID_PAYLOAD;
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it("reading_level: '7th' (not in enum) → 400", async () => {
    const body = {
      ...VALID_PAYLOAD,
      session_meta: { ...VALID_PAYLOAD.session_meta, reading_level: '7th' },
    };
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it('significant_factors_count: -1 (below min) → 400', async () => {
    const body = {
      ...VALID_PAYLOAD,
      doe_results: { ...VALID_PAYLOAD.doe_results, significant_factors_count: -1 },
    };
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it("bucket value 'extreme' (not in enum) → 400", async () => {
    const body = {
      ...VALID_PAYLOAD,
      doe_results: { ...VALID_PAYLOAD.doe_results, letter_spacing_bucket: 'extreme' },
    };
    const res = await POST(makeRequest(body));
    expect(res.status).toBe(400);
  });

  it('rate limiter returns success:false → 429', async () => {
    mockLimit.mockResolvedValueOnce({ success: false });
    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(429);
  });

  it('duplicate session_hash → 201 (upsert no-op, no error)', async () => {
    // Supabase upsert with ignoreDuplicates:true returns no error on conflict
    mockUpsert.mockReturnValueOnce({ error: null });
    const res = await POST(makeRequest(VALID_PAYLOAD));
    expect(res.status).toBe(201);
  });
});
