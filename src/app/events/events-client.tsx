'use client'

import { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SidewaysWordReveal } from '@/components/animata/text/sideways-word-reveal'
import { CardReveal } from '@/components/animata/container/card-reveal'
import { MetricCountUp } from '@/components/animata/text/metric-count-up'
import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']

const TYPES = [
  'All',
  'Case competition',
  'Speaker session',
  'Trading and markets',
  'Workshop',
  'Networking',
]

const STATS = [
  { value: '9,000+', label: 'CAMPUS OUTREACH', desc: 'Direct outreach across NIT Trichy' },
  { value: '150+', label: 'SUMMIT DELEGATES', desc: 'On-campus delegates at flagship forum' },
  { value: '12+', label: 'NATIONAL PODIUMS', desc: 'IIM-A, IIT-M, HEC Paris, EY CAFTA' },
  { value: '1,000+', label: 'TEAMS REACHED', desc: 'Collegiate competitive reach' },
]

// Brand avenues retrieved from the IFSA Summit Proposal
const FORUM_AVENUES = [
  {
    title: 'Flagship Case Competition',
    subtitle: 'IFSC 2027 · National Case Championship',
    desc: 'Structured business and valuation challenge where elite teams analyze complex corporate and M&A problems, judged by industry executives and partner juries.',
  },
  {
    title: 'Guest Keynote Lectures',
    subtitle: 'Executive Leadership Firesides',
    desc: 'Expert speaker sessions addressing bulge-bracket banking, quantitative research, private equity diligence, and global market dynamics directly to our talent pool.',
  },
  {
    title: 'Interactive Workshops',
    subtitle: 'Skill-Building Masterclasses',
    desc: 'Intensive financial modeling, 3-statement forecasts, DCF sensitivity, and risk architecture sessions conducted by professionals from institutions like HSBC and KPMG.',
  },
  {
    title: 'Finance & Trading Arenas',
    subtitle: 'Live Floor & Quant Simulations',
    desc: 'Live stock pitch showdowns, portfolio bidding, and real-time trading floor simulations organized alongside premier market infrastructure partners for freshers and senior analysts.',
  },
]

// Corporate & Guest Deliverables from proposal
const FORUM_DELIVERABLES = [
  {
    title: 'Brand-Specific Custom Event',
    desc: 'Dedicated competition track, case prompt, or sponsored workshop named entirely after your brand.',
  },
  {
    title: 'Stage & Emcee Prominence',
    desc: 'On-stage logo presence, keynote speaking address, and emcee acknowledgments throughout the summit.',
  },
  {
    title: 'Online & On-Campus Dominance',
    desc: 'Prominent branding across 9,000+ campus touchpoints, event merchandise, kits, and digital media.',
  },
  {
    title: 'Direct Talent Recruitment',
    desc: 'Priority access to resumes, finalist portfolios, and direct hiring pipelines for engineering & finance talent.',
  },
  {
    title: 'Video Ads & Digital Reach',
    desc: 'Audio-visual broadcast during keynote intermissions and distributed across our 15,000+ global network.',
  },
  {
    title: 'Executive Networking',
    desc: 'Exclusive VIP networking sessions with collegiate leaders, faculty chairs, and guest executives.',
  },
]

const COLLAGE_PARTNER_LOGOS = [
  { name: 'Oister Global', src: '/partners/oister.png' },
  { name: 'Gallabox', src: '/partners/gallabox.png' },
  { name: 'Acko Insurance', src: '/partners/acko.png' },
  { name: 'Anthill', src: '/partners/anthill.png' },
  { name: 'Red Herring Ventures', src: '/partners/red-herring.png' },
  { name: 'Oberoi Hotels & Resorts', src: '/partners/oberoi.png' },
  { name: 'Faad Network', src: '/partners/faad.png' },
  { name: 'India Accelerator', src: '/partners/india-accelerator.png' },
  { name: 'Fundvice', src: '/partners/fundvice.png' },
  { name: 'Crowwd', src: '/partners/crowwd.png' },
]

function parseEventDate(dateStr: string) {
  const parts = dateStr.trim().split(/\s+/)
  if (parts.length >= 2) {
    return {
      day: parts[0],
      month: (parts[1] || 'MAR').slice(0, 3).toUpperCase(),
      year: parts[2] || '2026',
    }
  }
  return { day: '15', month: 'MAR', year: '2026' }
}

