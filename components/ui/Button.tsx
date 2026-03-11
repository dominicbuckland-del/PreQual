'use client'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'lime' | 'ghost' | 'dark' | 'outline'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantClasses: Record<Variant, string> = {
  lime:    'bg-lime text-lime-text font-semibold hover:bg-lime-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(200,240,64,0.25)] active:translate-y-0',
  ghost:   'bg-transparent text-white border border-white/25 hover:border-white/60 hover:bg-white/5',
  dark:    'bg-navy-light text-white border border-white/10 hover:bg-white/5',
  outline: 'bg-transparent text-lime border border-lime/40 hover:border-lime/80',
}

const sizeClasses: Record<Size, string> = {
  sm:  'px-3 py-1.5 text-xs',
  md:  'px-4 py-2 text-sm',
  lg:  'px-7 py-3.5 text-base',
}

/**
 * Reusable button with lime / ghost / dark / outline variants.
 * All interactive states are handled via Tailwind.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'lime', size = 'md', loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : null}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
