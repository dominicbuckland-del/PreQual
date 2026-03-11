// ─── Core domain types ────────────────────────────────────────────────────────

export type LeadStatus = 'Hot' | 'Warm' | 'Nurture' | 'Filtered'
export type FinanceStatus = 'Pre-approved' | 'In progress' | 'Not yet' | 'Paying cash'
export type BuildType = 'House & Land package' | 'Knockdown rebuild' | 'Custom build' | 'Townhouse / terrace'
export type SEQRegion =
  | 'North Brisbane'
  | 'South Brisbane'
  | 'Ipswich / Springfield'
  | 'Logan / Scenic Rim'
  | 'Gold Coast hinterland'
  | 'Sunshine Coast'

export interface Lead {
  id: string
  name: string                 // Display name (anonymised for demo)
  score: number                // 0–100 qualification score
  status: LeadStatus
  channel: string              // Channel ID
  // Qualification answers
  intent: boolean
  timeline: string
  budget: string
  financeStatus: FinanceStatus
  verificationScore: number    // Credit/identity check result
  location: SEQRegion
  buildType: BuildType
  // CRM metadata
  tags: string[]
  utmCampaign: string
  utmMedium: string
  gclid?: string
  fbclid?: string
  createdAt: string            // ISO timestamp
  assignedTo?: string
  hubspotContactId?: string
}

export interface Builder {
  id: string
  name: string
  location: string
  priceRange: { min: number; max: number }
  buildTypes: BuildType[]
  logoInitials: string
  activeLeads: number
  contractsThisQuarter: number
}

export interface Channel {
  id: string
  name: string
  color: string                // Brand hex colour
  icon: string                 // Display character / emoji
  spend: number                // AUD this period
  leads: number                // Raw leads
  qualifiedLeads: number       // Post-filter leads
  costPerQualifiedLead: number // Derived metric
  qualityScore: number         // % that pass verification
}

// ─── Qualification flow state ─────────────────────────────────────────────────

export type QualStep =
  | 'intent'
  | 'timeline'
  | 'budget'
  | 'finance'
  | 'verification'
  | 'location'
  | 'buildType'
  | 'contact'
  | 'complete'
  | 'filtered'

export interface QualificationState {
  currentStep: QualStep
  answers: {
    intent?: boolean
    timeline?: string
    budget?: string
    financeStatus?: FinanceStatus
    docsProvided?: boolean
    location?: SEQRegion
    buildType?: BuildType
    name?: string
    email?: string
    phone?: string
  }
  score: number                // Running score as steps complete
}

// ─── Dashboard analytics ──────────────────────────────────────────────────────

export interface FunnelStep {
  label: string
  value: number
  pct: number                  // Relative % of impressions
}

export interface WeeklyTrend {
  day: string
  qualified: number
  filtered: number
}
