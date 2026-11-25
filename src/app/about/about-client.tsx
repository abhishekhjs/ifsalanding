'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SidewaysWordReveal } from '@/components/animata/text/sideways-word-reveal'
import { CardReveal } from '@/components/animata/container/card-reveal'
import type { Database } from '@/types/database'

type TeamMember = Database['public']['Tables']['team_members']['Row']
type FAQ = Database['public']['Tables']['faqs']['Row']

const VALUES = [
  {
    num: '01',
    t: 'Quantitative Rigour First',
    b: 'Every calculation, DCF forecast, and ratio is audited through double-blind peer review before release.',
  },
  {
    num: '02',
    t: 'Learn by Shipping Real Work',
    b: 'No hypothetical-only exercises. Every analyst contributes to live venture client briefs or published research.',
  },
  {
    num: '03',
    t: 'Cross-Disciplinary Mentorship',
    b: 'Seniors, alumni, and global finance professionals guide junior analysts on technical modeling and career pathways.',
  },
  {
    num: '04',
    t: 'Intellectual Honesty & Disclosures',
    b: 'We transparently state methodology, sensitivity assumptions, and conflict disclosures in all published notes.',
  },
]

const VERTICALS = [
  {
    title: 'Research & Publications',
    desc: 'Pitch, build 3-statement valuation models, and write institutional-grade equity research reports, sector teardowns, and macro briefs.',
    stack: 'Excel / DCF · FactSet · Equity Modeling · Peer Review',
  },
  {
    title: 'Finance & Markets',
    desc: 'Conduct simulated trading rounds, host financial modeling bootcamps, and prepare macro briefings on interest rates and global liquidity.',
    stack: 'Trading Simulator · Macro Reports · LBO Analysis',
  },
  {
    title: 'Corporate Outreach & Partnerships',
    desc: 'Manage relationships with venture clients, case competition sponsors (e.g. Northern Trust, HSBC, KPMG), and partner platforms like Wall Street Oasis.',
    stack: 'Client Mandates · Sponsor Relations · WSO Alliance',
  },
  {
    title: 'Design & Editorial Media',
    desc: 'Design publication layouts, annual reports, event collateral, website graphics, and lead social storytelling across LinkedIn and Instagram.',
    stack: 'Figma · Publication Typography · Editorial Design',
  },
  {
    title: 'Technology & Quantitative Infrastructure',
    desc: 'Develop chapter web platforms, automated financial data scraping pipelines, portfolio trackers, and algorithmic simulations.',
    stack: 'Next.js · TypeScript · Supabase · Python Pipelines',
  },
]

interface DeskLeader {
  id: string
  name: string
  role: string
  initials: string
  scope: string
  department: string
  image: string
  linkedin_url?: string
}

const DESK_LEADERS: DeskLeader[] = [
  {
    id: 'team-achyuth-sai',
    name: 'Achyuth Sai',
    role: 'FOUNDING PRESIDENT',
    initials: 'AS',
    scope: 'Chapter strategy, institutional partnerships & the IFSC 2026 Summit',
    department: 'FINAL YEAR · ELECTRONICS & COMMUNICATION',
    image: '/achyuth presi.png',
    linkedin_url: 'https://www.linkedin.com/in/achyuthsaicmuonx/',
  },
  {
    id: 'team-swarnabh-dutta',
    name: 'Swarnabh Dutta',
    role: 'VICE PRESIDENT - RESEARCH',
    initials: 'SD',
    scope: 'Equity research pipeline, peer-reviewed notes & analyst training',
    department: 'FINAL YEAR · PRODUCTION ENGINEERING',
    image: '/swarnabh-vp.png',
    linkedin_url: 'https://www.linkedin.com/in/swarnabh-dutta-8a1b22287/',
  },
  {
    id: 'team-yash-kapoor',
    name: 'Yash Kapoor',
    role: 'SECRETARY',
    initials: 'YK',
    scope: 'Chapter governance, secretariat operations & administrative coordination',
    department: 'FINAL YEAR · PRODUCTION ENGINEERING',
    image: '/yash-kapoor.jpg',
    linkedin_url: 'https://www.linkedin.com/in/yash-kapoor-034216328/',
  },
  {
    id: 'team-tejas-kamath',
    name: 'Tejas Kamath',
    role: 'DIRECTOR - INTERNAL AFFAIRS',
    initials: 'TK',
    scope: 'Internal logistics, member development & quantitative modeling bootcamps',
    department: 'THIRD YEAR · PRODUCTION ENGINEERING',
    image: '/tejas-doe.jpg',
    linkedin_url: 'https://www.linkedin.com/in/tejas-kamath-2a07962b5/',
  },
  {
    id: 'team-sanjushree-das',
    name: 'Sanjushree Das',
    role: 'DIRECTOR - EXTERNAL AFFAIRS',
    initials: 'SD',
    scope: 'Corporate partnerships, summit sponsorships & alumni networking',
    department: 'THIRD YEAR · PRODUCTION ENGINEERING',
    image: '/sanjushree-doe.png',
    linkedin_url: 'https://www.linkedin.com/in/sanjushree-das-9a69902b0/',
  },
]

