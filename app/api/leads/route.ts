import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const lead = {
      name: body.name ?? null,
      email: body.email ?? null,
      phone: body.phone ?? null,
      intent: body.intent ?? false,
      timeline: body.timeline ?? null,
      budget: body.budget ?? null,
      finance_status: body.financeStatus ?? null,
      verification_score: body.verificationScore ?? 0,
      location: body.location ?? null,
      build_type: body.buildType ?? null,
      lead_score: body.score ?? 0,
      status: body.status ?? 'Warm',
      channel: body.channel ?? 'direct',
      utm_campaign: body.utmCampaign ?? null,
      utm_medium: body.utmMedium ?? null,
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, lead: data }, { status: 201 })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ leads: data })
}
