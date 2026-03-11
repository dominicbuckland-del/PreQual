'use client'
/**
 * HeroSection
 * Ramp-inspired hero: radial gradient background, large headline,
 * floating dashboard preview card, lime CTA, builder ticker strip.
 */
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { BuilderTicker } from './BuilderTicker'
import { MOCK_LEADS } from '@/data'
import { STATUS_META, scoreColorHex } from '@/lib/utils'
import type { NavSection } from '@/components/PreQualShell'

interface HeroSectionProps {
  onNavigate: (s: NavSection) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, #1A3A6B 0%, #0D1F3C 45%, #0A1628 100%)',
        }}
      />
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay opacity-[0.025] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-2 gap-16 items-center min-h-[88vh]">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime/10 border border-lime/25 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse-slow" />
            <span className="text-xs font-semibold text-lime tracking-wide uppercase">
              Live · SEQ Market · Investor Prototype
            </span>
          </div>

          <h1 className="text-[clamp(40px,5vw,64px)] font-medium leading-[1.05] tracking-[-0.04em] text-white mb-5">
            Wrong leads<br />
            cost more than<br />
            <span className="text-lime">no leads.</span>
          </h1>

          <p className="text-lg text-white/55 leading-relaxed max-w-md mb-9">
            preQual filters, verifies, and financially qualifies home buyers before
            they ever reach your sales team. Every lead is real. Every lead is ready.
          </p>

          <div className="flex items-center gap-3 mb-10">
            <Button size="lg" variant="lime" onClick={() => onNavigate('qualify')}>
              See the buyer flow →
            </Button>
            <Button size="lg" variant="ghost" onClick={() => onNavigate('how')}>
              How it works
            </Button>
          </div>

          {/* Inline stats */}
          <div className="flex gap-8">
            {[
              ['72', 'Qualified leads/week'],
              ['3%', 'Commission on contract'],
              ['< 90s', 'CRM delivery time'],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-bold text-lime tracking-tight">{v}</p>
                <p className="text-[10px] text-white/30 mt-1 font-medium">{l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — floating dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="animate-float"
        >
          <div
            className="rounded-2xl overflow-hidden border border-white/10"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)' }}
          >
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.07]">
              <div className="flex gap-1.5">
                {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <span className="text-[10px] text-white/25 font-medium tracking-wider">
                PREQUAL · BUILDER DASHBOARD
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-lime font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse-slow" />
                LIVE
              </div>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-3 divide-x divide-white/[0.06] bg-navy">
              {[['72', 'Leads this week', true], ['94', 'Top score today', false], ['3', 'Contracts pending', false]].map(
                ([v, l, isLime]) => (
                  <div key={String(l)} className="px-4 py-3.5">
                    <p className={`text-2xl font-bold tracking-tight ${isLime ? 'text-lime' : 'text-white'}`}>{v}</p>
                    <p className="text-[9px] text-white/30 mt-1">{l}</p>
                  </div>
                )
              )}
            </div>

            {/* Lead rows */}
            <div className="bg-navy">
              {MOCK_LEADS.slice(0, 4).map((lead, i) => {
                const meta = STATUS_META[lead.status]
                return (
                  <div
                    key={lead.id}
                    className="flex items-center gap-3 px-4 py-2.5 border-t border-white/[0.05]"
                  >
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        background: meta.dot,
                        animation: lead.status === 'Hot' ? 'pulse 1.5s infinite' : 'none',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white">{lead.name}</p>
                      <p className="text-[10px] text-white/30 truncate">{lead.budget} · {lead.location}</p>
                    </div>
                    <p
                      className="text-xs font-bold shrink-0"
                      style={{ color: scoreColorHex(lead.score) }}
                    >
                      {lead.score}
                    </p>
                    <div
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0"
                      style={{ background: meta.bg, color: meta.text }}
                    >
                      {lead.status}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <BuilderTicker />
    </div>
  )
}
