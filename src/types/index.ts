export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  userType: 'buyer' | 'seller'
  createdAt: Date
  updatedAt: Date
}

export interface BuyerProfile extends User {
  userType: 'buyer'
  // Investment criteria
  budget: {
    min: number
    max: number
  }
  industries: string[]
  preferredRegions: string[]
  acquisitionType: 'strategic' | 'financial' | 'both'
  experienceLevel: 'first-time' | 'experienced' | 'serial'
  
  // Background information
  background: {
    currentRole: string
    company?: string
    yearsOfExperience: number
    previousAcquisitions: number
  }
  
  // Investment focus
  investmentFocus: {
    revenueFocus: 'growing' | 'stable' | 'either'
    profitabilityRequired: boolean
    teamSize: 'solo' | 'small' | 'medium' | 'large' | 'any'
  }
  
  // Additional preferences
  preferences: {
    timeframe: string // e.g., "3-6 months"
    involvementLevel: 'passive' | 'active' | 'hands-on'
    growthStrategy: string[]
  }
}

export interface SellerProfile extends User {
  userType: 'seller'
  // Business information
  business: {
    name: string
    industry: string
    founded: number
    location: string
    description: string
    website?: string
  }
  
  // Financial information
  financials: {
    askingPrice: number
    annualRevenue: number
    monthlyRevenue: number
    profit: number
    profitMargin: number
    growth: {
      revenueGrowth: number // percentage
      customerGrowth: number
    }
  }
  
  // Operational details
  operations: {
    employeeCount: number
    ownerInvolvement: 'full-time' | 'part-time' | 'passive'
    reason: string
    timeframe: string
    assets: string[]
  }
  
  // Business metrics
  metrics: {
    customers: number
    marketShare?: number
    competitiveAdvantages: string[]
    challenges: string[]
  }
}

export interface Match {
  id: string
  buyerId: string
  sellerId: string
  initiatedBy: 'seller'
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  createdAt: Date
  expiresAt: Date
  message?: string
}

export interface Conversation {
  id: string
  matchId: string
  participants: string[]
  messages: Message[]
  status: 'active' | 'archived' | 'closed'
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  type: 'text' | 'document' | 'system'
  readBy: string[]
  createdAt: Date
}

export interface Deal {
  id: string
  matchId: string
  buyerId: string
  sellerId: string
  status: 'negotiating' | 'due-diligence' | 'legal-review' | 'closing' | 'completed' | 'cancelled'
  currentStep: DealStep
  steps: DealStep[]
  documents: Document[]
  createdAt: Date
  updatedAt: Date
  targetCloseDate?: Date
  agreedPrice?: number
}

export interface DealStep {
  id: string
  name: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  assignedTo: string[]
  dueDate?: Date
  completedAt?: Date
  documents: string[] // Document IDs
  aiAnalysis?: AIAnalysis
}

export interface Document {
  id: string
  dealId: string
  name: string
  type: 'financial' | 'legal' | 'operational' | 'other'
  uploadedBy: string
  uploadedAt: Date
  fileUrl: string
  fileSize: number
  mimeType: string
  aiAnalysis?: AIAnalysis
}

export interface AIAnalysis {
  id: string
  documentId?: string
  stepId?: string
  type: 'document-summary' | 'risk-assessment' | 'valuation-analysis' | 'timeline-optimization'
  summary: string
  keyFindings: string[]
  redFlags: string[]
  recommendations: string[]
  confidence: number // 0-1
  createdAt: Date
}

export interface OnboardingProgress {
  userId: string
  currentStep: number
  totalSteps: number
  completedSteps: number[]
  responses: Record<string, string | number | boolean | string[]>
  isComplete: boolean
}
