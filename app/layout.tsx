import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'preQual — Verified Home Buyers for SEQ Builders',
  description:
    'preQual filters, verifies, and financially qualifies home buyers before they ever reach your sales team. Every lead is real. Every lead is ready.',
  keywords: ['home buyer leads', 'SEQ builders', 'qualified leads', 'property', 'Queensland'],
  openGraph: {
    title: 'preQual',
    description: 'Verified home buyers for SEQ builders. 3% on contract. Pay on results.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-navy">
      <body className="min-h-screen bg-navy text-white antialiased">{children}</body>
    </html>
  )
}