export function EventsPageClient({ events }: { events: Event[] }) {
  const forumRef = useRef<HTMLDivElement | null>(null)
  const funnelRef = useRef<HTMLDivElement | null>(null)

  // Filter out any upcoming/forum event for the top active spotlight vs past events
  const upcomingEvents = useMemo(() => events.filter((e) => e.is_upcoming), [events])
  const pastEvents = useMemo(() => events.filter((e) => !e.is_upcoming), [events])

  const [typeFilter, setTypeFilter] = useState('All')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [registeredEvents, setRegisteredEvents] = useState<Record<string, boolean>>({})

  // Sponsorship & Guest Funnel Form state
  const [sponsorRole, setSponsorRole] = useState<'sponsor' | 'speaker' | 'workshop' | 'partner'>('sponsor')
  const [firmName, setFirmName] = useState('')
  const [contactName, setContactName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [tierInterest, setTierInterest] = useState('Trading Partner / Title Sponsor')
  const [message, setMessage] = useState('')
  const [funnelSubmitted, setFunnelSubmitted] = useState(false)

  // RSVP Form fields for modal
  const [rsvpName, setRsvpName] = useState('')
  const [rsvpEmail, setRsvpEmail] = useState('')
  const [rsvpCollege, setRsvpCollege] = useState('')
  const [rsvpSuccess, setRsvpSuccess] = useState(false)

  const filteredPast = useMemo(() => {
    return pastEvents.filter((e) => typeFilter === 'All' || e.tag === typeFilter)
  }, [pastEvents, typeFilter])

  const scrollToFunnel = (role: 'sponsor' | 'speaker' | 'workshop' | 'partner') => {
    setSponsorRole(role)
    if (role === 'speaker') {
      setTierInterest('Guest Keynote Speaker')
    } else if (role === 'workshop') {
      setTierInterest('Executive Masterclass Host')
    } else {
      setTierInterest('Trading Partner / Title Sponsor')
    }
    funnelRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleFunnelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFunnelSubmitted(true)
  }

  const handleRsvpSubmit = (id: string) => {
    setRegisteredEvents((prev) => ({ ...prev, [id]: true }))
    setRsvpSuccess(true)
    setTimeout(() => {
      setSelectedEvent(null)
      setRsvpSuccess(false)
      setRsvpName('')
      setRsvpEmail('')
      setRsvpCollege('')
    }, 1800)
  }

  return (
    <div className="bg-[#FAF7F0] text-[#111418]">
      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E6DFD3] bg-[#FAF7F0] pt-14 pb-16 sm:pt-18 sm:pb-22">
        {/* Full-bleed engineering ledger grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, #E6DFD3 1px, transparent 1px), linear-gradient(to bottom, #E6DFD3 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            backgroundPosition: 'center top',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[920px]">
            <Breadcrumbs items={[{ label: 'Events & Initiatives' }]} />

            <div className="mt-6">
              <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[#CBA258] block mb-3">
                NATIONAL SUMMIT &amp; CORPORATE PARTNERSHIP DESK
              </span>

              <SidewaysWordReveal
                lines={['Events, Summits', '& Signature Forum']}
                className="font-serif text-[42px] sm:text-[56px] md:text-[68px] lg:text-[76px] font-black leading-[0.98] tracking-[-0.035em] text-[#111418]"
                accentBarClassName="mt-4 h-[4px] w-20 bg-[#CBA258]"
              />
            </div>

            <p className="mt-6 text-[15.5px] sm:text-[17px] leading-[1.75] text-[#555048] max-w-[780px]">
              Headquartered at <strong className="font-semibold text-[#111418]">NIT Trichy (NIRF #9 Engineering)</strong>, IFSA NIT Trichy bridges quantitative engineering with bulge-bracket finance. This February, we host our upcoming flagship annual gathering: <strong className="font-semibold text-[#184E32]">IFSA Forum 2027</strong>.
            </p>
          </div>

          {/* 4-Stat Metric Strip */}
          <div className="mt-12 sm:mt-16 border border-[#E6DFD3] bg-white grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 sm:divide-x divide-[#E6DFD3] shadow-[4px_4px_0px_0px_#111418]">
            {STATS.map((s, idx) => (
              <div key={idx} className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="font-serif font-black text-[#111418] text-[32px] sm:text-[38px] leading-none tracking-tight">
                    <MetricCountUp value={s.value} delayMs={idx * 100} durationMs={1500} />
                  </div>
                  <div className="mt-2.5 font-mono text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-[#78716C]">
                    {s.label}
                  </div>
                </div>
                <div className="mt-2 text-[11.5px] text-[#555048]">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION: SIGNATURE IFSA FORUM 2027 PITCH (HIGH CONVERSION) ── */}
      <section ref={forumRef} id="ifsa-forum" className="relative border-b border-[#E6DFD3] bg-[#FAF7F0] py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">

          {/* Forum Spotlight Box: Deep Emerald & Gold Accents */}
          <CardReveal threshold={0.12} index={0}>
            <div className="border-2 border-[#111418] bg-[#154D38] text-[#FAF7F0] p-7 sm:p-10 md:p-14 shadow-[8px_8px_0px_0px_#111418] relative overflow-hidden">
              {/* Subtle Ledger Scrim */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '36px 36px',
                }}
              />

              <div className="relative z-10">
                {/* Header Tag Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 border border-white/20 bg-black/25 px-3 py-1 font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#F5D88B]">
                    <span>●</span>
                    <span>FEBRUARY 2027 SIGNATURE SUMMIT · NIT TRICHY</span>
                  </div>

                  <div className="inline-flex items-center gap-2 font-mono text-[11px] text-white/80">
                    <span className="text-[#F5D88B]">Title &amp; Track Sponsorships:</span>
                    <span className="font-bold text-[#F5D88B] bg-white/10 px-2.5 py-0.5 rounded-[2px] border border-white/20">
                      Now Open
                    </span>
                  </div>
                </div>

                {/* Main Pitch Title */}
                <h2 className="mt-6 font-serif text-[34px] sm:text-[46px] md:text-[56px] lg:text-[62px] font-black leading-[1.02] tracking-tight text-[#FAF7F0] max-w-4xl">
                  IFSA Forum 2027: The Premier Collegiate Finance Summit
                </h2>

                <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] leading-relaxed text-[#FAF7F0]/90 max-w-3xl">
                  A high-octane two-day flagship summit bringing together 9,000+ NIT Trichy engineering minds, national competition finalists, top venture partners, and bulge-bracket leaders through learning, competition, and corporate exposure.
                </p>

                {/* Summit Core Pillars Highlights */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/15 pt-6">
                  <div>
                    <span className="block font-mono text-[10px] text-[#F5D88B] tracking-wider uppercase font-semibold">
                      CAMPUS STATURE
                    </span>
                    <span className="mt-1 block font-serif text-[18px] sm:text-[20px] font-bold text-white">
                      NIRF #9 Ranked
                    </span>
                    <span className="text-[12px] text-white/70">60+ Yrs Engineering Excellence</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-[#F5D88B] tracking-wider uppercase font-semibold">
                      GLOBAL COMMUNITY
                    </span>
                    <span className="mt-1 block font-serif text-[18px] sm:text-[20px] font-bold text-white">
                      15,000+ Alumni
                    </span>
                    <span className="text-[12px] text-white/70">Chapters across 6 Continents</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-[#F5D88B] tracking-wider uppercase font-semibold">
                      DELEGATE POOL
                    </span>
                    <span className="mt-1 block font-serif text-[18px] sm:text-[20px] font-bold text-white">
                      9,000+ Reach
                    </span>
                    <span className="text-[12px] text-white/70">Elite STEM &amp; Quant Analysts</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-[#F5D88B] tracking-wider uppercase font-semibold">
                      COMPETITIVE ARENAS
                    </span>
                    <span className="mt-1 block font-serif text-[18px] sm:text-[20px] font-bold text-white">
                      Multi-Tier Tracks
                    </span>
                    <span className="text-[12px] text-white/70">National Case, Quant &amp; Pitch Stages</span>
                  </div>
                </div>

                {/* Primary CTA Row inside the Spotlight Banner */}
                <div className="mt-9 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => scrollToFunnel('sponsor')}
                    className="inline-flex items-center justify-center bg-[#F5D88B] px-6 py-3 text-[13px] sm:text-[13.5px] font-bold text-[#111418] hover:bg-[#FFE299] transition-colors border border-[#111418] shadow-[3px_3px_0px_0px_#111418] cursor-pointer"
                  >
                    Partner / Sponsor the Forum →
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToFunnel('speaker')}
                    className="inline-flex items-center justify-center border border-white/50 bg-white/10 backdrop-blur-xs px-6 py-3 text-[13px] sm:text-[13.5px] font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    Propose Guest Lecture / Keynote →
                  </button>
                </div>
              </div>
            </div>
          </CardReveal>

          {/* ── 4 BRAND AVENUES (RETRIEVED FROM PROPOSAL) ── */}
          <div className="mt-16 sm:mt-20">
            <div className="max-w-[760px]">
              <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#184E32] block mb-2">
                BRAND COLLABORATION AVENUES
              </span>
              <h3 className="font-serif text-[30px] sm:text-[40px] font-black text-[#111418] tracking-tight leading-tight">
                Four Distinct Platforms for Industry Leaders &amp; Sponsors
              </h3>
              <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-[#555048] leading-relaxed">
                Whether you seek brand visibility, direct recruitment pipelines, or speaking stages, IFSA Forum offers custom tracks built for measurable return on investment.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
              {FORUM_AVENUES.map((ave, idx) => (
                <CardReveal key={ave.title} index={idx} threshold={0.12}>
                  <div className="border-2 border-[#111418] bg-white p-7 sm:p-8 shadow-[6px_6px_0px_0px_#111418] h-full flex flex-col justify-between transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#111418]">
                    <div>
                      <h4 className="font-serif text-[22px] sm:text-[24px] font-black text-[#111418] leading-snug">
                        {ave.title}
                      </h4>
                      <div className="mt-1 font-mono text-[11.5px] font-semibold text-[#CBA258]">
                        {ave.subtitle}
                      </div>

                      <p className="mt-3.5 text-[13.5px] leading-relaxed text-[#555048]">
                        {ave.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E6DFD3] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => scrollToFunnel(idx === 1 ? 'speaker' : idx === 2 ? 'workshop' : 'sponsor')}
                        className="font-mono text-[12px] font-semibold text-[#184E32] hover:text-[#111418] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Inquire about this avenue →
                      </button>
                    </div>
                  </div>
                </CardReveal>
              ))}
            </div>
          </div>

          {/* ── SPONSOR DELIVERABLES (PROPOSAL SLIDE 6) ── */}
          <div className="mt-16 sm:mt-20 border border-[#111418] bg-white p-7 sm:p-10 shadow-[6px_6px_0px_0px_#111418]">
            <div className="border-b border-[#E6DFD3] pb-6">
              <span className="font-mono text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#78716C]">
                COMMITTED DELIVERABLES &amp; ROI
              </span>
              <h4 className="mt-1 font-serif text-[26px] sm:text-[32px] font-black text-[#111418]">
                What Corporate Partners &amp; Guests Receive
              </h4>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FORUM_DELIVERABLES.map((deliv, idx) => (
                <div key={idx} className="border-l-2 border-[#184E32] pl-4 py-1">
                  <h5 className="font-serif text-[17px] font-bold text-[#111418]">
                    {deliv.title}
                  </h5>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[#555048]">
                    {deliv.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Validation Brand Roster with Cropped Partner Logos */}
            <div className="mt-10 pt-6 border-t border-[#E6DFD3]">
              <span className="block font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.14em] font-semibold text-[#78716C] mb-5">
                BRANDS OUR NETWORK HAS PARTNERED WITH
              </span>
              <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-5 gap-3.5 sm:gap-4 items-center">
                {COLLAGE_PARTNER_LOGOS.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex items-center justify-center p-3 bg-[#FAF7F0] border border-[#E6DFD3] rounded-[2px] transition-all duration-200 hover:border-[#111418] hover:shadow-[3px_3px_0px_0px_#111418] h-16 sm:h-18"
                    title={brand.name}
                  >
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={160}
                      height={60}
                      className="max-h-10 max-w-[120px] object-contain transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION: DEDICATED SPONSORSHIP & GUEST INGESTION FUNNEL FORM ── */}
      <section ref={funnelRef} id="forum-funnel" className="relative border-b border-[#E6DFD3] bg-[#FAF7F0] py-16 sm:py-24">
        <div className="mx-auto max-w-[1000px] px-5 sm:px-8">
          <CardReveal threshold={0.12} index={0}>
            <div className="border-2 border-[#111418] bg-white p-7 sm:p-11 md:p-14 shadow-[8px_8px_0px_0px_#111418]">
              {/* Funnel Header */}
              <div className="text-center max-w-2xl mx-auto">
                <span className="inline-block bg-[#F5D88B] text-[#111418] font-mono text-[10.5px] font-bold tracking-[0.12em] uppercase px-3 py-1 border border-[#111418]/20">
                  IFSA FORUM 2027 INGESTION DESK
                </span>
                <h3 className="mt-4 font-serif text-[30px] sm:text-[40px] md:text-[46px] font-black text-[#111418] leading-[1.08] tracking-tight">
                  Partner, Sponsor, or Speak at IFSA Forum 2027
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] text-[#555048] leading-relaxed">
                  Join our official partners in shaping collegiate high finance at NIT Trichy. Fill out the intent form below and our secretariat will dispatch the complete commercial deck and schedule a direct consultation.
                </p>
              </div>

              {/* Role Selection Tabs */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-b border-[#E6DFD3] pb-6">
                {[
                  { id: 'sponsor', label: 'Corporate Sponsor / Trading Partner' },
                  { id: 'speaker', label: 'Guest Keynote Speaker' },
                  { id: 'workshop', label: 'Executive Workshop Lead' },
                  { id: 'partner', label: 'Case Competition Partner' },
                ].map((track) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => {
                      setSponsorRole(track.id as any)
                      if (track.id === 'speaker') setTierInterest('Guest Keynote Speaker')
                      else if (track.id === 'workshop') setTierInterest('Executive Masterclass Host')
                      else if (track.id === 'partner') setTierInterest('Case Challenge Title Sponsor')
                      else setTierInterest('Trading Partner / Title Sponsor')
                    }}
                    className={`px-4 py-2 text-[12px] sm:text-[12.5px] font-mono uppercase tracking-[0.05em] font-semibold transition-all cursor-pointer ${
                      sponsorRole === track.id
                        ? 'bg-[#184E32] text-white border border-[#111418] shadow-[2px_2px_0px_0px_#111418]'
                        : 'border border-[#111418]/20 bg-[#FAF7F0] text-[#111418] hover:bg-white'
                    }`}
                  >
                    {track.label}
                  </button>
                ))}
              </div>

              {/* Funnel Form Content */}
              {funnelSubmitted ? (
                <div className="mt-10 border-2 border-[#184E32] bg-[#EAF5EC] p-8 text-center">
                  <div className="font-serif text-[28px] sm:text-[34px] font-black text-[#184E32]">
                    ✓ Partnership Inquiry Logged
                  </div>
                  <p className="mt-2 text-[15px] text-[#184E32]/90 max-w-lg mx-auto">
                    Thank you, <strong className="text-[#184E32]">{contactName || 'Partner'}</strong>. Your proposal for <strong className="text-[#184E32]">{firmName || 'your organization'}</strong> under <strong className="text-[#184E32]">{tierInterest}</strong> has been routed directly to the Executive Secretariat.
                  </p>
                  <p className="mt-4 font-mono text-[12px] text-[#555048]">
                    We will respond to <span className="underline font-semibold">{email}</span> within 24 business hours with the full sponsorship prospectus and presentation slots.
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFunnelSubmitted(false)}
                      className="border border-[#184E32] bg-white px-5 py-2 text-[12.5px] font-semibold text-[#184E32] hover:bg-[#EAF5EC] transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFunnelSubmit} className="mt-8 space-y-4 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold text-[#78716C] mb-1.5">
                        Company / Institution Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firmName}
                        onChange={(e) => setFirmName(e.target.value)}
                        placeholder="e.g. Investment Bank, Fintech, Asset Manager, VC Fund"
                        className="w-full border border-[#111418] bg-white px-3.5 py-2.5 text-[13.5px] text-[#111418] placeholder:text-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold text-[#78716C] mb-1.5">
                        Representative Name &amp; Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Anil Gutlapalli, Vice President"
                        className="w-full border border-[#111418] bg-white px-3.5 py-2.5 text-[13.5px] text-[#111418] placeholder:text-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold text-[#78716C] mb-1.5">
                        Corporate Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="executive@institution.com"
                        className="w-full border border-[#111418] bg-white px-3.5 py-2.5 text-[13.5px] text-[#111418] placeholder:text-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold text-[#78716C] mb-1.5">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full border border-[#111418] bg-white px-3.5 py-2.5 text-[13.5px] text-[#111418] placeholder:text-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold text-[#78716C] mb-1.5">
                      Proposed Track / Sponsorship Scope *
                    </label>
                    <select
                      value={tierInterest}
                      onChange={(e) => setTierInterest(e.target.value)}
                      className="w-full border border-[#111418] bg-white px-3.5 py-2.5 text-[13.5px] text-[#111418] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                    >
                      <option value="Trading Partner / Title Sponsor">Official Trading Partner / Title Sponsor</option>
                      <option value="Guest Keynote Speaker">Executive Guest Keynote Speaker (Fireside / Panel)</option>
                      <option value="Case Challenge Title Sponsor">Case Competition Title Sponsor (Custom Challenge)</option>
                      <option value="Executive Masterclass Host">Hands-on Technical Workshop Host</option>
                      <option value="Associate / Merchandise Partner">Associate Sponsor / Branding &amp; Merch Partner</option>
                      <option value="Custom Strategic Alliance">Custom Institutional Strategic Alliance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider font-semibold text-[#78716C] mb-1.5">
                      Collaboration Details or Topic Proposal
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline your target deliverables, proposed lecture topic, or preferred engagement format during the February summit..."
                      className="w-full border border-[#111418] bg-white px-3.5 py-2.5 text-[13.5px] text-[#111418] placeholder:text-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full bg-[#184E32] text-white py-3.5 px-6 font-semibold text-[14px] hover:bg-[#133F28] transition-colors border border-[#111418] shadow-[3px_3px_0px_0px_#111418] cursor-pointer"
                    >
                      Submit Forum Ingestion Inquiry →
                    </button>
                    <p className="mt-2 text-center font-mono text-[10.5px] text-[#78716C]">
                      Direct routing to Head of Corporate Relations &amp; Executive Secretariat · Non-disclosure guaranteed
                    </p>
                  </div>
                </form>
              )}
            </div>
          </CardReveal>
        </div>
      </section>

      {/* ── SECTION: COMPLETED & HISTORICAL EVENTS (MUTED TONE) ────────── */}
      <section id="past-events" className="relative border-b border-[#E6DFD3] bg-[#F5F2EB] py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">

          {/* Section Header with Muted Editorial Treatment */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D5CDBD] pb-6">
            <div>
              <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] uppercase text-[#78716C] block mb-1.5">
                HISTORICAL REPOSITORY · COMPLETED ARCHIVES
              </span>
              <h3 className="font-serif text-[30px] sm:text-[38px] font-bold tracking-tight text-[#2B2824]">
                Past Summits, Masterclasses &amp; Rounds
              </h3>
              <p className="mt-2 text-[14px] text-[#6E675E] max-w-xl">
                Archival record of delivered keynotes with Northern Trust, HSBC, KPMG, and Wall Street Oasis leaders alongside national case championships.
              </p>
            </div>

            {/* Category Filter Chips for Past Archives */}
            <div className="flex flex-wrap items-center gap-1.5">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1 text-[11px] font-mono uppercase tracking-[0.05em] transition-all cursor-pointer ${
                    typeFilter === t
                      ? 'bg-[#3F484A] text-[#FAF7F0] border border-[#2B2824]'
                      : 'border border-[#D5CDBD] bg-white/70 text-[#6E675E] hover:bg-white hover:text-[#111418]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Past Events in Muted Tone */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPast.map((ev, idx) => {
              const dateInfo = parseEventDate(ev.date)

              return (
                <CardReveal key={ev.id} index={idx} threshold={0.12}>
                  <div className="group flex flex-col sm:flex-row border border-[#D5CDBD] bg-[#FAF8F5] opacity-90 transition-all hover:opacity-100 hover:border-[#111418] hover:shadow-[4px_4px_0px_0px_#111418] overflow-hidden h-full">
                    {/* Left Muted Date Stamp Plinth */}
                    <div className="w-full sm:w-[105px] shrink-0 flex flex-row sm:flex-col items-center justify-between sm:justify-center py-3.5 px-5 sm:py-5 sm:px-2 text-center bg-[#E5DFD4] text-[#4A443C] select-none border-b sm:border-b-0 sm:border-r border-[#D5CDBD]">
                      <div className="flex sm:flex-col items-baseline sm:items-center gap-2 sm:gap-0">
                        <span className="font-serif text-[30px] sm:text-[34px] font-black leading-none text-[#2B2824]">
                          {dateInfo.day}
                        </span>
                        <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#78716C] uppercase sm:mt-1">
                          {dateInfo.month}
                        </span>
                      </div>
                      <span className="font-mono text-[9.5px] text-[#8C8478] sm:mt-0.5">
                        {dateInfo.year}
                      </span>
                    </div>

                    {/* Right Muted Content */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-block bg-[#E8E2D8] text-[#555048] font-mono text-[9px] font-semibold tracking-[0.08em] uppercase px-2 py-0.5 border border-[#D5CDBD]">
                            {ev.tag}
                          </span>
                          <span className="font-mono text-[9.5px] text-[#8C8478] uppercase tracking-wider">
                            COMPLETED ARCHIVE ✓
                          </span>
                        </div>

                        <h4 className="mt-3 font-serif text-[18px] sm:text-[20px] font-bold leading-snug text-[#2B2824] group-hover:text-[#184E32] transition-colors">
                          {ev.title}
                        </h4>

                        <div className="mt-1.5 font-mono text-[10.5px] text-[#78716C]">
                          📍 {ev.venue || 'NIT Trichy Campus'}
                        </div>

                        <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#6E675E] line-clamp-2">
                          {ev.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#E6DFD3] flex items-center justify-between">
                        <span className="font-mono text-[10.5px] text-[#8C8478]">
                          👥 {ev.attendance ? `${ev.attendance}+ Delegates` : 'Concluded'}
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedEvent(ev)}
                          className="px-3 py-1 text-[11.5px] font-semibold text-[#555048] border border-[#C2B9AA] bg-white/80 hover:bg-white hover:text-[#111418] transition-colors cursor-pointer"
                        >
                          View Archive Brief ›
                        </button>
                      </div>
                    </div>
                  </div>
                </CardReveal>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── EDUCATIONAL FRAMEWORK / EVENT LIFECYCLE ───────────────────── */}
      <section className="border-t border-[#E6DFD3] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[700px]">
            <span className="font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-[#CBA258] block mb-2">
              COMPETITIVE ARCHITECTURE
            </span>
            <h2 className="font-serif text-[32px] sm:text-[40px] font-black leading-tight tracking-tight text-[#111418]">
              The IFSA Competition &amp; Summit Lifecycle
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#555048]">
              How our analysts engineer podium-grade financial presentations, navigate double-blind defense rounds, and engage corporate juries.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Mandate Scoping',
                desc: 'Structuring institutional-grade problem statements across M&A, structured credit, and valuation.',
              },
              {
                step: '02',
                title: 'Financial Modeling',
                desc: 'Constructing robust 3-statement forecast models, DCF valuations, and risk sensitivity frameworks.',
              },
              {
                step: '03',
                title: 'Executive Jury',
                desc: 'Presenting live to Northern Trust VPs, HSBC Assistant Directors, and Wall Street Oasis leaders.',
              },
              {
                step: '04',
                title: 'Career Pipeline',
                desc: 'Direct institutional recruitment into bulge-bracket investment banking and tier-1 consulting.',
              },
            ].map((item, idx) => (
              <CardReveal key={item.step} index={idx} threshold={0.12}>
                <div className="border border-[#111418] bg-[#FAF7F0] p-6 sm:p-7 shadow-[4px_4px_0px_0px_#111418] h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-black text-[#184E32] tracking-widest block mb-3">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#111418]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-[#555048]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </CardReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROADSHEET LEDGER DETAILS / ARCHIVE MODAL ────────────────── */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl border-2 border-[#111418] bg-[#FAF7F0] p-7 sm:p-9 shadow-[10px_10px_0px_0px_#111418] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E6DFD3]">
              <div className="flex items-center gap-2">
                <span className="bg-[#F5D88B] text-[#111418] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase border border-[#111418]/15">
                  {selectedEvent.tag}
                </span>
                <span className="font-mono text-[11px] text-[#78716C]">
                  📅 {selectedEvent.date}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="font-mono text-[18px] text-[#78716C] hover:text-[#111418] cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Title & Details */}
            <h3 className="mt-5 font-serif text-[24px] sm:text-[28px] font-black text-[#111418] leading-tight">
              {selectedEvent.title}
            </h3>

            <div className="mt-2 flex items-center gap-2 font-mono text-[12px] text-[#184E32]">
              <span>📍 {selectedEvent.venue || 'NIT Trichy Campus'}</span>
              <span>·</span>
              <span>👥 {selectedEvent.attendance ? `${selectedEvent.attendance}+ Delegates` : 'Concluded'}</span>
            </div>

            <p className="mt-4 text-[13.5px] leading-relaxed text-[#555048]">
              {selectedEvent.description}
            </p>

            {/* If Upcoming: RSVP Reservation Form */}
            {selectedEvent.is_upcoming ? (
              <div className="mt-6 border-t border-[#E6DFD3] pt-5">
                {rsvpSuccess ? (
                  <div className="bg-[#EAF5EC] border border-[#184E32] p-4 text-center">
                    <p className="font-serif font-bold text-[16px] text-[#184E32]">
                      ✓ Delegate Registration Confirmed
                    </p>
                    <p className="mt-1 text-[12px] text-[#184E32]/80">
                      We have logged your attendee seat for {selectedEvent.title}.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleRsvpSubmit(selectedEvent.id)
                    }}
                    className="space-y-3.5"
                  >
                    <div className="font-mono text-[10.5px] uppercase tracking-wider font-semibold text-[#184E32]">
                      DELEGATE SEAT RESERVATION (COMPLIMENTARY)
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-mono text-[#78716C] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={rsvpName}
                          onChange={(e) => setRsvpName(e.target.value)}
                          placeholder="e.g. Yash Kapoor"
                          className="w-full border border-[#111418] bg-white px-3 py-2 text-[13px] text-[#111418] placeholder:text-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11.5px] font-mono text-[#78716C] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={rsvpEmail}
                          onChange={(e) => setRsvpEmail(e.target.value)}
                          placeholder="analyst@nitt.edu"
                          className="w-full border border-[#111418] bg-white px-3 py-2 text-[13px] text-[#111418] placeholder:text-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-mono text-[#78716C] mb-1">
                        Institution / Department
                      </label>
                      <input
                        type="text"
                        value={rsvpCollege}
                        onChange={(e) => setRsvpCollege(e.target.value)}
                        placeholder="NIT Trichy · Production Engineering"
                        className="w-full border border-[#111418] bg-white px-3 py-2 text-[13px] text-[#111418] placeholder:text-[#A8A29E] focus:outline-hidden focus:ring-1 focus:ring-[#184E32]"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-[#E6DFD3]">
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(null)}
                        className="px-4 py-2 text-[12.5px] font-semibold text-[#78716C] hover:text-[#111418] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#184E32] px-6 py-2.5 text-[13px] font-semibold text-white hover:bg-[#133F28] border border-[#111418] shadow-[2px_2px_0px_0px_#111418] cursor-pointer transition-colors"
                      >
                        Confirm Registration →
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="mt-6 border-t border-[#E6DFD3] pt-5 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#78716C]">
                  Official Chapter Archive Record
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEvent(null)
                      scrollToFunnel('sponsor')
                    }}
                    className="inline-flex items-center justify-center border border-[#111418] bg-white px-4 py-2 text-[12px] font-semibold text-[#111418] hover:bg-[#FAF7F0] transition-colors cursor-pointer"
                  >
                    Sponsor Next Summit →
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="bg-[#111418] px-4 py-2 text-[12px] font-semibold text-[#FAF7F0] hover:bg-[#184E32] transition-colors cursor-pointer"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
