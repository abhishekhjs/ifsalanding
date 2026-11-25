'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { FALLBACK_CLIENT_PROJECTS, type ClientProject } from '@/lib/fallback-data'
import { PartnerModal } from '@/components/partner-modal'
import StackedSections from '@/components/animata/scroll/stacked-sections'

const PARTNERSHIP_MODELS = [
  {
    name: 'Research & Advisory Mandates',
    desc: 'Engage our senior analyst pods for custom valuation models, equity research briefs, market sizing (TAM/SAM/SOM), and ESG frameworks.',
    deliverables: [
      'Custom 3-Statement & DCF Models',
      'Comprehensive Sector/Thematic Brief',
      'Exclusive Deliverable Rights',
    ],
  },
  {
    name: 'Event & Summit Sponsorship',
    desc: 'Partner on flagship initiatives including IFSA Forum, national IFSC Case Competitions, and executive masterclasses.',
    deliverables: [
      'Keynote & Judging Panel Access',
      'Brand Placement across 1,000+ Students',
      'Dedicated Case Challenge Track',
    ],
  },
  {
    name: 'Campus Talent & Recruitment',
    desc: 'Access pre-vetted quantitative and strategic engineering talent for summer internships and full-time analyst hiring.',
    deliverables: [
      'Curated Chapter Resume Book',
      'Direct On-Campus Presentation Slots',
      'Closed-Door Networking Mixers',
    ],
  },
]

