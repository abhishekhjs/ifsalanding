'use client'

import Eight from '@/components/animata/bento-grid/eight'
import { SidewaysWordReveal } from '@/components/animata/text/sideways-word-reveal'

export function HomeAchievements() {
  return (
    <section className="relative overflow-hidden bg-[#091018] text-[#FAF7F0] py-20 sm:py-28 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div className="max-w-3xl">
          <span className="font-mono text-[11px] sm:text-[11.5px] uppercase tracking-[0.18em] font-semibold text-[#CBA258] block mb-3">
            COLLEGIATE COMPETITIVE TRACK
          </span>

          <SidewaysWordReveal
            lines={['National and Global', 'Competitions']}
            className="font-serif font-black tracking-[-0.03em] text-[#FAF7F0] leading-[0.94] text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px]"
            accentBarClassName="h-[4px] w-20 bg-[#CBA258] mt-5 mb-5"
          />

          {/* Subtitle */}
          <p className="font-sans text-[14px] sm:text-[15.5px] leading-relaxed text-[#8C95A0] max-w-2xl">
            Our analysts field high-performing teams for premier strategic valuation, consulting,
            and M&amp;A championships across India and worldwide.
          </p>
        </div>

        {/* Animata Eight Bento Grid Layout for the 8 National & Global Wins */}
        <div className="mt-10 sm:mt-14">
          <Eight />
        </div>
      </div>
    </section>
  )
}
