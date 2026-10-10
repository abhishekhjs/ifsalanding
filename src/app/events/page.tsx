import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { EventsPageClient } from './events-client'
import { FALLBACK_EVENTS } from '@/lib/fallback-data'

export const metadata: Metadata = {
  title: 'Events & Initiatives',
  description:
    'Case competitions, national finance summits, executive masterclasses, and trading simulations hosted by IFSA NIT Trichy.',
  openGraph: {
    title: 'Events & Initiatives | IFSA NIT Trichy',
    description: 'Case competitions, national finance summits, executive masterclasses, and trading simulations.',
    url: '/events',
  },
}

import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']

export default async function EventsPage() {
  let events: Event[] | null = null
  try {
    const { data } = await supabase.from('events').select('*').order('date', { ascending: false })
    events = data
  } catch {
    events = null
  }

  // If remote DB still contains legacy template records, fall back to verified Annual Report events
  const isLegacyPlaceholder =
    events &&
    events.some(
      (e) =>
        e.title.includes('Careers in Investment Banking') ||
        e.title.includes('Algorithmic Trading')
    )
  const resolvedEvents = !isLegacyPlaceholder && events && events.length > 0 ? events : FALLBACK_EVENTS

  const eventsSchema = resolvedEvents.map(event => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    description: event.title, // or a more specific description if available
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: event.is_upcoming ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventMovedOnline', // Defaulting to scheduled if upcoming
    location: {
      '@type': 'Place',
      name: event.venue || 'NIT Trichy',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Tiruchirappalli',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      }
    }
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
      <EventsPageClient events={resolvedEvents} />
    </>
  )
}
