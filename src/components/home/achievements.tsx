'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion, animate, useInView } from 'motion/react'
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

/* ── Dot field (EY CAFTA) ────────────────────────────────────────────────── */
const TOTAL_DOTS = 1050
const WINNER_INDICES = new Set([412, 789])

function DotField() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className="mt-5 flex flex-wrap gap-[3px]" aria-hidden>
      {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
        const isWinner = WINNER_INDICES.has(i)
        const delay = reduce ? 0 : Math.min(i * 0.22, 550)
        return (
          <span
            key={i}
            className={[
              'inline-block h-[5px] w-[5px] rounded-full',
              reduce
                ? isWinner ? 'bg-[#59110B]' : 'bg-[#D9C8B6]'
                : isInView
                  ? isWinner
                    ? 'bg-[#59110B] scale-[1.7] shadow-[0_0_5px_2px_rgba(89,17,11,0.55)]'
                    : 'bg-[#D4C5B2]'
                  : 'bg-[#ECE4D9]',
              !reduce && 'transition-all duration-500',
            ].filter(Boolean).join(' ')}
            style={!reduce ? { transitionDelay: `${delay}ms` } : undefined}
          />
        )
      })}
    </div>
  )
}

/* ── Count-up number (Motion animate, not rAF on state) ─────────────────── */
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

/* ── Stat strip ─────────────────────────────────────────────────────────── */
const STATS = [
  { value: 8, suffix: '', label: 'Podium finishes' },
  { value: 1, suffix: '', label: 'National title' },
  { value: 3, suffix: '', label: 'Runner-up finishes' },
  { value: 1, suffix: '', label: 'Global finalist' },
  { value: 5, suffix: '+', label: 'IIT and IIM hosts' },
  { value: 1000, suffix: '+', label: 'Teams beaten at EY' },
]

