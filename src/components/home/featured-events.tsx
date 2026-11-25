'use client'

import Link from 'next/link'
import type { Database } from '@/types/database'
import { SidewaysWordReveal } from '@/components/animata/text/sideways-word-reveal'
import { CardReveal } from '@/components/animata/container/card-reveal'

type Event = Database['public']['Tables']['events']['Row']

interface HomeFeaturedEventsProps {
  events?: Event[]
}

export function HomeFeaturedEvents({ events = [] }: HomeFeaturedEventsProps) {
  // Use first upcoming event if dynamically present, else fall back to signature IFSA Forum design
  const upcomingEvents = events.filter((e) => e.is_upcoming)
  const leadEvent = upcomingEvents[0]

  const leadTitle = leadEvent?.title || 'IFSA Forum 2027'
  const leadDesc =
    leadEvent?.description ||
    'Two-day signature finance summit bringing together 9,000+ NIT Trichy engineering minds, national competition finalists, top venture partners, and bulge-bracket leaders.'
  const leadTag = leadEvent?.tag?.toUpperCase() || 'SIGNATURE FORUM'

  return (
    <section className="bg-[#FAF7F0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <SidewaysWordReveal
              lines={['Flagship Events &', 'Summits']}
              className="font-serif text-[42px] sm:text-[56px] md:text-[64px] font-black leading-[1.02] tracking-tight text-[#111418]"
              accentBarClassName="mt-4 h-[5px] w-[72px] bg-[#CCA855]"
            />
          </div>

          <div className="sm:pt-6">
            <Link
              href="/events"
              className="font-sans text-[13px] sm:text-[14px] font-medium text-[#111418] underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              All events →
            </Link>
          </div>
        </div>

        {/* ── Events Grid ── */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Hero Event Card */}
          <CardReveal index={0} threshold={0.12} className="lg:col-span-7 flex flex-col">
            <div className="flex flex-col sm:flex-row border-2 border-[#111418] bg-white shadow-[6px_6px_0px_#111418] sm:shadow-[8px_8px_0px_#111418] overflow-hidden h-full">
              {/* Left Date Block (Deep Emerald Forest) */}
              <div className="w-full sm:w-[130px] md:w-[145px] shrink-0 flex flex-col items-center justify-center py-7 sm:py-0 px-4 text-center bg-[#154D38] select-none">
                <span className="font-serif text-[42px] sm:text-[50px] font-black leading-none text-white tracking-tight">
                  FEB
                </span>
                <span className="mt-1 font-mono text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-[#F5D88B] uppercase">
                  2027
                </span>
              </div>

              {/* Right Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <span className="inline-block bg-[#F5D88B] text-[#111418] font-sans text-[10px] sm:text-[10.5px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-[2px]">
                    {leadTag}
                  </span>

                  <h3 className="mt-3.5 font-serif text-[24px] sm:text-[28px] md:text-[31px] font-black leading-[1.12] tracking-tight text-[#111418]">
                    {leadTitle}
                  </h3>

                  <p className="mt-3 text-[12.5px] sm:text-[13px] text-[#4A5568] leading-relaxed max-w-lg">
                    {leadDesc}
                  </p>
                </div>

                <div className="mt-6">
                  <Link
                    href="/events#ifsa-forum"
                    className="inline-flex items-center gap-1.5 bg-[#111418] text-white text-[12px] font-semibold px-4 py-2 rounded-[2px] hover:bg-black transition-colors"
                  >
                    Explore Forum →
                  </Link>
                </div>
              </div>
            </div>
          </CardReveal>

          {/* Right Stacked Secondary Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
            {/* Secondary Card 1: Workshop */}
            <CardReveal index={1} threshold={0.12} className="flex-1 flex flex-col">
              <Link
                href="/events"
                className="border border-[#E2E8F0] bg-white rounded-[6px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center h-full transition-all duration-200 hover:border-neutral-400"
              >
                <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#718096] uppercase">
                  WORKSHOP
                </span>
                <h4 className="mt-3 font-serif text-[18px] sm:text-[20px] font-bold leading-snug text-[#111418]">
                  Executive Financial Modeling Masterclass
                </h4>
              </Link>
            </CardReveal>

            {/* Secondary Card 2: Competition */}
            <CardReveal index={2} threshold={0.12} className="flex-1 flex flex-col">
              <Link
                href="/events"
                className="border border-[#E2E8F0] bg-white rounded-[6px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-center h-full transition-all duration-200 hover:border-neutral-400"
              >
                <span className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#718096] uppercase">
                  COMPETITION
                </span>
                <h4 className="mt-3 font-serif text-[18px] sm:text-[20px] font-bold leading-snug text-[#111418]">
                  M&amp;A Case Competition Prelims
                </h4>
              </Link>
            </CardReveal>
          </div>

        </div>

      </div>
    </section>
  )
}
