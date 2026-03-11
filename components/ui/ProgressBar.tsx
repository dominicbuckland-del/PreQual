'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number        // 0–100
  className?: string
  trackClassName?: string
  fillClassName?: string
  color?: string       // Hex override for dynamic colours
  height?: number      // px
  animated?: boolean
}

/**
 * Animated progress bar.
 * Uses Framer Motion for the width transition so it works on first render too.
 */
export function ProgressBar({
  value,
  className,
  trackClassName,
  fillClassName,
  color,
  height = 5,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div
      className={cn('w-full overflow-hidden rounded-full', trackClassName ?? 'bg-white/[0.07]', className)}
      style={{ height }}
    >
      <motion.div
        className={cn('h-full rounded-full', fillClassName ?? 'bg-lime')}
        style={color ? { background: color } : undefined}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={animated ? { duration: 0.7, ease: 'easeOut' } : { duration: 0 }}
      />
    </div>
  )
}
