import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { BuyerProfile } from "@/types"
import { formatCurrency, formatCompactNumber } from "@/lib/utils"
import { 
  User, 
  MapPin, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Briefcase, 
  Target,
  Clock,
  Heart,
  X
} from "lucide-react"

interface BuyerCardProps {
  buyer: BuyerProfile
  onAccept: (buyerId: string) => void
  onReject: (buyerId: string) => void
  onViewProfile: (buyerId: string) => void
}

export function BuyerCard({ buyer, onAccept, onReject, onViewProfile }: BuyerCardProps) {
  const experienceBadgeColor = {
    'first-time': 'bg-blue-100 text-blue-700',
    'experienced': 'bg-green-100 text-green-700',
    'serial': 'bg-purple-100 text-purple-700'
  }

  const involvementBadgeColor = {
    'passive': 'bg-gray-100 text-gray-700',
    'active': 'bg-orange-100 text-orange-700',
    'hands-on': 'bg-red-100 text-red-700'
  }

  return (
    <Card className="max-w-sm mx-auto" hover>
      <CardContent className="p-0">
        {/* Header with avatar and basic info */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              {buyer.avatar ? (
                <img 
                  src={buyer.avatar} 
                  alt={`${buyer.firstName} ${buyer.lastName}`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold">{buyer.firstName} {buyer.lastName}</h3>
              <p className="text-orange-100 flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {buyer.background.currentRole}
              </p>
              {buyer.background.company && (
                <p className="text-orange-200 text-sm">{buyer.background.company}</p>
              )}
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="p-6 space-y-4">
          {/* Budget */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Budget</span>
            </div>
            <span className="font-semibold text-neutral-900">
              {formatCurrency(buyer.budget.min)} - {formatCurrency(buyer.budget.max)}
            </span>
          </div>

          {/* Experience */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Experience</span>
            </div>
            <Badge className={experienceBadgeColor[buyer.experienceLevel]}>
              {buyer.experienceLevel === 'first-time' && 'First-time'}
              {buyer.experienceLevel === 'experienced' && 'Experienced'}
              {buyer.experienceLevel === 'serial' && 'Serial Acquirer'}
            </Badge>
          </div>

          {/* Industries */}
          <div>
            <div className="flex items-center gap-2 text-neutral-600 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Industries of Interest</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {buyer.industries.slice(0, 3).map((industry) => (
                <Badge key={industry} variant="secondary" className="text-xs">
                  {industry.charAt(0).toUpperCase() + industry.slice(1).replace('-', ' ')}
                </Badge>
              ))}
              {buyer.industries.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{buyer.industries.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Geographic preference */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Region</span>
            </div>
            <span className="text-sm text-neutral-700">
              {buyer.preferredRegions[0]?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Any'}
            </span>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Timeline</span>
            </div>
            <span className="text-sm text-neutral-700">
              {buyer.preferences.timeframe.replace('-', ' ')}
            </span>
          </div>

          {/* Involvement level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Involvement</span>
            </div>
            <Badge className={involvementBadgeColor[buyer.preferences.involvementLevel]}>
              {buyer.preferences.involvementLevel.charAt(0).toUpperCase() + buyer.preferences.involvementLevel.slice(1)}
            </Badge>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900">{buyer.background.yearsOfExperience}</div>
              <div className="text-xs text-neutral-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900">{buyer.background.previousAcquisitions}</div>
              <div className="text-xs text-neutral-600">Previous Deals</div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 p-6 pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReject(buyer.id)}
            className="flex-1 flex items-center justify-center gap-2 text-neutral-600 border-neutral-300 hover:bg-neutral-50"
          >
            <X className="w-4 h-4" />
            Pass
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewProfile(buyer.id)}
            className="px-4"
          >
            View Full Profile
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAccept(buyer.id)}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Match
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
