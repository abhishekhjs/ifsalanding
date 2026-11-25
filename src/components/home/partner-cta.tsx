'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CardReveal } from '@/components/animata/container/card-reveal'
import ShortSlideDown from '@/components/animata/text/short-slide-down'

export function HomePartnerCta() {
  return (
    <section className="bg-[#FAF7F0] pb-20 sm:pb-28 pt-4">
      {/* Subtle Divider Line Separating from Events Section */}
      <div className="w-full border-t border-[#E2E8F0] mb-14 sm:mb-20" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <CardReveal threshold={0.12} index={0}>
          <div className="border-2 border-[#111418] py-14 sm:py-20 md:py-24 px-6 sm:px-12 text-center shadow-[8px_8px_0px_#111418] sm:shadow-[10px_10px_0px_#111418] relative overflow-hidden bg-[#154D38]">
            {/* Background Image: ifsa-sess-2 with forest green duotone overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/ifsa-sess-2.jpg"
                alt="IFSA NIT Trichy session background"
                fill
                className="object-cover object-center opacity-45 scale-[1.02]"
                sizes="(max-width: 1240px) 100vw, 1240px"
              />
              {/* Emerald green scrim + subtle ledger grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: 'rgba(21, 77, 56, 0.78)',
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: '36px 36px',
                }}
              />
            </div>

            <div className="relative z-10">
              {/* Main Headline for Screen Readers */}
              <h2 className="sr-only">Partner with IFSA NIT Trichy</h2>

              {/* Kinetic Short-Slide-Down Headline */}
              <ShortSlideDown
                phrases={[
                  ['Partner with', 'IFSA NIT Trichy'],
                ]}
                holdMs={3400}
                gapMs={320}
                className="h-[105px] sm:h-[145px] md:h-[185px] lg:h-[205px] w-full font-serif text-[38px] sm:text-[54px] md:text-[66px] lg:text-[76px] font-black leading-[1.04] tracking-tight text-[#FAF7F0] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] select-none"
              />

              {/* Subheading / Mandate Description */}
              <p className="mt-4 sm:mt-5 text-[13px] sm:text-[14px] md:text-[15px] text-[#FAF7F0]/90 max-w-xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                Commission an equity research mandate, engage our student analysts for live advisory,
                or collaborate on national summits.
              </p>

              {/* Dual CTAs */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  href="/partner"
                  className="inline-flex items-center justify-center bg-[#111418] text-white text-[13px] sm:text-[13.5px] font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-[2px] hover:bg-black transition-colors shadow-xs border border-white/10"
                >
                  Partner with us →
                </Link>

                <Link
                  href="/publications"
                  className="inline-flex items-center justify-center border border-[#FAF7F0]/50 bg-black/20 backdrop-blur-xs text-[#FAF7F0] text-[13px] sm:text-[13.5px] font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-[2px] hover:bg-white/10 transition-colors"
                >
                  Browse Research Archive
                </Link>
              </div>
            </div>
          </div>
        </CardReveal>
      </div>
    </section>
  )
}
