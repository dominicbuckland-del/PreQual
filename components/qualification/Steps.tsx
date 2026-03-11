'use client'
/**
 * Individual step components for the qualification flow.
 * Each receives an onAnswer callback and renders the appropriate UI.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import type { FinanceStatus, SEQRegion, BuildType } from '@/lib/types'

const optionClass =
  'w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white ' +
  'bg-white/[0.04] border border-white/10 ' +
  'hover:bg-lime/[0.08] hover:border-lime/35 hover:translate-x-0.5 ' +
  'active:scale-[0.99] transition-all duration-100'

// ─── Shared animated wrapper ──────────────────────────────────────────────────
export function StepWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      key="step"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-4"
    >
      {children}
    </motion.div>
  )
}

function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-medium leading-snug tracking-tight text-white">
      {children}
    </h3>
  )
}

// ─── Step: Intent ─────────────────────────────────────────────────────────────
export function StepIntent({ onAnswer }: { onAnswer: (val: boolean) => void }) {
  return (
    <StepWrapper>
      <StepHeading>Are you looking to buy a new home in South East Queensland?</StepHeading>
      <div className="flex gap-3">
        <button className={optionClass} onClick={() => onAnswer(true)}>Yes</button>
        <button className={optionClass} onClick={() => onAnswer(false)}>No</button>
      </div>
    </StepWrapper>
  )
}

// ─── Step: Timeline ───────────────────────────────────────────────────────────
const TIMELINE_OPTIONS = ['Within 6 months', '6–12 months', '1–2 years', 'Just exploring']

export function StepTimeline({ onAnswer }: { onAnswer: (val: string) => void }) {
  return (
    <StepWrapper>
      <StepHeading>When are you looking to move in?</StepHeading>
      <div className="flex flex-col gap-2">
        {TIMELINE_OPTIONS.map(opt => (
          <button key={opt} className={optionClass} onClick={() => onAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </StepWrapper>
  )
}

// ─── Step: Budget ─────────────────────────────────────────────────────────────
const BUDGET_OPTIONS = ['Under $500k', '$500k–$700k', '$700k–$900k', '$900k+']

export function StepBudget({ onAnswer }: { onAnswer: (val: string) => void }) {
  return (
    <StepWrapper>
      <StepHeading>What's your approximate budget for your new home?</StepHeading>
      <div className="flex flex-col gap-2">
        {BUDGET_OPTIONS.map(opt => (
          <button key={opt} className={optionClass} onClick={() => onAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </StepWrapper>
  )
}

// ─── Step: Finance status ─────────────────────────────────────────────────────
const FINANCE_OPTIONS: FinanceStatus[] = ['Pre-approved', 'In progress', 'Not yet', 'Paying cash']

export function StepFinance({ onAnswer }: { onAnswer: (val: FinanceStatus) => void }) {
  return (
    <StepWrapper>
      <StepHeading>Have you spoken to a lender or mortgage broker?</StepHeading>
      <div className="flex flex-col gap-2">
        {FINANCE_OPTIONS.map(opt => (
          <button key={opt} className={optionClass} onClick={() => onAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </StepWrapper>
  )
}

// ─── Step: Verification ───────────────────────────────────────────────────────
const DOC_ITEMS = [
  {
    icon: '📄',
    label: 'Payslips',
    desc: 'Last 2 payslips (PAYG) or last 2 years tax returns if self-employed',
  },
  {
    icon: '🏦',
    label: 'Bank statements',
    desc: '3 months of statements showing savings and deposit funds',
  },
  {
    icon: '🪪',
    label: 'Photo ID',
    desc: "Driver's licence or passport — used for identity verification only",
  },
]

export function StepVerification({ onAnswer }: { onAnswer: () => void }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const allChecked = DOC_ITEMS.every((_, i) => checked[i])

  return (
    <StepWrapper>
      <StepHeading>To confirm your borrowing capacity, we need a few documents.</StepHeading>

      {/* Trust note */}
      <div className="flex gap-3 p-3 rounded-xl bg-blue-brand/15 border border-blue-brand/30 text-xs text-blue-300 leading-relaxed">
        <span className="shrink-0">🔒</span>
        Documents are encrypted in transit and at rest. They are used solely to verify your borrowing capacity through our lending partner, and never shared without your written consent. Soft check only — does not affect your credit score.
      </div>

      {/* Doc checklist */}
      <div className="flex flex-col gap-2">
        {DOC_ITEMS.map((doc, i) => (
          <button
            key={doc.label}
            onClick={() => setChecked(c => ({ ...c, [i]: !c[i] }))}
            className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
              checked[i]
                ? 'bg-lime/[0.08] border-lime/40'
                : 'bg-white/[0.04] border-white/10 hover:border-white/25'
            }`}
          >
            <span className="text-xl shrink-0 mt-0.5">{doc.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-white mb-0.5">{doc.label}</p>
              <p className="text-xs text-white/50 leading-relaxed">{doc.desc}</p>
            </div>
            <div className={`w-5 h-5 rounded border shrink-0 mt-0.5 flex items-center justify-center text-[10px] font-bold transition-all ${
              checked[i]
                ? 'bg-lime border-lime text-lime-text'
                : 'border-white/20 text-transparent'
            }`}>
              {checked[i] ? '✓' : ''}
            </div>
          </button>
        ))}
      </div>

      <Button
        variant="lime"
        size="lg"
        className="w-full"
        disabled={!allChecked}
        onClick={onAnswer}
      >
        Submit documents &amp; verify →
      </Button>
      <p className="text-center text-xs text-white/30">
        Documents reviewed within 2 business hours.
      </p>
    </StepWrapper>
  )
}

// ─── Step: Location ───────────────────────────────────────────────────────────
const LOCATION_OPTIONS: SEQRegion[] = [
  'North Brisbane', 'South Brisbane', 'Ipswich / Springfield',
  'Logan / Scenic Rim', 'Gold Coast hinterland', 'Sunshine Coast',
]

export function StepLocation({ onAnswer }: { onAnswer: (val: SEQRegion) => void }) {
  return (
    <StepWrapper>
      <StepHeading>Which area interests you most?</StepHeading>
      <div className="grid grid-cols-2 gap-2">
        {LOCATION_OPTIONS.map(opt => (
          <button key={opt} className={optionClass} onClick={() => onAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </StepWrapper>
  )
}

// ─── Step: Build type ─────────────────────────────────────────────────────────
const BUILD_OPTIONS: BuildType[] = [
  'House & Land package', 'Knockdown rebuild', 'Custom build', 'Townhouse / terrace',
]

export function StepBuildType({ onAnswer }: { onAnswer: (val: BuildType) => void }) {
  return (
    <StepWrapper>
      <StepHeading>What type of new home are you looking for?</StepHeading>
      <div className="flex flex-col gap-2">
        {BUILD_OPTIONS.map(opt => (
          <button key={opt} className={optionClass} onClick={() => onAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </StepWrapper>
  )
}
