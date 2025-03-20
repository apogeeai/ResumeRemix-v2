import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SparklesCore } from '@/components/ui/sparkles';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function Home() {
  return (
    <>
      <div className="gradient-bg" />
      <div className="content-container">
        <main className="min-h-screen overflow-hidden">
          {/* Hero Section with Sparkles */}
          <section className="h-[40rem] md:h-[678px] w-full flex flex-col items-center justify-center overflow-hidden relative md:py-36">
            {/* Particles */}
            <div className="w-full absolute inset-0 h-full">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
                speed={1}
              />
            </div>
            <div className="container mx-auto px-4 relative z-20 max-w-[1220px]">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-4 hover-glow">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm">AI-Powered Resume Optimization</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight font-roboto text-white">
                  Land Your Dream Job with an{' '}
                  <span className="animate-gradient text-glow-gradient bg-gradient-to-r from-primary via-accent-foreground to-primary">
                    AI-Optimized Resume
                  </span>
                </h1>
                <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                  Transform your resume into an ATS-friendly masterpiece tailored perfectly for each job application using advanced AI technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/generate" className="gap-2">
                    <RainbowButton className="gap-2">
                      Try for Free <ArrowRight className="h-4 w-4 inline-block ml-2" />
                    </RainbowButton>
                  </Link>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 relative bg-background/5 backdrop-blur-xl bg-grid-small relative">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gradient-to-b from-background/80 via-background/20 to-background/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="container mx-auto px-4 relative max-w-[1220px]">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">
                  Why Choose ResumeRemix
                </h2>
                
                {/* Laser Line Effect */}
                <div className="w-[40rem] h-6 relative mx-auto mb-2">
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
                  <div className="absolute inset-0 w-full h-[40%] [mask-image:radial-gradient(350px_100px_at_top,transparent_20%,white)]"></div>
                </div>

                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
                  Our AI-powered platform offers unique advantages to help you land your dream job.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
                {[
                  {
                    title: 'ATS-Optimized',
                    description:
                      'Our AI ensures your resume passes through Applicant Tracking Systems with flying colors.',
                    icon: Target,
                  },
                  {
                    title: 'Tailored Content',
                    description:
                      'Get personalized resume and cover letter content that matches job requirements perfectly.',
                    icon: FileText,
                  },
                  {
                    title: 'Instant Results',
                    description:
                      'Generate optimized resumes and cover letters in seconds, not hours.',
                    icon: Sparkles,
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="relative group p-6 bg-white/50 dark:bg-background/50 backdrop-blur-sm border rounded-xl transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                      <div className="mt-4 flex items-center text-primary">
                        <span className="text-sm font-medium">Learn more</span>
                        <CheckCircle2 className="h-4 w-4 ml-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20">
            <div className="container mx-auto px-4 max-w-[1220px]">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">
                  Simple, Transparent Pricing
                </h2>
                <div className="w-[40rem] h-6 relative mx-auto mb-2">
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"></div>
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"></div>
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"></div>
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"></div>
                  <div className="absolute inset-0 w-full h-[40%] [mask-image:radial-gradient(350px_100px_at_top,transparent_20%,white)]"></div>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Choose the plan that works best for your job search needs.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    name: 'Free',
                    price: '$0',
                    description: 'Perfect for trying out our services',
                    features: ['1 Resume Optimization', 'Basic ATS Check', 'Standard Templates'],
                  },
                  {
                    name: 'Pro',
                    price: '$19',
                    description: 'Best for active job seekers',
                    features: [
                      'Unlimited Optimizations',
                      'Advanced ATS Analysis',
                      'Premium Templates',
                      'Cover Letter Generation',
                      'Priority Support',
                    ],
                    popular: true,
                  },
                  {
                    name: 'Team',
                    price: '$49',
                    description: 'For career coaches and teams',
                    features: [
                      'Everything in Pro',
                      '5 Team Members',
                      'Team Analytics',
                      'API Access',
                      'Custom Templates',
                    ],
                  },
                ].map((plan) => (
                  <Card
                    key={plan.name}
                    className={`p-8 glass border-primary/20 ${
                      plan.popular ? 'ring-2 ring-primary hover-glow' : 'hover-glow'
                    }`}
                  >
                    {plan.popular && (
                      <div className="text-sm font-medium text-primary mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-2xl font-bold font-roboto text-glow">{plan.name}</h3>
                    <div className="mt-4 mb-8">
                      <span className="text-4xl font-bold text-glow">{plan.price}</span>
                      {plan.price !== '$0' && (
                        <span className="text-muted-foreground">/month</span>
                      )}
                      <p className="text-muted-foreground mt-2">{plan.description}</p>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      Get Started
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section className="py-20 relative bg-background/5 backdrop-blur-xl bg-grid-small">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gradient-to-b from-background/80 via-background/20 to-background/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="container mx-auto px-4 relative max-w-[1220px]">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">
                  Loved by Job Seekers Worldwide
                </h2>
                <div className="w-[40rem] h-6 relative mx-auto mb-2">
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"></div>
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"></div>
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"></div>
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"></div>
                  <div className="absolute inset-0 w-full h-[40%] [mask-image:radial-gradient(350px_100px_at_top,transparent_20%,white)]"></div>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  See what our users have to say about their experience with ResumeRemix.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="p-8 rounded-xl glass border border-primary/20 hover-glow">
                  <div className="flex gap-1 text-primary mb-4">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-lg mb-6">
                    "ResumeRemix transformed my job search completely. The AI-powered optimization helped my resume stand out, and I landed interviews at top companies. The ATS optimization feature is a game-changer!"
                  </p>
                  <div>
                    <div className="font-semibold">Alex Johnson</div>
                    <div className="text-muted-foreground">Software Engineer, hired at Google</div>
                  </div>
                </div>

                <div className="p-8 rounded-xl glass border border-primary/20 hover-glow">
                  <div className="flex gap-1 text-primary mb-4">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-lg mb-6">
                    "As a recent graduate, I was struggling to get callbacks. ResumeRemix helped me tailor my resume for each application, and within weeks I received multiple interview invitations. Now I have my dream job!"
                  </p>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <div className="text-muted-foreground">Marketing Specialist, hired at Meta</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" size="icon">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </Button>
                <Button variant="outline" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground">
                  Join thousands of satisfied job seekers who found their dream jobs with ResumeRemix
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-[1220px]">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">
                  Frequently Asked Questions
                </h2>
                <div className="w-[40rem] h-6 relative mx-auto mb-2">
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"></div>
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4"></div>
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm"></div>
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4"></div>
                  <div className="absolute inset-0 w-full h-[40%] [mask-image:radial-gradient(350px_100px_at_top,transparent_20%,white)]"></div>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Everything you need to know about ResumeRemix. Can't find the answer you're looking for?{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Contact our support team
                  </Link>
                  .
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {[
                  {
                    question: "What is ResumeRemix?",
                    answer: "ResumeRemix is an AI-powered platform designed to help job seekers optimize their resumes for specific job applications. Our advanced AI technology analyzes job descriptions and tailors your resume to highlight the most relevant skills and experiences, ensuring maximum visibility with ATS (Applicant Tracking Systems)."
                  },
                  {
                    question: "How does the AI resume optimization work?",
                    answer: "Our AI analyzes both your resume and the target job description, identifying key requirements and matching them with your experience. It then suggests optimizations to improve ATS compatibility, enhance keyword matching, and strengthen your content. The process takes just minutes and provides specific recommendations for improvement."
                  },
                  {
                    question: "Is ResumeRemix suitable for all career levels?",
                    answer: "Absolutely! ResumeRemix is designed for job seekers at all career stages. Whether you're a recent graduate, mid-career professional, or senior executive, our AI adapts its recommendations to your experience level and industry standards."
                  },
                  {
                    question: "What file formats are supported?",
                    answer: "We support all major file formats including PDF, DOCX, and TXT. Our system can process your existing resume in any of these formats and export the optimized version in your preferred format, ensuring compatibility with all major job application systems."
                  },
                  {
                    question: "Can I use ResumeRemix for multiple job applications?",
                    answer: "Yes! With our Pro plan, you can optimize your resume for unlimited job applications. Each optimization is tailored to the specific job description, helping you create targeted versions of your resume for different opportunities."
                  },
                  {
                    question: "How secure is my resume data?",
                    answer: "We take data security seriously. All resume data is encrypted both in transit and at rest. We never share your personal information or resume content with third parties, and you have complete control over your data with the ability to delete it at any time."
                  }
                ].map((item, index) => (
                  <div key={index} className="rounded-lg border p-4 hover:border-primary/50 transition-colors">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="hover:no-underline">
                          <h3 className="text-lg font-semibold text-left">{item.question}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-muted-foreground">
                            {item.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="py-12 bg-[#0f0d12]">
            <div className="container mx-auto px-4 max-w-[1220px]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Templates</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">API</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <ul className="space-y-2">
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-primary/10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-roboto">
                      ResumeRemix
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    © 2025 ResumeRemix. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}