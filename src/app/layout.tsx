import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/ThemeProvider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'ChattogramAds - Premium Classifieds',
  description: 'Your trusted marketplace in Chattogram.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,bn',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
