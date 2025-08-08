import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { Document, AIAnalysis } from "@/types"
import { 
  Brain,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  BarChart3,
  DollarSign,
  Shield,
  Lightbulb
} from "lucide-react"

interface AIDocumentAnalyzerProps {
  documents: Document[]
  onAnalysisRequest: (documentId: string) => void
  onDocumentUpload: (file: File) => void
}

export function AIDocumentAnalyzer({ 
  documents, 
  onAnalysisRequest, 
  onDocumentUpload 
}: AIDocumentAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleAnalyze = async (documentId: string) => {
    setAnalyzing(documentId)
    onAnalysisRequest(documentId)
    
    // Simulate analysis progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300))
      // Progress would be updated by parent component in real implementation
    }
    
    setAnalyzing(null)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            onDocumentUpload(file)
            return 0
          }
          return prev + 10
        })
      }, 200)
    }
  }

  const getAnalysisIcon = (analysis?: AIAnalysis) => {
    if (!analysis) return <Clock className="w-4 h-4 text-neutral-400" />
    
    if (analysis.redFlags.length > 0) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />
    }
    return <CheckCircle className="w-4 h-4 text-green-500" />
  }

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <DollarSign className="w-5 h-5 text-green-600" />
      case 'legal':
        return <Shield className="w-5 h-5 text-blue-600" />
      case 'operational':
        return <BarChart3 className="w-5 h-5 text-purple-600" />
      default:
        return <FileText className="w-5 h-5 text-neutral-600" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">AI Document Analysis</h1>
        <p className="text-neutral-600">
          Upload financial and business documents for automated analysis, risk assessment, and insights.
        </p>
      </div>

      {/* Upload Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors">
            <input
              type="file"
              id="document-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
              multiple
            />
            <label htmlFor="document-upload" className="cursor-pointer">
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-neutral-900">
                    Drop files here or click to upload
                  </p>
                  <p className="text-sm text-neutral-600">
                    Supports PDF, Excel, Word, and CSV files
                  </p>
                </div>
              </div>
            </label>
          </div>
          
          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-neutral-600">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Analysis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-neutral-900">AI Models</h3>
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-neutral-600">Active analyzers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-neutral-900">Accuracy</h3>
            <p className="text-2xl font-bold text-green-600">94%</p>
            <p className="text-sm text-neutral-600">Analysis accuracy</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-neutral-900">Speed</h3>
            <p className="text-2xl font-bold text-purple-600">2min</p>
            <p className="text-sm text-neutral-600">Avg analysis time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h3 className="font-semibold text-neutral-900">Documents</h3>
            <p className="text-2xl font-bold text-orange-600">{documents.length}</p>
            <p className="text-sm text-neutral-600">Total uploaded</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents.map((document) => (
          <Card key={document.id} className="border border-neutral-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getDocumentTypeIcon(document.type)}
                  <div>
                    <CardTitle className="text-lg">{document.name}</CardTitle>
                    <p className="text-sm text-neutral-600">
                      {document.type} • {(document.fileSize / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getAnalysisIcon(document.aiAnalysis)}
                  <Badge variant={document.aiAnalysis ? 'default' : 'outline'}>
                    {document.aiAnalysis ? 'Analyzed' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {document.aiAnalysis ? (
                <div className="space-y-4">
                  {/* Analysis Summary */}
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Analysis Summary</h4>
                    <p className="text-sm text-neutral-700">{document.aiAnalysis.summary}</p>
                  </div>

                  {/* Key Findings */}
                  {document.aiAnalysis.keyFindings.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Key Findings
                      </h4>
                      <ul className="space-y-1">
                        {document.aiAnalysis.keyFindings.slice(0, 3).map((finding, index) => (
                          <li key={index} className="text-sm text-neutral-700 flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            {finding}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Red Flags */}
                  {document.aiAnalysis.redFlags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Areas of Concern
                      </h4>
                      <ul className="space-y-1">
                        {document.aiAnalysis.redFlags.slice(0, 2).map((flag, index) => (
                          <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                            <AlertTriangle className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Confidence Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-neutral-900">Confidence Score</h4>
                      <span className="text-sm font-medium">
                        {(document.aiAnalysis.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={document.aiAnalysis.confidence * 100} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600 mb-4">
                    Document ready for AI analysis
                  </p>
                  <Button
                    onClick={() => handleAnalyze(document.id)}
                    disabled={analyzing === document.id}
                    className="flex items-center gap-2"
                  >
                    {analyzing === document.id ? (
                      <>
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4" />
                        Start Analysis
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-neutral-200 mt-4">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Download
                </Button>
                {document.aiAnalysis && (
                  <Button variant="ghost" size="sm">
                    View Full Report
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No documents uploaded yet
            </h3>
            <p className="text-neutral-600 mb-6">
              Upload your financial documents to get started with AI-powered analysis
            </p>
            <label htmlFor="document-upload">
              <Button className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload First Document
              </Button>
            </label>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