export function ClientsPageClient() {
  const [modalOpen, setModalOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<ClientProject | null>(null)
  const [filter, setFilter] = useState<'All' | 'Live Mandates' | 'Completed Mandates'>('All')

  const displayedProjects = FALLBACK_CLIENT_PROJECTS.filter((proj) => {
    if (filter === 'Live Mandates') return proj.status === 'Live Mandate'
    if (filter === 'Completed Mandates') return proj.status === 'Completed Mandate'
    return true
  })

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
            <Breadcrumbs items={[{ label: 'Clients & Partners' }]} />

            <h1 className="mt-6 font-serif text-[42px] sm:text-[56px] md:text-[66px] font-black leading-[1.02] tracking-[-0.03em] text-[#111418]">
              Client Engagements &amp; Strategic Partners
            </h1>

            <p className="mt-6 text-[16px] sm:text-[17.5px] leading-[1.75] text-[#555048]">
              We deploy student analyst pods with rigorous engineering discipline to execute credit line architectures, climate risk models, MFD operating systems, and valuation frameworks for active ventures and institutional partners.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex h-11 items-center justify-center bg-[#184E32] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#133F28]"
              >
                Inquire for a client engagement →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTITUTIONAL PARTNERSHIPS SPOTLIGHT (CFA & WSO) ──────────── */}
      <section className="border-b border-[#E6DFD3] bg-[#FAF7F0] py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-7">
            {/* CFA Institute Collaboration Card */}
            <div className="flex flex-col items-start justify-between gap-6 border border-[#E6DFD3] bg-white p-7 sm:p-9 md:p-10 lg:flex-row lg:items-center transition-all hover:border-[#111418] hover:shadow-xs">
              <div className="max-w-[760px]">
                <h3 className="font-serif text-[26px] sm:text-[32px] font-black text-[#111418] leading-tight">
                  Collaboration with CFA Institute
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#555048]">
                  IFSA Network is officially collaborated with <strong className="font-semibold text-[#111418]">CFA Institute</strong>, the premier global association of investment professionals setting the benchmark for professional excellence and credentials. Through this exclusive partnership for IFSA chapters worldwide, our analysts gain direct access to official employability toolkits, curated workshop curricula, early invitations to global investment symposiums, and participation in the CFA Student Ambassador Program.
                </p>
              </div>
              <div className="shrink-0 flex items-center self-center lg:self-auto">
                <div className="flex h-24 w-52 sm:h-28 sm:w-64 items-center justify-center border border-[#E6DFD3] bg-[#FAF7F0] p-3 sm:p-4">
                  <Image
                    src="/cfa-institute-large.png"
                    alt="CFA Institute"
                    width={240}
                    height={80}
                    className="max-h-18 sm:max-h-20 max-w-[210px] sm:max-w-[230px] w-auto h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* WSO Partnership Spotlight Card */}
            <div className="flex flex-col items-start justify-between gap-6 border border-[#E6DFD3] bg-white p-7 sm:p-9 md:p-10 lg:flex-row lg:items-center transition-all hover:border-[#111418] hover:shadow-xs">
              <div className="max-w-[760px]">
                <h3 className="font-serif text-[26px] sm:text-[32px] font-black text-[#111418] leading-tight">
                  Partnered with Wall Street Oasis (WSO)
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#555048]">
                  IFSA NIT Trichy is <strong className="font-semibold text-[#111418]">1 of only 2 student clubs in India</strong> officially partnered with Wall Street Oasis, the world&apos;s preeminent finance careers and modeling community. Chapter analysts gain access to specialized interview prep, valuation resources, and fireside Q&amp;As with WSO Founder &amp; CEO Patrick Curtis.
                </p>
              </div>
              <div className="shrink-0 flex items-center self-center lg:self-auto">
                <div className="flex h-22 w-44 sm:w-48 items-center justify-center border border-[#E6DFD3] bg-[#FAF7F0] p-3">
                  <Image
                    src="/WSO-logo.png"
                    alt="Wall Street Oasis"
                    width={160}
                    height={55}
                    className="max-h-13 max-w-[160px] w-auto h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT MANDATES PORTFOLIO ────────────────────────────────── */}
      <section className="py-16 md:py-24 border-b border-[#E6DFD3] bg-[#FAF7F0]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E6DFD3]">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#184E32]">
                PORTFOLIO OF CLIENT MANDATES
              </p>
              <h2 className="mt-2 font-serif text-[32px] sm:text-[40px] font-black tracking-[-0.02em] text-[#111418]">
                3 Live Mandates &amp; 6 Completed Advisory Studies
              </h2>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 mt-8">
            {(['All', 'Live Mandates', 'Completed Mandates'] as const).map((tab) => {
              const count =
                tab === 'All'
                  ? FALLBACK_CLIENT_PROJECTS.length
                  : tab === 'Live Mandates'
                  ? FALLBACK_CLIENT_PROJECTS.filter((p) => p.status === 'Live Mandate').length
                  : FALLBACK_CLIENT_PROJECTS.filter((p) => p.status === 'Completed Mandate').length

              const active = filter === tab
              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex items-center gap-2 border px-4 py-2 text-[12.5px] font-semibold transition-all ${
                    active
                      ? 'border-[#184E32] bg-[#184E32] text-white shadow-xs'
                      : 'border-[#E6DFD3] bg-white text-[#555048] hover:border-[#111418] hover:text-[#111418]'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`px-1.5 py-0.2 text-[10.5px] font-mono ${
                      active ? 'bg-white/20 text-white' : 'bg-[#FAF7F0] text-[#184E32] border border-[#E6DFD3]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Stacked Sections Portfolio Deck */}
          <StackedSections
            key={filter}
            stackOffset={42}
            paneGap="gap-6"
            scrollRunway="80px"
            className="mt-10"
          >
            {displayedProjects.map((proj, idx) => {
              const isLive = proj.status === 'Live Mandate'

              return (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className={`group cursor-pointer w-full rounded-[16px] border bg-white p-6 sm:p-9 md:p-10 shadow-[0_14px_36px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${
                    isLive
                      ? 'border-[#184E32]/40 hover:border-[#184E32]'
                      : 'border-[#E6DFD3] hover:border-[#111418]'
                  }`}
                >
                  {/* Top Header / Peek Strip: stays visible as cards stack */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E6DFD3] pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase text-[#184E32]">
                        MANDATE 0{idx + 1}
                      </span>
                      <span className="text-[#8C7A6B] font-mono">/</span>
                      <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.1em] uppercase text-[#78716C]">
                        {proj.domain}
                      </span>
                    </div>

                    <span
                      className={`font-mono text-[10.5px] uppercase px-3 py-1 border flex items-center gap-1.5 rounded-full ${
                        isLive
                          ? 'bg-[#184E32]/10 text-[#184E32] font-bold border-[#184E32]/30'
                          : 'bg-[#FAF7F0] text-[#78716C] border-[#E6DFD3]'
                      }`}
                    >
                      {isLive ? (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#184E32] animate-pulse" />
                          Live Mandate
                        </>
                      ) : (
                        '✓ Completed'
                      )}
                    </span>
                  </div>

                  {/* Card Body: 2-Column Responsive Dossier */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Main Info */}
                    <div className="lg:col-span-8">
                      <h3 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] font-black text-[#111418] tracking-tight group-hover:text-[#184E32] transition-colors leading-tight">
                        {proj.client}
                      </h3>
                      <p className="mt-1.5 font-mono text-[11px] sm:text-[12px] font-semibold tracking-wider uppercase text-[#184E32]">
                        {proj.tagline}
                      </p>

                      <p className="mt-3.5 text-[14px] sm:text-[15px] leading-relaxed text-[#555048]">
                        {proj.overview}
                      </p>

                      <div className="mt-5 border-t border-[#E6DFD3] pt-4">
                        <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#8C7A6B]">
                          Core Mandate Deliverables
                        </p>
                        <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px] text-[#555048]">
                          {proj.deliverables.slice(0, 4).map((d, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#184E32] font-bold mt-0.5">▪</span>
                              <span className="line-clamp-2">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 border border-[#184E32]/25 bg-[#184E32]/5 p-3.5 rounded-[6px]">
                        <span className="font-mono text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#184E32] block">
                          Institutional Impact
                        </span>
                        <p className="mt-1 text-[13px] sm:text-[13.5px] text-[#111418] font-medium leading-relaxed">
                          {proj.impact}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Logo & CTA */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
                      <div className="relative aspect-[16/10] sm:aspect-[3/2] w-full flex items-center justify-center bg-[#FAF7F0] p-6 border border-[#E6DFD3] rounded-[10px] group-hover:border-[#111418] transition-colors shadow-xs">
                        <Image
                          src={proj.logo}
                          alt={`${proj.client} logo - IFSA NIT Trichy Advisory Partner`}
                          width={320}
                          height={120}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="border-t border-[#E6DFD3] pt-4 flex items-center justify-between text-[12.5px] sm:text-[13px] font-mono tracking-wider uppercase font-semibold text-[#111418] group-hover:text-[#184E32] transition-colors">
                        <span>Review Full Case Study</span>
                        <span className="transition-transform group-hover:translate-x-1.5 font-bold text-[15px]">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </StackedSections>
        </div>
      </section>

      {/* ── PARTNERSHIP ENGAGEMENT MODELS ────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-[#E6DFD3] bg-[#FAF7F0]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#184E32]">
              ENGAGEMENT MODELS
            </p>
            <h2 className="mt-3 font-serif text-[32px] sm:text-[40px] font-black tracking-[-0.02em] text-[#111418]">
              How to Partner with IFSA NIT Trichy
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-[#555048]">
              Three structured pathways for startups, investment funds, and corporate institutions to collaborate directly with our analyst chapter.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-7 md:grid-cols-3">
            {PARTNERSHIP_MODELS.map((model) => (
              <div
                key={model.name}
                className="flex flex-col justify-between border border-[#E6DFD3] bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[#111418] hover:shadow-xs"
              >
                <div>
                  <h3 className="font-serif text-[20px] font-bold text-[#111418]">
                    {model.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[#555048]">
                    {model.desc}
                  </p>

                  <div className="mt-6 border-t border-[#E6DFD3] pt-5">
                    <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#8C7A6B]">
                      WHAT YOU RECEIVE
                    </p>
                    <ul className="mt-3 space-y-2 text-[13px] text-[#555048]">
                      {model.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-[#184E32] font-bold">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex h-11 items-center justify-center bg-[#184E32] px-8 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#133F28]"
            >
              <span>Inquire for mandate</span>
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY DEEP-DIVE MODAL ───────────────────────────────── */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl border border-[#111418] bg-[#FAF7F0] p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-[#E6DFD3]">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-14 w-36 items-center justify-center border border-[#E6DFD3] bg-white p-2">
                  <Image
                    src={activeProject.logo}
                    alt={activeProject.client}
                    width={180}
                    height={60}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {activeProject.status === 'Live Mandate' ? (
                    <span className="inline-flex items-center gap-1.5 border border-[#184E32]/30 bg-[#184E32]/10 px-3 py-1 font-mono text-[10.5px] font-bold uppercase text-[#184E32]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#184E32] animate-pulse" />
                      Live Mandate
                    </span>
                  ) : (
                    <span className="border border-[#E6DFD3] bg-white px-3 py-1 font-mono text-[10.5px] font-semibold uppercase text-[#78716C]">
                      ✓ Completed Mandate
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="font-mono text-[14px] text-[#78716C] hover:text-[#111418] h-8 w-8 flex items-center justify-center border border-[#E6DFD3] hover:border-[#111418] transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="mt-5 font-serif text-[26px] font-bold text-[#111418]">
              {activeProject.client}
            </h3>
            <p className="mt-1 font-mono text-[11px] font-semibold tracking-wider uppercase text-[#184E32]">
              {activeProject.tagline}
            </p>

            <div className="mt-5 border border-[#E6DFD3] bg-white p-5">
              <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#8C7A6B]">
                Executive Overview
              </h4>
              <p className="mt-2 text-[14px] leading-relaxed text-[#555048]">
                {activeProject.overview}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#8C7A6B]">
                Analyst Team Deliverables
              </h4>
              <ul className="mt-3 space-y-2 text-[13.5px] text-[#555048]">
                {activeProject.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#184E32] font-bold mt-0.5">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 border border-[#184E32]/30 bg-[#184E32]/5 p-4">
              <span className="font-mono text-[10.5px] font-bold uppercase text-[#184E32]">
                Institutional Impact
              </span>
              <p className="mt-1 text-[13.5px] leading-relaxed text-[#111418] font-medium">
                {activeProject.impact}
              </p>
            </div>

            <div className="mt-6 flex justify-end border-t border-[#E6DFD3] pt-4">
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="inline-flex h-10 items-center justify-center bg-[#184E32] px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#133F28]"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
