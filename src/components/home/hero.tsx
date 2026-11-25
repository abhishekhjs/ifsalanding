'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { PartnerModal } from '@/components/partner-modal'
import KineticCenterBuild from '@/components/animata/text/kinetic-center-build'
import TrailingImage from '@/components/animata/image/trailing-image'

const HERO_SESSION_IMAGES = [
  '/ifsa-sess-1.jpg',
  '/ifsa-sess-2.jpg',
  '/ifsa-sess-3.jpg',
  '/ifsa-sessions-keynote.jpg',
  '/ifsa-sess4%20(1).png',
  '/ifsa-sess4%20(2).png',
  '/ifsa-sess4%20(3).png',
  '/ifsa-sess4%20(4).png',
  '/ifsa-sess4%20(5).png',
]

export function HomeHero() {
  const [modalOpen, setModalOpen] = useState(false)
  const [replayKey, setReplayKey] = useState(0)

  const replay = useCallback(() => {
    setReplayKey((k) => k + 1)
  }, [])

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden border-b border-[#E6DFD3] bg-[#FAF7F0]"
    >
      {/* Full-bleed engineering ledger grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E6DFD3 1px, transparent 1px), linear-gradient(to bottom, #E6DFD3 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          backgroundPosition: 'center top',
        }}
      />

      {/* Trailing IFSA session snapshots behind the cursor */}
      <TrailingImage
        images={HERO_SESSION_IMAGES}
        threshold={45}
        imageClassName="h-28 w-40 sm:h-34 sm:w-48 md:h-38 md:w-54 object-cover rounded-[2px] border-2 border-[#111418] shadow-[4px_4px_0px_0px_#111418] select-none"
        className="w-full pt-14 pb-16 md:pt-20 md:pb-24"
      >
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 flex flex-col items-center text-center">
          {/* Chapter kicker badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 border border-[#111418] bg-[#FAF7F0] px-3 py-1 text-[10px] sm:text-[11px] font-mono tracking-[0.14em] uppercase font-semibold text-[#111418]"
          >
            <span className="text-[#E5484D] text-[9px] leading-none">●</span>
            <span>10TH APAC CHAPTER · NIT TIRUCHIRAPPALLI</span>
          </motion.div>

          {/* ── KINETIC CENTER BUILD HEADLINE ──────────────────────────── */}
          <div className="mt-6 w-full max-w-[1240px]">
            {/* Screen reader & SEO accessible heading */}
            <h1 className="sr-only">Where ambition meets impact.</h1>

            {/* Kinetic Visual Build Stage */}
            <div
              onClick={replay}
              title="Click to replay kinetic build"
              aria-hidden="true"
              className="w-full flex flex-col items-center justify-center select-none cursor-pointer"
              style={{
                fontWeight: 900,
                fontVariationSettings: "'wght' 900, 'opsz' 144",
              }}
            >
              {/* Line 1: Where ambition */}
              <KineticCenterBuild
                key={`line1-${replayKey}`}
                words={['Where', 'ambition']}
                initialDelayMs={80}
                firstWordDurationMs={380}
                holdBeforePushMs={120}
                pushDurationMs={440}
                replayKey={replayKey}
                className="font-serif font-black tracking-[-0.04em] text-[#111418] text-[44px] min-[400px]:text-[56px] sm:text-[76px] md:text-[96px] lg:text-[116px] xl:text-[130px] leading-[0.88]"
              />

              {/* Line 2: meets impact. */}
              <div className="-mt-1 sm:-mt-2 md:-mt-3 lg:-mt-4">
                <KineticCenterBuild
                  key={`line2-${replayKey}`}
                  words={[
                    'meets',
                    {
                      text: 'impact.',
                      className: 'italic text-[#184E32] font-serif pr-1 sm:pr-2',
                    },
                  ]}
                  initialDelayMs={480}
                  firstWordDurationMs={380}
                  holdBeforePushMs={120}
                  pushDurationMs={440}
                  replayKey={replayKey}
                  className="font-serif font-black tracking-[-0.04em] text-[#111418] text-[44px] min-[400px]:text-[56px] sm:text-[76px] md:text-[96px] lg:text-[116px] xl:text-[130px] leading-[0.88]"
                />
              </div>
            </div>
          </div>

          {/* Subtext — emerges smoothly once kinetic build completes */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-[620px] text-[15px] sm:text-[16px] leading-[1.7] text-[#555048]"
          >
            Founded on December 2, 2024 at NIT Trichy, we are part of the world&apos;s premier
            student finance network across 15 countries. In strategic partnership with{' '}
            <strong className="font-semibold text-[#111418]">Wall Street Oasis (WSO)</strong>, we
            bridge engineering rigor with high finance through live venture advisory, equity
            research, and national podiums.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              href="/events#ifsa-forum"
              className="inline-flex h-11 items-center justify-center bg-[#184E32] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#133F28]"
            >
              What&apos;s IFSA Forum? →
            </Link>

            <Link
              href="/publications"
              className="inline-flex h-11 items-center justify-center border border-[#111418] bg-[#FAF7F0] px-6 text-[13.5px] font-semibold text-[#111418] transition-colors hover:bg-white"
            >
              Read 7 publications
            </Link>

            <Link
              href="/clients"
              className="inline-flex h-11 items-center justify-center px-4 text-[13.5px] font-medium text-[#111418] transition-colors hover:text-[#184E32]"
            >
              <span className="border-b border-[#B88746] pb-0.5">Explore 9 mandates</span>
              <span className="ml-1">→</span>
            </Link>
          </motion.div>
        </div>
      </TrailingImage>

      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
