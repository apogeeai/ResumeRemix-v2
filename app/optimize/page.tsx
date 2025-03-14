import { FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function OptimizePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Tailor Your <span className="text-primary">Perfect Resume</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Upload your resume, enter a job description, and let AI optimize your application to
          stand out from the crowd.
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
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">
              2
            </div>
            <span className="ml-3 font-medium text-gray-600">Enter Job Details</span>
          </div>
          <div className="flex-1 mx-4 border-t-2 border-gray-200"></div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold">
              3
            </div>
            <span className="ml-3 font-medium text-gray-600">Review & Download</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Get Started */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Get Started</h2>
            
            {/* Upload Resume Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Upload your resume</h3>
              <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF (MAX. 5MB)
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

              <textarea
                className="w-full min-h-[200px] p-4 rounded-md border resize-y"
                placeholder="Paste your resume text here..."
              />
            </Card>

            {/* Job Description Section */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Paste job description</h3>
              <textarea
                className="w-full min-h-[200px] p-4 rounded-md border resize-y"
                placeholder="Paste the job description here..."
              />
              <Button className="w-full mt-4" size="lg">
                Optimize Resume
              </Button>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Preview</h2>
            <Card className="p-6 h-[calc(100%-4rem)] flex flex-col items-center justify-center text-center">
              <FileText className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600">No Resume Uploaded</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Upload your resume and enter a job description to
                see the optimized version here.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}