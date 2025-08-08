import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { Deal, DealStep, AIAnalysis } from "@/types"
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Brain,
  Users,
  DollarSign,
  Shield,
  TrendingUp,
  Calendar,
  MessageSquare,
  Upload,
  Download
} from "lucide-react"

interface AcquisitionWorkflowProps {
  deal: Deal
  userRole: 'buyer' | 'seller'
  onStepComplete: (stepId: string) => void
  onDocumentUpload: (stepId: string, file: File) => void
  onRequestAIAnalysis: (documentId: string) => void
}

const WORKFLOW_STEPS = [
  {
    id: 'initial-discussion',
    name: 'Initial Discussion',
    description: 'Preliminary conversation and interest confirmation',
    icon: MessageSquare,
    estimatedDays: 3
  },
  {
    id: 'nda-signing',
    name: 'NDA & Confidentiality',
    description: 'Sign mutual non-disclosure agreement',
    icon: Shield,
    estimatedDays: 2
  },
  {
    id: 'financial-disclosure',
    name: 'Financial Disclosure',
    description: 'Share detailed financial documents',
    icon: DollarSign,
    estimatedDays: 5
  },
  {
    id: 'due-diligence',
    name: 'Due Diligence',
    description: 'Comprehensive business review and analysis',
    icon: FileText,
    estimatedDays: 14
  },
  {
    id: 'valuation',
    name: 'Valuation & Negotiation',
    description: 'Business valuation and price negotiation',
    icon: TrendingUp,
    estimatedDays: 10
  },
  {
    id: 'legal-review',
    name: 'Legal Review',
    description: 'Contract drafting and legal documentation',
    icon: Users,
    estimatedDays: 7
  },
  {
    id: 'closing',
    name: 'Closing',
    description: 'Final signatures and asset transfer',
    icon: CheckCircle,
    estimatedDays: 3
  }
]

