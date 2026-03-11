'use client'
/**
 * LeadsTable
 * Sortable lead queue with score rings, status badges, and tag pills.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader } from '@/components/ui/Card'
import { StatusBadge, TagPill } from '@/components/ui/Badge'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Lead, LeadStatus } from '@/lib/types'

const STATUS_ORDER: LeadStatus[] = ['Hot', 'Warm', 'Nurture', 'Filtered']

interface LeadsTableProps {
  leads: Lead[]
  selectedId: string
  onSelect: (lead: Lead) => void
}

export function LeadsTable({ leads, selectedId, onSelect }: LeadsTableProps) {
  const [filter, setFilter] = useState<LeadStatus | 'All'>('All')

  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter)

  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader>
        <SectionLabel>Lead Queue</SectionLabel>
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-lime">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse-slow" />
          LIVE
        </div>
      </CardHeader>

      {/* Status filter tabs */}
      <div className="flex gap-1 px-4 py-2.5 border-b border-white/[0.06]">
        {(['All', ...STATUS_ORDER] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              filter === s
                ? 'bg-lime/10 text-lime border border-lime/25'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/[0.04]">
        {filtered.map((lead, i) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(lead)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all group
              ${selectedId === lead.id
                ? 'border-l-2 border-lime bg-lime/[0.04]'
                : 'border-l-2 border-transparent hover:bg-white/[0.02]'}
            `}
          >
            <ScoreRing score={lead.score} size={36} strokeWidth={2.5} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white">{lead.name}</span>
                <span className="text-[10px] text-white/30">{lead.id}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {lead.tags.slice(0, 3).map(t => <TagPill key={t} label={t} />)}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <StatusBadge status={lead.status} />
              <span className="text-[10px] text-white/30">{lead.time ?? timeAgo(lead.createdAt)}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

// ─── Extend Lead type locally to allow optional display time ─────────────────
declare module '@/lib/types' {
  interface Lead {
    time?: string
  }
}
