'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
  animate,
  useInView,
} from 'motion/react'
import { ChevronLeft, ChevronRight, Trophy, Award, CheckCircle2 } from 'lucide-react'
import { FALLBACK_ACHIEVEMENTS } from '@/lib/fallback-data'

/* ── Types ───────────────────────────────────────────────────────────────── */
type Achievement = {
  id: string
  title: string
  competition: string
  organizer: string
  tier: string
  description: string
  year: string
}

/* ── Domain focus tags for institutional cards ──────────────────────────── */
const STRATEGIC_DOMAINS: Record<string, string> = {
  'ach-finvent': 'Financial Valuation · M&A Strategy',
  'ach-ey-cafta': 'Corporate Restructuring & Turnaround',
  'ach-iima-impetus': 'High-Stakes Corporate Strategy',
  'ach-iima-prameya': 'Financial Forecasting & Business Models',
  'ach-hec-paris': 'International Business Strategy Simulation',
  'ach-mckinsey': 'Management Consulting & Market Entry',
  'ach-iimc-veritas': 'LBO Modeling & Synergy Evaluation',
  'ach-iimk-iiml': 'Product Monetization & GTM Strategy',
}

/* ── Dot field (EY CAFTA 1,000+ Teams Visualization) ─────────────────────── */
const TOTAL_DOTS = 520
const WINNER_INDICES = new Set([160, 340])

function DotField() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const reduce = useReducedMotion()

  return (
    <div
      ref={ref}
      className="my-3 flex max-h-[50px] flex-wrap gap-[2.5px] overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
        const isWinner = WINNER_INDICES.has(i)
        const delay = reduce ? 0 : Math.min(i * 0.2, 450)
        return (
          <span
            key={i}
            className={[
              'inline-block h-[3.5px] w-[3.5px] rounded-full',
              reduce
                ? isWinner
                  ? 'bg-[#59110B]'
                  : 'bg-[#D9C8B6]'
                : isInView
                  ? isWinner
                    ? 'scale-[1.8] bg-[#59110B] shadow-[0_0_6px_2px_rgba(89,17,11,0.65)]'
                    : 'bg-[#D4C5B2]'
                  : 'bg-[#ECE4D9]',
              !reduce && 'transition-all duration-500',
            ]
              .filter(Boolean)
              .join(' ')}
            style={!reduce ? { transitionDelay: `${delay}ms` } : undefined}
          />
        )
      })}
    </div>
  )
}

