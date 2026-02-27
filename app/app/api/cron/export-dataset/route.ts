import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Explicit column order — never rely on object key order for CSV
const EXPORT_COLUMNS = [
  'os_family',
  'device_type',
  'age_group',
  'reading_level',
  'significant_factors_count',
  'significant_factors',
  'optimization_completed',
  'letter_spacing_bucket',
  'word_spacing_bucket',
  'line_height_bucket',
  'font_weight_bucket',
  'font_size_bucket',
  'paragraph_width_bucket',
  'bwgt_bucket',
  'completion_time_seconds',
  'created_at',
] as const;

type ExportRow = Record<(typeof EXPORT_COLUMNS)[number], unknown>;

// Escape a single CSV cell value
function escapeCSV(value: unknown): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  // Verify Vercel cron secret
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Fetch all records — session_hash and id are intentionally excluded
    const { data, error } = await supabase
      .from('research_telemetry')
      .select(EXPORT_COLUMNS.join(', '))
      .order('created_at', { ascending: true })
      .limit(50000); // Guard against timeout on Vercel Hobby (10s limit)

    if (error) {
      console.error('Export query error:', error);
      return NextResponse.json({ error: 'Export query failed' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: 'No data to export' }, { status: 200 });
    }

    // Build CSV with explicit column order
    const header = EXPORT_COLUMNS.join(',');
    const rows = (data as unknown as ExportRow[]).map(row =>
      EXPORT_COLUMNS.map(col => escapeCSV(row[col])).join(',')
    );
    const csv = [header, ...rows].join('\n');

    // Upload to public Supabase storage bucket (overwrites daily)
    const { error: uploadError } = await supabase.storage
      .from('open-data')
      .upload('lexicipher-dataset-latest.csv', csv, {
        contentType: 'text/csv',
        upsert: true,
      });

    if (uploadError) {
      console.error('Export upload error:', uploadError);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, records_exported: data.length });

  } catch (error) {
    console.error('Export pipeline error:', error);
    return NextResponse.json({ error: 'Export pipeline failed' }, { status: 500 });
  }
}
