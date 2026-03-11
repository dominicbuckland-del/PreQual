'use client'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CHANNELS, FUNNEL_STEPS } from '@/data'
import { formatCurrency } from '@/lib/utils'

export function ChannelsSection() {
  const sortedChannels = [...CHANNELS].sort((a, b) => b.qualityScore - a.qualityScore)

  return (
    <section className="bg-navy min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-medium tracking-tight text-white mb-3">
            Every channel. One qualified output.
          </h2>
          <p className="text-base text-white/50 max-w-lg mx-auto">
            preQual runs across all major acquisition channels and passes every lead
            through the same qualification filter before delivery.
          </p>
        </div>

        {/* Funnel */}
        <Card className="p-6 mb-6">
          <SectionLabel className="mb-5">Acquisition Funnel · This Week</SectionLabel>
          <div className="flex items-end gap-1 overflow-x-auto pb-2">
            {FUNNEL_STEPS.map((step, i) => (
              <div key={step.label} className="flex items-end gap-1 flex-1 min-w-0">
                <div className="flex flex-col items-center w-full">
                  <span className={`text-sm font-bold mb-2 ${i === FUNNEL_STEPS.length - 1 ? 'text-lime' : 'text-white'}`}>
                    {step.value >= 1000 ? `${(step.value / 1000).toFixed(0)}K` : step.value}
                  </span>
                  <motion.div
                    className="w-full rounded-t"
                    style={{
                      background: i === FUNNEL_STEPS.length - 1
                        ? '#C8F040'
                        : `rgba(255,255,255,${0.04 + i * 0.025})`,
                      border: i === FUNNEL_STEPS.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    }}
                    initial={{ height: 0 }}
                    whileInView={{ height: Math.max(10, (step.pct / 100) * 100) }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                  />
                  <div className="w-full h-px bg-white/10" />
                  <span className="text-[9px] text-white/30 mt-2 font-semibold tracking-wide text-center">
                    {step.label.toUpperCase()}
                  </span>
                </div>
                {i < FUNNEL_STEPS.length - 1 && (
                  <div className="w-3 h-px bg-white/20 mb-7 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4 mt-3 border-t border-white/[0.06] text-xs text-white/50">
            <span>Click → Lead: <strong className="text-white">1.73%</strong></span>
            <span>Form completion: <strong className="text-white">9.5%</strong></span>
            <span>Verification pass: <strong className="text-lime">61%</strong></span>
            <span>CPL (qualified): <strong className="text-lime">$128</strong></span>
          </div>
        </Card>

        {/* Channel table */}
        <Card className="overflow-hidden">
          <CardHeader>
            <SectionLabel>Channel Performance</SectionLabel>
            <p className="text-[10px] text-white/30">Quality Score = % passing financial verification</p>
          </CardHeader>
          <div>
            <div className="grid grid-cols-[1fr_80px_60px_70px_1fr] gap-2 px-5 py-2.5 border-b border-white/[0.05]">
              {['Channel', 'Spend', 'Leads', 'CPL', 'Quality Score'].map(h => (
                <span key={h} className="text-[9px] font-bold text-white/25 tracking-wide uppercase">{h}</span>
              ))}
            </div>
            {sortedChannels.map((ch, i) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[1fr_80px_60px_70px_1fr] gap-2 items-center px-5 py-3.5 border-b border-white/[0.04] last:border-none"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                    style={{ background: ch.color + '20', color: ch.color }}
                  >
                    {ch.icon}
                  </div>
                  <span className="text-sm font-medium text-white">{ch.name}</span>
                </div>
                <span className="text-xs text-white/50">{formatCurrency(ch.spend)}</span>
                <span className="text-xs text-white/50">{ch.leads}</span>
                <span className="text-xs text-white/50">{formatCurrency(ch.costPerQualifiedLead)}</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/[0.07] rounded-full overflow-hidden max-w-[140px]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: ch.qualityScore >= 70 ? '#10B981' : ch.qualityScore >= 50 ? '#F59E0B' : '#EF4444' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ch.qualityScore}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.06 }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold w-8 text-right"
                    style={{ color: ch.qualityScore >= 70 ? '#10B981' : ch.qualityScore >= 50 ? '#F59E0B' : '#EF4444' }}
                  >
                    {ch.qualityScore}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
