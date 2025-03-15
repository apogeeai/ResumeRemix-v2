import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-primary/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-roboto">
              ResumeRemix
            </h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/generate" className="text-muted-foreground hover:text-foreground transition-colors">
            Optimize Resume
          </Link>
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild>
            <Link href="/generate">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}