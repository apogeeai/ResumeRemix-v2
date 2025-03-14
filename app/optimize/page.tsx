import { FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function OptimizePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 gradient-bg min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-8">
          <h2 className="text-3xl md:text-4xl font-bold font-roboto text-glow">
            Tailor Your Resume with AI
          </h2>
          <p className="text-muted-foreground text-lg">
            Upload your resume and job description to get a perfectly tailored
            version that matches the role.
          </p>
        </section>

        {/* Upload Section */}
        <Card className="p-6 space-y-6 glass border border-primary/20 hover-glow">
          <div className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4 bg-background/40 hover:bg-background/60 transition-colors">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold font-roboto">Upload Your Resume</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag and drop your PDF resume here, or click to browse
                </p>
              </div>
              <Button>Select PDF File</Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or paste your resume
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold font-roboto">Paste Your Resume</h3>
              <p className="text-sm text-muted-foreground">
                Copy and paste your resume text here
              </p>
              <textarea
                className="w-full min-h-[200px] p-4 rounded-md border bg-background/40 resize-y focus:bg-background/60 transition-colors"
                placeholder="Paste your resume content here..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-roboto">Job Description</h3>
            <textarea
              className="w-full min-h-[200px] p-4 rounded-md border bg-background/40 resize-y focus:bg-background/60 transition-colors"
              placeholder="Paste the job description here... We'll help you tailor your resume to match!"
            />
            <Button className="w-full" size="lg">
              Optimize Resume
            </Button>
          </div>
        </Card>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'ATS-Friendly',
              description:
                'Ensures your resume passes Applicant Tracking Systems',
            },
            {
              title: 'AI-Powered',
              description:
                'Uses advanced AI to match your experience with job requirements',
            },
            {
              title: 'Instant Results',
              description:
                'Get your optimized resume and cover letter in seconds',
            },
          ].map((feature) => (
            <Card
              key={feature.title}
              className="p-6 text-center glass border-primary/20 hover-glow"
            >
              <h3 className="font-semibold mb-2 font-roboto">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}