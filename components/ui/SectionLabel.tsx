import { cn } from '@/lib/utils'

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-[10px] font-semibold text-white/40 tracking-[0.1em] uppercase', className)}>
      {children}
    </p>
  )
}
