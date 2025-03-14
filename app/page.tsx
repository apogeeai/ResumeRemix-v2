import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <>
      <div className="gradient-bg" />
      <div className="content-container">
        <main className="min-h-screen overflow-hidden">
          {/* Hero Section */}
          <section className="py-24 md:py-36 relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute w-[500px] h-[500px] -right-40 -top-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute w-[500px] h-[500px] -left-40 -bottom-40 bg-accent/20 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-4 hover-glow">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm">AI-Powered Resume Optimization</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight font-roboto text-glow">
                  Land Your Dream Job with an{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
                    AI-Optimized Resume
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Transform your resume into an ATS-friendly masterpiece tailored perfectly for each job application using advanced AI technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/optimize" className="gap-2">
                      Try for Free <ArrowRight className="h-4 w-4 animate-pulse" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-[#0e0d12]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto text-white">
                  Why Choose ResumeRemix?
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Our AI-powered platform helps you create the perfect resume for every job application.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Target,
                    title: 'ATS-Optimized',
                    description: 'Ensure your resume passes through Applicant Tracking Systems with flying colors.',
                  },
                  {
                    icon: Sparkles,
                    title: 'AI-Powered Tailoring',
                    description: 'Our advanced AI matches your experience with job requirements for maximum impact.',
                  },
                  {
                    icon: FileText,
                    title: 'Perfect Formatting',
                    description: 'Professional templates and perfect formatting every time, no design skills needed.',
                  },
                ].map((feature) => (
                  <Card key={feature.title} className="p-6 glass border-primary/20">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-roboto">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-roboto">
                  Simple, Transparent Pricing
                </h2>
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
        </main>
      </div>
    </>
  );
}