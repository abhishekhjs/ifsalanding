'use client'

import { useState } from 'react'
import SwapText from '@/components/animata/text/swap-text'

// Competition & research disciplines swap to partner/client names on hover
const MARQUEE_PAIRS = [
  { discipline: 'MARKET ANALYSIS', company: 'WALL STREET OASIS' },
  { discipline: 'EQUITY RESEARCH', company: 'VARICASH' },
  { discipline: 'FINANCIAL MODELING', company: 'CLIMATE B VENTURE' },
  { discipline: 'MACRO ANALYSIS', company: 'MYMFD' },
  { discipline: 'VENTURE ADVISORY', company: 'CARBON6' },
  { discipline: 'CORPORATE VALUATION', company: 'SPOTLIGHT PARTNERS' },
  { discipline: 'QUANTITATIVE STRATEGIES', company: 'VENTUREWOLF' },
  { discipline: 'DERIVATIVES & MARKETS', company: 'INFISUM INC.' },
  { discipline: 'CREDIT & DEBT RAILS', company: 'FUNDCAPITA' },
  { discipline: 'HEALTHCARE M&A', company: 'COSMO HEALTH' },
]

export function HomeMarquee() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // 4x repetition ensures completely seamless infinite loop on any screen width up to 4K
  const items = [...MARQUEE_PAIRS, ...MARQUEE_PAIRS, ...MARQUEE_PAIRS, ...MARQUEE_PAIRS]

  return (
    <div
      className="relative overflow-hidden select-none border-b border-[#111418] bg-[#0B0F13]"
      aria-hidden="true"
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {/* Continuously rolling text that does NOT pause on hover */}
      <div className="flex w-max items-center gap-8 py-3.5 will-change-transform animate-[marquee-left_36s_linear_infinite]">
        {items.map((item, idx) => {
          const isTriggered = hoveredIdx !== null
          // Bidirectional distance from hovered item: radiates outward symmetrically in both directions
          const directDist = hoveredIdx !== null ? Math.abs(idx - hoveredIdx) : 0
          const distance = hoveredIdx !== null
            ? Math.min(directDist, items.length - directDist)
            : 0
          // Sequential cascade in both directions: hovered item swaps first (0ms), radiating outward by 150ms per step
          const delayMs = isTriggered ? distance * 150 : 0

          return (
            <div
              key={idx}
              className="flex items-center gap-8 shrink-0 cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onClick={() => setHoveredIdx((prev) => (prev === idx ? null : idx))}
            >
              <SwapText
                initialText={item.discipline}
                finalText={item.company}
                durationMs={600}
                delayMs={delayMs}
                swapped={isTriggered}
                className="inline-block"
                textClassName="font-serif font-black text-[18px] sm:text-[22px] tracking-wide uppercase leading-none not-italic"
                initialTextClassName="text-[#FAF7F0]"
                finalTextClassName="text-[#CBA258]"
              />
              <span className="text-[#CBA258] text-[12px] leading-none">✦</span>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee-left_36s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
