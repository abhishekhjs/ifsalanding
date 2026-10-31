'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PartnerModal } from '@/components/partner-modal'

// ── Live mandate data for the rotating right panel ────────────────────────
const LIVE_MANDATES = [
  {
    id: 'varicash',
    name: 'Varicash',
    domain: 'Fintech · Lending Rails',
    scope: 'Loan Against Mutual Funds — infrastructure & product advisory',
    status: 'Live',
    accentColor: '#B48344',
  },
  {
    id: 'climate-b',
    name: 'Climate B Venture',
    domain: 'ESG · Climate Analytics',
    scope: 'Physical & Transition Risk Scenario Modeling for climate-exposed assets',
    status: 'Live',
    accentColor: '#3D7A5A',
  },
  {
    id: 'mymfd',
    name: 'myMFD',
    domain: 'WealthTech · SaaS',
    scope: 'Digital Operating System for Mutual Fund Distributors — GTM & unit economics',
    status: 'Live',
    accentColor: '#59110B',
  },
]

// ── Mini counters shown in the mandate panel ──────────────────────────────
const QUICK_STATS = [
  { value: '3', label: 'Live' },
  { value: '6', label: 'Completed' },
  { value: '9', label: 'Total' },
]

export function HomeHero() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeMandateIdx, setActiveMandateIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-rotate every 3 s, pause on hover
  useEffect(() => {
    if (paused) return
    const id = setInterval(
      () => setActiveMandateIdx((i) => (i + 1) % LIVE_MANDATES.length),
      3000,
    )
    return () => clearInterval(id)
  }, [paused])

  const active = LIVE_MANDATES[activeMandateIdx]

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden border-b border-[#E4DACB] bg-[#FAF8F5]"
    >
      {/* Background visual embed */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://colorflow-embed.b-cdn.net/embed.html#e=bSxtyF9E"
          className="h-full w-full border-0 object-cover"
          title="Hero background animation"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      {/* Protective scrim — heavier on left for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/98 via-[#FAF8F5]/85 to-[#FAF8F5]/20" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E4DACB 1px, transparent 1px), linear-gradient(to bottom, #E4DACB 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 80%)',
        }}
      />

      {/* ── Asymmetric two-column grid ────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">

          {/* ── LEFT: Headline & CTAs ──────────────────────────────────── */}
          <div className="max-w-[860px]">
            {/* Live status pill */}
            <div className="inline-flex items-center rounded-full border border-[#E4DACB] bg-white/90 px-3.5 py-1.5 backdrop-blur-md shadow-xs">
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#7A5424]">
                10th APAC Chapter · NIT Tiruchirappalli
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-7 font-serif text-[42px] leading-[1.15] font-normal tracking-tight text-[#1C1917] sm:text-[56px] lg:text-[64px]">
              <span className="sr-only">IFSA NIT Trichy — </span>Where ambition meets{' '}
              <span className="inline-block font-serif italic text-[#59110B] pb-1">impact</span>.
            </h1>

            {/* Subtext */}
            <p className="mt-8 sm:mt-10 max-w-[66ch] text-[16.5px] sm:text-[17.5px] leading-[1.8] text-[#44403C]">
              Founded on December 2, 2024 at NIT Trichy, we are part of the world's premier
              student finance network across 15 countries. In strategic partnership with{' '}
              <strong className="font-medium text-[#1C1917]">Wall Street Oasis (WSO)</strong>, we
              bridge engineering rigor with high finance through live venture advisory, equity
              research, and national podiums.
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

          {/* ── RIGHT: Live Mandate Ticker Panel ──────────────────────── */}
          <div
            className="hidden lg:block"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="rounded-[16px] border border-[#E4DACB] bg-white/80 backdrop-blur-md shadow-[0_12px_32px_-8px_rgba(28,25,23,0.10)] overflow-hidden">

              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-[#E4DACB] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  {/* Green live dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A5424]">
                    Live Client Mandates
                  </span>
                </div>
                {/* Dot nav */}
                <div className="flex items-center gap-1.5">
                  {LIVE_MANDATES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMandateIdx(i)}
                      aria-label={`Switch to mandate ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeMandateIdx === i
                          ? 'w-5 bg-[#59110B]'
                          : 'w-1.5 bg-[#D9C8B6] hover:bg-[#BFAFA0]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Active mandate card */}
              <div className="min-h-[180px] px-5 py-5">
                <div
                  key={active.id}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  {/* Status badge + domain */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 font-mono text-[10.5px] font-semibold text-emerald-700">
                      ● {active.status}
                    </span>
                    <span className="font-mono text-[10.5px] text-[#7A5424]">{active.domain}</span>
                  </div>

                  {/* Name */}
                  <h3 className="mt-3 font-serif text-[22px] font-normal text-[#1C1917] leading-tight">
                    {active.name}
                  </h3>

                  {/* Scope description */}
                  <p className="mt-2 text-[13px] leading-relaxed text-[#57534E]">{active.scope}</p>
                </div>
              </div>

              {/* Quick-stat strip */}
              <div className="grid grid-cols-3 divide-x divide-[#E4DACB] border-t border-[#E4DACB] bg-[#FAF8F5]">
                {QUICK_STATS.map((s) => (
                  <div key={s.label} className="px-4 py-3 text-center">
                    <p className="font-serif text-[22px] leading-none text-[#59110B]">{s.value}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-[#78716C]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="border-t border-[#E4DACB] px-5 py-3.5">
                <Link
                  href="/clients"
                  className="group flex items-center justify-between text-[13px] font-medium text-[#1C1917] transition-colors hover:text-[#59110B]"
                >
                  <span>View all 9 mandates</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>

            {/* Below-panel footnote */}
            <p className="mt-3 text-center font-mono text-[10.5px] text-[#A8A29E] uppercase tracking-wider">
              Advisory data · updated Oct 2025
            </p>
          </div>

        </div>
      </div>

      {/* Interactive Modal */}
      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
