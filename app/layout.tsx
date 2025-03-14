import './globals.css';
import type { Metadata } from 'next';
import { Roboto, Open_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-opensans',
});

export const metadata: Metadata = {
  title: 'ResumeRemix | AI-Powered Resume Tailoring',
  description: 'Tailor your resume perfectly for any job description using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable}`}>
      <body className={cn("min-h-screen bg-background font-opensans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
