import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ifsanitt.com'),
  title: {
    template: '%s | IFSA NIT Trichy',
    default: 'IFSA NIT Trichy | Ambition Meets Impact',
  },
  description:
    'The 10th APAC chapter of the International Finance Students Association, founded Dec 2, 2024 at NIT Trichy. In strategic partnership with Wall Street Oasis (WSO). We publish institutional equity research, deliver live venture client advisory, and run premier finance summits.',
  keywords: [
    'IFSA NIT Trichy',
    'International Finance Students Association',
    'NIT Trichy Finance',
    'Equity Research',
    'Wall Street Oasis',
    'IFSA Forum',
    'IFSC Case Competition',
    'Engineering to Finance',
    'Quant Finance'
  ],
  openGraph: {
    title: 'IFSA NIT Trichy | Ambition Meets Impact',
    description: 'The 10th APAC chapter of the International Finance Students Association at NIT Trichy. In strategic partnership with Wall Street Oasis (WSO).',
    url: '/',
    siteName: 'IFSA NIT Trichy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IFSA NIT Trichy | Ambition Meets Impact',
    description: 'The 10th APAC chapter of the International Finance Students Association at NIT Trichy.',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IFSA NIT Trichy',
    url: 'https://ifsanitt.com',
    description: 'The 10th APAC chapter of the International Finance Students Association, founded at NIT Trichy.',
    foundingDate: '2024-12-02',
    parentOrganization: {
      '@type': 'Organization',
      name: 'International Finance Students Association',
    },
  }

  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased m-0 bg-[#FAF8F5] text-[#1C1917]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        <NavBar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
