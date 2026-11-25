'use client'

import TrailingImage from '@/components/animata/image/trailing-image'
import { SidewaysWordReveal } from '@/components/animata/text/sideways-word-reveal'
import { CardReveal } from '@/components/animata/container/card-reveal'

const PLACED_COMPANIES = [
  'EY',
  'ZS Associates',
  'SBI Funds',
  'Pernod Ricard',
  'Microsoft',
  'Novartis',
  'P&G',
]

const PLACED_LOGOS = [
  '/ey-clean.png',
  '/ZS-Logo-RGB-website-01.png',
  '/sbi-clean.png',
  '/pernod-clean.png',
  '/Microsoft-logo.png',
  '/novartis-framed.png',
  '/pg-clean.png',
]

export function HomeAlumniPlacements() {
  return (
    <section className="relative border-b border-[#18222E] bg-[#091018] overflow-hidden">
      <TrailingImage
        images={PLACED_LOGOS}
        threshold={40}
        imageClassName="h-14 w-28 sm:h-16 sm:w-36 object-contain p-2 bg-white/95 border border-[#18222E] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] select-none"
        className="py-14 sm:py-16 md:py-20"
      >
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Heading & Subtitle */}
            <div className="lg:col-span-5 pointer-events-auto">
              <SidewaysWordReveal
                lines={['Our Alumni', 'Are Placed At']}
                className="font-serif font-black tracking-[-0.035em] text-[#F3EEE3] text-[36px] sm:text-[44px] md:text-[50px] leading-[0.95]"
                accentBarClassName="mt-4 h-[4px] w-16 bg-[#D4A843]"
              />
              <p className="mt-3.5 max-w-[340px] text-[12.5px] sm:text-[13px] leading-relaxed text-[#9AA4B0]">
                Direct institutional recruitment across tier-1 investment banking, global consulting,
                and sovereign asset managers.
              </p>
            </div>

            {/* Right Column: Typographic Company Lockup */}
            <CardReveal
              index={1}
              threshold={0.12}
              className="lg:col-span-7 flex flex-wrap items-baseline gap-x-8 sm:gap-x-11 md:gap-x-12 gap-y-3 sm:gap-y-4 pointer-events-auto"
            >
              {PLACED_COMPANIES.map((company) => (
                <span
                  key={company}
                  className="font-serif font-black text-[24px] sm:text-[28px] md:text-[34px] leading-tight text-[#F3EEE3] transition-colors duration-200 hover:text-[#CBA258] select-none cursor-default"
                >
                  {company}
                </span>
              ))}
            </CardReveal>
          </div>
        </div>
      </TrailingImage>
    </section>
  )
}
