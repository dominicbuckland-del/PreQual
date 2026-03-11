import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use 'dark' for the slightly lighter navy panel, 'glass' for white-translucent */
  variant?: 'default' | 'dark' | 'glass' | 'highlight'
}

const variants: Record<NonNullable<CardProps['variant']>, string> = {
  default:   'bg-white/[0.04] border border-white/[0.08]',
  dark:      'bg-navy-mid border border-white/[0.06]',
  glass:     'bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm',
  highlight: 'bg-lime/[0.06] border border-lime/[0.2]',
}

/** Base card wrapper. Composes with cn() for overrides. */
export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-2xl', variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}

/** Convenience sub-components */
export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-5 py-4 border-b border-white/[0.07] flex items-center justify-between', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  )
}
