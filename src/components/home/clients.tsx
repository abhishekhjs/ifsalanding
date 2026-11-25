'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SidewaysWordReveal } from '@/components/animata/text/sideways-word-reveal'
import { CardReveal } from '@/components/animata/container/card-reveal'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  useMotionValueEvent,
  type PanInfo,
  type MotionValue,
} from 'motion/react'

interface ClientMandate {
  num: string
  id: string
  name: string
  badge: 'LIVE' | 'COMPLETED'
  category: 'fintech' | 'climate' | 'venture'
  domain: string
  scope: string
  logo: string
}

const CLIENT_MANDATES: ClientMandate[] = [
  {
    num: '01',
    id: 'varicash',
    name: 'Varicash',
    badge: 'LIVE',
    category: 'fintech',
    domain: 'FINTECH & LENDING',
    scope: 'Loan Against Mutual Funds (LAMF) Rails',
    logo: '/varicash-logo.png',
  },
  {
    num: '02',
    id: 'climate-b',
    name: 'Climate B Venture',
    badge: 'LIVE',
    category: 'climate',
    domain: 'CLIMATE & ESG ANALYTICS',
    scope: 'Physical & Transition Risk Modeling',
    logo: '/climate-b-logo.png',
  },
  {
    num: '03',
    id: 'mymfd',
    name: 'myMFD',
    badge: 'LIVE',
    category: 'fintech',
    domain: 'WEALTHTECH & SAAS',
    scope: 'Digital Operating System for MFDs',
    logo: '/mymfd-logo.png',
  },
  {
    num: '04',
    id: 'carbon6',
    name: 'Carbon6',
    badge: 'COMPLETED',
    category: 'climate',
    domain: 'CLIMATE FINANCE & ESG',
    scope: 'EU ETS vs. India PAT Framework',
    logo: '/carbon6-framed.png',
  },
  {
    num: '05',
    id: 'spotlight',
    name: 'Spotlight Partners',
    badge: 'COMPLETED',
    category: 'venture',
    domain: 'VENTURE CAPITAL & VALUATION',
    scope: 'Startup Valuation & LTV/CAC Cohorts',
    logo: '/spotlight-framed.png',
  },
  {
    num: '06',
    id: 'venturewolf',
    name: 'VentureWolf',
    badge: 'COMPLETED',
    category: 'venture',
    domain: 'CORPORATE DEBT ADVISORY',
    scope: 'MSME Hybrid Debt & Mezzanine Rails',
    logo: '/venturewolf-framed.png',
  },
  {
    num: '07',
    id: 'infisum',
    name: 'Infisum Inc.',
    badge: 'COMPLETED',
    category: 'venture',
    domain: 'INTERNATIONAL TAX & POLICY',
    scope: 'UAE Corporate & R&D Tax Credit Rails',
    logo: '/infisum-framed.png',
  },
  {
    num: '08',
    id: 'cosmo',
    name: 'Cosmo Health',
    badge: 'COMPLETED',
    category: 'venture',
    domain: 'CARE INTELLIGENCE',
    scope: 'Digital Health TAM & Unit Economics',
    logo: '/cosmo-framed.png',
  },
  {
    num: '09',
    id: 'fundcapita',
    name: 'FundCapita',
    badge: 'COMPLETED',
    category: 'fintech',
    domain: 'FINTECH SYNDICATION',
    scope: 'Early-Stage Venture Platform GTM',
    logo: '/fundcapita-framed.png',
  },
]

interface CarouselItemProps {
  index: number
  item: ClientMandate
  rotation: MotionValue<number>
  spacing: number
  totalArc: number
  radius: number
  isMobile: boolean
  onSelect: (angle: number) => void
}

