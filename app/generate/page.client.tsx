'use client';

import { useState } from 'react';
import { FileText, Upload, Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useDropzone } from 'react-dropzone';

interface RecommendedChange {
  section: string;
  currentContent: string;
  suggestedChanges: string;
  reason: string;
}

interface ResumeAnalysis {
  overallAssessment: string;
  keywordOptimization: string;
  formatAndStructure: string;
  impactAndAchievements: string;
  technicalSkillsAnalysis: string;
  experienceMatch: string;
  educationAndCertifications: string;
}

interface JobAnalysis {
  keyRequirements: string[];
  cultureFitSignals: string[];
  idealCandidateProfile: string;
  missingElements: string[];
}

interface ATSOptimization {
  missingKeywords: string[];
  keywordContext: string;
  suggestedMetrics: string[];
  narrativeGaps: string;
  humanReaderTips: string[];
}

interface GenerationResult {
  optimizedResume: {
    content: string;
    seniorityLevel: string;
    atsScore: number;
    keywordMatch: string[];
    analysis: ResumeAnalysis;
    jobAnalysis: JobAnalysis;
    recommendedChanges: RecommendedChange[];
    atsOptimization: ATSOptimization;
    improvements: string[];
  };
  coverLetter: string;
  fromCache?: boolean;
}

