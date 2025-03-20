'use client';

import Link from 'next/link';
import { FileText, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { smoothScrollTo } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    smoothScrollTo(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-primary/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-[1220px]">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold font-roboto">
              <span className="text-foreground">Resume</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Remix</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href={isHomePage ? "#features" : "/#features"}
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => isHomePage && handleNavClick(e, 'features')}
          >
            Features
          </Link>
          <Link 
            href={isHomePage ? "#pricing" : "/#pricing"}
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => isHomePage && handleNavClick(e, 'pricing')}
          >
            Pricing
          </Link>
          <Link 
            href={isHomePage ? "#testimonials" : "/#testimonials"}
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => isHomePage && handleNavClick(e, 'testimonials')}
          >
            Testimonials
          </Link>
          <Link 
            href={isHomePage ? "#faq" : "/#faq"}
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={(e) => isHomePage && handleNavClick(e, 'faq')}
          >
            FAQ
          </Link>
          <Link 
            href="/generate" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Optimize Resume
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[280px] sm:w-[340px] bg-opacity-50 backdrop-blur-lg"
            >
              <nav className="flex flex-col gap-4 mt-6">
                <Link 
                  href={isHomePage ? "#features" : "/#features"}
                  className="text-muted-foreground hover:text-foreground transition-colors text-right text-lg"
                  onClick={(e) => isHomePage && handleNavClick(e, 'features')}
                >
                  Features
                </Link>
                <Link 
                  href={isHomePage ? "#pricing" : "/#pricing"}
                  className="text-muted-foreground hover:text-foreground transition-colors text-right text-lg"
                  onClick={(e) => isHomePage && handleNavClick(e, 'pricing')}
                >
                  Pricing
                </Link>
                <Link 
                  href={isHomePage ? "#testimonials" : "/#testimonials"}
                  className="text-muted-foreground hover:text-foreground transition-colors text-right text-lg"
                  onClick={(e) => isHomePage && handleNavClick(e, 'testimonials')}
                >
                  Testimonials
                </Link>
                <Link 
                  href={isHomePage ? "#faq" : "/#faq"}
                  className="text-muted-foreground hover:text-foreground transition-colors text-right text-lg"
                  onClick={(e) => isHomePage && handleNavClick(e, 'faq')}
                >
                  FAQ
                </Link>
                <Link 
                  href="/generate" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-right text-lg"
                >
                  Optimize Resume
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Get Started Button */}
          <Button asChild className="hidden md:inline-flex">
            <Link href="/generate">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}