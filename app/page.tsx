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
                  <button className="group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border border-white bg-black px-8 py-2 font-medium text-white transition-all hover:bg-black/80 max-w-[185.56px] w-full mx-auto sm:mx-0">
                    Watch Demo
                  </button>
                </div>

                {/* Logo Carousel */}
                <div className="space-y-4 mt-[30px]">
                  <h3 className="text-center text-lg text-muted-foreground pt-10">Used on Sites such as:</h3>
                  <div className="w-full overflow-hidden sm:pt-0 z-10">
                    <div className="relative flex max-w-[1220px] overflow-hidden py-5 mx-auto">
                      <div className="flex w-max animate-marquee" style={{"--duration": "25s"} as React.CSSProperties}>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">LinkedIn</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">Indeed</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">Monster</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">ZipRecruiter</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">Glassdoor</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">CareerBuilder</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">LinkedIn</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">Indeed</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">Monster</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">ZipRecruiter</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">Glassdoor</span>
                        </div>
                        <div className="relative h-full w-fit mx-8 flex items-center justify-start">
                          <span className="text-foreground dark:text-white text-2xl font-semibold whitespace-nowrap">CareerBuilder</span>
                        </div>
                      </div>
                    </div>
                  </div>
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

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 relative bg-background/5 backdrop-blur-xl bg-grid-small">
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
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20">
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
                  Got questions? We've got answers.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does ResumeRemix optimize my resume?</AccordionTrigger>
                    <AccordionContent>
                      ResumeRemix uses advanced AI technology to analyze your resume against job descriptions, identifying key requirements and optimizing your content to match. It ensures ATS compatibility, suggests improvements for readability, and helps highlight your most relevant skills and experiences.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is my data secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we take data security seriously. Your resume data is encrypted, processed securely, and never shared with third parties. We comply with GDPR and other privacy regulations to ensure your information remains confidential.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I use ResumeRemix for different industries?</AccordionTrigger>
                    <AccordionContent>
                      Absolutely! ResumeRemix is designed to work across all industries. Our AI adapts to specific industry requirements and terminology, ensuring your resume is optimized for your target role and sector.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How many resumes can I optimize?</AccordionTrigger>
                    <AccordionContent>
                      The number of resumes you can optimize depends on your plan. Free users get 1 optimization, while Pro users get unlimited optimizations. Check our pricing section for detailed plan features.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact our support team for a full refund.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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