/* ── Count-up number ─────────────────────────────────────────────────────── */
function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!isInView || !ref.current) return
    if (reduce) {
      ref.current.textContent = `${target}${suffix}`
      return
    }
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = `${Math.floor(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [isInView, target, suffix, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  )
}

/* ── Main Component ─────────────────────────────────────────────────────── */
export function HomeAchievements() {
  const [activeIdx, setActiveIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const wins = FALLBACK_ACHIEVEMENTS

  // Vertical scroll tracking across outer container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth progress to prevent jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  })

  // Update active index based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const target = Math.min(
        wins.length - 1,
        Math.max(0, Math.floor(latest * wins.length * 1.02))
      )
      setActiveIdx(target)
    })
    return () => unsubscribe()
  }, [scrollYProgress, wins.length])

  // Clickable direct jump to any win
  const scrollToWin = (index: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top - 68
    const progressRatio = index / Math.max(1, wins.length - 1)
    const totalScrollableHeight = containerRef.current.offsetHeight - window.innerHeight + 68
    window.scrollTo({
      top: scrollTop + progressRatio * totalScrollableHeight,
      behavior: 'smooth',
    })
  }

  const activeWin = wins[activeIdx] || wins[0]
  const domainTag = STRATEGIC_DOMAINS[activeWin.id]

  return (
    <section className="bg-[#FAF8F5] border-b border-[#E4DACB]">
      {/* ── Outer Pinned Showcase Track (Desktop: 320vh for smooth scroll-jacking) ── */}
      <div ref={containerRef} className="relative min-h-[100vh] lg:h-[320vh]">
        {/* Desktop Sticky Stage */}
        <div className="lg:sticky lg:top-[68px] lg:h-[calc(100vh-68px)] overflow-hidden flex flex-col justify-center py-10 lg:py-0">
          <div className="mx-auto max-w-[1280px] w-full px-5 sm:px-8 lg:px-12">
            
            {/* Split Screen Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* ── LEFT COLUMN: Executive Dashboard ────────────────────────── */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  {/* Eyebrow kicker */}
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#59110B]" />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7A5424]">
                      Collegiate Competitive Track
                    </span>
                  </div>

                  {/* Section Title */}
                  <h2 className="mt-2.5 font-serif text-[30px] sm:text-[38px] font-normal tracking-tight text-[#1C1917] leading-[1.12]">
                    National and Global Competitions
                  </h2>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-[#78716C] max-w-[46ch]">
                    Our analysts field high-performing teams for premier strategic valuation,
                    consulting, and M&amp;A championships across India and worldwide.
                  </p>

                  {/* Executive Milestone Mini-Strip */}
                  <div className="mt-6 grid grid-cols-3 divide-x divide-[#E4DACB] rounded-[10px] border border-[#E4DACB] bg-white p-3.5 shadow-xs">
                    <div className="px-3 text-center">
                      <p className="font-serif text-[24px] sm:text-[27px] font-normal leading-none text-[#59110B]">
                        <CountUpNumber target={8} suffix="" />
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#78716C]">
                        Podiums
                      </p>
                    </div>
                    <div className="px-3 text-center">
                      <p className="font-serif text-[24px] sm:text-[27px] font-normal leading-none text-[#59110B]">
                        <CountUpNumber target={1} suffix="" />
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#78716C]">
                        1st Place
                      </p>
                    </div>
                    <div className="px-3 text-center">
                      <p className="font-serif text-[24px] sm:text-[27px] font-normal leading-none text-[#59110B]">
                        <CountUpNumber target={1000} suffix="+" />
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#78716C]">
                        EY Field
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Progress Timeline (List of 8 Wins) */}
                <div className="mt-7 hidden lg:block">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E4DACB]/80 text-[11px] font-mono uppercase tracking-wider text-[#78716C]">
                    <span>Spotlight Directory</span>
                    <span>Win {String(activeIdx + 1).padStart(2, '0')} of {String(wins.length).padStart(2, '0')}</span>
                  </div>

                  <div className="mt-2.5 space-y-1">
                    {wins.map((item, idx) => {
                      const isActive = activeIdx === idx
                      return (
                        <button
                          key={item.id}
                          onClick={() => scrollToWin(idx)}
                          className={`group flex w-full items-center justify-between rounded-[6px] px-3 py-1.5 text-left text-[12.5px] transition-all duration-200 ${
                            isActive
                              ? 'bg-[#59110B] text-white font-medium shadow-xs'
                              : 'text-[#44403C] hover:bg-[#F4ECE1]/60 hover:text-[#1C1917]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span
                              className={`font-mono text-[10.5px] tabular-nums ${
                                isActive ? 'text-white/80' : 'text-[#A8A29E]'
                              }`}
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="truncate">{item.competition}</span>
                          </div>
                          <span
                            className={`shrink-0 font-mono text-[10px] uppercase tracking-wider ${
                              isActive ? 'text-[#F4ECE1]' : 'text-[#7A5424]'
                            }`}
                          >
                            {item.organizer.split('/')[0].trim()}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN: Minimalist Institutional Card Deck ────────── */}
              <div className="lg:col-span-7">
                <div className="relative min-h-[460px] sm:min-h-[490px] w-full flex flex-col justify-center">
                  
                  {/* Subtle ambient parchment backdrop card */}
                  <div className="relative w-full overflow-hidden rounded-[18px] border border-[#E4DACB] bg-white p-7 sm:p-10 shadow-[0_16px_36px_-12px_rgba(28,25,23,0.07)]">
                    
                    {/* Top subtle brass line */}
                    <div
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#B48344]/70 to-transparent"
                    />

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeWin.id}
                        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col justify-between min-h-[380px] sm:min-h-[400px]"
                      >
                        {/* Upper Section */}
                        <div>
                          {/* Row 1: Organizer & Verified Institutional Tag */}
                          <div className="flex items-center justify-between gap-3 border-b border-[#F4ECE1] pb-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#7A5424]">
                                {activeWin.organizer}
                              </span>
                            </div>
                            <span className="font-mono text-[11px] font-medium text-[#78716C] bg-[#FAF8F5] border border-[#E4DACB] px-2 py-0.5 rounded-[4px]">
                              {activeWin.year}
                            </span>
                          </div>

                          {/* Row 2: Competition Title */}
                          <h3 className="mt-4 font-serif text-[28px] sm:text-[34px] font-normal leading-[1.14] text-[#1C1917] tracking-tight">
                            {activeWin.competition}
                          </h3>

                          {/* Row 3: Verified Placement Stamp */}
                          <div className="mt-3.5 inline-flex items-center gap-2 rounded-[6px] border border-[#59110B]/20 bg-[#59110B]/5 px-3 py-1 text-[#59110B]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#59110B]" />
                            <span className="font-serif text-[13.5px] italic font-medium">
                              {activeWin.title}
                            </span>
                          </div>

                          {/* Row 4: Strategic Domain Tag */}
                          {domainTag && (
                            <div className="mt-3">
                              <span className="inline-block rounded-full bg-[#FAF8F5] border border-[#E4DACB] px-2.5 py-0.5 font-mono text-[10.5px] font-medium text-[#7A5424]">
                                {domainTag}
                              </span>
                            </div>
                          )}

                          {/* Row 5: Description & Visual Artifacts */}
                          {activeWin.id === 'ach-ey-cafta' ? (
                            <div className="mt-4">
                              <DotField />
                              <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#44403C]">
                                {activeWin.description}
                              </p>
                              <p className="mt-1.5 font-mono text-[11px] text-[#78716C]">
                                (Two dots represent IFSA NIT Trichy; out of 1,000+ collegiate teams nationwide.)
                              </p>
                            </div>
                          ) : (
                            <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-[#44403C]">
                              {activeWin.description}
                            </p>
                          )}
                        </div>

                        {/* Lower Section: Verified Credential & Step Controls */}
                        <div className="mt-8 border-t border-[#F4ECE1] pt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[11.5px] font-mono text-[#78716C]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#59110B]" />
                            <span>Verified Podium Finish</span>
                          </div>

                          {/* Quick Card Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => scrollToWin(Math.max(0, activeIdx - 1))}
                              disabled={activeIdx === 0}
                              aria-label="Previous win"
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4DACB] bg-white text-[#44403C] transition-all hover:border-[#59110B] hover:text-[#59110B] disabled:opacity-30 disabled:pointer-events-none shadow-2xs"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => scrollToWin(Math.min(wins.length - 1, activeIdx + 1))}
                              disabled={activeIdx >= wins.length - 1}
                              aria-label="Next win"
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E4DACB] bg-white text-[#44403C] transition-all hover:border-[#59110B] hover:text-[#59110B] disabled:opacity-30 disabled:pointer-events-none shadow-2xs"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Mobile Win Selector Pills (< 1024px) */}
                  <div className="mt-5 lg:hidden overflow-x-auto pb-1 flex items-center gap-1.5 no-scrollbar">
                    {wins.map((w, i) => (
                      <button
                        key={w.id}
                        onClick={() => setActiveIdx(i)}
                        className={`shrink-0 rounded-full px-3 py-1 text-[11.5px] font-mono transition-all ${
                          activeIdx === i
                            ? 'bg-[#59110B] text-white font-medium'
                            : 'border border-[#E4DACB] bg-white text-[#44403C]'
                        }`}
                      >
                        {w.competition.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
