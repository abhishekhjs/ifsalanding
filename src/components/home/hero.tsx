'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PartnerModal } from '@/components/partner-modal'

export function HomeHero() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="hero-section" className="relative overflow-hidden border-b border-[#E4DACB] bg-[#FAF8F5]">
      {/* Background visual embed */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://colorflow-embed.b-cdn.net/embed.html#e=bSxtyF9E"
          className="h-full w-full border-0 object-cover"
          title="Hero background animation"
        />
      </div>

      {/* Protective scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/80 to-[#FAF8F5]/45" />

      {/* Grid pattern layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E4DACB 1px, transparent 1px), linear-gradient(to bottom, #E4DACB 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 80%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-[860px]">
          {/* Live status pill */}
          <div className="inline-flex items-center rounded-full border border-[#E4DACB] bg-white/90 px-3.5 py-1.5 backdrop-blur-md shadow-xs transition-all hover:border-[#59110B]">
            <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#7A5424]">
              10th APAC Chapter · NIT Tiruchirappalli
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-7 font-serif text-[42px] leading-[1.15] font-normal tracking-tight text-[#1C1917] sm:text-[56px] lg:text-[64px]">
            Where ambition meets <span className="inline-block font-serif italic text-[#59110B] pb-1">impact</span>.
          </h1>

          {/* Subtext */}
          <p className="mt-8 sm:mt-10 max-w-[66ch] text-[16.5px] sm:text-[17.5px] leading-[1.8] text-[#44403C]">
            Founded on December 2, 2024 at NIT Trichy, we are part of the world’s premier student finance network across 15 countries. In strategic partnership with <strong className="font-medium text-[#1C1917]">Wall Street Oasis (WSO)</strong>, we bridge engineering rigor with high finance through live venture advisory, equity research, and national podiums.
          </p>

          {/* CTAs */}
          <div className="mt-12 sm:mt-14 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex h-12 items-center justify-center rounded-[6px] bg-[#59110B] px-6 text-[14px] font-medium text-white shadow-[0_4px_14px_-2px_rgba(89,17,11,0.3)] transition-all hover:bg-[#400A06] hover:-translate-y-0.5 active:translate-y-0"
            >
              Partner with us →
            </button>

            <Link
              href="/publications"
              className="inline-flex h-12 items-center justify-center rounded-[6px] border border-[#BFAFA0] bg-white/90 px-6 text-[14px] font-medium text-[#1C1917] backdrop-blur-sm transition-all hover:border-[#59110B] hover:bg-[#F4ECE1] hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
            >
              Read 7 publications
            </Link>

            <Link
              href="/clients"
              className="inline-flex h-12 items-center justify-center rounded-[6px] px-4 text-[14px] font-medium text-[#7A5424] hover:text-[#59110B] transition-colors"
            >
              Explore 9 mandates →
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
