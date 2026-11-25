'use client'

import { cn } from '@/lib/utils'
import { CardReveal } from '@/components/animata/container/card-reveal'

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  watermark: string
  index?: number
}

function BentoCard({ children, className, watermark, index = 0 }: BentoCardProps) {
  return (
    <CardReveal index={index} threshold={0.12} className={className}>
      <div
        className={cn(
          'group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-white/20 bg-[#FAF7F0] text-[#111418] p-6 sm:p-7 shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#CBA258] min-h-[170px] h-full',
        )}
      >
        {/* Subtle warm ambient highlight on hover */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#CBA258]/10 blur-2xl transition-all duration-300 group-hover:bg-[#CBA258]/25" />

        {/* Main Card Content */}
        <div className="relative z-10">{children}</div>

        {/* Institutional Short-Form Watermark (Bottom Right Corner Area) */}
        <div className="pointer-events-none absolute bottom-3 right-4 sm:bottom-4 sm:right-6 select-none z-0">
          <span className="font-serif font-black text-[50px] sm:text-[64px] tracking-tight text-[#111418]/15 leading-none transition-colors duration-300 group-hover:text-[#111418]/25">
            {watermark}
          </span>
        </div>
      </div>
    </CardReveal>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW 1: [1 Col: Prameya] [2 Col Hero: EY CAFTA] [1 Col: Impetus]
// ─────────────────────────────────────────────────────────────────────────────

// 1. Prameya 2025 - IIM Ahmedabad (1 Col)
function CardPrameya({ index }: { index?: number }) {
  return (
    <BentoCard watermark="IIMA" index={index}>
      <h4 className="font-serif text-[22px] sm:text-[24px] font-bold leading-tight tracking-tight text-[#111418]">
        Prameya 2025
      </h4>

      <p className="mt-2 font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#A67C24]">
        National Finalist
      </p>
    </BentoCard>
  )
}

// 2. EY CAFTA 2025 - Ernst & Young (2 Col Hero)
function CardEyCafta({ index }: { index?: number }) {
  return (
    <BentoCard className="sm:col-span-2" watermark="EY" index={index}>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <h4 className="font-serif text-[24px] sm:text-[28px] font-bold leading-tight tracking-tight text-[#111418]">
          EY CAFTA Case Championship
        </h4>
        <span className="font-serif text-[26px] sm:text-[30px] font-black text-[#A67C24] leading-none">
          Top 2
        </span>
      </div>

      <p className="mt-2 font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#A67C24]">
        Ranked 2nd Nationwide (out of 1,000+ teams)
      </p>
    </BentoCard>
  )
}

// 3. Impetus 2025 - IIM Ahmedabad (1 Col)
function CardImpetus({ index }: { index?: number }) {
  return (
    <BentoCard watermark="IIMA" index={index}>
      <h4 className="font-serif text-[22px] sm:text-[24px] font-bold leading-tight tracking-tight text-[#111418]">
        Impetus Strategy
      </h4>

      <p className="mt-2 font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#A67C24]">
        First Runner-Up
      </p>
    </BentoCard>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW 2: [2 Col Hero: FinVent 1st] [2 Col Hero: Global Case Simulation]
// ─────────────────────────────────────────────────────────────────────────────

// 4. FinVent 2025 - IIT Madras (2 Col Hero)
function CardFinvent({ index }: { index?: number }) {
  return (
    <BentoCard className="sm:col-span-2" watermark="IITM" index={index}>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <h4 className="font-serif text-[24px] sm:text-[28px] font-bold leading-tight tracking-tight text-[#111418]">
          FinVent 2025 Championship
        </h4>
        <span className="font-serif text-[26px] sm:text-[30px] font-black text-[#A67C24] leading-none">
          1st Place
        </span>
      </div>

      <p className="mt-2 font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#A67C24]">
        National Winner · Premier Inter-Collegiate
      </p>
    </BentoCard>
  )
}

// 5. HEC Paris Business Game - International Finalist (2 Col Hero)
function CardHecParis({ index }: { index?: number }) {
  return (
    <BentoCard className="sm:col-span-2" watermark="HEC" index={index}>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <h4 className="font-serif text-[24px] sm:text-[28px] font-bold leading-tight tracking-tight text-[#111418]">
          Global Case Simulation
        </h4>
        <span className="font-serif text-[26px] sm:text-[30px] font-black text-[#A67C24] leading-none">
          Top 10
        </span>
      </div>

      <p className="mt-2 font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#A67C24]">
        Global Top 10 · International Strategy Simulation
      </p>
    </BentoCard>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW 3: [1 Col: Veritas] [1 Col: TechQuest] [2 Col Hero: Kotler Sutra]
// ─────────────────────────────────────────────────────────────────────────────

// 6. Veritas 2025 - IIM Calcutta (1 Col)
function CardVeritas({ index }: { index?: number }) {
  return (
    <BentoCard watermark="IIMC" index={index}>
      <h4 className="font-serif text-[22px] sm:text-[24px] font-bold leading-tight tracking-tight text-[#111418]">
        Veritas 2025
      </h4>

      <p className="mt-2 font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#A67C24]">
        Podium Finalist
      </p>
    </BentoCard>
  )
}

// 7. TechQuest & Consularium - McKinsey / IIT Madras (1 Col)
function CardTechquest({ index }: { index?: number }) {
  return (
    <BentoCard watermark="MCK" index={index}>
      <h4 className="font-serif text-[22px] sm:text-[24px] font-bold leading-tight tracking-tight text-[#111418]">
        TQ &amp; Consularium
      </h4>

      <p className="mt-2 font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#A67C24]">
        Double Podium Finish
      </p>
    </BentoCard>
  )
}

// 8. Kotler Sutra & ProdWiz - IIM Kozhikode & IIM Lucknow (2 Col Hero)
function CardKotlerProdWiz({ index }: { index?: number }) {
  return (
    <BentoCard className="sm:col-span-2" watermark="IIM" index={index}>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <h4 className="font-serif text-[22px] sm:text-[26px] font-bold leading-tight tracking-tight text-[#111418]">
          Kotler Sutra &amp; ProdWiz
        </h4>
        <span className="font-serif text-[24px] sm:text-[28px] font-black text-[#A67C24] leading-none">
          Top 5
        </span>
      </div>

      <p className="mt-2 font-sans text-[12.5px] sm:text-[13px] font-semibold text-[#A67C24]">
        Top 5 National Finalist · Joint IIM Championship
      </p>
    </BentoCard>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Master Bento Layout (Animata Eight Architecture: 4 Cols x 3 Rows)
// ─────────────────────────────────────────────────────────────────────────────
export default function Eight() {
  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-4 sm:grid-rows-3">
        {/* Row 1: 1 col + 2 cols + 1 col */}
        <CardPrameya index={0} />
        <CardEyCafta index={1} />
        <CardImpetus index={2} />

        {/* Row 2: 2 cols + 2 cols */}
        <CardFinvent index={3} />
        <CardHecParis index={4} />

        {/* Row 3: 1 col + 1 col + 2 cols */}
        <CardVeritas index={5} />
        <CardTechquest index={6} />
        <CardKotlerProdWiz index={7} />
      </div>
    </div>
  )
}
