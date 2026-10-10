'use client'

import Link from 'next/link'
import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']

interface HomeFeaturedEventsProps {
  events: Event[]
}

function parseEventDate(dateStr: string) {
  const parts = dateStr.trim().split(/\s+/)
  if (parts.length >= 2 && !isNaN(Number(parts[0]))) {
    return {
      day: parts[0],
      month: parts[1].slice(0, 4).toUpperCase(),
    }
  }
  const d = new Date(dateStr)
  if (!isNaN(d.getTime())) {
    return {
      day: d.getDate().toString(),
      month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
    }
  }
  return {
    day: '15',
    month: 'MAR',
  }
}

export function HomeFeaturedEvents({ events }: HomeFeaturedEventsProps) {
  const upcomingEvents = events.filter((e) => e.is_upcoming)

  return (
    <section className="border-b border-[#E4DACB] bg-[#FAF8F5] py-14 md:py-18">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#E4DACB]">
          <h2 className="font-serif text-[28px] sm:text-[34px] font-normal text-[#1C1917]">
            Flagship Events &amp; Summits
          </h2>
          <Link
            href="/events"
            className="text-[13.5px] font-medium text-[#1C1917] transition-colors hover:text-[#59110B]"
          >
            All events →
          </Link>
        </div>

        {/* Events 2-Column Grid */}
        {upcomingEvents.length === 0 ? (
          <div className="mt-6 rounded-[8px] border border-dashed border-[#BFAFA0] bg-white p-10 text-center">
            <p className="font-serif text-[18px] text-[#1C1917]">
              No upcoming events currently scheduled.
            </p>
            <p className="mt-1 text-[14px] text-[#78716C]">
              New initiatives, national competitions, and executive masterclasses will be published here.
            </p>
            <Link
              href="/events"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[12.5px] font-medium text-[#59110B] hover:underline"
            >
              <span>Explore past summits &amp; masterclasses archive</span>
              <span>→</span>
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {upcomingEvents.map((ev) => {
              const { day, month } = parseEventDate(ev.date)
              return (
                <div
                  key={ev.id}
                  className="group flex items-center justify-between rounded-[8px] border border-[#E4DACB] bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-[#59110B] hover:shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Date Badge */}
                    <div className="flex h-13 w-13 shrink-0 flex-col items-center justify-center rounded-[6px] border border-[#781D1D] bg-white text-center shadow-2xs">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#59110B]">
                        {month}
                      </span>
                      <span className="font-mono text-[17px] font-bold leading-none text-[#59110B]">
                        {day}
                      </span>
                    </div>

                    {/* Title & Location */}
                    <div className="min-w-0 flex-1 pr-2">
                      <Link
                        href="/events"
                        className="block text-[15px] sm:text-[15.5px] font-medium text-[#1C1917] hover:text-[#59110B] transition-colors truncate"
                      >
                        {ev.title}
                      </Link>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-[#7A5424] truncate">
                        {ev.tag}
                      </p>
                    </div>
                  </div>

                  {/* Details Action Link */}
                  <Link
                    href="/events"
                    className="shrink-0 ml-3 text-[13px] font-medium text-[#7A5424] hover:text-[#59110B] hover:underline"
                  >
                    Details
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
