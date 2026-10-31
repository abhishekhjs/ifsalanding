'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type MandateCategory = 'all' | 'live' | 'fintech' | 'climate' | 'venture'

interface ClientPartner {
  id: string
  name: string
  badge: 'Live Mandate' | 'Completed Mandate'
  category: 'fintech' | 'climate' | 'venture'
  domain: string
  tagline: string
  logo: string
  statMetric?: string
  statLabel?: string
}

const CLIENT_PARTNERS: ClientPartner[] = [
  // 3 Live Active Mandates
  {
    id: 'varicash',
    name: 'Varicash',
    badge: 'Live Mandate',
    category: 'fintech',
    domain: 'Fintech & Lending',
    tagline: 'Loan Against Mutual Funds (LAMF) Rails',
    logo: '/varicash-logo.png',
    statMetric: 'Active Rail',
    statLabel: 'Fintech Infrastructure',
  },
  {
    id: 'climate-b',
    name: 'Climate B Venture',
    badge: 'Live Mandate',
    category: 'climate',
    domain: 'Climate & ESG Analytics',
    tagline: 'Physical & Transition Risk Modeling',
    logo: '/climate-b-logo.png',
    statMetric: 'Live Mandate',
    statLabel: 'Scenario Analytics',
  },
  {
    id: 'mymfd',
    name: 'myMFD',
    badge: 'Live Mandate',
    category: 'fintech',
    domain: 'WealthTech & SaaS',
    tagline: 'Digital Operating System for MFDs',
    logo: '/mymfd-logo.png',
    statMetric: 'Live Mandate',
    statLabel: 'Wealth Operating OS',
  },
  // 6 Completed Mandates
  {
    id: 'carbon6',
    name: 'Carbon6',
    badge: 'Completed Mandate',
    category: 'climate',
    domain: 'Climate Finance & ESG',
    tagline: 'EU ETS vs. India PAT Framework',
    logo: '/carbon6-framed.png',
    statMetric: 'Delivered',
    statLabel: 'Policy Benchmarking',
  },
  {
    id: 'spotlight',
    name: 'Spotlight Partners',
    badge: 'Completed Mandate',
    category: 'venture',
    domain: 'Venture Capital & Valuation',
    tagline: 'Startup Valuation & LTV/CAC',
    logo: '/spotlight-framed.png',
    statMetric: 'Delivered',
    statLabel: 'Cohort Modeling',
  },
  {
    id: 'venturewolf',
    name: 'VentureWolf',
    badge: 'Completed Mandate',
    category: 'venture',
    domain: 'Corporate Debt Advisory',
    tagline: 'MSME Hybrid Debt & Mezzanine',
    logo: '/venturewolf-framed.png',
    statMetric: 'Delivered',
    statLabel: 'Structure Advisory',
  },
  {
    id: 'infisum',
    name: 'Infisum Inc.',
    badge: 'Completed Mandate',
    category: 'venture',
    domain: 'International Tax & Policy',
    tagline: 'UAE Corporate & R&D Tax Credit',
    logo: '/infisum-framed.png',
    statMetric: 'Delivered',
    statLabel: 'Cross-Border Tax',
  },
  {
    id: 'cosmo',
    name: 'Cosmo Health',
    badge: 'Completed Mandate',
    category: 'venture',
    domain: 'Healthcare Intelligence',
    tagline: 'Digital Health TAM & Unit Economics',
    logo: '/cosmo-framed.png',
    statMetric: 'Delivered',
    statLabel: 'TAM / Unit Model',
  },
  {
    id: 'fundcapita',
    name: 'FundCapita',
    badge: 'Completed Mandate',
    category: 'fintech',
    domain: 'Fintech Syndication',
    tagline: 'Early-Stage Venture Platform GTM',
    logo: '/fundcapita-framed.png',
    statMetric: 'Delivered',
    statLabel: 'Syndicate Strategy',
  },
]

const CORPORATE_LOGOS = [
  { name: 'EY', src: '/ey-framed.png' },
  { name: 'ZS Associates', src: '/zs-framed.png' },
  { name: 'SBI Funds', src: '/sbi-framed.png' },
  { name: 'Pernod Ricard', src: '/pernod-framed.png' },
  { name: 'Microsoft', src: '/microsoft-framed.png' },
  { name: 'Novartis', src: '/novartis-framed.png' },
  { name: 'P&G', src: '/pg-framed.png' },
]

const FILTER_TABS: { label: string; value: MandateCategory; count: number }[] = [
  { label: 'All Mandates', value: 'all', count: 9 },
  { label: 'Active Live', value: 'live', count: 3 },
  { label: 'Fintech & SaaS', value: 'fintech', count: 3 },
  { label: 'Climate & ESG', value: 'climate', count: 2 },
  { label: 'Valuation & Advisory', value: 'venture', count: 4 },
]