export function AboutPageClient({ team, faqs }: { team: TeamMember[]; faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [faqSearch, setFaqSearch] = useState('')
  const [openVert, setOpenVert] = useState<string | null>(VERTICALS[0].title)
  const [notified, setNotified] = useState(false)

  const filteredFaqs = useMemo(() => {
    if (!faqSearch) return faqs
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.answer.toLowerCase().includes(faqSearch.toLowerCase())
    )
  }, [faqs, faqSearch])

  const leaders = useMemo(() => {
    return DESK_LEADERS.map((leader) => {
      const match = team.find((t) => t.name.toLowerCase() === leader.name.toLowerCase())
      return {
        ...leader,
        image: match?.headshot_url || leader.image,
        linkedin_url: match?.linkedin_url || leader.linkedin_url,
      }
    })
  }, [team])

  return (
    <div className="bg-[#FAF7F0] text-[#111418]">
      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E6DFD3] bg-[#FAF7F0] py-16 md:py-24">
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
          <div className="max-w-[860px]">
            <Breadcrumbs items={[{ label: 'About Us & Mentors' }]} />

            <h1 className="mt-6 font-serif text-[42px] sm:text-[56px] md:text-[66px] font-black leading-[1.02] tracking-[-0.03em] text-[#111418]">
              Bridging Engineering &amp; High Finance
            </h1>

            <p className="mt-6 text-[16px] sm:text-[17.5px] leading-[1.75] text-[#555048]">
              Founded on <strong className="font-semibold text-[#111418]">December 2nd, 2024</strong> at NIT Trichy, IFSA NIT Trichy is the 10th APAC chapter of the International Finance Students Association. Under our guiding ethos{' '}
              <span className="font-serif italic font-bold text-[#184E32]">“Where Ambition Meets Impact”</span>, we empower engineers and quantitative minds to master capital markets, venture advisory, and institutional research.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE PEOPLE RUNNING THE DESK (EXECUTIVE BOARD) ──────────── */}
      <section id="team" className="border-b border-[#E6DFD3] bg-[#FAF7F0] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl">
            <SidewaysWordReveal
              lines={['The People Running', 'the Desk']}
              className="font-serif font-black tracking-[-0.035em] text-[#111418] leading-[0.92] text-[44px] sm:text-[58px] md:text-[70px]"
              accentBarClassName="mt-5 mb-5 h-[5px] w-20 bg-[#D4A843]"
            />

            {/* Subtitle */}
            <p className="text-[13.5px] sm:text-[14.5px] leading-[1.65] text-[#555048] max-w-[520px]">
              A student leadership bench spanning research, client advisory, competitions and markets — the team behind every mandate, dossier and podium.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaders.map((member, i) => (
              <CardReveal
                key={member.id}
                index={i}
                threshold={0.12}
                className="group relative overflow-hidden border border-[#E2DDD5] bg-[#FAF7F0] p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#111418] hover:shadow-md min-h-[260px] sm:min-h-[280px]"
              >
                {/* Photo: slides up from the bottom of the card on hover (completely crisp & unblurred) */}
                {member.image && (
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 transform translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      <Image
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Gradient overlay focused at the bottom for text contrast while keeping face clear & vibrant */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/50 to-transparent" />
                    </div>
                  </div>
                )}

                {/* Card Content (z-10 ensures it sits cleanly above the slide-up photo) */}
                <div className="relative z-10">
                  {/* Name */}
                  <h3 className="font-serif font-black text-[22px] sm:text-[24px] text-[#111418] tracking-tight leading-tight transition-colors duration-300 group-hover:text-white">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.14em] uppercase text-[#78716C] mt-1.5 transition-colors duration-300 group-hover:text-[#D4A843]">
                    {member.role}
                  </p>

                  {/* Description / Scope */}
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-[#555048] mt-3 leading-relaxed transition-colors duration-300 group-hover:text-[#EAE6DE]">
                    {member.scope}
                  </p>
                </div>

                {/* Bottom divider line & metadata row */}
                <div className="relative z-10 border-t border-[#E2DDD5] mt-6 pt-3.5 flex items-center justify-between text-[10px] sm:text-[10.5px] font-mono tracking-wider uppercase text-[#78716C] transition-colors duration-300 group-hover:border-white/20 group-hover:text-[#C5BFB5]">
                  <span className="truncate pr-2">{member.department}</span>

                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#184E32] hover:text-[#111418] transition-colors shrink-0 p-1 -m-1 group-hover:text-[#D4A843] group-hover:hover:text-white"
                      title={`Connect with ${member.name} on LinkedIn`}
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>
              </CardReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES / OPERATING PRINCIPLES ───────────────────────────── */}
      <section className="border-b border-[#E6DFD3] bg-[#FAF7F0] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="pb-6 border-b border-[#E6DFD3]">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#184E32]">
              OPERATING PRINCIPLES
            </p>
            <h2 className="mt-2 font-serif text-[32px] sm:text-[40px] font-black tracking-[-0.02em] text-[#111418]">
              What We Stand For
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.t}
                className="group border border-[#E6DFD3] bg-white p-7 transition-all duration-200 hover:border-[#111418] hover:shadow-xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD3]">
                  <span className="font-mono text-[11px] font-bold text-[#184E32] tracking-wider">
                    {v.num}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#184E32]/30 group-hover:bg-[#184E32] transition-colors" />
                </div>
                <h3 className="mt-4 font-serif text-[18.5px] font-bold text-[#111418] leading-tight">
                  {v.t}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#555048]">
                  {v.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERTICALS / FUNCTIONAL ARCHITECTURE ──────────────────────── */}
      <section className="border-b border-[#E6DFD3] bg-[#FAF7F0] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="pb-6 border-b border-[#E6DFD3]">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#184E32]">
              FUNCTIONAL ARCHITECTURE
            </p>
            <h2 className="mt-2 font-serif text-[32px] sm:text-[40px] font-black tracking-[-0.02em] text-[#111418]">
              Our 5 Functional Verticals
            </h2>
          </div>

          <div className="mt-8 flex flex-col gap-3.5">
            {VERTICALS.map((v) => {
              const isOpen = openVert === v.title
              return (
                <div
                  key={v.title}
                  className={`border transition-all duration-200 bg-white ${
                    isOpen ? 'border-[#184E32] shadow-xs' : 'border-[#E6DFD3] hover:border-[#111418]'
                  }`}
                >
                  <button
                    onClick={() => setOpenVert(isOpen ? null : v.title)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <div>
                      <span className="font-serif text-[19px] font-bold text-[#111418]">
                        {v.title}
                      </span>
                      <span className="block mt-1 font-mono text-[11px] font-semibold tracking-wider uppercase text-[#184E32]">
                        {v.stack}
                      </span>
                    </div>
                    <span className="font-mono text-[20px] font-semibold text-[#184E32] shrink-0 ml-4">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-[14px] leading-relaxed text-[#555048] border-t border-[#E6DFD3] pt-4">
                      {v.desc}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQS ─────────────────────────────────────────────────────── */}
      <section className="border-b border-[#E6DFD3] bg-[#FAF7F0] py-16 md:py-24">
        <div className="mx-auto max-w-[860px] px-5 sm:px-8">
          <div className="text-center">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#184E32]">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="mt-2 font-serif text-[32px] sm:text-[40px] font-black tracking-[-0.02em] text-[#111418]">
              Everything You Need to Know
            </h2>

            {/* Quick search input */}
            <div className="mt-6 max-w-md mx-auto">
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search questions (eligibility, projects, mentorship)..."
                className="w-full border border-[#E6DFD3] bg-white px-4 py-2.5 text-[13.5px] text-[#111418] outline-none transition-colors focus:border-[#184E32] placeholder:text-[#8C7A6B]"
              />
            </div>
          </div>

          <div className="mt-10 divide-y divide-[#E6DFD3] border-y border-[#E6DFD3] bg-white">
            {filteredFaqs.map((f) => {
              const isOpen = openFaq === f.id
              return (
                <div key={f.id} className="p-6 transition-colors hover:bg-[#FAF7F0]/60">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : f.id)}
                    className="flex w-full items-center justify-between text-left gap-4"
                  >
                    <span className="font-serif text-[17.5px] font-bold text-[#111418]">
                      {f.question}
                    </span>
                    <span className="font-mono text-[18px] font-semibold text-[#184E32] shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3.5 text-[14.5px] leading-relaxed text-[#555048] border-t border-[#E6DFD3]/60 pt-3">
                      {f.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── RECRUITMENT NOTIFICATION FORM ───────────────────────────── */}
      <section id="join" className="bg-[#FAF7F0] py-16 md:py-24">
        <div className="mx-auto max-w-[680px] px-5 sm:px-8">
          <div className="border border-[#111418] bg-white p-8 sm:p-12 text-center shadow-xs">
            <h2 className="font-serif text-[30px] sm:text-[38px] font-black tracking-[-0.02em] text-[#111418]">
              Recruitment &amp; Analyst Induction
            </h2>

            <p className="mt-3 text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#555048]">
              We recruit analysts across all batches and engineering disciplines at the start of each semester. Sign up to receive recruitment announcements, case prompts, and workshop invitations.
            </p>

            <div className="mt-8">
              {notified ? (
                <div className="border border-[#184E32] bg-[#184E32]/10 p-4 text-[14px] font-semibold text-[#184E32]">
                  ✓ You have been added to our recruitment notification list.
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const form = e.currentTarget
                    const emailInput = form.elements.namedItem('email') as HTMLInputElement
                    if (emailInput && emailInput.value) {
                      await fetch('/api/notify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: emailInput.value }),
                      }).catch(() => null)
                      setNotified(true)
                    }
                  }}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
                >
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Enter your campus / personal email"
                    className="border border-[#E6DFD3] bg-[#FAF7F0] px-4 py-3 text-[14px] text-[#111418] outline-none transition-colors focus:border-[#184E32] sm:w-80 placeholder:text-[#8C7A6B]"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center bg-[#184E32] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#133F28]"
                  >
                    Get Notified →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
