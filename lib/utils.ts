import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Lead, LeadStatus } from './types'

/** Merge Tailwind classes safely, resolving conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Derive a colour class from a lead quality score */
export function scoreColorClass(score: number): string {
  if (score >= 85) return 'text-status-warm'
  if (score >= 65) return 'text-status-hot'
  if (score >= 40) return 'text-status-nurture'
  return 'text-status-filtered'
}

/** Hex colour for SVG score rings (not coverable by Tailwind at runtime) */
export function scoreColorHex(score: number): string {
  if (score >= 85) return '#10B981'
  if (score >= 65) return '#F59E0B'
  if (score >= 40) return '#60A5FA'
  return '#94A3B8'
}

/** Status badge config */
export const STATUS_META: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  Hot:      { bg: 'rgba(245,158,11,0.15)',  text: '#F59E0B', dot: '#F59E0B' },
  Warm:     { bg: 'rgba(16,185,129,0.12)',  text: '#10B981', dot: '#10B981' },
  Nurture:  { bg: 'rgba(59,130,246,0.12)',  text: '#60A5FA', dot: '#60A5FA' },
  Filtered: { bg: 'rgba(100,116,139,0.12)', text: '#94A3B8', dot: '#94A3B8' },
}

/** Format currency for display */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(value)
}

/** Derive a lead score from qualification answers (simplified scoring model) */
export function calculateLeadScore(answers: Partial<Lead>): number {
  let score = 0
  if (answers.intent) score += 10
  if (answers.timeline === 'Within 6 months') score += 20
  else if (answers.timeline === '6–12 months') score += 15
  else if (answers.timeline === '1–2 years') score += 5
  if (answers.budget === '$900k+') score += 20
  else if (answers.budget === '$700k–$900k') score += 15
  else if (answers.budget === '$500k–$700k') score += 10
  if (answers.financeStatus === 'Pre-approved') score += 30
  else if (answers.financeStatus === 'Paying cash') score += 28
  else if (answers.financeStatus === 'In progress') score += 15
  if (answers.verificationScore && answers.verificationScore > 0) score += answers.verificationScore / 5
  return Math.min(100, Math.round(score))
}
