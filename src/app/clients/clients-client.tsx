'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FALLBACK_CLIENT_PROJECTS, type ClientProject } from '@/lib/fallback-data'
import { PartnerModal } from '@/components/partner-modal'

const CORPORATE_LOGOS = [
  { name: 'EY', src: '/ey-framed.png' },
  { name: 'ZS Associates', src: '/zs-framed.png' },
  { name: 'SBI Funds', src: '/sbi-framed.png' },
  { name: 'Pernod Ricard', src: '/pernod-framed.png' },
  { name: 'Microsoft', src: '/microsoft-framed.png' },
  { name: 'Novartis', src: '/novartis-framed.png' },
  { name: 'P&G', src: '/pg-framed.png' },
]

const PARTNERSHIP_MODELS = [
  {
    name: 'Research & Advisory Mandates',
    desc: 'Engage our senior analyst pods for custom valuation models, equity research briefs, market sizing (TAM/SAM/SOM), and ESG frameworks.',
    deliverables: ['Custom 3-Statement & DCF Models', 'Comprehensive Sector/Thematic Brief', 'Exclusive Deliverable Rights'],
  },
  {
    name: 'Event & Summit Sponsorship',
    desc: 'Partner on flagship initiatives including IFSA Forum, national IFSC Case Competitions, and executive masterclasses.',
    deliverables: ['Keynote & Judging Panel Access', 'Brand Placement across 1,000+ Students', 'Dedicated Case Challenge Track'],
  },
  {
    name: 'Campus Talent & Recruitment',
    desc: 'Access pre-vetted quantitative and strategic engineering talent for summer internships and full-time analyst hiring.',
    deliverables: ['Curated Chapter Resume Book', 'Direct On-Campus Presentation Slots', 'Closed-Door Networking Mixers'],
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
    <>
      {/* Hero */}
      <section className="relative border-b border-[#E4DACB] bg-[#FAF8F5] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[840px]">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4ECE1] px-3.5 py-1 font-mono text-[11px] font-medium tracking-wider uppercase text-[#7A5424]">
              Venture &amp; Corporate Advisory
            </div>
            <h1 className="mt-4 font-serif text-[40px] font-normal leading-[1.12] tracking-tight text-[#1C1917] sm:text-[54px]">
              Client Engagements &amp; Strategic Partners
            </h1>
            <p className="mt-5 text-[17px] leading-[1.65] text-[#44403C]">
              We deploy student analyst pods with rigorous engineering discipline to execute credit line architectures, climate risk models, MFD operating systems, and valuation frameworks for active ventures and institutional partners.
            </p>
            <div className="mt-8">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex h-12 items-center justify-center rounded-[6px] bg-[#59110B] px-6 text-[14px] font-medium text-white shadow-xs transition-all hover:bg-[#400A06] hover:-translate-y-0.5"
              >
                Inquire for a client engagement →
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* Institutional Partnerships Spotlight Cards (CFA Institute & WSO) */}
      <section className="border-b border-[#E4DACB] bg-[#F4ECE1] py-14 md:py-18">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-7">
            {/* CFA Institute Collaboration Spotlight Banner */}
            <div className="flex flex-col items-start justify-between gap-6 rounded-[10px] border border-[#E4DACB] bg-white p-7 sm:p-9 md:p-10 lg:flex-row lg:items-center shadow-xs transition-all hover:border-[#59110B]/50 hover:shadow-md">
              <div className="max-w-[760px]">
                <h3 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#1C1917] leading-tight">
                  Collaboration with CFA Institute
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#44403C]">
                  IFSA Network is officially collaborated with <strong className="font-medium text-[#1C1917]">CFA Institute</strong>, the premier global association of investment professionals setting the global standard for professional excellence and credentials. Through this exclusive opportunity for IFSA chapters worldwide, our analysts gain direct access to official employability toolkits, curated workshop curricula, early invitations to global investment symposiums, and participation in the CFA Student Ambassador Program.
                </p>
              </div>
              <div className="shrink-0 flex items-center self-center lg:self-auto">
                <div className="flex h-24 w-52 sm:h-28 sm:w-64 items-center justify-center rounded-[8px] border border-[#E4DACB] bg-[#FAF8F5] p-3 sm:p-4 shadow-2xs">
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

            {/* WSO Partnership Spotlight Banner */}
            <div className="flex flex-col items-start justify-between gap-6 rounded-[10px] border border-[#E4DACB] bg-white p-7 sm:p-9 md:p-10 lg:flex-row lg:items-center shadow-xs transition-all hover:border-[#59110B]/50 hover:shadow-md">
              <div className="max-w-[760px]">
                <h3 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#1C1917] leading-tight">
                  Partnered with Wall Street Oasis (WSO)
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#44403C]">
                  IFSA NIT Trichy is <strong className="font-medium text-[#1C1917]">1 of only 2 student clubs in India</strong> officially partnered with Wall Street Oasis, the world&apos;s preeminent finance careers and modeling community. Chapter analysts gain access to specialized interview prep, valuation resources, and fireside Q&amp;As with WSO Founder &amp; CEO Patrick Curtis.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-5 sm:gap-6 self-center lg:self-auto">
                <div className="flex h-20 w-44 sm:w-48 items-center justify-center rounded-[8px] border border-[#E4DACB] bg-[#FAF8F5] p-3 shadow-2xs">
                  <Image
                    src="/WSO-logo.png"
                    alt="Wall Street Oasis"
                    width={160}
                    height={55}
                    className="max-h-13 max-w-[160px] w-auto h-auto object-contain"
                  />
                </div>
                <div className="rounded-[8px] border border-[#E4DACB] bg-[#FAF8F5] px-5 py-3 text-center shadow-2xs">
                  <span className="font-serif text-[26px] font-normal text-[#59110B]">Top 2</span>
                  <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-[#78716C] mt-0.5">In India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 border-b border-[#E4DACB]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E4DACB]">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#7A5424]">
                Portfolio of Client Mandates
              </p>
              <h2 className="mt-2 font-serif text-[32px] font-normal text-[#1C1917] sm:text-[38px]">
                3 Live Mandates &amp; 6 Completed Advisory Case Studies
              </h2>
            </div>
          </div>

          {/* Filter Pills */}
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
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                    active
                      ? 'bg-[#59110B] text-white shadow-xs'
                      : 'border border-[#E4DACB] bg-white text-[#44403C] hover:border-[#59110B] hover:text-[#59110B]'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[11px] font-mono ${
                      active ? 'bg-white/20 text-white' : 'bg-[#F4ECE1] text-[#7A5424]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Cards Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((proj) => {
              const isLive = proj.status === 'Live Mandate'

              return (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className={`group cursor-pointer flex flex-col justify-between rounded-[10px] border bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-6px_rgba(89,17,11,0.12)] ${
                    isLive
                      ? 'border-[#1B6F38]/30 hover:border-[#1B6F38]'
                      : 'border-[#E4DACB] hover:border-[#59110B]'
                  }`}
                >
                  <div>
                    {/* Top Bar with Live/Completed Status */}
                    <div className="flex items-center justify-end pb-3 border-b border-[#F4ECE1]">
                      <span
                        className={`font-mono text-[10.5px] uppercase px-2.5 py-0.5 rounded-[4px] flex items-center gap-1.5 ${
                          isLive
                            ? 'bg-[#EAF5EC] text-[#1B6F38] font-semibold border border-[#1B6F38]/25'
                            : 'bg-[#FAF8F5] text-[#78716C] border border-[#E4DACB]'
                        }`}
                      >
                        {isLive ? (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1B6F38] animate-pulse" />
                            Live Mandate
                          </>
                        ) : (
                          '✓ Completed'
                        )}
                      </span>
                    </div>

                    {/* Big Prominent Logo Stage */}
                    <div className="relative my-4 flex aspect-[3/1] w-full items-center justify-center rounded-[8px] bg-white p-2.5 sm:p-3 border border-[#E4DACB] shadow-2xs group-hover:border-[#59110B]/50 transition-colors">
                      <Image
                        src={proj.logo}
                        alt={proj.client}
                        width={360}
                        height={120}
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    <h3 className="mt-2 font-serif text-[22px] font-normal text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                      {proj.client}
                    </h3>
                    <p className="mt-1 text-[13px] font-medium text-[#59110B]">
                      {proj.tagline}
                    </p>

                    <p className="mt-3 text-[13.5px] leading-relaxed text-[#44403C]">
                      {proj.overview}
                    </p>

                    <div className="mt-5 border-t border-[#F4ECE1] pt-4">
                      <p className="font-mono text-[10.5px] font-medium uppercase tracking-wider text-[#78716C]">
                        Key Deliverables
                      </p>
                      <ul className="mt-2.5 space-y-1.5 text-[12.5px] text-[#44403C]">
                        {proj.deliverables.slice(0, 2).map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#59110B] font-bold">▪</span>
                            <span className="line-clamp-1">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#F4ECE1] pt-3 flex items-center justify-between">
                    <p className="text-[12px] italic text-[#78716C] max-w-[200px] truncate">
                      <strong className="not-italic font-medium text-[#1C1917]">Impact:</strong> {proj.impact}
                    </p>
                    <span className="font-mono text-[11.5px] font-medium text-[#59110B] group-hover:underline">
                      View brief ↗
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Corporate Alliances Marquee */}
      <section className="py-16 md:py-24 border-b border-[#E4DACB]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#7A5424]">
              Corporate Network
            </p>
            <h2 className="mt-2 font-serif text-[30px] font-normal text-[#1C1917] sm:text-[36px]">
              Institutional Ecosystem &amp; Recruiters
            </h2>
            <p className="mx-auto mt-2 max-w-[60ch] text-[14.5px] text-[#78716C]">
              Firms employing our alumni and participating in chapter guest lectures, case jury panels, and workshops.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {CORPORATE_LOGOS.map((p) => (
              <div
                key={p.name}
                className="flex aspect-[3/1] items-center justify-center rounded-[8px] border border-[#E4DACB] bg-white p-2.5 sm:p-3 shadow-2xs"
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={300}
                  height={100}
                  className={`object-contain ${
                    p.name === 'P&G'
                      ? 'h-[60%] w-auto max-w-[70%]'
                      : 'h-[80%] w-[85%]'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-[#E4DACB]">
        {/* Blurred IFSA Session 1 background image (reduced blur to 40%) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/ifsa-sess-1.jpg"
            alt="IFSA Session"
            fill
            className="object-cover object-center scale-105 blur-[3.5px]"
            sizes="100vw"
            priority={false}
          />
          <div className="absolute inset-0 bg-[#F4ECE1]/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F4ECE1]/85 via-transparent to-[#F4ECE1]/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#7A5424]">
              Engagement Models
            </p>
            <h2 className="mt-3 font-serif text-[32px] font-normal text-[#1C1917] sm:text-[38px]">
              How to Partner with IFSA NIT Trichy
            </h2>
            <p className="mt-3 text-[15px] text-[#44403C]">
              Three structured pathways for startups, funds, and corporations to collaborate with our analyst chapter.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {PARTNERSHIP_MODELS.map((model) => (
              <div
                key={model.name}
                className="flex flex-col justify-between rounded-[10px] border border-[#E4DACB] bg-white/95 backdrop-blur-md p-8 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#59110B]/50 hover:shadow-lg"
              >
                <div>
                  <h3 className="font-serif text-[20px] font-normal text-[#1C1917]">
                    {model.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[#44403C]">
                    {model.desc}
                  </p>

                  <div className="mt-6 border-t border-[#F4ECE1] pt-5">
                    <p className="font-mono text-[10.5px] font-medium uppercase tracking-wider text-[#78716C]">
                      What you receive
                    </p>
                    <ul className="mt-3 space-y-2 text-[13px] text-[#44403C]">
                      {model.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-[#1B6F38] font-bold">✓</span>
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
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-[6px] bg-[#59110B] px-8 py-3.5 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#400A06] hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Inquire for mandate</span>
              <span className="text-white/80">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Case Study Deep-Dive Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-[8px] border border-[#E4DACB] bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-5 border-b border-[#E4DACB]">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-16 w-44 items-center justify-center rounded-[6px] border border-[#E4DACB] bg-white p-2.5">
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
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5EC] px-3 py-1 font-mono text-[10.5px] font-semibold uppercase text-[#1B6F38] border border-[#1B6F38]/25">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1B6F38] animate-pulse" />
                      Live Mandate
                    </span>
                  ) : (
                    <span className="rounded-[4px] bg-[#FAF8F5] px-3 py-1 font-mono text-[10.5px] font-medium uppercase text-[#78716C] border border-[#E4DACB]">
                      ✓ Completed Mandate
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-[20px] text-[#78716C] hover:text-[#1C1917] h-9 w-9 flex items-center justify-center rounded-full hover:bg-[#F4ECE1] transition-colors"
              >
                ✕
              </button>
            </div>

            <h3 className="mt-5 font-serif text-[26px] font-normal text-[#1C1917]">
              {activeProject.client}
            </h3>
            <p className="mt-1 text-[14px] font-medium text-[#59110B]">
              {activeProject.tagline}
            </p>

            <div className="mt-5 rounded-[6px] bg-[#FAF8F5] p-5 border border-[#E4DACB]">
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
                Executive Overview
              </h4>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[#44403C]">
                {activeProject.overview}
              </p>
            </div>

            <div className="mt-5">
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
                Analyst Team Deliverables
              </h4>
              <ul className="mt-3 space-y-2 text-[13.5px] text-[#44403C]">
                {activeProject.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#59110B] font-bold mt-0.5">▪</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 rounded-[6px] border border-[#E4DACB] bg-white p-4">
              <span className="font-mono text-[11px] font-medium uppercase text-[#7A5424]">Institutional Impact</span>
              <p className="mt-1 text-[14px] leading-relaxed text-[#1C1917]">
                {activeProject.impact}
              </p>
            </div>

            <div className="mt-6 flex justify-end border-t border-[#E4DACB] pt-4">
              <button
                onClick={() => setActiveProject(null)}
                className="rounded-[4px] bg-[#59110B] px-6 py-2 text-[13.5px] font-medium text-white hover:bg-[#400A06]"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