export function HomeClients() {
  const [activeFilter, setActiveFilter] = useState<MandateCategory>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const cardsGridRef = useRef<HTMLDivElement>(null)
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([])
  const marqueeTrackRef = useRef<HTMLDivElement>(null)

  const repeatedLogos = [...CORPORATE_LOGOS, ...CORPORATE_LOGOS, ...CORPORATE_LOGOS]

  // Filter logic
  const filteredMandates = CLIENT_PARTNERS.filter((mandate) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'live') return mandate.badge === 'Live Mandate'
    return mandate.category === activeFilter
  })

  // GSAP 3D Scroll Reveal, Column Parallax & Lenis Inertia Link
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current || !cardsGridRef.current) return

    const section = sectionRef.current
    const cardsGrid = cardsGridRef.current

    const ctx = gsap.context(() => {
      const cards = cardElementsRef.current.filter(Boolean) as HTMLDivElement[]

      // 1. Initial 3D Spatial Deck Entrance
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.93,
          rotateX: 14,
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          stagger: {
            each: 0.07,
            from: 'start',
          },
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsGrid,
            start: 'top 82%',
            once: true,
          },
        }
      )



      // 3. Lenis Velocity Inertia Response: organic liquid skew during rapid smooth scroll
      const lenis = (window as unknown as { __lenis?: { on: (event: string, callback: (e: { velocity: number }) => void) => void } }).__lenis
      if (lenis && typeof lenis.on === 'function') {
        const handleScroll = ({ velocity }: { velocity: number }) => {
          const clampedSkew = gsap.utils.clamp(-1.5, 1.5, velocity * 0.06)
          gsap.to(cardsGrid, {
            skewY: clampedSkew,
            duration: 0.25,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
        lenis.on('scroll', handleScroll)
      }
    }, section)

    return () => ctx.revert()
  }, [activeFilter])

  // Interactive 3D Holographic Card Tilt & Cursor Spotlight
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardElementsRef.current[index]
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -7
    const rotateY = ((x - centerX) / centerX) * 8

    // Update CSS variables for high-performance cursor spotlight sheen
    card.style.setProperty('--spotlight-x', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--spotlight-y', `${(y / rect.height) * 100}%`)
    card.style.setProperty('--spotlight-opacity', '1')

    gsap.to(card, {
      rotateX,
      rotateY,
      z: 14,
      scale: 1.018,
      duration: 0.28,
      ease: 'power2.out',
      transformPerspective: 1000,
      overwrite: 'auto',
    })
  }, [])

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardElementsRef.current[index]
    if (!card) return

    card.style.setProperty('--spotlight-opacity', '0')

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      z: 0,
      scale: 1,
      duration: 0.55,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[#E4DACB] bg-[#FAF8F5] py-16 md:py-24"
    >
      {/* Subtle institutional parchment grain background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1C1917 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 text-center">
        {/* Top Header: Alumni Placements */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-[28px] font-normal tracking-tight text-[#1C1917] sm:text-[34px]">
            Our Alumni Are Placed At
          </h2>
          <p className="mt-2 text-[14px] text-[#78716C]">
            Direct institutional recruitment across tier-1 investment banking, global consulting, and sovereign asset managers.
          </p>
        </div>

        {/* Dynamic auto-scrolling company logos ribbon */}
        <div className="relative mt-8 overflow-hidden">
          {/* Gradient edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-[#FAF8F5] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-[#FAF8F5] to-transparent" />

          {/* Scrolling track */}
          <div
            ref={marqueeTrackRef}
            className="flex w-max items-center gap-6 sm:gap-7 py-3 animate-[partner-scroll_32s_linear_infinite]"
          >
            {repeatedLogos.map((partner, idx) => (
              <div
                key={idx}
                className="flex aspect-[2.9/1] h-18 sm:h-22 shrink-0 items-center justify-center rounded-[10px] sm:rounded-[12px] border border-[#E4DACB] bg-white p-3 sm:p-4 shadow-xs transition-transform duration-300 hover:scale-105 hover:border-[#59110B]/40"
              >
                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo - IFSA NIT Trichy alumni employer`}
                    width={260}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant hairline separator */}
        <div className="my-16 mx-auto flex items-center justify-center gap-3">
          <div className="h-[1px] w-20 bg-[#E4DACB]" />
          <span className="font-serif italic text-[14px] text-[#78716C]">Institutional Advisory</span>
          <div className="h-[1px] w-20 bg-[#E4DACB]" />
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-[28px] font-normal tracking-tight text-[#1C1917] sm:text-[36px]">
            Trusted by High-Growth Ventures &amp; Industry Leaders
          </h3>
          <p className="mx-auto mt-3 max-w-[66ch] text-[15px] leading-relaxed text-[#44403C]">
            Our analysts execute active credit modeling, climate analytics, and digital operating architecture alongside delivered institutional corporate mandates.
          </p>
        </div>

        {/* Interactive Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveFilter(tab.value)}
                className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                    : 'bg-white border border-[#E4DACB] text-[#57534E] hover:border-[#59110B] hover:text-[#1C1917]'
                }`}
              >
                {tab.value === 'live' && (
                  <span className="relative flex h-2 w-2 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B6F38] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1B6F38]" />
                  </span>
                )}
                <span>{tab.label}</span>
                <span
                  className={`ml-1 text-[11px] ${
                    isActive ? 'text-[#FAF8F5]/70' : 'text-[#78716C]'
                  }`}
                >
                  ({tab.count})
                </span>
              </button>
            )
          })}
        </div>

        {/* Client Partner Big Logo Tiles Grid — wraps in dark band when "live" tab is active */}
        <div
          className={`mt-10 rounded-[16px] px-4 pt-6 pb-8 sm:px-6 lg:px-8 transition-colors duration-500 ${
            activeFilter === 'live'
              ? 'bg-[#0B0F19] ring-1 ring-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]'
              : 'bg-transparent'
          }`}
        >
          {/* "Live" tab header — only shown when dark band is active */}
          {activeFilter === 'live' && (
            <div className="mb-6 flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.15em] text-white/70">
                Active Live Mandates — 3 Ongoing
              </span>
            </div>
          )}

        <div
          ref={cardsGridRef}
          style={{ perspective: 1200 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 [transform-style:preserve-3d]"
        >
          {filteredMandates.map((client, idx) => {
            const isLive = client.badge === 'Live Mandate'

            return (
              <div
                key={client.id}
                ref={(el) => {
                  cardElementsRef.current[idx] = el
                }}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                className="group relative flex flex-col justify-between rounded-[12px] border bg-white p-6 text-left shadow-[0_2px_8px_-2px_rgba(28,25,23,0.04)] transition-[border-color,box-shadow] duration-300 hover:shadow-[0_20px_40px_-12px_rgba(89,17,11,0.14)] [transform-style:preserve-3d] will-change-transform"
                style={
                  {
                    borderColor: isLive ? 'rgba(27, 111, 56, 0.35)' : '#E4DACB',
                    '--spotlight-x': '50%',
                    '--spotlight-y': '50%',
                    '--spotlight-opacity': '0',
                  } as React.CSSProperties
                }
              >
                {/* Dynamic Cursor Spotlight Sheen Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: isLive
                      ? `radial-gradient(circle 280px at var(--spotlight-x) var(--spotlight-y), rgba(27, 111, 56, 0.09), transparent 80%)`
                      : `radial-gradient(circle 280px at var(--spotlight-x) var(--spotlight-y), rgba(89, 17, 11, 0.08), transparent 80%)`,
                  }}
                />

                <Link href="/clients" className="relative z-10 flex flex-1 flex-col justify-between">
                  <div>
                    {/* Top Badge & Domain */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F4ECE1]">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 font-mono text-[10px] font-medium uppercase ${
                          isLive
                            ? 'bg-[#EAF5EC] text-[#1B6F38] font-semibold border border-[#1B6F38]/25'
                            : 'bg-[#F4ECE1] text-[#7A5424]'
                        }`}
                      >
                        {isLive ? (
                          <>
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B6F38] opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1B6F38]" />
                            </span>
                            <span>Live Mandate</span>
                          </>
                        ) : (
                          client.badge
                        )}
                      </span>

                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-[#78716C]">
                        {client.domain.split('&')[0].trim()}
                      </span>
                    </div>

                    {/* Big Prominent Logo Stage with 3D Depth */}
                    <div
                      className={`relative my-4 flex aspect-[3/1] w-full items-center justify-center rounded-[8px] bg-[#FAF8F5] p-3 border transition-colors duration-300 ${
                        isLive
                          ? 'border-[#1B6F38]/25 group-hover:border-[#1B6F38]/50 bg-[#F4F9F5]'
                          : 'border-[#E4DACB] group-hover:border-[#59110B]/40'
                      }`}
                    >
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo - IFSA NIT Trichy client mandate`}
                        width={360}
                        height={120}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Name & Tagline */}
                    <div className="mt-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-serif text-[19px] font-normal text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                          {client.name}
                        </h4>
                        {client.statMetric && (
                          <span className="text-[11px] font-mono text-[#78716C]">
                            {client.statMetric}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[13px] leading-snug text-[#78716C]">
                        {client.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-5 border-t border-[#F4ECE1] pt-3 flex items-center justify-between text-[12.5px] font-medium text-[#59110B]">
                    <span>Explore Advisory Mandate</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        </div>{/* end dynamic bg band wrapper */}

        {/* Link to partnership details */}
        <div className="mt-14">
          <Link
            href="/clients"
            className="group inline-flex items-center gap-2 rounded-full border border-[#E4DACB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#1C1917] shadow-xs transition-all duration-200 hover:border-[#59110B] hover:text-[#59110B] hover:shadow-sm"
          >
            <span>Explore 3 active mandates &amp; 6 completed institutional case studies</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes partner-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[partner-scroll_32s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
