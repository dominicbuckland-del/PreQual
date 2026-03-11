'use client'
/**
 * BuilderTicker
 * Infinite-scroll marquee strip of SEQ and Australian builder/developer names.
 * Uses pure CSS animation — no JS interval needed.
 */
import { TICKER_NAMES } from '@/data'

export function BuilderTicker() {
  // Double the array so the loop appears seamless
  const names = [...TICKER_NAMES, ...TICKER_NAMES]

  return (
    <div className="border-t border-white/[0.07] bg-white/[0.02] py-4 overflow-hidden">
      <div className="flex animate-ticker ticker-track">
        {names.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 px-8 text-[11px] font-bold text-white/20 tracking-[0.15em] uppercase"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
