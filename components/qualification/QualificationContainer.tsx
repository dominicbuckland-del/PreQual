'use client'
/**
 * QualificationContainer
 * Owns all qualification state and routes between step components.
 * Uses a reducer-style pattern via useState + explicit transitions.
 */
import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProgressIndicator } from './ProgressIndicator'
import { ProgressBar } from '@/components/ui/ProgressBar'
import {
  StepIntent, StepTimeline, StepBudget, StepFinance,
  StepVerification, StepLocation, StepBuildType, StepContact,
} from './Steps'
import type { QualificationState, QualStep, FinanceStatus, SEQRegion, BuildType } from '@/lib/types'
import { calculateLeadScore } from '@/lib/utils'
import { QUAL_STEP_META } from '@/data'

const STEP_ORDER: QualStep[] = [
  'intent', 'timeline', 'budget', 'finance', 'verification', 'location', 'buildType', 'contact', 'complete',
]

const STEP_LABELS: Record<QualStep, string> = {
  intent: 'Intent Signal', timeline: 'Timeline', budget: 'Budget Range',
  finance: 'Finance Status', verification: 'Verification', location: 'Location',
  buildType: 'Build Type', contact: 'Your Details', complete: 'Complete', filtered: 'Filtered',
}

const INITIAL_STATE: QualificationState = {
  currentStep: 'intent',
  answers: {},
  score: 0,
}

export function QualificationContainer() {
  const [state, setState] = useState<QualificationState>(INITIAL_STATE)

  const saveLead = useCallback(async (answers: QualificationState['answers'], score: number) => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...answers,
          score,
          status: score >= 80 ? 'Hot' : score >= 60 ? 'Warm' : 'Nurture',
          channel: new URLSearchParams(window.location.search).get('utm_source') ?? 'direct',
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') ?? null,
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium') ?? null,
          verificationScore: answers.docsProvided ? Math.floor(Math.random() * 20 + 70) : 0,
        }),
      })
    } catch (err) {
      console.error('Failed to save lead:', err)
    }
  }, [])

  const advance = useCallback((nextStep: QualStep, newAnswers: QualificationState['answers']) => {
    setState(prev => {
      const mergedAnswers = { ...prev.answers, ...newAnswers }
      const newScore = calculateLeadScore(mergedAnswers as never)
      if (nextStep === 'complete') {
        saveLead(mergedAnswers, newScore)
      }

      return { currentStep: nextStep, answers: mergedAnswers, score: newScore }
    })
  }, [saveLead])

  const reset = useCallback(() => setState(INITIAL_STATE), [])

  const stepIndex = STEP_ORDER.indexOf(state.currentStep)
  const progress = state.currentStep === 'complete' || state.currentStep === 'filtered'
    ? 100
    : Math.round((stepIndex / (STEP_ORDER.length - 1)) * 100)

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-medium tracking-tight text-white mb-3">
          The buyer experience.
        </h2>
        <p className="text-base text-white/50 max-w-md mx-auto">
          Walk through the exact flow a buyer sees. Filters are live — try answering
          &quot;No&quot; or &quot;Not yet&quot; to see what happens.
        </p>
      </div>

      <div className="grid grid-cols-[280px,1fr] gap-6 items-start">
        {/* Sidebar */}
        <ProgressIndicator currentStep={state.currentStep} onReset={reset} />

        {/* Form panel */}
        <div className="bg-navy-mid border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Panel header */}
          <div className="bg-gradient-to-r from-navy-light to-navy-mid px-6 py-5 border-b border-white/[0.07] flex items-center gap-3">
            <div className="w-8 h-8 bg-lime rounded-lg flex items-center justify-center text-xs font-bold text-lime-text">
              PQ
            </div>
            <div>
              <p className="text-sm font-semibold text-white">preQual</p>
              <p className="text-xs text-white/40">New Home Pre-Qualification · SEQ</p>
            </div>
          </div>

          <div className="px-7 py-7">
            {/* Progress */}
            {state.currentStep !== 'complete' && state.currentStep !== 'filtered' && (
              <div className="mb-7">
                <div className="flex justify-between text-xs text-white/40 mb-2 font-medium">
                  <span>Step {stepIndex + 1} of {STEP_ORDER.length - 1}</span>
                  <span className="text-lime">{STEP_LABELS[state.currentStep]}</span>
                </div>
                <ProgressBar value={progress} height={3} fillClassName="bg-navy" />
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Intent */}
              {state.currentStep === 'intent' && (
                <StepIntent key="intent" onAnswer={v => advance(v ? 'timeline' : 'filtered', { intent: v })} />
              )}
              {/* Timeline */}
              {state.currentStep === 'timeline' && (
                <StepTimeline key="timeline" onAnswer={v => advance('budget', { timeline: v })} />
              )}
              {/* Budget */}
              {state.currentStep === 'budget' && (
                <StepBudget key="budget" onAnswer={v => advance('finance', { budget: v })} />
              )}
              {/* Finance */}
              {state.currentStep === 'finance' && (
                <StepFinance
                  key="finance"
                  onAnswer={v => advance(v === 'Not yet' ? 'filtered' : 'verification', { financeStatus: v as FinanceStatus })}
                />
              )}
              {/* Verification */}
              {state.currentStep === 'verification' && (
                <StepVerification key="verification" onAnswer={() => advance('location', { docsProvided: true })} />
              )}
              {/* Location */}
              {state.currentStep === 'location' && (
                <StepLocation key="location" onAnswer={v => advance('buildType', { location: v as SEQRegion })} />
              )}
              {/* Build type */}
              {state.currentStep === 'buildType' && (
                <StepBuildType key="buildType" onAnswer={v => advance('contact', { buildType: v as BuildType })} />
              )}
              {/* Contact */}
              {state.currentStep === 'contact' && (
                <StepContact key="contact" onAnswer={v => advance('complete', v)} />
              )}

              {/* Filtered out */}
              {state.currentStep === 'filtered' && (
                <motion.div
                  key="filtered"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="text-4xl mb-4">⚠</div>
                  <h3 className="text-xl font-medium text-white mb-3">Not quite ready yet.</h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-sm mx-auto mb-6">
                    Based on your answers, now might not be the right time to connect with a builder.
                    We&apos;ll send you some resources to help you prepare.
                  </p>
                  <div className="inline-block px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white/40">
                    ← This buyer never reaches a builder&apos;s sales team.
                  </div>
                </motion.div>
              )}

              {/* Complete */}
              {state.currentStep === 'complete' && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-status-warm/10 border-2 border-status-warm flex items-center justify-center text-2xl mx-auto mb-5">
                    ✓
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight text-lime mb-3">
                    You&apos;re qualified.
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-sm mx-auto mb-5">
                    Your identity and financial capacity have been verified. A preQual consultant will
                    be in touch within the hour to match you with builders in your area.
                  </p>
                  <div className="inline-block px-4 py-3 bg-status-warm/[0.08] border border-status-warm/20 rounded-xl text-sm font-semibold text-status-warm mb-4">
                    Score: {state.score}/100 · {state.answers.financeStatus} · SEQ ready
                  </div>
                  <p className="text-xs text-white/25">
                    Zapier fires → HubSpot tagged → Builder sales rep notified
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
