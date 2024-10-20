import type { Metadata } from "next";
import '@radix-ui/themes/styles.css';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import styles from "./layout.module.css";
import "./globals.css";


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Jason Grant",
  description: "Portfolio, resume, and contact information for Jason Grant",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>  
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-X5MK9YPH37"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-X5MK9YPH37');
            `
          }}></script>
        </head>
        <body className={`${inter.variable} ${styles.reset} ${styles.bodystyles}`}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Theme
              // appearance="light"
              accentColor="blue" 
              radius="large" 
            >
              {children}
              <SpeedInsights />
              <Analytics />
            </Theme>
          </ThemeProvider>
        </body>
    </html>
  );
}

