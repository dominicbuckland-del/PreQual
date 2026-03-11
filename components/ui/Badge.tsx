import { cn } from '@/lib/utils'
import type { LeadStatus } from '@/lib/types'
import { STATUS_META } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  dot?: boolean
  dotColor?: string
  bgColor?: string
  textColor?: string
}

/** Generic coloured badge */
export function Badge({ label, dot, dotColor, bgColor, textColor, className, style, ...props }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold', className)}
      style={{ background: bgColor, color: textColor, ...style }}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: dotColor }}
        />
      )}
      {label}
    </span>
  )
}

/** Convenience: StatusBadge for lead status */
export function StatusBadge({ status }: { status: LeadStatus }) {
  const meta = STATUS_META[status]
  return (
    <Badge
      label={status}
      dot
      dotColor={meta.dot}
      bgColor={meta.bg}
      textColor={meta.text}
    />
  )
}

/** Small tag pill (for lead tag lists) */
export function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] border border-white/10 text-white/50">
      {label}
    </span>
  )
}
