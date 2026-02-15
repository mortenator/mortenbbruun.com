import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';
import { ThemeToggle } from './theme-toggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mortenbbruun.com'),
  alternates: {
    canonical: '/'
  },
  title: {
    default: 'Morten Bruun',
    template: '%s | Morten Bruun'
  },
  description: 'Danish founder and builder based in New York. Co-Founder of FlashDocs (acq. by Hebbia). Forbes 30 under 30. Ex-McKinsey, Ex-Google.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="antialiased tracking-tight">
        <Providers>
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
            <main className="max-w-[60ch] mx-auto w-full space-y-6">
              <header className="flex justify-end mb-4">
                <ThemeToggle />
              </header>
              {children}
            </main>
            <Footer />
            <Analytics />
          </div>
        </Providers>
      </body>
    </html>
  );
}

function Footer() {
  const links = [
    { name: '@TheRealMortenB', url: 'https://x.com/TheRealMortenB' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/mortenbruun' },
    { name: 'github', url: 'https://github.com/mortenator' }
  ];

  return (
    <footer className="mt-12 text-center">
      <div className="flex justify-center space-x-4 tracking-tight">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
