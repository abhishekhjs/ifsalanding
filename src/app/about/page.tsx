import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { AboutPageClient } from './about-client'
import { FALLBACK_FAQS, FALLBACK_TEAM_MEMBERS } from '@/lib/fallback-data'

export const metadata: Metadata = {
  title: 'About Us & Mentors',
  description:
    'Learn about the IFSA NIT Trichy founding story, advisory board mentors, leadership team, functional verticals, and recruitment process.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us & Mentors | IFSA NIT Trichy',
    description: 'Learn about IFSA NIT Trichy founding story, advisory board mentors, leadership team, and functional verticals.',
    url: '/about',
  },
}

import type { Database } from '@/types/database'

type TeamMember = Database['public']['Tables']['team_members']['Row']
type FAQ = Database['public']['Tables']['faqs']['Row']

export default async function AboutPage() {
  let team: TeamMember[] | null = null
  let faqs: FAQ[] | null = null

  try {
    const [{ data: teamData }, { data: faqsData }] = await Promise.all([
      supabase.from('team_members').select('*').order('created_at'),
      supabase.from('faqs').select('*').order('sort_order'),
    ])
    team = teamData
    faqs = faqsData
  } catch {
    team = null
    faqs = null
  }

  // Build a headshot lookup from fallback data keyed by member name
  const fallbackHeadshotMap = Object.fromEntries(
    FALLBACK_TEAM_MEMBERS
      .filter((m) => m.headshot_url)
      .map((m) => [m.name.toLowerCase(), m.headshot_url])
  )

  // If remote DB still contains old placeholder data ('Aditya Sharma'), use verified FALLBACK_TEAM_MEMBERS
  const isLegacyPlaceholder = team && team.some((m) => m.name === 'Aditya Sharma' || m.name === 'Pooja Krishnan')
  const baseTeam = !isLegacyPlaceholder && team && team.length > 0 ? team : FALLBACK_TEAM_MEMBERS

  // Patch in local headshots for any member missing a headshot_url in the DB
  const resolvedTeam = baseTeam.map((m) => ({
    ...m,
    headshot_url: m.headshot_url || fallbackHeadshotMap[m.name.toLowerCase()] || null,
  }))
  const resolvedFaqs = faqs && faqs.length > 0 ? faqs : FALLBACK_FAQS

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Us & Mentors - IFSA NIT Trichy',
    url: 'https://ifsanitt.vercel.app/about',
    description: 'Learn about IFSA NIT Trichy founding story, advisory board mentors, leadership team, functional verticals, and recruitment process.',
  }

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
        name: 'About Us & Mentors',
        item: 'https://ifsanitt.vercel.app/about',
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: resolvedFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutPageClient team={resolvedTeam} faqs={resolvedFaqs} />
    </>
  )
}
