'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { NavSection } from '@/components/PreQualShell'

interface PricingSectionProps {
  onNavigate: (s: NavSection) => void
}

const CARDS = [
  { icon: '⊘', label: 'No lead, no fee',      desc: "You're only charged when a buyer we verified signs a contract with your company." },
  { icon: '◆', label: '3% on contract value', desc: 'A single, transparent commission. No surprises, no hidden platform fees.' },
  { icon: '◉', label: 'Full attribution',      desc: 'Every contract traces back to the source channel, campaign, and ad creative.' },
  { icon: '◎', label: 'Cancel anytime',        desc: 'No minimum term. If preQual isn\'t delivering, you\'re free to walk away.' },
]

export function PricingSection({ onNavigate }: PricingSectionProps) {
  return (
    <section className="bg-[#111827] px-6 py-24 text-center">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-[clamp(32px,4vw,52px)] font-medium tracking-tight text-white mb-4 leading-tight">
            Simple. Performance-based.<br />
            <span className="text-lime">Pay on results.</span>
          </h2>
          <p className="text-base text-white/50 leading-relaxed max-w-xl mx-auto mb-14">
            No monthly retainer. No setup fee. No lock-in. preQual charges 3% on contracts
            signed from our verified leads. If we don&apos;t deliver, you don&apos;t pay.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-4 mb-10 text-left">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="p-6 h-full">
                <p className="text-2xl text-lime mb-3">{c.icon}</p>
                <p className="text-sm font-semibold text-white mb-2">{c.label}</p>
                <p className="text-xs text-white/50 leading-relaxed">{c.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Example calculation */}
        <div
          className="rounded-2xl p-10 mb-6 border border-lime/15"
          style={{ background: 'linear-gradient(135deg, #152B50, #0D1F3C)' }}
        >
          <p className="text-xs font-semibold text-lime tracking-[0.06em] uppercase mb-3">Example</p>
          <p className="text-2xl font-medium tracking-tight text-white mb-4">
            $750,000 contract × 3% = <span className="text-lime">$22,500</span>
          </p>
          <p className="text-sm text-white/50 leading-relaxed max-w-lg mx-auto">
            Compare that to the cost of a sales rep spending 40+ hours on unqualified leads —
            or a $750k contract that never got followed up because the team was buried in tyre kickers.
          </p>
        </div>

        <Button variant="lime" size="lg" onClick={() => onNavigate('qualify')}>
          See how leads are qualified →
        </Button>

        <p className="text-[11px] text-white/20 mt-5">
          CONFIDENTIAL · INVESTOR PROTOTYPE · preQual SEQ · v0.5
        </p>
      </div>
    </section>
  )
}
