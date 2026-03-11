'use client'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { NavSection } from '@/components/PreQualShell'

const NAV_LINKS: Array<[NavSection, string]> = [
  ['how',       'How it works'],
  ['qualify',   'Buyer flow'],
  ['channels',  'Channels'],
  ['dashboard', 'Dashboard'],
  ['pricing',   'Pricing'],
]

interface NavbarProps {
  active: NavSection
  onNavigate: (s: NavSection) => void
}

export function Navbar({ active, onNavigate }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-8 bg-navy/95 backdrop-blur-lg border-b border-white/[0.07]">
      {/* Logo */}
      <button
        onClick={() => onNavigate('hero')}
        className="flex items-center gap-2.5 group"
      >
        <div className="w-7 h-7 bg-lime rounded-md flex items-center justify-center text-xs font-bold text-lime-text">
          PQ
        </div>
        <span className="text-base font-bold tracking-tight group-hover:text-lime transition-colors">
          preQual
        </span>
      </button>

      {/* Links */}
      <div className="flex items-center gap-8">
        {NAV_LINKS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={cn(
              'text-sm font-medium transition-colors duration-150',
              active === id ? 'text-lime' : 'text-white/60 hover:text-white',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button variant="lime" size="sm">Book a demo</Button>
      </div>
    </nav>
  )
}
