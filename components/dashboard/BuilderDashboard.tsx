'use client'
/**
 * BuilderDashboard
 * Full builder analytics view: KPIs, lead queue, CRM detail, and charts.
 * Fetches real leads from Supabase, falls back to mock data.
 */
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardBody } from '@/components/ui/Card'
import { LeadsTable } from './LeadsTable'
import { LeadDetailPanel } from './LeadDetailPanel'
import { ChannelPerformanceChart } from './ChannelPerformanceChart'
import { ConversionFunnelChart } from './ConversionFunnelChart'
import { MOCK_LEADS } from '@/data'
import type { Lead } from '@/lib/types'

// ─── KPI cards ────────────────────────────────────────────────────────────────
const KPIS = [
  { label: 'Leads This Week',    value: '72',  delta: '+18% vs last week', color: '#C8F040' },
  { label: 'Avg. Quality Score', value: '79',  delta: '+6pts vs last week', color: '#10B981' },
  { label: 'Contact Rate',       value: '94%', delta: '68 of 72 contacted', color: '#60A5FA' },
  { label: 'Contracts Pending',  value: '4',   delta: '5.6% conversion',   color: '#F59E0B' },
]

export function BuilderDashboard() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS)
  const [selectedLead, setSelectedLead] = useState(MOCK_LEADS[0])

  useEffect(() => {
    fetch('/api/leads')
      .then(r => r.json())
      .then(({ leads: realLeads }) => {
        if (realLeads && realLeads.length > 0) {
          const mapped: Lead[] = realLeads.map((l: Record<string, unknown>, i: number) => ({
            id: `PQ-${String(1000 + i).padStart(4, '0')}`,
            name: `Lead ${i + 1}`,
            score: Number(l.lead_score) || 0,
            status: String(l.status || 'Warm') as Lead['status'],
            channel: String(l.channel || 'direct'),
            intent: Boolean(l.intent),
            timeline: String(l.timeline || ''),
            budget: String(l.budget || ''),
            financeStatus: String(l.finance_status || 'In progress') as Lead['financeStatus'],
            verificationScore: Number(l.verification_score) || 0,
            location: String(l.location || 'North Brisbane') as Lead['location'],
            buildType: String(l.build_type || 'House & Land package') as Lead['buildType'],
            tags: [],
            utmCampaign: String(l.utm_campaign || ''),
            utmMedium: String(l.utm_medium || ''),
            createdAt: String(l.created_at || new Date().toISOString()),
          }))
          setLeads(mapped)
          setSelectedLead(mapped[0])
        }
      })
      .catch(() => {/* keep mock data on error */})
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-medium tracking-tight text-white mb-2">
          Builder dashboard.
        </h2>
        <p className="text-base text-white/50">
          What your sales team sees. No guesswork. Every lead is verified.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {KPIS.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-5">
              <p className="text-[9px] font-bold text-white/30 tracking-[0.1em] uppercase mb-3">
                {kpi.label}
              </p>
              <p className="text-3xl font-bold tracking-tight" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
              <p className="text-[11px] text-white/40 mt-1">{kpi.delta}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lead queue + CRM panel */}
      <div className="grid grid-cols-[1fr,300px] gap-5 mb-8">
        <LeadsTable
          leads={leads}
          selectedId={selectedLead.id}
          onSelect={setSelectedLead}
        />
        <LeadDetailPanel lead={selectedLead} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-5">
        <ChannelPerformanceChart />
        <ConversionFunnelChart />
      </div>
    </section>
  )
}