function StatStrip() {
  return (
    <div className="mt-10 grid grid-cols-3 divide-x divide-y divide-[#E4DACB] overflow-hidden rounded-[10px] border border-[#E4DACB] bg-white md:grid-cols-6 md:divide-y-0">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col items-center justify-center px-4 py-6">
          <p className="font-serif text-[30px] leading-none text-[#59110B]">
            <CountUpNumber target={s.value} suffix={s.suffix} />
          </p>
          <p className="mt-1.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-[#78716C]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}


/* ── Tier badge ─────────────────────────────────────────────────────────── */
function TierBadge({ tier }: { tier: string }) {
  const base = 'inline-block rounded-[4px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]'
  if (tier === 'Winner') return <span className={`${base} bg-[#59110B] text-white`}>Winner</span>
  if (tier === 'Runner-Up') return <span className={`${base} border border-[#BFAFA0] bg-white text-[#59110B]`}>Runner-Up</span>
  if (tier === 'Finalist') return <span className={`${base} border border-[#D9C8B6] bg-[#FAF8F5] text-[#7A5424]`}>Finalist</span>
  return <span className={`${base} border border-[#E4DACB] bg-[#FAF8F5] text-[#78716C]`}>Top Podium</span>
}

/* ── Small card (6 secondary wins) ─────────────────────────────────────── */
function AchievementCard({ ach }: { ach: Achievement }) {
  return (
    <div className="group flex flex-col justify-between rounded-[8px] border border-[#E4DACB] bg-white p-5 shadow-[var(--shadow-rest)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BFAFA0] hover:shadow-[var(--shadow-hover)]">
      <div>
        <div className="flex items-center justify-between gap-2">
          <TierBadge tier={ach.tier} />
          <span className="shrink-0 text-[11px] font-medium text-[#78716C]">{ach.year}</span>
        </div>
        <h3 className="mt-3.5 font-serif text-[16px] font-normal leading-snug text-[#1C1917] transition-colors group-hover:text-[#59110B]">
          {ach.competition}
        </h3>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#7A5424]">
          {ach.organizer}
        </p>
        <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#44403C]">{ach.description}</p>
      </div>
      <div className="mt-4 border-t border-[#F4ECE1] pt-3">
        <span className="font-serif text-[12.5px] italic text-[#59110B]">{ach.title}</span>
      </div>
    </div>
  )
}

/* ── Filtered grid (non-All views) ─────────────────────────────────────── */
function FilteredGrid({ items }: { items: Achievement[] }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((ach) => (
        <AchievementCard key={ach.id} ach={ach} />
      ))}
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────────────── */
export function HomeAchievements() {
  const [activeTier, setActiveTier] = useState('All')
  const TIERS = ['All', 'Winners', 'Runner-Ups', 'Finalists']

  const filtered = FALLBACK_ACHIEVEMENTS.filter((a) => {
    if (activeTier === 'All') return true
    if (activeTier === 'Winners') return a.tier === 'Winner'
    if (activeTier === 'Runner-Ups') return a.tier === 'Runner-Up'
    if (activeTier === 'Finalists') return a.tier === 'Finalist' || a.tier === 'Top Podium'
    return true
  })

  const finvent = FALLBACK_ACHIEVEMENTS.find(a => a.id === 'ach-finvent')
  const cafta = FALLBACK_ACHIEVEMENTS.find(a => a.id === 'ach-ey-cafta')
  const rest = FALLBACK_ACHIEVEMENTS.filter(a => a.id !== 'ach-finvent' && a.id !== 'ach-ey-cafta')

  return (
    <section className="border-b border-[#E4DACB] bg-[#FAF8F5] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#E4DACB] pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-[32px] font-normal tracking-tight text-[#1C1917] sm:text-[40px]">
              National and Global Competitions
            </h2>
            <p className="mt-2 max-w-[60ch] text-[15px] text-[#78716C]">
              Our analysts compete and secure podium finishes at premier strategy, valuation, and M&amp;A championships across India and globally.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {TIERS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTier(t)}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${activeTier === t
                    ? 'bg-[#59110B] text-white'
                    : 'border border-[#E4DACB] bg-white text-[#44403C] hover:border-[#59110B] hover:text-[#59110B]'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Stat strip */}
        <StatStrip />

        {activeTier === 'All' ? (
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">

            {/* FinVent - winner hero tile */}
            {finvent && (
              <div className="group relative col-span-1 overflow-hidden rounded-[12px] bg-[#400A06] p-8 lg:col-span-6">
                {/* Subtle radial highlight - not gradient slop, just a glow at top-right */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'radial-gradient(circle at 85% 10%, rgba(180,131,68,0.18) 0%, transparent 55%)' }}
                />
                {/* Thin brass rule at top */}
                <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#B48344] to-transparent opacity-60" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <TierBadge tier="Winner" />
                    <h3 className="mt-6 font-serif text-[30px] font-normal leading-tight text-white sm:text-[34px]">
                      {finvent.competition}
                    </h3>
                    <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#C09A58]">
                      {finvent.organizer}
                    </p>
                    <p className="mt-5 max-w-[50ch] text-[14px] leading-relaxed text-white/65">
                      {finvent.description}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-serif text-[13px] italic text-[#C09A58]">{finvent.title}</span>
                    <span className="text-[11px] font-medium text-white/30">{finvent.year}</span>
                  </div>
                </div>
              </div>
            )}

            {/* EY CAFTA - dot field tile */}
            {cafta && (
              <div className="group col-span-1 overflow-hidden rounded-[12px] border border-[#E4DACB] bg-white p-7 lg:col-span-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <TierBadge tier={cafta.tier} />
                    <h3 className="mt-4 font-serif text-[22px] font-normal leading-snug text-[#1C1917] transition-colors group-hover:text-[#59110B] sm:text-[24px]">
                      {cafta.competition}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#7A5424]">
                      {cafta.organizer}
                    </p>
                  </div>
                  <span className="shrink-0 text-[12px] font-medium text-[#78716C]">{cafta.year}</span>
                </div>

                <DotField />

                <p className="mt-5 text-[13px] leading-relaxed text-[#44403C]">
                  Two of those dots are us. Out of 1,000+ collegiate teams across India, we placed second.
                </p>
              </div>
            )}

            {/* Secondary wins - 4 tiles at 3/12 col each */}
            {rest.map((ach) => (
              <div key={ach.id} className="col-span-1 lg:col-span-3">
                <AchievementCard ach={ach} />
              </div>
            ))}
          </div>
        ) : (
          <FilteredGrid items={filtered} />
        )}

      </div>
    </section>
  )
}
