'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { QUAL_STEP_META } from '@/data'
import type { QualStep } from '@/lib/types'

interface ProgressIndicatorProps {
  currentStep: QualStep
  onReset: () => void
}

const STEP_IDS = QUAL_STEP_META.map(s => s.id)

export function ProgressIndicator({ currentStep, onReset }: ProgressIndicatorProps) {
  const currentIndex = STEP_IDS.indexOf(currentStep as typeof STEP_IDS[number])
  const isDone = currentStep === 'complete'
  const isFiltered = currentStep === 'filtered'

  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
      <p className="text-[10px] font-semibold text-white/40 tracking-[0.1em] uppercase mb-4">
        Qualification Steps
      </p>

      <div className="flex flex-col gap-1.5">
        {QUAL_STEP_META.map((step, i) => {
          const isActive   = step.id === currentStep && !isDone && !isFiltered
          const isComplete = isDone || (currentIndex > i && !isFiltered)
          const isPending  = !isActive && !isComplete

          return (
            <motion.div
              key={step.id}
              initial={false}
              animate={{
                backgroundColor: isActive
                  ? 'rgba(200,240,64,0.06)'
                  : 'rgba(255,255,255,0)',
              }}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-colors',
                isActive ? 'border-lime/20' : 'border-transparent',
              )}
            >
              {/* Step number / checkmark */}
              <div
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 transition-all',
                  isComplete ? 'bg-status-warm text-white' :
                  isActive   ? 'bg-lime text-lime-text' :
                               'bg-white/10 text-white/30',
                )}
              >
                {isComplete ? '✓' : i + 1}
              </div>

              {/* Label */}
              <span className={cn(
                'text-xs font-medium flex-1',
                isComplete || isActive ? 'text-white' : 'text-white/40',
              )}>
                {step.label}
              </span>

              {/* Filter badge */}
              {step.isFilter && (
                <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">
                  FILTER
                </span>
              )}
            </motion.div>
          )
        })}
      </div>

      <button
        onClick={onReset}
        className="mt-4 w-full py-2 text-[11px] font-medium text-white/40 bg-white/[0.03] border border-white/10 rounded-lg hover:text-white/70 hover:bg-white/[0.05] transition-all"
      >
        ↺ Reset demo
      </button>
    </div>
  )
}
