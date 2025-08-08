import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { BuyerProfile } from "@/types"
import { formatCurrency } from "@/lib/utils"
import { 
  User, 
  MapPin, 
  TrendingUp, 
  Briefcase, 
  Target,
  Clock,
  Heart,
  X,
  ArrowLeft,
  Building,
  Calendar,
  Trophy,
  Lightbulb
} from "lucide-react"

interface BuyerProfileViewProps {
  buyer: BuyerProfile
  onAccept: (buyerId: string) => void
  onReject: (buyerId: string) => void
  onBack: () => void
}

export function BuyerProfileView({ buyer, onAccept, onReject, onBack }: BuyerProfileViewProps) {
  const experienceLabel = {
    'first-time': 'First-time Buyer',
    'experienced': 'Experienced Buyer',
    'serial': 'Serial Acquirer'
  }

  const involvementLabel = {
    'passive': 'Passive Investor',
    'active': 'Active Investor',
    'hands-on': 'Hands-on Operator'
  }

  const acquisitionTypeLabel = {
    'strategic': 'Strategic Acquisition',
    'financial': 'Financial Investment',
    'both': 'Strategic & Financial'
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Button>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                {buyer.avatar ? (
                  <img 
                    src={buyer.avatar} 
                    alt={`${buyer.firstName} ${buyer.lastName}`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{buyer.firstName} {buyer.lastName}</h1>
                <p className="text-orange-100 flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5" />
                  {buyer.background.currentRole}
                </p>
                {buyer.background.company && (
                  <p className="text-orange-200 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {buyer.background.company}
                  </p>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <Badge className="bg-white/20 text-white border border-white/30 mb-2">
                {experienceLabel[buyer.experienceLevel]}
              </Badge>
              <div className="text-sm text-orange-100">
                Member since {new Date(buyer.createdAt).getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Main details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment Criteria */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Investment Criteria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Budget Range</h4>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(buyer.budget.min)} - {formatCurrency(buyer.budget.max)}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Industries of Interest</h4>
                <div className="flex flex-wrap gap-2">
                  {buyer.industries.map((industry) => (
                    <Badge key={industry} variant="secondary">
                      {industry.charAt(0).toUpperCase() + industry.slice(1).replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Geographic Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {buyer.preferredRegions.map((region) => (
                    <Badge key={region} variant="outline" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {region.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Acquisition Type</h4>
                <Badge variant="default">
                  {acquisitionTypeLabel[buyer.acquisitionType]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Investment Focus */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Investment Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Revenue Focus</h4>
                  <p className="text-neutral-700">
                    {buyer.investmentFocus.revenueFocus === 'growing' && 'Growing businesses'}
                    {buyer.investmentFocus.revenueFocus === 'stable' && 'Stable businesses'}
                    {buyer.investmentFocus.revenueFocus === 'either' && 'Growing or stable businesses'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Profitability</h4>
                  <p className="text-neutral-700">
                    {buyer.investmentFocus.profitabilityRequired ? 'Must be profitable' : 'Profitability not required'}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Preferred Team Size</h4>
                <p className="text-neutral-700">
                  {buyer.investmentFocus.teamSize === 'solo' && 'Solo founder'}
                  {buyer.investmentFocus.teamSize === 'small' && 'Small team (2-10 people)'}
                  {buyer.investmentFocus.teamSize === 'medium' && 'Medium team (11-50 people)'}
                  {buyer.investmentFocus.teamSize === 'large' && 'Large team (50+ people)'}
                  {buyer.investmentFocus.teamSize === 'any' && 'Any team size'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Growth Strategy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Growth Strategy & Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 leading-relaxed">
                {buyer.preferences.growthStrategy[0] || 'No specific growth strategy provided.'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Stats and preferences */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-neutral-50 rounded-xl">
                <div className="text-3xl font-bold text-neutral-900">{buyer.background.yearsOfExperience}</div>
                <div className="text-sm text-neutral-600">Years of Business Experience</div>
              </div>
              <div className="text-center p-4 bg-neutral-50 rounded-xl">
                <div className="text-3xl font-bold text-neutral-900">{buyer.background.previousAcquisitions}</div>
                <div className="text-sm text-neutral-600">Previous Acquisitions</div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Timeline</h4>
                <p className="text-neutral-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {buyer.preferences.timeframe.replace('-', ' ')}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Involvement Level</h4>
                <Badge variant="secondary">
                  {involvementLabel[buyer.preferences.involvementLevel]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => onAccept(buyer.id)}
              className="w-full flex items-center justify-center gap-2"
              size="lg"
            >
              <Heart className="w-5 h-5" />
              Match with {buyer.firstName}
            </Button>
            <Button
              variant="outline"
              onClick={() => onReject(buyer.id)}
              className="w-full flex items-center justify-center gap-2"
              size="lg"
            >
              <X className="w-5 h-5" />
              Pass on this buyer
            </Button>
          </div>

          {/* Match compatibility indicator */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-800">High Compatibility</span>
              </div>
              <p className="text-sm text-green-700">
                This buyer&apos;s criteria align well with businesses in your industry and price range.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
