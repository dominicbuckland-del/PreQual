'use client'
/**
 * LeadDetailPanel
 * Sticky side panel showing full CRM fields for the selected lead.
 * Mirrors a real HubSpot contact record.
 */
import { Card, CardHeader } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { STATUS_META, scoreColorHex } from '@/lib/utils'
import type { Lead } from '@/lib/types'

interface LeadDetailPanelProps {
  lead: Lead
}

type FieldGroup = { label: string; color: string; fields: Array<[string, string]> }

function buildFieldGroups(lead: Lead): FieldGroup[] {
  return [
    {
      label: 'Attribution',
      color: '#7C6FCD',
      fields: [
        ['source_channel', lead.channel],
        ['utm_medium', lead.utmMedium],
        ['utm_campaign', lead.utmCampaign],
        ...(lead.gclid   ? [['gclid',  lead.gclid]  as [string, string]] : []),
        ...(lead.fbclid  ? [['fbclid', lead.fbclid] as [string, string]] : []),
      ],
    },
    {
      label: 'Qualification',
      color: '#10B981',
      fields: [
        ['timeline', lead.timeline],
        ['budget', lead.budget],
        ['location_pref', lead.location],
        ['build_type', lead.buildType],
      ],
    },
    {
      label: 'Verification',
      color: '#60A5FA',
      fields: [
        ['finance_status', lead.financeStatus],
        ['docs_provided', lead.verificationScore > 0 ? 'true' : 'false'],
        ['verification_score', String(lead.verificationScore)],
      ],
    },
    {
      label: 'Score',
      color: '#F59E0B',
      fields: [
        ['qual_score', String(lead.score)],
        ['lead_status', lead.status],
      ],
    },
    {
      label: 'CRM',
      color: '#F472B6',
      fields: [
        ['assigned_to', lead.assignedTo ?? '—'],
        ['hubspot_id', lead.hubspotContactId ?? '—'],
        ['created_at', new Date(lead.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })],
      ],
    },
  ]
}

export function LeadDetailPanel({ lead }: LeadDetailPanelProps) {
  const groups = buildFieldGroups(lead)

  return (
    <Card className="overflow-hidden rounded-2xl sticky top-20">
      {/* Header */}
      <CardHeader className="px-4 py-3.5">
        <div>
          <p className="text-sm font-semibold text-white">{lead.name}</p>
          <p className="text-[10px] text-white/40 font-semibold tracking-wide mt-0.5">
            {lead.id} · HUBSPOT
          </p>
        </div>
        <StatusBadge status={lead.status} />
      </CardHeader>

      {/* Score ring row */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
        <div className="relative w-10 h-10 shrink-0">
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
            <circle
              cx="20" cy="20" r="16" fill="none"
              stroke={scoreColorHex(lead.score)}
              strokeWidth="3"
              strokeDasharray={`${(lead.score / 100) * 100.53} 100.53`}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center text-[11px] font-bold"
            style={{ color: scoreColorHex(lead.score) }}
          >
            {lead.score}
          </span>
        </div>
        <div>
          <p className="text-xs font-medium text-white">Qualification Score</p>
          <p className="text-[10px] text-white/40">{lead.budget} · {lead.financeStatus}</p>
        </div>
      </div>

      {/* Field rows */}
      <div className="max-h-[440px] overflow-y-auto divide-y divide-white/[0.04]">
        {groups.map(group =>
          group.fields.map(([key, val], fi) => (
            <div
              key={`${group.label}-${fi}`}
              className="flex items-center justify-between gap-2 px-4 py-2 odd:bg-white/[0.01]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: group.color }}
                />
                <code className="text-[10px] text-white/40 truncate">{key}</code>
              </div>
              <span className="text-[10px] font-medium text-slate-200 text-right max-w-[130px] truncate">
                {val}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Tags */}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <SectionLabel className="mb-2">Tags</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {lead.tags.map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] border border-white/10 text-white/50">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}
