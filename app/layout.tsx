import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import { Theme, ThemePanel } from '@radix-ui/themes';
import PageLayout from "@/ui/PageLayout";
import Home from "./home/Home";
import styles from "./layout.module.css";
import '@radix-ui/themes/styles.css';
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
        <body className={`${inter.variable} ${styles.reset}`}>
          <Theme
            appearance="light"
            accentColor="blue" 
            radius="large" 
          >
            <PageLayout
              leftZone={<Home></Home>} 
              children={children}
            ></PageLayout>
          </Theme>
          <SpeedInsights />
          <Analytics />
        </body>
    </html>
  );
}

