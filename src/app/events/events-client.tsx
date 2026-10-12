'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']

const TYPES = ['All', 'Case competition', 'Speaker session', 'Trading and markets', 'Workshop', 'Networking']

export function EventsPageClient({ events }: { events: Event[] }) {
  const upcomingCount = events.filter((e) => e.is_upcoming).length
  const [tab, setTab] = useState<'upcoming' | 'past'>(upcomingCount > 0 ? 'upcoming' : 'past')
  const [type, setType] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [registeredEvents, setRegisteredEvents] = useState<Record<string, boolean>>({})

  const filtered = events
    .filter((e) => (tab === 'upcoming' ? e.is_upcoming : !e.is_upcoming))
    .filter((e) => type === 'All' || e.tag === type)

  const handleRegister = (id: string) => {
    setRegisteredEvents((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-[#E4DACB] bg-[#FAF8F5] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[820px]">
            <Breadcrumbs items={[{ label: 'Events & Initiatives' }]} />
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4ECE1] px-3.5 py-1 font-mono text-[11px] font-medium tracking-wider uppercase text-[#7A5424]">
              Chapter Initiatives &amp; Masterclasses
            </div>
            <h1 className="mt-4 font-serif text-[40px] font-normal leading-[1.12] tracking-tight text-[#1C1917] sm:text-[54px]">
              Events, Competitions &amp; Summits
            </h1>
            <p className="mt-5 text-[17px] leading-[1.65] text-[#44403C]">
              From the flagship <strong className="font-medium text-[#1C1917]">IFSA Forum</strong> and national <strong className="font-medium text-[#1C1917]">IFSC Case Competition</strong> (₹17L+ rewards) to executive masterclasses with HSBC, KPMG, and Wall Street Oasis leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          {/* Tabs */}
          <div className="flex border-b border-[#E4DACB]">
            <button
              onClick={() => setTab('upcoming')}
              className={`pb-4 text-[15px] font-medium transition-all mr-8 border-b-2 ${
                tab === 'upcoming'
                  ? 'border-[#59110B] text-[#59110B]'
                  : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Upcoming Schedule ({events.filter((e) => e.is_upcoming).length})
            </button>
            <button
              onClick={() => setTab('past')}
              className={`pb-4 text-[15px] font-medium transition-all border-b-2 ${
                tab === 'past'
                  ? 'border-[#59110B] text-[#59110B]'
                  : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Past Summits &amp; Rounds ({events.filter((e) => !e.is_upcoming).length})
            </button>
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap items-center gap-2 pt-8 pb-10">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                  type === t
                    ? 'bg-[#59110B] text-white shadow-xs'
                    : 'border border-[#E4DACB] bg-white text-[#44403C] hover:border-[#59110B] hover:text-[#59110B]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Event Cards Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-[#BFAFA0] p-16 text-center">
              <p className="text-[15px] text-[#78716C]">
                No events currently found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((ev) => {
                const isRegistered = registeredEvents[ev.id]
                return (
                  <div
                    key={ev.id}
                    className="group flex flex-col justify-between rounded-[8px] border border-[#E4DACB] bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#59110B] hover:shadow-[0_14px_28px_-6px_rgba(89,17,11,0.09)]"
                  >
                    <div>
                      {/* Header line */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-[3px] bg-[#F4ECE1] px-2.5 py-0.5 font-mono text-[10.5px] font-medium uppercase text-[#7A5424]">
                          {ev.tag}
                        </span>
                        <span className="font-mono text-[11.5px] text-[#78716C]">
                          {ev.date}
                        </span>
                      </div>

                      <h3 className="mt-4 font-serif text-[20px] font-normal leading-snug text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                        {ev.title}
                      </h3>

                      <p className="mt-3 text-[13.5px] leading-relaxed text-[#44403C]">
                        {ev.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-[#F4ECE1] pt-4 flex items-center justify-between">
                      {ev.attendance ? (
                        <span className="font-mono text-[11.5px] text-[#78716C]">
                          👥 {ev.attendance}+ attendees
                        </span>
                      ) : (
                        <span className="font-mono text-[11.5px] text-[#78716C]">
                          Open registration
                        </span>
                      )}

                      {ev.is_upcoming ? (
                        <button
                          onClick={() => {
                            if (!isRegistered) {
                              setSelectedEvent(ev)
                            }
                          }}
                          className={`rounded-[4px] px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
                            isRegistered
                              ? 'bg-[#EAF5EC] text-[#1B6F38] border border-[#1B6F38]/30'
                              : 'bg-[#59110B] text-white hover:bg-[#400A06]'
                          }`}
                        >
                          {isRegistered ? '✓ Registered' : 'Reserve Seat →'}
                        </button>
                      ) : (
                        <span className="text-[12.5px] text-[#78716C] font-medium">
                          Completed ✓
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Registration / Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-[8px] border border-[#E4DACB] bg-white p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DACB]">
              <span className="rounded-[3px] bg-[#F4ECE1] px-2 py-0.5 font-mono text-[10.5px] font-medium uppercase text-[#7A5424]">
                {selectedEvent.tag}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-[18px] text-[#78716C] hover:text-[#1C1917]"
              >
                ✕
              </button>
            </div>

            <h3 className="mt-4 font-serif text-[22px] font-normal text-[#1C1917]">
              {selectedEvent.title}
            </h3>
            <p className="mt-1 font-mono text-[12px] text-[#7A5424]">
              📅 {selectedEvent.date}
            </p>

            <p className="mt-3 text-[14px] leading-relaxed text-[#44403C]">
              {selectedEvent.description}
            </p>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E4DACB] pt-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-[13px] font-medium text-[#78716C]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleRegister(selectedEvent.id)
                  setSelectedEvent(null)
                }}
                className="rounded-[4px] bg-[#59110B] px-5 py-2 text-[13.5px] font-medium text-white hover:bg-[#400A06]"
              >
                Confirm RSVP
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
