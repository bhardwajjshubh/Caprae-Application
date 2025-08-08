import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { Progress } from "@/components/ui/Progress"
import { ArrowLeft, ArrowRight, Building2, DollarSign, BarChart3, Target } from "lucide-react"
import { SellerProfile } from "@/types"

interface SellerOnboardingProps {
  onComplete: (profile: Partial<SellerProfile>) => void
  onBack?: () => void
}

const steps = [
  { title: "Business Overview", icon: Building2, description: "Tell us about your business" },
  { title: "Financial Performance", icon: DollarSign, description: "Revenue and profitability metrics" },
  { title: "Operations & Team", icon: BarChart3, description: "How your business operates" },
  { title: "Sale Details", icon: Target, description: "Why you're selling and expectations" }
]

export function SellerOnboarding({ onComplete, onBack }: SellerOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<SellerProfile>>({
    userType: 'seller',
    business: {
      name: '',
      industry: '',
      founded: new Date().getFullYear(),
      location: '',
      description: '',
      website: ''
    },
    financials: {
      askingPrice: 0,
      annualRevenue: 0,
      monthlyRevenue: 0,
      profit: 0,
      profitMargin: 0,
      growth: {
        revenueGrowth: 0,
        customerGrowth: 0
      }
    },
    operations: {
      employeeCount: 0,
      ownerInvolvement: 'full-time',
      reason: '',
      timeframe: '',
      assets: []
    },
    metrics: {
      customers: 0,
      competitiveAdvantages: [],
      challenges: []
    }
  })

  const industryOptions = [
    { value: 'technology', label: 'Technology & Software' },
    { value: 'ecommerce', label: 'E-commerce & Retail' },
    { value: 'saas', label: 'SaaS & Digital Services' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'professional-services', label: 'Professional Services' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'education', label: 'Education & Training' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'other', label: 'Other' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else if (onBack) {
      onBack()
    }
  }

  const updateFormData = (updates: Partial<SellerProfile>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                value={formData.firstName || ''}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                placeholder="Enter your first name"
              />
              <Input
                label="Last Name"
                value={formData.lastName || ''}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                placeholder="Enter your last name"
              />
            </div>
            <Input
              label="Email Address"
              type="email"
              value={formData.email || ''}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder="Enter your email address"
            />
            <Input
              label="Business Name"
              value={formData.business?.name || ''}
              onChange={(e) => updateFormData({ 
                business: { ...formData.business!, name: e.target.value }
              })}
              placeholder="Enter your business name"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Industry"
                value={formData.business?.industry || ''}
                onChange={(e) => updateFormData({ 
                  business: { ...formData.business!, industry: e.target.value }
                })}
                options={industryOptions}
                placeholder="Select industry"
              />
              <Input
                label="Year Founded"
                type="number"
                value={formData.business?.founded || ''}
                onChange={(e) => updateFormData({ 
                  business: { ...formData.business!, founded: parseInt(e.target.value) || new Date().getFullYear() }
                })}
                placeholder="2020"
              />
            </div>
            <Input
              label="Business Location"
              value={formData.business?.location || ''}
              onChange={(e) => updateFormData({ 
                business: { ...formData.business!, location: e.target.value }
              })}
              placeholder="City, State/Country"
            />
            <Input
              label="Website (Optional)"
              value={formData.business?.website || ''}
              onChange={(e) => updateFormData({ 
                business: { ...formData.business!, website: e.target.value }
              })}
              placeholder="https://yourbusiness.com"
            />
            <Textarea
              label="Business Description"
              value={formData.business?.description || ''}
              onChange={(e) => updateFormData({ 
                business: { ...formData.business!, description: e.target.value }
              })}
              placeholder="Describe what your business does, your target market, and key value propositions..."
              rows={4}
            />
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Asking Price"
                type="number"
                value={formData.financials?.askingPrice || ''}
                onChange={(e) => updateFormData({ 
                  financials: { ...formData.financials!, askingPrice: parseInt(e.target.value) || 0 }
                })}
                placeholder="1000000"
                helperText="Your desired sale price"
              />
              <Input
                label="Annual Revenue"
                type="number"
                value={formData.financials?.annualRevenue || ''}
                onChange={(e) => updateFormData({ 
                  financials: { ...formData.financials!, annualRevenue: parseInt(e.target.value) || 0 }
                })}
                placeholder="500000"
                helperText="Last 12 months"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Monthly Revenue"
                type="number"
                value={formData.financials?.monthlyRevenue || ''}
                onChange={(e) => updateFormData({ 
                  financials: { ...formData.financials!, monthlyRevenue: parseInt(e.target.value) || 0 }
                })}
                placeholder="40000"
                helperText="Average monthly revenue"
              />
              <Input
                label="Net Profit"
                type="number"
                value={formData.financials?.profit || ''}
                onChange={(e) => updateFormData({ 
                  financials: { ...formData.financials!, profit: parseInt(e.target.value) || 0 }
                })}
                placeholder="150000"
                helperText="Annual net profit"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Revenue Growth (%)"
                type="number"
                value={formData.financials?.growth?.revenueGrowth || ''}
                onChange={(e) => updateFormData({ 
                  financials: { 
                    ...formData.financials!, 
                    growth: { 
                      ...formData.financials!.growth!, 
                      revenueGrowth: parseInt(e.target.value) || 0 
                    }
                  }
                })}
                placeholder="25"
                helperText="Year-over-year growth"
              />
              <Input
                label="Customer Growth (%)"
                type="number"
                value={formData.financials?.growth?.customerGrowth || ''}
                onChange={(e) => updateFormData({ 
                  financials: { 
                    ...formData.financials!, 
                    growth: { 
                      ...formData.financials!.growth!, 
                      customerGrowth: parseInt(e.target.value) || 0 
                    }
                  }
                })}
                placeholder="20"
                helperText="Customer base growth"
              />
            </div>
            <Input
              label="Number of Customers"
              type="number"
              value={formData.metrics?.customers || ''}
              onChange={(e) => updateFormData({ 
                metrics: { ...formData.metrics!, customers: parseInt(e.target.value) || 0 }
              })}
              placeholder="1500"
              helperText="Total active customers"
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Number of Employees"
                type="number"
                value={formData.operations?.employeeCount || ''}
                onChange={(e) => updateFormData({ 
                  operations: { ...formData.operations!, employeeCount: parseInt(e.target.value) || 0 }
                })}
                placeholder="8"
                helperText="Full-time equivalent employees"
              />
              <Select
                label="Owner Involvement"
                value={formData.operations?.ownerInvolvement || ''}
                onChange={(e) => updateFormData({ 
                  operations: { ...formData.operations!, ownerInvolvement: e.target.value as 'full-time' | 'part-time' | 'passive' }
                })}
                options={[
                  { value: 'full-time', label: 'Full-time (40+ hours/week)' },
                  { value: 'part-time', label: 'Part-time (10-40 hours/week)' },
                  { value: 'passive', label: 'Passive (< 10 hours/week)' }
                ]}
                placeholder="Select involvement level"
              />
            </div>
            <Textarea
              label="Key Business Assets"
              value={formData.operations?.assets?.[0] || ''}
              onChange={(e) => updateFormData({ 
                operations: { ...formData.operations!, assets: [e.target.value] }
              })}
              placeholder="List key assets: equipment, intellectual property, customer lists, contracts, etc."
              rows={3}
            />
            <Textarea
              label="Competitive Advantages"
              value={formData.metrics?.competitiveAdvantages?.[0] || ''}
              onChange={(e) => updateFormData({ 
                metrics: { ...formData.metrics!, competitiveAdvantages: [e.target.value] }
              })}
              placeholder="What makes your business unique? Patents, exclusive partnerships, market position, etc."
              rows={3}
            />
            <Textarea
              label="Current Challenges"
              value={formData.metrics?.challenges?.[0] || ''}
              onChange={(e) => updateFormData({ 
                metrics: { ...formData.metrics!, challenges: [e.target.value] }
              })}
              placeholder="What challenges does the business face? Be honest - buyers appreciate transparency."
              rows={3}
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Textarea
              label="Reason for Selling"
              value={formData.operations?.reason || ''}
              onChange={(e) => updateFormData({ 
                operations: { ...formData.operations!, reason: e.target.value }
              })}
              placeholder="Why are you selling? (retirement, new venture, health, etc.)"
              rows={3}
            />
            <Select
              label="Desired Timeline"
              value={formData.operations?.timeframe || ''}
              onChange={(e) => updateFormData({ 
                operations: { ...formData.operations!, timeframe: e.target.value }
              })}
              options={[
                { value: '1-3-months', label: '1-3 months' },
                { value: '3-6-months', label: '3-6 months' },
                { value: '6-12-months', label: '6-12 months' },
                { value: '1-2-years', label: '1-2 years' },
                { value: 'flexible', label: 'Flexible timeline' }
              ]}
              placeholder="Select timeline"
            />
            <div className="bg-neutral-50 p-6 rounded-xl">
              <h4 className="font-semibold text-neutral-900 mb-4">Additional Information</h4>
              <div className="space-y-4 text-sm text-neutral-600">
                <p>• Financial documents will be requested during due diligence</p>
                <p>• All information will be kept confidential until mutual agreement</p>
                <p>• Our AI will help match you with qualified buyers</p>
                <p>• You can update your listing at any time</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-neutral-900">Seller Onboarding</h1>
          <span className="text-sm text-neutral-500">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <Progress value={progress} className="mb-6" />
        
        {/* Step indicators */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                  isActive 
                    ? 'bg-orange-500 text-white' 
                    : isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-neutral-200 text-neutral-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${
                  isActive ? 'text-orange-600' : isCompleted ? 'text-green-600' : 'text-neutral-500'
                }`}>
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between pt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Complete Profile' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
