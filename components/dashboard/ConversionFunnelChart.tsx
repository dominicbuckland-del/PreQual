'use client'
/**
 * ConversionFunnelChart
 * Horizontal funnel visualisation using Recharts FunnelChart.
 * Falls back to a custom CSS funnel if the chart library is unavailable.
 */
import { motion } from 'framer-motion'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FUNNEL_STEPS } from '@/data'

function formatValue(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
  return String(v)
}

export function ConversionFunnelChart() {
  return (
    <Card>
      <CardHeader>
        <SectionLabel>Acquisition Funnel · This Week</SectionLabel>
        <p className="text-[10px] text-white/30">All channels combined</p>
      </CardHeader>
      <CardBody>
        {/* Custom CSS funnel — works without a chart library */}
        <div className="flex items-end gap-1 mb-4">
          {FUNNEL_STEPS.map((step, i) => {
            const isLast = i === FUNNEL_STEPS.length - 1
            return (
              <div key={step.label} className="flex items-end gap-1 flex-1">
                <div className="flex flex-col items-center w-full">
                  <span className={`text-sm font-bold mb-1.5 ${isLast ? 'text-lime' : 'text-white'}`}>
                    {formatValue(step.value)}
                  </span>
                  <motion.div
                    className="w-full rounded-t"
                    style={{
                      background: isLast
                        ? '#C8F040'
                        : `rgba(255,255,255,${0.04 + i * 0.025})`,
                      border: isLast ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: Math.max(12, (step.pct / 100) * 120) }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                  />
                  <div className="w-full h-px bg-white/10 mt-0" />
                  <span className="text-[9px] text-white/30 mt-1.5 font-medium tracking-wide text-center leading-tight">
                    {step.label.toUpperCase()}
                  </span>
                </div>
                {i < FUNNEL_STEPS.length - 1 && (
                  <div className="w-2 h-px bg-white/20 mb-8 shrink-0" />
                )}
              </div>
            )
          })}
        </div>

        {/* Metrics strip */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/[0.06]">
          {[
            ['Click rate',     '2.4%',  'white/60'],
            ['Form complete',  '9.5%',  'white/60'],
            ['Verify pass',    '61%',   'lime'],
            ['CPL (qualified)','$128',  'lime'],
          ].map(([label, val, col]) => (
            <div key={label} className="text-center">
              <p className={`text-base font-bold text-${col}`}>{val}</p>
              <p className="text-[9px] text-white/30 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
