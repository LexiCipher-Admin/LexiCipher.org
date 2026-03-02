import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export const dynamic = 'force-dynamic';

const bucketEnum = z.enum(['low', 'medium-low', 'medium-high', 'high']);

const telemetrySchema = z.object({
  session_hash: z.string().min(10).max(100),
  environment: z.object({
    os_family: z.enum(['Windows', 'macOS', 'Linux', 'iOS', 'Android', 'Other']),
    device_type: z.enum(['Desktop', 'Mobile', 'Tablet']),
  }),
  session_meta: z.object({
    age_group: z.enum(['child', 'teen', 'adult']),
    reading_level: z.enum(['3rd', '5th', '8th']),
    completion_time_seconds: z.number().int().positive().max(3600),
  }),
  doe_results: z.object({
    significant_factors_count: z.number().int().min(0).max(7),
    significant_factors: z.string().max(200),
    optimization_completed: z.boolean(),
    letter_spacing_bucket: bucketEnum,
    word_spacing_bucket: bucketEnum,
    line_height_bucket: bucketEnum,
    font_weight_bucket: bucketEnum,
    font_size_bucket: bucketEnum,
    paragraph_width_bucket: bucketEnum,
    bwgt_bucket: bucketEnum,
  }),
});

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: false,
  });

  try {
    // --- LAYER 1: RATE LIMITING ---
    const ip = (request.headers.get('x-forwarded-for') ?? 'anonymous').split(',')[0].trim();
    const { success } = await ratelimit.limit(`telemetry_${ip}`);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    // IP is used only for rate limiting and is not stored beyond this point.

    // --- LAYER 2: PAYLOAD VALIDATION ---
    const body = await request.json();
    const d = telemetrySchema.parse(body);

    // --- LAYER 3: INSERT (upsert on session_hash to handle retries) ---
    const { error } = await supabase.from('research_telemetry').upsert(
      {
        session_hash:              d.session_hash,
        os_family:                 d.environment.os_family,
        device_type:               d.environment.device_type,
        age_group:                 d.session_meta.age_group,
        reading_level:             d.session_meta.reading_level,
        completion_time_seconds:   d.session_meta.completion_time_seconds,
        significant_factors_count: d.doe_results.significant_factors_count,
        significant_factors:       d.doe_results.significant_factors,
        optimization_completed:    d.doe_results.optimization_completed,
        letter_spacing_bucket:     d.doe_results.letter_spacing_bucket,
        word_spacing_bucket:       d.doe_results.word_spacing_bucket,
        line_height_bucket:        d.doe_results.line_height_bucket,
        font_weight_bucket:        d.doe_results.font_weight_bucket,
        font_size_bucket:          d.doe_results.font_size_bucket,
        paragraph_width_bucket:    d.doe_results.paragraph_width_bucket,
        bwgt_bucket:               d.doe_results.bwgt_bucket,
      },
      { onConflict: 'session_hash', ignoreDuplicates: true }
    );

    if (error) {
      console.error('Telemetry insert error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    console.error('Telemetry error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
