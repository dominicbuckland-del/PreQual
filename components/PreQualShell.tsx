'use client'
/**
 * PreQualShell
 * Top-level client component. Owns section navigation state and
 * renders the correct section based on the active route.
 *
 * In a real SaaS app this would become Next.js App Router pages
 * with proper URL routing — for the prototype, we use in-memory state.
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './Navbar'
import { HeroSection } from './marketing/HeroSection'
import { HowItWorks } from './marketing/HowItWorks'
import { ChannelsSection } from './marketing/ChannelsSection'
import { PricingSection } from './marketing/PricingSection'
import { Footer } from './marketing/Footer'
import { QualificationContainer } from './qualification/QualificationContainer'
import { BuilderDashboard } from './dashboard/BuilderDashboard'

export type NavSection = 'hero' | 'how' | 'qualify' | 'channels' | 'dashboard' | 'pricing'

const DARK_SECTIONS: NavSection[] = ['how', 'pricing']

export function PreQualShell() {
  const [active, setActive] = useState<NavSection>('hero')

  return (
    <div className="min-h-screen bg-navy text-white">
      <Navbar active={active} onNavigate={setActive} />

      <AnimatePresence mode="wait">
        <motion.main
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {active === 'hero' && (
            <HeroSection onNavigate={setActive} />
          )}

          {active === 'how' && (
            <HowItWorks onNavigate={setActive} />
          )}

          {active === 'qualify' && (
            <div className="bg-[#0C1525] min-h-screen">
              <QualificationContainer />
            </div>
          )}

          {active === 'channels' && (
            <ChannelsSection />
          )}

          {active === 'dashboard' && (
            <div className="bg-navy min-h-screen">
              <BuilderDashboard />
            </div>
          )}

          {active === 'pricing' && (
            <PricingSection onNavigate={setActive} />
          )}
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}