export default function GeneratorClient() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isPdfUploaded, setIsPdfUploaded] = useState(false);
  const { toast } = useToast();

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload a file smaller than 5MB',
          variant: 'destructive',
        });
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to parse file');
      }

      const data = await response.json();
      setResumeText(data.text);
      setIsPdfUploaded(true);
      
      toast({
        title: 'Resume uploaded',
        description: 'Your resume has been successfully parsed',
      });
    } catch (error) {
      console.error('Error parsing file:', error);
      setIsPdfUploaded(false);
      toast({
        title: 'Error parsing file',
        description: 'Please make sure you uploaded a valid file',
        variant: 'destructive',
      });
    }
  };

  const handleGenerate = async () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: 'Missing information',
        description: 'Please provide both resume and job description',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      console.log('Sending request to /api/generate...');
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Server error:', data);
        throw new Error(data.error || 'Generation failed');
      }

      if (data.error) {
        console.error('API error:', data.error);
        throw new Error(data.error);
      }

      setResult(data);

      toast({
        title: data.fromCache ? 'Retrieved from cache' : 'Generation complete',
        description: 'Your optimized resume and cover letter are ready',
      });
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: 'Generation failed',
        description: error.message || 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async (type: 'resume' | 'cover-letter') => {
    try {
      const content = type === 'resume' ? result?.optimizedResume.content : result?.coverLetter;
      const response = await fetch('/api/generate-doc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          type,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate document');

      // Create blob from response and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type === 'resume' ? 'Optimized-Resume' : 'Cover-Letter'}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Download failed',
        description: 'Failed to generate document. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
    },
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <>
      <div className="gradient-bg" />
      <div className="content-container">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Generate Your <span className="text-primary">Optimized Resume</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload your resume and job description to get an AI-optimized version tailored for your application.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <span className="ml-3 font-medium">Upload Resume</span>
              </div>
              <div className="flex-1 mx-4 border-t-2 border-gray-200"></div>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${resumeText ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center font-semibold`}>
                  2
                </div>
                <span className={`ml-3 font-medium ${resumeText ? 'text-foreground' : 'text-gray-600'}`}>Enter Job Details</span>
              </div>
              <div className="flex-1 mx-4 border-t-2 border-gray-200"></div>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${result ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'} flex items-center justify-center font-semibold`}>
                  3
                </div>
                <span className={`ml-3 font-medium ${result ? 'text-foreground' : 'text-gray-600'}`}>Review & Download</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Input */}
              <div className="space-y-6">
                <Card className="p-6 bg-opacity-90">
                  <h3 className="text-lg font-semibold mb-4">Upload Resume</h3>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center space-y-4 cursor-pointer transition-colors ${
                      isDragActive ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {isDragActive
                          ? 'Drop your resume here'
                          : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        TXT (MAX. 5MB)
                      </p>
                    </div>
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        or paste your resume
                      </span>
                    </div>
                  </div>

                  <Textarea
                    placeholder="Paste your resume text here..."
                    className="min-h-[200px] bg-opacity-90"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                </Card>

                <Card className="p-6 bg-opacity-90">
                  <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                  <Textarea
                    placeholder="Paste the job description here..."
                    className="min-h-[200px] bg-opacity-90"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handleGenerate}
                    disabled={isGenerating || !resumeText || !jobDescription}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Optimized Resume'
                    )}
                  </Button>
                </Card>
              </div>

              {/* Right Column - Preview */}
              <div>
                <Tabs defaultValue="resume" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                    <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                  </TabsList>
                  <TabsContent value="resume">
                    <Card className="p-6 min-h-[600px] bg-opacity-90">
                      {result ? (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Resume Analysis</h3>
                            <span className="text-sm text-muted-foreground">
                              Seniority Level: {result.optimizedResume.seniorityLevel}
                            </span>
                          </div>

                          {/* ATS Analysis Section */}
                          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                            <h4 className="font-medium">ATS Compatibility Analysis</h4>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span>ATS Score:</span>
                                <span className={`font-medium ${
                                  (result.optimizedResume.atsScore || 0) > 80 ? 'text-green-500' : 
                                  (result.optimizedResume.atsScore || 0) > 60 ? 'text-yellow-500' : 'text-red-500'
                                }`}>
                                  {result.optimizedResume.atsScore || 'N/A'}%
                                </span>
                              </div>

                              {/* Job Analysis Section */}
                              <div className="border-t pt-4 mt-4">
                                <h5 className="text-sm font-medium mb-3">Job Requirements Analysis</h5>
                                <div className="space-y-4">
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Key Requirements:</h6>
                                    <ul className="text-sm list-disc list-inside space-y-1">
                                      {result.optimizedResume.jobAnalysis?.keyRequirements.map((req, index) => (
                                        <li key={index} className="text-muted-foreground">{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Culture Fit Signals:</h6>
                                    <ul className="text-sm list-disc list-inside space-y-1">
                                      {result.optimizedResume.jobAnalysis?.cultureFitSignals.map((signal, index) => (
                                        <li key={index} className="text-muted-foreground">{signal}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Ideal Candidate Profile:</h6>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.jobAnalysis?.idealCandidateProfile}
                                    </p>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Missing Elements:</h6>
                                    <ul className="text-sm list-disc list-inside space-y-1">
                                      {result.optimizedResume.jobAnalysis?.missingElements.map((element, index) => (
                                        <li key={index} className="text-muted-foreground">{element}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* ATS Optimization Section */}
                              <div className="border-t pt-4 mt-4">
                                <h5 className="text-sm font-medium mb-3">ATS & Human Reader Optimization</h5>
                                <div className="space-y-4">
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Missing Keywords:</h6>
                                    <div className="flex flex-wrap gap-2">
                                      {result.optimizedResume.atsOptimization?.missingKeywords.map((keyword, index) => (
                                        <span key={index} className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">
                                          {keyword}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Keyword Implementation Context:</h6>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.atsOptimization?.keywordContext}
                                    </p>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Suggested Metrics:</h6>
                                    <ul className="text-sm list-disc list-inside space-y-1">
                                      {result.optimizedResume.atsOptimization?.suggestedMetrics.map((metric, index) => (
                                        <li key={index} className="text-muted-foreground">{metric}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Narrative Gaps:</h6>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.atsOptimization?.narrativeGaps}
                                    </p>
                                  </div>
                                  <div>
                                    <h6 className="text-sm font-medium mb-2">Human Reader Tips:</h6>
                                    <ul className="text-sm list-disc list-inside space-y-1">
                                      {result.optimizedResume.atsOptimization?.humanReaderTips.map((tip, index) => (
                                        <li key={index} className="text-muted-foreground">{tip}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {result.optimizedResume.keywordMatch && (
                                <div>
                                  <h5 className="text-sm font-medium mb-2">Key Skills Matched:</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {result.optimizedResume.keywordMatch.map((keyword, index) => (
                                      <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        {keyword}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {result.optimizedResume.analysis && (
                                <div className="space-y-4 border-t pt-4 mt-4">
                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Overall Assessment:</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.analysis.overallAssessment}
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Keyword Optimization:</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.analysis.keywordOptimization}
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Format and Structure:</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.analysis.formatAndStructure}
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Impact and Achievements:</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.analysis.impactAndAchievements}
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Technical Skills Analysis:</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.analysis.technicalSkillsAnalysis}
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Experience Match:</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.analysis.experienceMatch}
                                    </p>
                                  </div>

                                  <div>
                                    <h5 className="text-sm font-medium mb-2">Education and Certifications:</h5>
                                    <p className="text-sm text-muted-foreground">
                                      {result.optimizedResume.analysis.educationAndCertifications}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {result.optimizedResume.recommendedChanges && (
                                <div className="border-t pt-4 mt-4">
                                  <h5 className="text-sm font-medium mb-3">Recommended Changes:</h5>
                                  <div className="space-y-4">
                                    {result.optimizedResume.recommendedChanges.map((change, index) => (
                                      <div key={index} className="bg-background/50 p-3 rounded-lg">
                                        <div className="font-medium text-sm mb-1">{change.section}</div>
                                        <div className="text-sm text-muted-foreground mb-2">
                                          Current: {change.currentContent}
                                        </div>
                                        <div className="text-sm text-primary mb-1">
                                          Suggestion: {change.suggestedChanges}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          Why: {change.reason}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {result.optimizedResume.improvements && (
                                <div className="border-t pt-4 mt-4">
                                  <h5 className="text-sm font-medium mb-2">Quick Improvements:</h5>
                                  <ul className="text-sm list-disc list-inside space-y-1">
                                    {result.optimizedResume.improvements.map((improvement, index) => (
                                      <li key={index} className="text-muted-foreground">{improvement}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Optimized Resume Content */}
                          <div className="prose max-w-none">
                            <h4 className="font-medium mb-4">Optimized Resume</h4>
                            <div className="whitespace-pre-wrap font-mono text-sm">
                              {result.optimizedResume.content}
                            </div>
                          </div>

                          {isPdfUploaded && (
                            <Button 
                              className="w-full" 
                              onClick={() => handleDownloadPDF('resume')}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Resume as DOCX
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <FileText className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-600">No Resume Generated</h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            Upload your resume and enter a job description to
                            see the optimized version here.
                          </p>
                        </div>
                      )}
                    </Card>
                  </TabsContent>
                  <TabsContent value="cover-letter">
                    <Card className="p-6 min-h-[600px] bg-opacity-90">
                      {result ? (
                        <div className="space-y-6">
                          <div className="prose max-w-none">
                            <div className="space-y-6 p-8 bg-card border rounded-lg">
                              <div className="text-right mb-8">
                                {new Date().toLocaleDateString()}
                              </div>
                              
                              <div className="whitespace-pre-wrap">
                                {result.coverLetter.split('\n\n').map((paragraph, index) => (
                                  <p key={index} className="mb-4">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>

                          <Button 
                            className="w-full" 
                            onClick={() => handleDownloadPDF('cover-letter')}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Cover Letter as DOCX
                          </Button>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <FileText className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-600">No Cover Letter Generated</h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            Upload your resume and enter a job description to
                            see the generated cover letter here.
                          </p>
                        </div>
                      )}
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 