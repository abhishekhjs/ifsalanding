'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SidewaysWordReveal } from '@/components/animata/text/sideways-word-reveal'
import { CardReveal } from '@/components/animata/container/card-reveal'
import { MetricCountUp } from '@/components/animata/text/metric-count-up'

const STAT_ITEMS = [
  {
    value: '12+',
    label: 'NATIONAL & GLOBAL PODIUMS',
    desc: 'EY CAFTA (Top 2 of 1000+ teams), IIT Madras FinVent (1st), IIM-A Impetus, HEC Paris',
  },
  {
    value: '9',
    label: 'CLIENT ADVISORY MANDATES',
    desc: '3 active live mandates (Varicash, Climate B, myMFD) and 6 completed institutional case studies',
  },
  {
    value: '₹17L+',
    label: 'PRIZE POOLS & GRANTS',
    desc: 'Awarded across IFSC 2026 Summit and premier inter-collegiate championships',
  },
  {
    value: '150+',
    label: 'FORUM & SUMMIT DELEGATES',
    desc: 'Delegates in the first premier finance summit hosted on-campus at NIT Trichy',
    link: {
      text: 'View summits →',
      href: '/events',
    },
  },
]

export function HomeStats() {
  return (
    <section className="relative border-b border-[#E6DFD3] bg-[#FAF7F0] pt-14 pb-18 sm:pt-18 sm:pb-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* ── Section Heading ─────────────────────────────────────────── */}
        <div className="max-w-[900px]">
          <SidewaysWordReveal
            lines={['Proven Track Record', 'Across Year One']}
            className="font-serif font-black tracking-[-0.035em] text-[#111418] text-[40px] sm:text-[54px] md:text-[66px] lg:text-[74px] leading-[0.95]"
            accentBarClassName="mt-4 h-[4px] w-18 bg-[#CBA258]"
          />
        </div>

        {/* ── Feature Card with ifsa-sess-1 background & softened shadow overlay ── */}
        <CardReveal threshold={0.12} className="relative mt-10 sm:mt-12 overflow-hidden bg-[#185133] px-8 sm:px-10 md:px-14 py-11 sm:py-14 md:py-18 min-h-[240px] sm:min-h-[280px] md:min-h-[320px] flex flex-col justify-center text-[#FAF7F0] shadow-md">
          {/* Background image with softened shadow overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/ifsa-sess-1.jpg"
              alt="IFSA session classroom masterclass"
              fill
              priority
              className="object-cover object-center opacity-60 scale-[1.02]"
              sizes="(max-width: 1240px) 100vw, 1240px"
            />
            {/* Lighter, softer forest shadow scrim so the image is clearly visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F3621]/75 via-[#14472c]/50 to-[#185133]/25" />
          </div>

          {/* Content — middle-aligned */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <h3 className="font-serif font-black tracking-[-0.03em] text-[#FAF7F0] text-[26px] sm:text-[34px] md:text-[42px] lg:text-[46px] leading-[1.02] max-w-[700px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Building the quantitative infrastructure for high finance
            </h3>

            <Link
              href="/events"
              className="inline-flex items-center justify-center border border-white/80 bg-black/20 backdrop-blur-sm px-5 py-2.5 text-[12.5px] sm:text-[13px] font-semibold text-white transition-all hover:bg-white hover:text-[#185133] hover:border-white self-start md:self-auto shrink-0 shadow-sm"
            >
              Explore events ›
            </Link>
          </div>
        </CardReveal>

        {/* ── 4-Column Stats Strip ─────────────────────────────────────── */}
        <div className="mt-8 sm:mt-10 border border-[#E6DFD3] bg-[#FAF7F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E6DFD3]">
          {STAT_ITEMS.map((item, idx) => (
            <CardReveal
              key={idx}
              index={idx}
              threshold={0.12}
              className={`p-6 sm:p-7 md:p-8 flex flex-col justify-between ${
                idx === 2 ? 'sm:border-t sm:border-t-[#E6DFD3] lg:border-t-0' : ''
              } ${idx === 3 ? 'sm:border-t sm:border-t-[#E6DFD3] lg:border-t-0' : ''}`}
            >
              <div>
                {/* Metric with Elastic Scale Pop & Quartic Ease-Out Ticker */}
                <div className="font-serif font-black text-[#111418] text-[38px] sm:text-[44px] md:text-[48px] leading-none tracking-tight">
                  <MetricCountUp value={item.value} delayMs={idx * 120} durationMs={1600} />
                </div>

                {/* Kicker label */}
                <div className="mt-3.5 mb-2 font-mono text-[10px] sm:text-[10.5px] font-semibold tracking-[0.14em] uppercase text-[#555048]">
                  {item.label}
                </div>

                {/* Description */}
                <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-[#78716C]">
                  {item.desc}
                </p>
              </div>

              {item.link ? (
                <div className="mt-4 pt-1">
                  <Link
                    href={item.link.href}
                    className="inline-flex items-center text-[12px] font-medium text-[#111418] border-b border-[#111418] pb-0.5 transition-colors hover:text-[#185133] hover:border-[#185133]"
                  >
                    {item.link.text}
                  </Link>
                </div>
              ) : null}
            </CardReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
