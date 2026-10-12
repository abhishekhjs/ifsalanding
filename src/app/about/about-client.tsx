'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/breadcrumbs'
import type { Database } from '@/types/database'

type TeamMember = Database['public']['Tables']['team_members']['Row']
type FAQ = Database['public']['Tables']['faqs']['Row']

const VALUES = [
  {
    t: 'Quantitative Rigour First',
    b: 'Every calculation, DCF forecast, and ratio is audited through double-blind peer review before release.',
  },
  {
    t: 'Learn by Shipping Real Work',
    b: 'No hypothetical-only exercises. Every analyst contributes to live venture client briefs or published research.',
  },
  {
    t: 'Cross-Disciplinary Mentorship',
    b: 'Seniors, alumni, and global finance professionals guide junior analysts on technical modeling and career pathways.',
  },
  {
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

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-[#E4DACB] bg-[#FAF8F5] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[840px]">
            <Breadcrumbs items={[{ label: 'About Us & Mentors' }]} />
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4ECE1] px-3.5 py-1 font-mono text-[11px] font-medium tracking-wider uppercase text-[#7A5424]">
              Chapter Identity &amp; Advisory
            </div>
            <h1 className="mt-4 font-serif text-[40px] font-normal leading-[1.12] tracking-tight text-[#1C1917] sm:text-[54px]">
              Bridging Engineering &amp; High Finance
            </h1>
            <p className="mt-5 text-[17px] leading-[1.65] text-[#44403C]">
              Founded on <strong className="font-medium text-[#1C1917]">December 2nd, 2024</strong> at NIT Trichy, IFSA NIT Trichy is the 10th APAC chapter of the International Finance Students Association. Under our guiding motto <em className="font-serif italic text-[#59110B]">“Ambition Meets Impact”</em>, we empower engineers and quantitative minds to master capital markets, venture advisory, and institutional research.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Core Team */}
      <section id="team" className="border-b border-[#E4DACB] bg-[#1C1917] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-1 mb-12">
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#B8955A]">
              Chapter Leadership
            </p>
            <h2 className="font-serif text-[34px] font-normal text-white sm:text-[44px]">
              Executive Board
            </h2>
            <p className="mt-1 text-[15px] text-[#A8A29E] max-w-xl">
              The founding core team driving IFSA NIT Trichy&apos;s research, advisory, and chapter operations.
            </p>
          </div>

          {/* Executive Board — Portrait Cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {team.filter((m) => m.vertical === 'Executive Board' || m.role.includes('President') || m.role.includes('Director')).map((member, i) => (
              <div
                key={member.id}
                className="group relative overflow-hidden rounded-[12px] bg-[#292524]"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Photo */}
                {member.headshot_url ? (
                  <Image
                    src={member.headshot_url}
                    alt={`${member.name} - ${member.role} at IFSA NIT Trichy`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                    priority={i < 2}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3B2A1A] to-[#1C1917]">
                    <span className="font-serif text-[64px] text-[#B8955A]/40">{member.name.charAt(0)}</span>
                  </div>
                )}

                {/* Permanent gradient at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Name & role — always visible at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-0 transition-transform duration-300 ease-out group-hover:translate-y-[-44px]">
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#B8955A] mb-1">{member.role}</p>
                  <h3 className="font-serif text-[20px] font-normal text-white leading-tight">{member.name}</h3>
                  {member.vertical && member.vertical !== 'Executive Board' && (
                    <p className="mt-0.5 text-[12px] text-white/50">{member.vertical}</p>
                  )}
                </div>

                {/* LinkedIn — slides up on hover */}
                {member.linkedin_url && (
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 text-[12px] font-medium text-white hover:bg-white/20 transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      View Profile →
                    </a>
                  </div>
                )}

                {/* Subtle index number */}
                <div className="absolute top-4 right-4 font-mono text-[11px] text-white/25 tabular-nums">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Values */}
      <section className="border-b border-[#E4DACB] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#7A5424]">
              Operating Principles
            </p>
            <h2 className="mt-2 font-serif text-[32px] font-normal text-[#1C1917] sm:text-[38px]">
              What We Stand For
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.t}
                className="rounded-[8px] border border-[#E4DACB] bg-[#FAF8F5] p-6 shadow-xs"
              >
                <h3 className="font-serif text-[18px] font-normal text-[#1C1917]">
                  {v.t}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#44403C]">
                  {v.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="border-b border-[#E4DACB] bg-[#F4ECE1] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div>
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#7A5424]">
              Functional Architecture
            </p>
            <h2 className="mt-2 font-serif text-[32px] font-normal text-[#1C1917] sm:text-[38px]">
              Our 5 Functional Verticals
            </h2>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {VERTICALS.map((v) => (
              <div
                key={v.title}
                className="rounded-[8px] border border-[#E4DACB] bg-white transition-colors"
              >
                <button
                  onClick={() => setOpenVert(openVert === v.title ? null : v.title)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <div>
                    <span className="font-serif text-[18px] font-normal text-[#1C1917]">
                      {v.title}
                    </span>
                    <span className="block mt-1 font-mono text-[11.5px] text-[#7A5424]">
                      {v.stack}
                    </span>
                  </div>
                  <span className="text-[22px] font-light text-[#78716C]">
                    {openVert === v.title ? '−' : '+'}
                  </span>
                </button>
                {openVert === v.title && (
                  <div className="px-6 pb-6 text-[14px] leading-relaxed text-[#44403C] border-t border-[#F4ECE1] pt-4">
                    {v.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-b border-[#E4DACB] bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[840px] px-5 sm:px-8">
          <div className="text-center">
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#7A5424]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 font-serif text-[32px] font-normal text-[#1C1917] sm:text-[38px]">
              Everything You Need to Know
            </h2>

            {/* Quick search input */}
            <div className="mt-6 max-w-md mx-auto">
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search questions (e.g. eligibility, projects, mentorship)..."
                className="w-full rounded-[6px] border border-[#BFAFA0] bg-[#FAF8F5] px-4 py-2 text-[13.5px] outline-none focus:border-[#59110B]"
              />
            </div>
          </div>

          <div className="mt-10 divide-y divide-[#E4DACB]">
            {filteredFaqs.map((f) => (
              <div key={f.id} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === f.id ? null : f.id)}
                  className="flex w-full items-center justify-between text-left gap-4"
                >
                  <span className="font-serif text-[17px] font-normal text-[#1C1917]">
                    {f.question}
                  </span>
                  <span className="text-[20px] font-light text-[#78716C] shrink-0">
                    {openFaq === f.id ? '−' : '+'}
                  </span>
                </button>
                {openFaq === f.id && (
                  <div className="mt-3 text-[14.5px] leading-relaxed text-[#44403C]">
                    {f.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Notification Form */}
      <section id="join" className="bg-[#FAF8F5] py-16 md:py-24">
        <div className="mx-auto max-w-[620px] px-5 sm:px-8 text-center">
          <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#7A5424]">
            Join the Chapter
          </p>
          <h2 className="mt-2 font-serif text-[32px] font-normal text-[#1C1917] sm:text-[38px]">
            Recruitment &amp; Analyst Induction
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#44403C]">
            We recruit analysts across all batches and engineering disciplines at the start of each semester. Sign up to receive recruitment announcements, case prompts, and workshop invitations.
          </p>

          <div className="mt-8">
            {notified ? (
              <div className="rounded-[4px] border border-[#1B6F38] bg-[#EAF5EC] p-4 text-[14px] font-medium text-[#1B6F38]">
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
                  className="rounded-[6px] border border-[#BFAFA0] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#59110B] sm:w-80 shadow-2xs"
                />
                <button
                  type="submit"
                  className="rounded-[6px] bg-[#59110B] px-6 py-3 text-[14px] font-medium text-white shadow-xs transition-all hover:bg-[#400A06]"
                >
                  Get Notified →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
