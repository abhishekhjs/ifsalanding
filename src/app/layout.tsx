import type { Metadata } from 'next'
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components/nav-bar'
import { Footer } from '@/components/footer'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { AnnouncementBar } from '@/components/announcement-bar'
import CookieBanner from '@/components/animata/skeleton/cookie-banner'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ifsanitt.vercel.app'),
  alternates: {
    canonical: './',
  },
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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/ifsa-favicon.png' },
      { url: '/ifsa-favicon.png', type: 'image/png' },
    ],
    shortcut: '/ifsa-favicon.png',
    apple: '/ifsa-favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IFSA NIT Trichy',
    url: 'https://ifsanitt.vercel.app',
    logo: 'https://ifsanitt.vercel.app/ifsa-favicon.png',
    description: 'The 10th APAC chapter of the International Finance Students Association, founded at NIT Trichy.',
    foundingDate: '2024-12-02',
    sameAs: [
      'https://www.linkedin.com/company/ifsa-nit-trichy',
      'https://www.instagram.com/ifsa_nitt',
      'https://www.wallstreetoasis.com',
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'International Finance Students Association',
      url: 'https://ifsanetwork.com',
    },
  }

  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="font-sans antialiased m-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SmoothScrollProvider>
          <a href="#main" className="skip-link">Skip to content</a>
          <AnnouncementBar />
          <NavBar />
          <main id="main">{children}</main>
          <Footer />
          <CookieBanner />
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
