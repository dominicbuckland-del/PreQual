import { cn } from '@/lib/utils'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

/**
 * Styled input field matching preQual dark theme.
 */
export function InputField({ label, error, className, ...props }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-white/50 tracking-wide">{label}</label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2.5 rounded-lg text-sm text-white',
          'bg-navy border border-white/10',
          'placeholder:text-white/30',
          'focus:outline-none focus:border-lime/50 focus:ring-2 focus:ring-lime/10',
          'transition-all duration-150',
          error && 'border-red-500 focus:border-red-500',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
