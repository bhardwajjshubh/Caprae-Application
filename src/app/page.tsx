'use client'

import { useState } from "react"
import { BuyerOnboarding } from "@/components/onboarding/BuyerOnboarding"
import { SellerOnboarding } from "@/components/onboarding/SellerOnboarding"
import { BuyerCard } from "@/components/profiles/BuyerCard"
import { BuyerProfileView } from "@/components/profiles/BuyerProfileView"
import { AcquisitionWorkflow } from "@/components/acquisition/AcquisitionWorkflow"
import { AIDocumentAnalyzer } from "@/components/ai/AIDocumentAnalyzer"
import { Navigation } from "@/components/navigation/Navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { BuyerProfile, SellerProfile, Deal, Document } from "@/types"
import { Users, Building, ArrowRight, Heart, FileText, Brain } from "lucide-react"

type ViewMode = 'landing' | 'buyer-onboarding' | 'seller-onboarding' | 'buyer-browse' | 'buyer-profile' | 'acquisition' | 'ai-analyzer'
type UserRole = 'buyer' | 'seller' | null

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing')
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [selectedBuyerId, setSelectedBuyerId] = useState<string | null>(null)

  // Mock data for demonstration
  const mockBuyer: BuyerProfile = {
    id: "buyer-1",
    email: "john.investor@email.com",
    firstName: "John",
    lastName: "Investor",
    userType: "buyer",
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    budget: { min: 500000, max: 2000000 },
    industries: ["technology", "saas", "ecommerce"],
    preferredRegions: ["north-america"],
    acquisitionType: "both",
    experienceLevel: "experienced",
    background: {
      currentRole: "Investment Manager",
      company: "TechVentures Capital",
      yearsOfExperience: 12,
      previousAcquisitions: 3
    },
    investmentFocus: {
      revenueFocus: "growing",
      profitabilityRequired: true,
      teamSize: "small"
    },
    preferences: {
      timeframe: "6-12-months",
      involvementLevel: "active",
      growthStrategy: ["Expand into new markets", "Build strategic partnerships", "Develop new product lines"]
    }
  }

  const mockDeal: Deal = {
    id: "deal-1",
    matchId: "match-1",
    buyerId: "buyer-1",
    sellerId: "seller-1",
    status: "due-diligence",
    currentStep: {
      id: "due-diligence",
      name: "Due Diligence",
      description: "Comprehensive business review",
      status: "in-progress",
      assignedTo: ["buyer-1", "seller-1"],
      documents: [],
      aiAnalysis: {
        id: "analysis-1",
        type: "document-summary",
        summary: "Financial documents show strong revenue growth with healthy profit margins.",
        keyFindings: [
          "Revenue growth of 35% year-over-year",
          "Profit margin improved from 18% to 24%",
          "Customer retention rate of 94%"
        ],
        redFlags: [
          "Heavy dependence on top 3 customers (65% of revenue)",
          "Limited cash reserves relative to monthly burn"
        ],
        recommendations: [
          "Diversify customer base before acquisition",
          "Secure additional working capital",
          "Implement customer retention programs"
        ],
        confidence: 0.87,
        createdAt: new Date()
      }
    },
    steps: [],
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockDocuments: Document[] = [
    {
      id: "doc-1",
      dealId: "deal-1",
      name: "Financial Statements 2024",
      type: "financial",
      uploadedBy: "seller-1",
      uploadedAt: new Date(),
      fileUrl: "/mock-file-url",
      fileSize: 2500000,
      mimeType: "application/pdf",
      aiAnalysis: {
        id: "analysis-1",
        documentId: "doc-1",
        type: "document-summary",
        summary: "Comprehensive financial analysis reveals strong business fundamentals with notable growth trends.",
        keyFindings: [
          "Revenue increased 35% from $1.2M to $1.62M",
          "EBITDA margin improved from 22% to 28%",
          "Monthly recurring revenue shows 8% month-over-month growth"
        ],
        redFlags: [
          "Accounts receivable aging shows 15% over 90 days",
          "High customer concentration risk"
        ],
        recommendations: [
          "Improve collections process",
          "Diversify customer base",
          "Consider factoring for cash flow"
        ],
        confidence: 0.92,
        createdAt: new Date()
      }
    },
    {
      id: "doc-2",
      dealId: "deal-1",
      name: "Customer Contracts",
      type: "legal",
      uploadedBy: "seller-1",
      uploadedAt: new Date(),
      fileUrl: "/mock-file-url-2",
      fileSize: 1800000,
      mimeType: "application/pdf"
    }
  ]

  const handleUserTypeSelect = (type: 'buyer' | 'seller') => {
    setUserRole(type)
    setViewMode(type === 'buyer' ? 'buyer-onboarding' : 'seller-onboarding')
  }

  const handleOnboardingComplete = (profile: Partial<BuyerProfile> | Partial<SellerProfile>) => {
    console.log('Onboarding completed:', profile)
    setViewMode(userRole === 'buyer' ? 'buyer-browse' : 'buyer-browse') // Sellers would see their dashboard
  }

  const renderCurrentView = () => {
    switch (viewMode) {
      case 'landing':
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                    Business Acquisitions,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500">
                      Reimagined
                    </span>
                  </h1>
                  <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
                    Connect qualified buyers and sellers through our seller-first matching platform. 
                    Streamlined workflows and AI-powered tools make business acquisitions faster, 
                    more transparent, and successful.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Button
                      size="xl"
                      onClick={() => handleUserTypeSelect('buyer')}
                      className="flex items-center gap-2"
                    >
                      <Users className="w-5 h-5" />
                      I&apos;m Looking to Buy
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button
                      size="xl"
                      variant="outline"
                      onClick={() => handleUserTypeSelect('seller')}
                      className="flex items-center gap-2"
                    >
                      <Building className="w-5 h-5" />
                      I&apos;m Looking to Sell
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  <Card className="text-center" hover>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-orange-600" />
                      </div>
                      <CardTitle className="mb-3">Seller-First Matching</CardTitle>
                      <CardDescription>
                        Sellers initiate contact with qualified buyers, giving you more control over your business sale process.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="text-center" hover>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <CardTitle className="mb-3">Streamlined Workflow</CardTitle>
                      <CardDescription>
                        Guided acquisition process with clear milestones, reducing friction and accelerating deal completion.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="text-center" hover>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-green-600" />
                      </div>
                      <CardTitle className="mb-3">AI-Powered Insights</CardTitle>
                      <CardDescription>
                        Automated document analysis, risk assessment, and valuation tools powered by artificial intelligence.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>

                {/* Demo Navigation */}
                <div className="mt-16 text-center">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">Explore the Platform</h3>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => setViewMode('buyer-browse')}
                      className="flex items-center gap-2"
                    >
                      View Buyer Cards Demo
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setViewMode('acquisition')}
                      className="flex items-center gap-2"
                    >
                      See Acquisition Workflow
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setViewMode('ai-analyzer')}
                      className="flex items-center gap-2"
                    >
                      Try AI Document Analyzer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'buyer-onboarding':
        return (
          <BuyerOnboarding
            onComplete={handleOnboardingComplete}
            onBack={() => setViewMode('landing')}
          />
        )

      case 'seller-onboarding':
        return (
          <SellerOnboarding
            onComplete={handleOnboardingComplete}
            onBack={() => setViewMode('landing')}
          />
        )

      case 'buyer-browse':
        return (
          <div className="min-h-screen bg-neutral-50">
            <Navigation userRole="seller" notifications={3} />
            <div className="max-w-7xl mx-auto p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold text-neutral-900">Potential Buyers</h1>
                  <Button onClick={() => setViewMode('landing')} variant="outline">
                    Back to Demo
                  </Button>
                </div>
                <p className="text-neutral-600">
                  Review and match with qualified buyers interested in businesses like yours.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BuyerCard
                  buyer={mockBuyer}
                  onAccept={(id) => console.log('Accepted buyer:', id)}
                  onReject={(id) => console.log('Rejected buyer:', id)}
                  onViewProfile={(id) => {
                    setSelectedBuyerId(id)
                    setViewMode('buyer-profile')
                  }}
                />
                {/* Additional mock buyer cards could go here */}
              </div>
            </div>
          </div>
        )

      case 'buyer-profile':
        return (
          <div className="min-h-screen bg-neutral-50">
            <Navigation userRole="seller" notifications={3} />
            <BuyerProfileView
              buyer={mockBuyer}
              onAccept={(id) => console.log('Accepted buyer:', id)}
              onReject={(id) => console.log('Rejected buyer:', id)}
              onBack={() => setViewMode('buyer-browse')}
            />
          </div>
        )

      case 'acquisition':
        return (
          <div className="min-h-screen bg-neutral-50">
            <Navigation userRole="buyer" notifications={2} />
            <div className="p-4">
              <Button 
                onClick={() => setViewMode('landing')} 
                variant="outline"
                className="mb-4"
              >
                Back to Demo
              </Button>
              <AcquisitionWorkflow
                deal={mockDeal}
                userRole="buyer"
                onStepComplete={(stepId: string) => console.log('Step completed:', stepId)}
                onDocumentUpload={(stepId: string, file: File) => console.log('Document uploaded:', stepId, file)}
                onRequestAIAnalysis={(docId: string) => console.log('AI analysis requested:', docId)}
              />
            </div>
          </div>
        )

      case 'ai-analyzer':
        return (
          <div className="min-h-screen bg-neutral-50">
            <Navigation userRole="buyer" notifications={1} />
            <div className="p-4">
              <Button 
                onClick={() => setViewMode('landing')} 
                variant="outline"
                className="mb-4"
              >
                Back to Demo
              </Button>
              <AIDocumentAnalyzer
                documents={mockDocuments}
                onAnalysisRequest={(docId: string) => console.log('Analysis requested:', docId)}
                onDocumentUpload={(file: File) => console.log('Document uploaded:', file)}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return renderCurrentView()
}
