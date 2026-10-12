import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { HomeHero } from '@/components/home/hero'
import { HomeStats } from '@/components/home/stats'
import { HomeAchievements } from '@/components/home/achievements'
import { HomeFeaturedEvents } from '@/components/home/featured-events'
import { HomeFeaturedPubs } from '@/components/home/featured-pubs'
import { HomeClients } from '@/components/home/clients'
import { FALLBACK_EVENTS, FALLBACK_PUBLICATIONS } from '@/lib/fallback-data'
import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']
type Pub = Database['public']['Tables']['publications']['Row']

export const metadata: Metadata = {
  title: {
    absolute: 'IFSA NIT Trichy | Ambition Meets Impact',
  },
  description:
    'Official chapter of the International Finance Students Association at NIT Trichy. In strategic partnership with Wall Street Oasis (WSO). Live venture advisory, equity research, and finance summits.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'IFSA NIT Trichy | Ambition Meets Impact',
    description:
      'Official chapter of the International Finance Students Association at NIT Trichy. In strategic partnership with Wall Street Oasis (WSO).',
    url: '/',
  },
}

export default async function HomePage() {
  let events: Event[] | null = null
  let pubs: Pub[] | null = null

  try {
    const [{ data: eventsData }, { data: pubsData }] = await Promise.all([
      supabase.from('events').select('*').order('date', { ascending: false }).limit(4),
      supabase.from('publications').select('*').order('year', { ascending: false }).limit(4),
    ])
    events = eventsData
    pubs = pubsData
  } catch {
    // If connection fails, fall back to seed constants
    events = null
    pubs = null
  }

  const isLegacyPubs =
    pubs &&
    pubs.some(
      (p) =>
        p.title.includes('Renewable Energy') ||
        p.authors.includes('Aditya Sharma') ||
        p.authors.includes('Rohan Verma')
    )
  const isLegacyEvents =
    events &&
    events.some(
      (e) =>
        e.title.includes('Careers in Investment Banking') ||
        e.title.includes('Algorithmic Trading')
    )

  const resolvedPubs =
    !isLegacyPubs && pubs && pubs.length > 0
      ? pubs
      : FALLBACK_PUBLICATIONS.slice(0, 4)
  const allEvents =
    !isLegacyEvents && events && events.length > 0
      ? events
      : FALLBACK_EVENTS
  const upcomingEvents = allEvents.filter((e) => e.is_upcoming).slice(0, 4)

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'IFSA NIT Trichy',
    url: 'https://ifsanitt.vercel.app',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeHero />
      <HomeClients />
      <HomeStats />
      <HomeAchievements />
      <HomeFeaturedPubs pubs={resolvedPubs} />
      <HomeFeaturedEvents events={upcomingEvents} />
    </>
  )
}
