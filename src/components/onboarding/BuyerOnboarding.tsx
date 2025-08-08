import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Textarea } from "@/components/ui/Textarea"
import { Progress } from "@/components/ui/Progress"
import { ArrowLeft, ArrowRight, Users, Target, TrendingUp, Briefcase } from "lucide-react"
import { BuyerProfile } from "@/types"

interface BuyerOnboardingProps {
  onComplete: (profile: Partial<BuyerProfile>) => void
  onBack?: () => void
}

const steps = [
  { title: "Personal Info", icon: Users, description: "Tell us about yourself" },
  { title: "Investment Goals", icon: Target, description: "What are you looking to acquire?" },
  { title: "Financial Capacity", icon: TrendingUp, description: "Your budget and timeline" },
  { title: "Experience & Preferences", icon: Briefcase, description: "Your background and goals" }
]

export function BuyerOnboarding({ onComplete, onBack }: BuyerOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<BuyerProfile>>({
    userType: 'buyer',
    budget: { min: 0, max: 0 },
    industries: [],
    preferredRegions: [],
    background: {
      currentRole: '',
      yearsOfExperience: 0,
      previousAcquisitions: 0
    },
    investmentFocus: {
      revenueFocus: 'either',
      profitabilityRequired: false,
      teamSize: 'any'
    },
    preferences: {
      timeframe: '',
      involvementLevel: 'active',
      growthStrategy: []
    }
  })

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'education', label: 'Education' },
    { value: 'professional-services', label: 'Professional Services' },
    { value: 'other', label: 'Other' }
  ]

  const regionOptions = [
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'africa', label: 'Africa' },
    { value: 'global', label: 'Global/No Preference' }
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

  const updateFormData = (updates: Partial<BuyerProfile>) => {
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
              label="Current Role/Position"
              value={formData.background?.currentRole || ''}
              onChange={(e) => updateFormData({ 
                background: { ...formData.background!, currentRole: e.target.value }
              })}
              placeholder="e.g., CEO, Investor, Entrepreneur"
            />
            <Input
              label="Company (Optional)"
              value={formData.background?.company || ''}
              onChange={(e) => updateFormData({ 
                background: { ...formData.background!, company: e.target.value }
              })}
              placeholder="Your current company"
            />
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <Select
              label="Primary Industries of Interest"
              value={formData.industries?.[0] || ''}
              onChange={(e) => updateFormData({ industries: [e.target.value] })}
              options={industryOptions}
              placeholder="Select primary industry"
            />
            <Select
              label="Preferred Geographic Regions"
              value={formData.preferredRegions?.[0] || ''}
              onChange={(e) => updateFormData({ preferredRegions: [e.target.value] })}
              options={regionOptions}
              placeholder="Select preferred region"
            />
            <Select
              label="Acquisition Type"
              value={formData.acquisitionType || ''}
              onChange={(e) => updateFormData({ acquisitionType: e.target.value as any })}
              options={[
                { value: 'strategic', label: 'Strategic (Industry expertise/synergies)' },
                { value: 'financial', label: 'Financial (Investment returns)' },
                { value: 'both', label: 'Both strategic and financial' }
              ]}
              placeholder="Select acquisition type"
            />
            <Select
              label="Revenue Focus"
              value={formData.investmentFocus?.revenueFocus || ''}
              onChange={(e) => updateFormData({ 
                investmentFocus: { ...formData.investmentFocus!, revenueFocus: e.target.value as any }
              })}
              options={[
                { value: 'growing', label: 'Growing revenue businesses' },
                { value: 'stable', label: 'Stable revenue businesses' },
                { value: 'either', label: 'Either growing or stable' }
              ]}
              placeholder="Select revenue focus"
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Minimum Budget"
                type="number"
                value={formData.budget?.min || ''}
                onChange={(e) => updateFormData({ 
                  budget: { ...formData.budget!, min: parseInt(e.target.value) || 0 }
                })}
                placeholder="$100,000"
              />
              <Input
                label="Maximum Budget"
                type="number"
                value={formData.budget?.max || ''}
                onChange={(e) => updateFormData({ 
                  budget: { ...formData.budget!, max: parseInt(e.target.value) || 0 }
                })}
                placeholder="$5,000,000"
              />
            </div>
            <Select
              label="Desired Timeline"
              value={formData.preferences?.timeframe || ''}
              onChange={(e) => updateFormData({ 
                preferences: { ...formData.preferences!, timeframe: e.target.value }
              })}
              options={[
                { value: '3-6-months', label: '3-6 months' },
                { value: '6-12-months', label: '6-12 months' },
                { value: '1-2-years', label: '1-2 years' },
                { value: 'flexible', label: 'Flexible timeline' }
              ]}
              placeholder="Select timeline"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Profitability Requirement"
                value={formData.investmentFocus?.profitabilityRequired ? 'yes' : 'no'}
                onChange={(e) => updateFormData({ 
                  investmentFocus: { ...formData.investmentFocus!, profitabilityRequired: e.target.value === 'yes' }
                })}
                options={[
                  { value: 'yes', label: 'Must be profitable' },
                  { value: 'no', label: 'Profitability not required' }
                ]}
                placeholder="Select requirement"
              />
              <Select
                label="Preferred Team Size"
                value={formData.investmentFocus?.teamSize || ''}
                onChange={(e) => updateFormData({ 
                  investmentFocus: { ...formData.investmentFocus!, teamSize: e.target.value as any }
                })}
                options={[
                  { value: 'solo', label: 'Solo founder (1 person)' },
                  { value: 'small', label: 'Small team (2-10 people)' },
                  { value: 'medium', label: 'Medium team (11-50 people)' },
                  { value: 'large', label: 'Large team (50+ people)' },
                  { value: 'any', label: 'Any team size' }
                ]}
                placeholder="Select team size"
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Years of Business Experience"
                type="number"
                value={formData.background?.yearsOfExperience || ''}
                onChange={(e) => updateFormData({ 
                  background: { ...formData.background!, yearsOfExperience: parseInt(e.target.value) || 0 }
                })}
                placeholder="10"
              />
              <Input
                label="Previous Acquisitions"
                type="number"
                value={formData.background?.previousAcquisitions || ''}
                onChange={(e) => updateFormData({ 
                  background: { ...formData.background!, previousAcquisitions: parseInt(e.target.value) || 0 }
                })}
                placeholder="0"
              />
            </div>
            <Select
              label="Experience Level"
              value={formData.experienceLevel || ''}
              onChange={(e) => updateFormData({ experienceLevel: e.target.value as any })}
              options={[
                { value: 'first-time', label: 'First-time buyer' },
                { value: 'experienced', label: 'Experienced buyer' },
                { value: 'serial', label: 'Serial acquirer' }
              ]}
              placeholder="Select experience level"
            />
            <Select
              label="Involvement Level"
              value={formData.preferences?.involvementLevel || ''}
              onChange={(e) => updateFormData({ 
                preferences: { ...formData.preferences!, involvementLevel: e.target.value as any }
              })}
              options={[
                { value: 'passive', label: 'Passive investor (minimal involvement)' },
                { value: 'active', label: 'Active investor (strategic guidance)' },
                { value: 'hands-on', label: 'Hands-on operator (daily involvement)' }
              ]}
              placeholder="Select involvement level"
            />
            <Textarea
              label="Growth Strategy & Goals"
              value={formData.preferences?.growthStrategy?.[0] || ''}
              onChange={(e) => updateFormData({ 
                preferences: { ...formData.preferences!, growthStrategy: [e.target.value] }
              })}
              placeholder="Describe your goals for the business post-acquisition..."
              rows={4}
            />
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
          <h1 className="text-3xl font-bold text-neutral-900">Buyer Onboarding</h1>
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