function CarouselCard({
  index,
  item,
  rotation,
  spacing,
  totalArc,
  radius,
  isMobile,
  onSelect,
}: CarouselItemProps) {
  const rawAngle = useTransform(rotation, (r) => index * spacing + r)
  const adjustedAngle = useTransform(rawAngle, (angle) => {
    let wrapped = angle % totalArc
    if (wrapped > totalArc / 2) wrapped -= totalArc
    if (wrapped < -totalArc / 2) wrapped += totalArc
    return wrapped
  })

  // Visibility and fade buffers — widened so cards remain fully visible without edge cut-off
  const opacity = useTransform(adjustedAngle, (angle) => {
    const abs = Math.abs(angle)
    const cutOff = isMobile ? 38 : 52
    if (abs > cutOff) return 0
    if (abs > cutOff - 8) return (cutOff - abs) / 8
    return 1
  })

  const zIndex = useTransform(adjustedAngle, (val) => Math.round(1000 - Math.abs(val) * 10))

  const scale = useTransform(adjustedAngle, (angle) => {
    const abs = Math.abs(angle)
    return Math.max(0.86, 1 - (abs / 50) * 0.14)
  })

  // Dynamic cross-fade between active elevated midnight card and inactive paper dossier
  const activeOpacity = useTransform(
    adjustedAngle,
    [-spacing * 0.55, 0, spacing * 0.55],
    [0, 1, 0]
  )
  const inactiveOpacity = useTransform(
    adjustedAngle,
    [-spacing * 0.55, 0, spacing * 0.55],
    [1, 0, 1]
  )

  const startX = useRef(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
  }

  const handleClickCapture = (e: React.MouseEvent) => {
    const dist = Math.abs(e.clientX - startX.current)
    if (dist > 6) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    const angle = adjustedAngle.get()
    onSelect(angle)
  }

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '46%',
        x: '-50%',
        y: '-50%',
        rotate: adjustedAngle,
        transformOrigin: `center ${radius}px`,
        opacity,
        zIndex,
        scale,
        willChange: 'transform, opacity',
      }}
      className="w-[260px] sm:w-[305px] h-[345px] sm:h-[390px]"
    >
      <div
        onPointerDown={handlePointerDown}
        onClickCapture={handleClickCapture}
        className="relative w-full h-full select-none cursor-pointer rounded-[20px] overflow-hidden"
        style={{ touchAction: 'none' }}
      >
        {/* Layer 1: Inactive White Paper Dossier */}
        <motion.div
          style={{ opacity: inactiveOpacity }}
          className="absolute inset-0 bg-white text-[#111418] border border-[#111418]/25 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#111418]/50 transition-colors p-6 sm:p-7 flex flex-col justify-between rounded-[20px]"
        >
          {/* Top Row: domain and badge */}
          <div className="flex items-center justify-between text-[10px] sm:text-[10.5px] font-mono tracking-wider uppercase w-full">
            <span className="text-[#7A746C] font-semibold truncate max-w-[145px]">
              {item.domain}
            </span>
            {item.badge === 'LIVE' ? (
              <span className="inline-flex items-center gap-1 font-bold text-[#FF5252]">
                <span className="h-1 w-1 rounded-full bg-[#FF5252]" />
                LIVE
              </span>
            ) : (
              <span className="text-[#8A847C]">COMPLETED</span>
            )}
          </div>

          {/* Middle Section: Centered & Middle-Aligned */}
          <div className="flex-1 my-auto flex flex-col items-center justify-center text-center py-2 w-full">
            {/* Clean Company Logo Stage: Centered & Middle-Aligned */}
            <div className="relative mb-3.5 sm:mb-4 h-12 sm:h-14 w-full px-3 py-1.5 bg-[#FAF7F0] rounded-[10px] border border-[#E6DFD3] flex items-center justify-center">
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={140}
                height={44}
                className="max-h-full max-w-[135px] sm:max-w-[150px] w-auto h-auto object-contain"
              />
            </div>

            <h3 className="font-serif font-bold text-[20px] sm:text-[23px] text-[#111418] tracking-tight leading-tight text-center">
              {item.name}
            </h3>
            <p className="font-sans text-[11px] sm:text-[12px] text-[#666055] mt-1.5 leading-relaxed line-clamp-2 text-center max-w-[240px]">
              {item.scope}
            </p>
          </div>

          {/* Bottom Row: Centered Number Watermark */}
          <div className="pt-2 flex items-center justify-center w-full">
            <span className="font-serif font-black text-[44px] sm:text-[54px] leading-none text-[#E8E2D6] select-none block text-center">
              {item.num}
            </span>
          </div>
        </motion.div>

        {/* Layer 2: Active Elevated Midnight Card */}
        <motion.div
          style={{ opacity: activeOpacity }}
          className="absolute inset-0 bg-[#111418] text-[#FAF7F0] border border-[#111418] shadow-[0_22px_55px_rgba(0,0,0,0.4)] ring-1 ring-black/10 p-6 sm:p-7 flex flex-col justify-between rounded-[20px]"
        >
          {/* Top Row: domain and badge */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider uppercase w-full">
            <span className="text-[#A5A196] font-semibold">{item.domain}</span>
            {item.badge === 'LIVE' ? (
              <span className="inline-flex items-center gap-1.5 font-bold text-[#FF5252]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF5252] animate-pulse" />
                LIVE
              </span>
            ) : (
              <span className="text-[#A5A196]">COMPLETED</span>
            )}
          </div>

          {/* Middle Section: Centered & Middle-Aligned */}
          <div className="flex-1 my-auto flex flex-col items-center justify-center text-center py-2 w-full">
            {/* High-Contrast Clean Logo Stage: Centered & Middle-Aligned */}
            <div className="relative mb-3.5 sm:mb-4 h-12 sm:h-14 w-full px-3 py-1.5 bg-white rounded-[10px] border border-white/20 shadow-sm flex items-center justify-center">
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={140}
                height={44}
                className="max-h-full max-w-[135px] sm:max-w-[150px] w-auto h-auto object-contain"
              />
            </div>

            <h3 className="font-serif font-black text-[23px] sm:text-[27px] text-[#FAF7F0] tracking-tight leading-tight text-center">
              {item.name}
            </h3>
            <p className="font-sans text-[11.5px] sm:text-[12.5px] text-[#C5C0B6] mt-1.5 leading-relaxed line-clamp-2 text-center max-w-[240px]">
              {item.scope}
            </p>
          </div>

          {/* Bottom Row: Centered View Details CTA */}
          <div className="pt-2 w-full">
            <Link
              href="/clients"
              className="group w-full py-3 sm:py-3.5 px-5 bg-[#CBA258] hover:bg-[#D4AC5F] active:bg-[#C0964D] text-[#111418] font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.12em] uppercase rounded-[10px] flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.99]"
            >
              <span>View Details</span>
              <span className="text-[15px] font-bold transition-transform duration-200 group-hover:translate-x-1.5">
                &rarr;
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function HomeClients() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const [cursor, setCursor] = useState<'grab' | 'grabbing'>('grab')
  const isDragging = useRef(false)
  const isHoveredRef = useRef(false)
  const wheelLockRef = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Framer Arc Carousel Parameters
  const spacing = isMobile ? 12 : 10
  const radius = isMobile ? 850 : 1150

  // Loop Construction (matching Framer template)
  const MIN_DEGREES = 240
  const filledItems = useMemo(() => {
    const list: ClientMandate[] = []
    while (list.length * spacing < MIN_DEGREES * 2.2) {
      list.push(...CLIENT_MANDATES)
    }
    if (list.length === CLIENT_MANDATES.length) {
      list.push(...CLIENT_MANDATES)
    }
    return list
  }, [spacing])

  const totalArc = filledItems.length * spacing

  // Motion System
  const rotation = useMotionValue(0)
  const smoothRotation = useSpring(rotation, { stiffness: 160, damping: 28, mass: 0.9 })

  // Listen to rotation changes to sync active index for bottom dots
  useMotionValueEvent(rotation, 'change', (latest) => {
    const stepIndex = Math.round(-latest / spacing)
    const normalized =
      ((stepIndex % CLIENT_MANDATES.length) + CLIENT_MANDATES.length) % CLIENT_MANDATES.length
    setActiveIndex(normalized)
  })

  // Window resize check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Pan / Drag handlers
  const onPanStart = () => {
    isDragging.current = true
    setCursor('grabbing')
    rotation.stop()
  }

  const onPan = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const sensitivity = isMobile ? 8 : 11
    const deltaAngle = info.delta.x / sensitivity
    rotation.set(rotation.get() + deltaAngle)
  }

  const onPanEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false
    setCursor('grab')
    const velocity = info.velocity.x
    const currentRot = rotation.get()
    const velocityAngle = velocity / 120
    const predicted = currentRot + velocityAngle * 0.28
    const targetIndex = Math.round(predicted / spacing)
    const snapRotation = targetIndex * spacing

    animate(rotation, snapRotation, {
      type: 'spring',
      stiffness: 85,
      damping: 22,
      mass: 1,
    })
  }

  // Snap to card clicked
  const handleSelectCard = useCallback(
    (cardAngle: number) => {
      if (Math.abs(cardAngle) < 1.5) return
      const currentRot = rotation.get()
      const targetRot = Math.round((currentRot - cardAngle) / spacing) * spacing
      animate(rotation, targetRot, {
        type: 'spring',
        stiffness: 90,
        damping: 22,
        mass: 1,
      })
    },
    [rotation, spacing]
  )

  // Step Next / Prev
  const handleStep = useCallback(
    (direction: number) => {
      const currentRot = rotation.get()
      const targetIndex = Math.round(currentRot / spacing) - direction
      const targetRot = targetIndex * spacing
      animate(rotation, targetRot, {
        type: 'spring',
        stiffness: 90,
        damping: 22,
        mass: 1,
      })
    },
    [rotation, spacing]
  )

  // Dot Click Navigation (shortest path on circular track)
  const handleDotClick = useCallback(
    (targetIdx: number) => {
      const total = CLIENT_MANDATES.length
      if (total === 0) return
      const currentRot = rotation.get()
      const currentStep = Math.round(-currentRot / spacing)
      const currentNorm = ((currentStep % total) + total) % total
      let diff = targetIdx - currentNorm
      if (diff > total / 2) diff -= total
      if (diff < -total / 2) diff += total
      const targetStep = currentStep + diff
      const targetRot = -targetStep * spacing

      animate(rotation, targetRot, {
        type: 'spring',
        stiffness: 90,
        damping: 22,
        mass: 1,
      })
    },
    [rotation, spacing]
  )

  // Wheel Flip (horizontal & vertical)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
        if (wheelLockRef.current) return
        wheelLockRef.current = true
        const dir = e.deltaY > 0 || e.deltaX > 0 ? 1 : -1
        handleStep(dir)
        setTimeout(() => {
          wheelLockRef.current = false
        }, 280)
      }
    },
    [handleStep]
  )

  // Intersection Observer for viewport visibility
  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.15 }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Automatic Card Change with Delay (Autoplay)
  useEffect(() => {
    if (!isInView || CLIENT_MANDATES.length <= 1) return

    const AUTOPLAY_DELAY_MS = 3800

    const timer = setInterval(() => {
      if (isHoveredRef.current || isDragging.current || document.hidden) return
      handleStep(1)
    }, AUTOPLAY_DELAY_MS)

    return () => clearInterval(timer)
  }, [handleStep, isInView])

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleStep(1)
      if (e.key === 'ArrowLeft') handleStep(-1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleStep])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAF7F0] text-[#111418] py-20 sm:py-28 border-b border-[#111418]/15"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header Block */}
        <div className="max-w-3xl">
          <SidewaysWordReveal
            lines={['Trusted by', 'High-Growth Ventures', '& Industry Leaders']}
            className="font-serif font-black tracking-[-0.03em] text-[#111418] leading-[0.94] text-[42px] sm:text-[56px] md:text-[68px]"
            accentBarClassName="h-[4px] w-20 bg-[#CBA258] mt-5 mb-5"
          />

          {/* Subtitle */}
          <p className="font-sans text-[14px] sm:text-[15.5px] leading-relaxed text-[#555048] max-w-2xl">
            Our analysts execute active credit modeling, climate analytics, and digital operating
            architecture alongside delivered institutional corporate mandates.
          </p>
        </div>

        {/* Framer Arc Carousel Stage — bottom clipped cleanly, sides completely visible */}
        <CardReveal threshold={0.12} index={0}>
          <div
            onWheel={handleWheel}
            onMouseEnter={() => {
              isHoveredRef.current = true
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false
            }}
            style={{
              perspective: '1200px',
              clipPath: 'inset(-300px -100vw 0px -100vw)',
            }}
            className="relative h-[430px] sm:h-[480px] w-full overflow-visible mt-8 sm:mt-12 select-none flex items-center justify-center outline-none"
          >
            <motion.div
              style={{ cursor }}
              onPanStart={onPanStart}
              onPan={onPan}
              onPanEnd={onPanEnd}
              className="relative w-full h-full flex items-center justify-center touch-none pointer-events-auto overflow-visible"
            >
              {filledItems.map((item, index) => (
                <CarouselCard
                  key={`${item.id}-${index}`}
                  index={index}
                  item={item}
                  rotation={smoothRotation}
                  spacing={spacing}
                  totalArc={totalArc}
                  radius={radius}
                  isMobile={isMobile}
                  onSelect={handleSelectCard}
                />
              ))}
            </motion.div>
          </div>
        </CardReveal>

        {/* Bottom Pagination Dots */}
        <div className="mt-6 pt-6 border-t border-[#111418]/15 flex items-center justify-center">
          <div className="flex items-center gap-1.5">
            {CLIENT_MANDATES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-6 bg-[#111418]'
                    : 'w-1.5 bg-[#111418]/25 hover:bg-[#111418]/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