export function AcquisitionWorkflow({ 
  deal, 
  userRole, 
  onStepComplete, 
  onDocumentUpload,
  onRequestAIAnalysis 
}: AcquisitionWorkflowProps) {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  
  const completedSteps = deal.steps.filter(step => step.status === 'completed').length
  const totalSteps = WORKFLOW_STEPS.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const getStepStatus = (stepId: string) => {
    const step = deal.steps.find(s => s.id === stepId)
    return step?.status || 'pending'
  }

  const getStepData = (stepId: string) => {
    return deal.steps.find(s => s.id === stepId)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'blocked':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-neutral-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'in-progress':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'blocked':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-neutral-600 bg-neutral-50 border-neutral-200'
    }
  }

  const estimatedDaysRemaining = WORKFLOW_STEPS
    .filter(step => getStepStatus(step.id) !== 'completed')
    .reduce((total, step) => total + step.estimatedDays, 0)

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Acquisition Process</h1>
            <p className="text-neutral-600">Deal ID: {deal.id}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-neutral-900">{completedSteps}/{totalSteps}</div>
            <div className="text-sm text-neutral-600">Steps Complete</div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <Badge variant="outline">
              <Calendar className="w-4 h-4 mr-1" />
              ~{estimatedDaysRemaining} days remaining
            </Badge>
          </div>
          <Progress value={progressPercentage} className="mb-2" />
          <p className="text-sm text-neutral-600">
            {progressPercentage.toFixed(0)}% complete - {deal.status.replace('-', ' ')}
          </p>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Steps List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Process Steps</h3>
          <div className="space-y-2">
            {WORKFLOW_STEPS.map((workflowStep, index) => {
              const status = getStepStatus(workflowStep.id)
              const Icon = workflowStep.icon
              
              return (
                <button
                  key={workflowStep.id}
                  onClick={() => setSelectedStep(workflowStep.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedStep === workflowStep.id 
                      ? 'border-orange-300 bg-orange-50' 
                      : getStatusColor(status)
                  } hover:shadow-md`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {getStatusIcon(status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="font-medium text-sm">{workflowStep.name}</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1 truncate">
                        {workflowStep.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Step Details */}
        <div className="lg:col-span-3">
          {selectedStep ? (
            <StepDetails
              stepId={selectedStep}
              stepData={getStepData(selectedStep)}
              workflowStep={WORKFLOW_STEPS.find(s => s.id === selectedStep)!}
              userRole={userRole}
              onStepComplete={onStepComplete}
              onDocumentUpload={onDocumentUpload}
              onRequestAIAnalysis={onRequestAIAnalysis}
            />
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-neutral-400 mb-4">
                  <FileText className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Select a step to view details
                </h3>
                <p className="text-neutral-600">
                  Click on any step from the left to see detailed information, requirements, and actions.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

interface StepDetailsProps {
  stepId: string
  stepData?: DealStep
  workflowStep: any
  userRole: 'buyer' | 'seller'
  onStepComplete: (stepId: string) => void
  onDocumentUpload: (stepId: string, file: File) => void
  onRequestAIAnalysis: (documentId: string) => void
}

function StepDetails({ 
  stepId, 
  stepData, 
  workflowStep, 
  userRole,
  onStepComplete,
  onDocumentUpload,
  onRequestAIAnalysis 
}: StepDetailsProps) {
  const [uploadingDoc, setUploadingDoc] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadingDoc(true)
      onDocumentUpload(stepId, file)
      // Simulate upload completion
      setTimeout(() => setUploadingDoc(false), 2000)
    }
  }

  const renderStepContent = () => {
    switch (stepId) {
      case 'financial-disclosure':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">AI Financial Analysis Available</h4>
                  <p className="text-blue-700 text-sm mt-1">
                    Our AI will automatically analyze uploaded financial documents to identify key metrics, 
                    trends, and potential red flags to accelerate the review process.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Required Documents</h4>
                <div className="space-y-2">
                  {[
                    'Profit & Loss Statements (3 years)',
                    'Balance Sheets (3 years)', 
                    'Cash Flow Statements',
                    'Tax Returns (3 years)',
                    'Management Accounts'
                  ].map((doc) => (
                    <div key={doc} className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                      <span className="text-sm">{doc}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" size="sm">Required</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Optional Documents</h4>
                <div className="space-y-2">
                  {[
                    'Customer Contracts',
                    'Supplier Agreements',
                    'Insurance Policies',
                    'Intellectual Property',
                    'Employee Agreements'
                  ].map((doc) => (
                    <div key={doc} className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                      <span className="text-sm">{doc}</span>
                      <Badge variant="secondary" size="sm">Optional</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'due-diligence':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900">AI Due Diligence Assistant</h4>
                  <p className="text-green-700 text-sm mt-1">
                    Our AI analyzes all documents to generate comprehensive due diligence reports, 
                    risk assessments, and comparison benchmarks to speed up this critical phase.
                  </p>
                </div>
              </div>
            </div>

            {stepData?.aiAnalysis && (
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    AI Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2">Key Findings</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {stepData.aiAnalysis.keyFindings.map((finding, index) => (
                          <li key={index}>{finding}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {stepData.aiAnalysis.redFlags.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2 text-red-700">Areas of Concern</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                          {stepData.aiAnalysis.redFlags.map((flag, index) => (
                            <li key={index}>{flag}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div>
                      <h5 className="font-semibold mb-2">Recommendations</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {stepData.aiAnalysis.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case 'valuation':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-purple-900">AI Valuation Model</h4>
                  <p className="text-purple-700 text-sm mt-1">
                    Based on financial data and industry benchmarks, our AI provides multiple 
                    valuation approaches to support fair pricing negotiations.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold">Revenue Multiple</h4>
                  <p className="text-2xl font-bold text-blue-600">2.5x</p>
                  <p className="text-sm text-neutral-600">Industry avg: 2.1x</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold">EBITDA Multiple</h4>
                  <p className="text-2xl font-bold text-green-600">4.2x</p>
                  <p className="text-sm text-neutral-600">Industry avg: 3.8x</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-semibold">AI Recommended</h4>
                  <p className="text-2xl font-bold text-purple-600">$1.2M</p>
                  <p className="text-sm text-neutral-600">95% confidence</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <p className="text-neutral-700">{workflowStep.description}</p>
            <div className="bg-neutral-50 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Estimated Timeline</h4>
              <p className="text-sm text-neutral-600">
                This step typically takes {workflowStep.estimatedDays} days to complete.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <workflowStep.icon className="w-5 h-5" />
            {workflowStep.name}
          </CardTitle>
          <Badge variant={stepData?.status === 'completed' ? 'default' : 'outline'}>
            {stepData?.status || 'pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {renderStepContent()}
        
        {/* Actions */}
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            {stepData?.status !== 'completed' && (
              <>
                <input
                  type="file"
                  id={`upload-${stepId}`}
                  className="hidden"
                  onChange={handleFileUpload}
                  multiple
                />
                <label
                  htmlFor={`upload-${stepId}`}
                  className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-xl hover:bg-neutral-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  Upload Documents
                </label>
                
                <Button
                  onClick={() => onStepComplete(stepId)}
                  disabled={uploadingDoc}
                >
                  Mark Complete
                </Button>
              </>
            )}
            
            {stepData?.status === 'completed' && (
              <Badge variant="default" className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
