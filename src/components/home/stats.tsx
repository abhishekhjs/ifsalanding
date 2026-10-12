'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SESSION_SLIDES = [
  {
    image: '/ifsa-sess-1.jpg',
    alt: 'IFSA Session 1',
  },
  {
    image: '/ifsa-sess-2.jpg',
    alt: 'IFSA Session 2',
  },
  {
    image: '/ifsa-sess-3.jpg',
    alt: 'IFSA Session 3',
  },
]

export function HomeStats() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Automatic slideshow cycle every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SESSION_SLIDES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused])

  const stats = [
    {
      value: '12+',
      label: 'National & Global Podiums',
      desc: 'EY CAFTA (Top 2 of 1000+ teams), IIT Madras FinVent (1st), IIM-A Impetus, HEC Paris',
    },
    {
      value: '9',
      label: 'Client Advisory Mandates',
      desc: '3 active live mandates (Varicash, Climate B, myMFD) and 6 completed institutional case studies',
    },
    {
      value: '₹17L+',
      label: 'Prize Pools & Grants',
      desc: 'Awarded across IFSC 2026 Summit and premier inter-collegiate championships',
    },
    {
      value: '150+',
      label: 'Forum & Summit Delegates',
      desc: 'Delegates in the first premier finance summit hosted on-campus at NIT Trichy',
    },
  ]

  return (
    <section className="border-b border-[#E4DACB] bg-[#FAF8F5] py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 pb-4 border-b border-[#E4DACB]">
          <h2 className="font-serif text-[28px] font-normal text-[#1C1917] sm:text-[34px]">
            Proven Track Record Across Year One
          </h2>
        </div>

        {/* Cinematic Stripe Sessions Style Keynote Banner with Automatic Slideshow */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="group/banner relative overflow-hidden rounded-[20px] sm:rounded-[26px] border border-[#2A231E]/30 bg-[#0B0F19] text-white shadow-[0_20px_50px_-15px_rgba(28,25,23,0.35)]"
        >
          <div className="relative aspect-[21/9] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] w-full">
            {/* Slideshow background layers */}
            {SESSION_SLIDES.map((slide, idx) => (
              <div
                key={slide.image}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeSlide === idx ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center transition-transform duration-7000 ease-out group-hover/banner:scale-105"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            ))}

            {/* Left Vignette & Gradient Overlays for optimal typography legibility across any slide */}
            <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-r from-black/85 via-black/50 to-transparent sm:w-3/5" />
            <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

            {/* Content Stage */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 lg:p-12">
              {/* Top Slide Indicators */}
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {SESSION_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Switch to session slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeSlide === idx
                          ? 'w-6 bg-white'
                          : 'w-2 bg-white/40 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Main Headline & Pill CTA Button */}
              <div className="max-w-[620px] my-auto pt-2 sm:pt-0">
                <h3 className="font-sans text-[28px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                  Building the quantitative infrastructure for high finance
                </h3>

                <div className="mt-6 sm:mt-7 flex items-center gap-3">
                  <Link
                    href="/events"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] font-semibold text-[#0B0F19] shadow-lg transition-all duration-200 hover:bg-stone-100 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Explore events</span>
                    <span className="text-[#59110B] transition-transform duration-200 group-hover:translate-x-0.5">›</span>
                  </Link>
                </div>
              </div>

              {/* Bottom Row: Corner badge */}
              <div className="flex items-end justify-end">
                <div className="ml-auto flex items-center gap-1.5 text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  <span className="font-bold tracking-tight text-[18px] sm:text-[22px] lowercase font-sans">
                    ifsa <span className="font-light text-white/80">sessions</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coordinated 4 Stat Cards Grid (Option B) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const isHovered = hoveredIdx === idx
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group relative flex flex-col justify-between rounded-[12px] border p-6 sm:p-7 transition-all duration-200 ${
                  isHovered
                    ? 'border-[#59110B] bg-white shadow-[0_16px_32px_-6px_rgba(89,17,11,0.12)] -translate-y-1.5'
                    : 'border-[#E4DACB] bg-white shadow-xs'
                }`}
              >
                <div>
                  <p className="font-serif text-[42px] sm:text-[46px] leading-none font-normal text-[#59110B] tabular-nums tracking-tight">
                    {stat.value}
                  </p>

                  <h4 className="mt-3.5 font-serif text-[16px] font-normal text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                    {stat.label}
                  </h4>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-[#57534E] border-t border-[#F4ECE1] pt-3.5">
                  {stat.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
