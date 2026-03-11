'use client'
/**
 * HowItWorks
 * Three feature blocks in Ramp's alternating text-left / image-right style.
 * Dark background section with centred headline.
 */
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { CHANNELS } from '@/data'
import type { NavSection } from '@/components/PreQualShell'

interface HowItWorksProps {
  onNavigate: (s: NavSection) => void
}

const FEATURES = [
  {
    n: '01',
    headline: 'Filter out tyre kickers before they cost you.',
    body: `Most lead gen sends you everyone who clicked an ad. preQual runs every buyer through
intent, timeline, budget, and financial verification — before a single name reaches your
sales team. Unqualified buyers receive helpful resources. Your team never sees them.`,
    stat: '61% of leads pass full verification',
    cta: 'See the filter logic',
    ctaSection: 'qualify' as NavSection,
  },
  {
    n: '02',
    headline: 'Know exactly where every qualified buyer came from.',
    body: `Every lead is tagged with full UTM attribution — channel, campaign, ad set, creative.
Google GCLID, Meta FBCLID, session data. You'll know whether your best buyers came from
Google Search, LinkedIn, or Reddit, and optimise spend accordingly.`,
    stat: 'Google Search: 71% quality score',
    cta: 'View channel data',
    ctaSection: 'channels' as NavSection,
  },
  {
    n: '03',
    headline: 'Qualified leads in your CRM in under 90 seconds.',
    body: `When a buyer passes verification, Zapier fires. A HubSpot contact is created with all
qualification data attached — score, finance status, budget, location, build type. Your
sales rep gets a Slack message and SMS while the buyer is still thinking about their home.`,
    stat: '< 90s from qualification to CRM',
    cta: 'View the dashboard',
    ctaSection: 'dashboard' as NavSection,
  },
]

// ─── Visual card for each feature ────────────────────────────────────────────

function QualStepsCard() {
  const steps = ['Intent Signal','Timeline','Budget Range','Finance Status','Document Verification','Location','Build Type']
  const filterSteps = [1, 3, 4]
  return (
    <Card className="p-5">
      <p className="text-[10px] font-semibold text-white/40 tracking-[0.08em] uppercase mb-3">
        Qualification Steps
      </p>
      <div className="flex flex-col gap-1">
        {steps.map((step, i) => (
          <div
            key={step}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border ${
              i < 4
                ? 'bg-status-warm/[0.05] border-transparent'
                : i === 4
                ? 'bg-lime/[0.06] border-lime/20'
                : 'bg-white/[0.02] border-transparent'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
              i < 4 ? 'bg-status-warm text-white' : i === 4 ? 'bg-lime text-lime-text' : 'bg-white/10 text-white/30'
            }`}>
              {i < 4 ? '✓' : i + 1}
            </div>
            <span className={`text-xs ${i <= 4 ? 'text-white font-medium' : 'text-white/40'}`}>{step}</span>
            {filterSteps.includes(i) && (
              <span className="ml-auto text-[8px] font-semibold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">
                FILTER
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}

function ChannelQualityCard() {
  return (
    <Card className="p-5">
      <p className="text-[10px] font-semibold text-white/40 tracking-[0.08em] uppercase mb-4">
        Qualified Leads by Source
      </p>
      <div className="flex flex-col gap-3">
        {[...CHANNELS].sort((a, b) => b.qualityScore - a.qualityScore).map(ch => (
          <div key={ch.id}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-200">{ch.name}</span>
              <span className="text-xs font-bold" style={{
                color: ch.qualityScore >= 70 ? '#10B981' : ch.qualityScore >= 50 ? '#F59E0B' : '#EF4444',
              }}>
                {ch.qualityScore}%
              </span>
            </div>
            <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full opacity-75 transition-all duration-700"
                style={{ width: `${ch.qualityScore}%`, background: ch.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

function AutomationPipelineCard() {
  const steps = [
    { label: 'preQual',  sub: 'Buyer verified',          bg: '#C8F040', text: '#1A3300' },
    { label: 'Zapier',   sub: 'Trigger fires',           bg: '#FF4A00', text: '#fff'    },
    { label: 'HubSpot',  sub: 'Contact + tags created',  bg: '#FF7A59', text: '#fff'    },
    { label: 'Slack',    sub: 'Sales rep notified',      bg: '#4A154B', text: '#fff'    },
    { label: 'SMS',      sub: '< 90 seconds total',      bg: '#0A1628', text: '#C8F040', border: '1px solid #C8F040' },
  ]
  return (
    <Card className="p-5">
      <p className="text-[10px] font-semibold text-white/40 tracking-[0.08em] uppercase mb-4">
        Automation Pipeline
      </p>
      <div className="flex flex-col">
        {steps.map((s, i) => (
          <div key={s.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: s.bg, color: s.text, border: s.border }}
              >
                {s.label.slice(0, 2)}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px h-4 bg-white/10 my-1" />
              )}
            </div>
            <div className="pt-1.5">
              <p className="text-xs font-semibold text-white">{s.label}</p>
              <p className="text-[10px] text-white/35">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

const VISUAL_CARDS = [QualStepsCard, ChannelQualityCard, AutomationPipelineCard]

export function HowItWorks({ onNavigate }: HowItWorksProps) {
  return (
    <div>
      {/* Centred headline section */}
      <div className="bg-[#111827] px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[clamp(28px,4vw,48px)] font-medium tracking-tight text-white mb-4 leading-tight">
            Three ways preQual<br />
            <span className="text-lime">saves your builders time and money.</span>
          </h2>
          <p className="text-sm text-white/40 mb-5">
            *there are many more, but we thought we&apos;d ease you into it.
          </p>
          <button
            onClick={() => onNavigate('qualify')}
            className="text-sm text-lime font-semibold hover:underline"
          >
            See the buyer flow →
          </button>
        </div>
      </div>

      {/* Alternating feature blocks */}
      {FEATURES.map((f, i) => {
        const VisualCard = VISUAL_CARDS[i]
        const isEven = i % 2 === 0
        return (
          <div
            key={f.n}
            className={`border-t border-white/[0.06] ${i % 2 === 0 ? 'bg-[#111827]' : 'bg-navy'}`}
          >
            <div className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-2 gap-20 items-center">
              {/* Text */}
              <motion.div
                className={isEven ? 'order-1' : 'order-2'}
                initial={{ opacity: 0, x: isEven ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-[11px] font-bold text-lime tracking-[0.1em] mb-3">{f.n}</p>
                <h3 className="text-[clamp(22px,3vw,34px)] font-medium tracking-tight text-white leading-tight mb-4">
                  {f.headline}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-6">{f.body}</p>
                <div className="inline-block px-3 py-2 bg-lime/[0.08] border border-lime/20 rounded-xl text-xs font-bold text-lime mb-5">
                  {f.stat}
                </div>
                <br />
                <button
                  onClick={() => onNavigate(f.ctaSection)}
                  className="text-sm text-lime font-semibold hover:underline"
                >
                  {f.cta} →
                </button>
              </motion.div>

              {/* Visual */}
              <motion.div
                className={isEven ? 'order-2' : 'order-1'}
                initial={{ opacity: 0, x: isEven ? 16 : -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
              >
                <VisualCard />
              </motion.div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
