'use client'
/**
 * ChannelPerformanceChart
 * Recharts bar chart comparing quality score across acquisition channels.
 */
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CHANNELS } from '@/data'

const getBarColor = (score: number) => {
  if (score >= 70) return '#10B981'
  if (score >= 50) return '#F59E0B'
  return '#EF4444'
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const ch = payload[0]
  return (
    <div className="bg-navy-mid border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-white mb-1">{label}</p>
      <p style={{ color: getBarColor(ch.value) }}>Quality: {ch.value}%</p>
      <p className="text-white/50">Leads: {payload[1]?.value ?? '—'}</p>
    </div>
  )
}

export function ChannelPerformanceChart() {
  const data = [...CHANNELS].sort((a, b) => b.qualityScore - a.qualityScore).map(ch => ({
    name: ch.name.replace(' Ads', ''),
    quality: ch.qualityScore,
    leads: ch.leads,
    color: ch.color,
  }))

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Channel Quality Scores</SectionLabel>
        <p className="text-[10px] text-white/30">% of leads passing verification</p>
      </CardHeader>
      <CardBody className="pt-2">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
              axisLine={false} tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
              axisLine={false} tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="quality" radius={[4, 4, 0, 0]} maxBarSize={36}>
              {data.map((entry, index) => (
                <Cell key={index} fill={getBarColor(entry.quality)} opacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-white/[0.06]">
          {[['#10B981', '70%+ High quality'], ['#F59E0B', '50–69% Medium'], ['#EF4444', '<50% Low']].map(([c, l]) => (
            <div key={l} className="flex items-center gap-1.5 text-[10px] text-white/40">
              <div className="w-2 h-2 rounded-sm" style={{ background: c }} />
              {l}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
