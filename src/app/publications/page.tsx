import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { PublicationsPageClient } from './publications-client'
import { FALLBACK_PUBLICATIONS } from '@/lib/fallback-data'

export const metadata: Metadata = {
  title: 'Publications & Research',
  description:
    'Institutional-grade equity research, sector deep-dives, macro analysis, and impact micro-theses authored and peer-reviewed by IFSA NIT Trichy analysts.',
  alternates: {
    canonical: '/publications',
  },
  openGraph: {
    title: 'Publications & Research | IFSA NIT Trichy',
    description: 'Institutional-grade equity research, sector deep-dives, macro analysis, and impact micro-theses authored and peer-reviewed by IFSA NIT Trichy analysts.',
    url: '/publications',
  },
}

import type { Database } from '@/types/database'

type Pub = Database['public']['Tables']['publications']['Row']

export default async function PublicationsPage() {
  let pubs: Pub[] | null = null
  try {
    const { data } = await supabase.from('publications').select('*').order('year', { ascending: false })
    pubs = data
  } catch {
    pubs = null
  }

  // If remote DB still contains legacy template records, fall back to verified Annual Report publications
  const isLegacyPlaceholder =
    pubs &&
    pubs.some(
      (p) =>
        p.title.includes('Renewable Energy') ||
        p.authors.includes('Aditya Sharma') ||
        p.authors.includes('Rohan Verma')
    )
  const resolvedPubs = !isLegacyPlaceholder && pubs && pubs.length > 0 ? pubs : FALLBACK_PUBLICATIONS

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ifsanitt.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Publications & Research',
        item: 'https://ifsanitt.vercel.app/publications',
      },
    ],
  }

  const publicationsSchema = resolvedPubs.map(pub => ({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    author: (typeof pub.authors === 'string' ? pub.authors.split(',') : pub.authors).map((a: string) => ({
      '@type': 'Person' as const,
      name: a.trim()
    })),
    datePublished: String(pub.year),
    description: pub.abstract || pub.title,
    publisher: {
      '@type': 'Organization',
      name: 'IFSA NIT Trichy'
    }
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationsSchema) }}
      />
      <PublicationsPageClient pubs={resolvedPubs} />
    </>
  )
}
