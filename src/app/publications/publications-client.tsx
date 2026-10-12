'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Eye, BookOpen, FileText } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Pub, resolveCover, resolvePdf } from '@/lib/publication-utils'
import { PdfViewerModal } from '@/components/publications/pdf-viewer-modal'

const CATS = ['All', 'Macro', 'Sector notes', 'Equity research', 'Case studies']
const YEARS = ['All', '2026', '2025']

const PROCESS = [
  { n: 1, t: 'Idea & Scoping', b: 'An analyst pitches a company initiation, thematic thesis, or macro policy topic to the research board.' },
  { n: 2, t: 'Financial Modeling', b: 'The team constructs 3-statement forecast models, DCF valuations, and unit economic frameworks.' },
  { n: 3, t: 'Double-Blind Review', b: 'Two senior analysts independently audit all mathematical assumptions, data citations, and formulas.' },
  { n: 4, t: 'Board Sign-Off', b: 'The research directors and faculty/alumni mentors review the thesis, disclosures, and presentation quality.' },
  { n: 5, t: 'Public Release', b: 'The complete research report and abstract are published to our institutional distribution channels.' },
]

export function PublicationsPageClient({ pubs }: { pubs: Pub[] }) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [year, setYear] = useState('All')
  const [sort, setSort] = useState<'new' | 'old'>('new')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeModalPub, setActiveModalPub] = useState<Pub | null>(null)
  const [viewerPub, setViewerPub] = useState<Pub | null>(null)

  const filtered = useMemo(() => {
    return pubs
      .filter((p) => cat === 'All' || p.category === cat)
      .filter((p) => year === 'All' || String(p.year) === year)
      .filter((p) => !q || (p.title + p.authors + p.category + p.abstract).toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => (sort === 'new' ? b.year - a.year : a.year - b.year))
  }, [pubs, q, cat, year, sort])

  // Split into Spotlight Feature (if viewing All with no search query) and Gallery Grid
  const isDefaultView = cat === 'All' && year === 'All' && !q.trim()
  const spotlightPub = isDefaultView && filtered.length > 0 ? filtered[0] : null
  const galleryPubs = isDefaultView && filtered.length > 0 ? filtered.slice(1) : filtered

  const handleCopyCitation = (pub: Pub, e: React.MouseEvent) => {
    e.stopPropagation()
    const citation = `IFSA NIT Trichy (${pub.year}). "${pub.title}". Research Report. IFSA NIT Trichy Chapter Archive.`
    navigator.clipboard.writeText(citation)
    setCopiedId(pub.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-[#E4DACB] bg-[#FAF8F5] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[820px]">
            <Breadcrumbs items={[{ label: 'Publications & Research' }]} />
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4ECE1] px-3.5 py-1 font-mono text-[11px] font-medium tracking-wider uppercase text-[#7A5424]">
              Peer-Reviewed Research Archive
            </div>
            <h1 className="mt-4 font-serif text-[40px] font-normal leading-[1.12] tracking-tight text-[#1C1917] sm:text-[54px]">
              Chapter Publications &amp; Theses
            </h1>
            <p className="mt-5 text-[17px] leading-[1.65] text-[#44403C]">
              Institutional-grade equity research initiations, fintech sector breakdowns, macro policy analyses, and microfinance impact studies, authored by student analysts and audited via double-blind peer review.
            </p>
          </div>
        </div>
      </section>

      {/* Publications Listing & Filter Section */}
      <section className="py-14 md:py-20 bg-[#FCFAF7]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          {/* Search + Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-8">
            <div className="relative flex-1 max-w-[480px]">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by company, thesis topic or author..."
                className="w-full rounded-[6px] border border-[#BFAFA0] bg-white px-4 py-2.5 text-[14.5px] text-[#1C1917] placeholder-[#78716C] outline-none transition-all focus:border-[#59110B] focus:ring-2 focus:ring-[#59110B]/20 shadow-xs"
              />
              {q && (
                <button
                  onClick={() => setQ('')}
                  className="absolute right-3 top-2.5 text-[12px] text-[#78716C] hover:text-[#1C1917]"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="rounded-[6px] border border-[#BFAFA0] bg-white px-3.5 py-2 text-[13.5px] text-[#1C1917] outline-none focus:border-[#59110B] shadow-2xs"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y === 'All' ? 'All Years' : `Year ${y}`}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as 'new' | 'old')}
                className="rounded-[6px] border border-[#BFAFA0] bg-white px-3.5 py-2 text-[13.5px] text-[#1C1917] outline-none focus:border-[#59110B] shadow-2xs"
              >
                <option value="new">Newest First</option>
                <option value="old">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-10">
            {CATS.map((c) => {
              const count = c === 'All' ? pubs.length : pubs.filter((p) => p.category === c).length
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                    cat === c
                      ? 'bg-[#59110B] text-white shadow-xs'
                      : 'border border-[#E4DACB] bg-white text-[#44403C] hover:border-[#59110B] hover:text-[#59110B]'
                  }`}
                >
                  <span>{c}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[11px] font-mono ${
                      cat === c ? 'bg-white/20 text-white' : 'bg-[#F4ECE1] text-[#7A5424]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Empty State */}
          {filtered.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-[#BFAFA0] p-16 text-center bg-white">
              <p className="text-[15px] text-[#78716C]">
                No publications match your selected criteria.
              </p>
              <button
                onClick={() => {
                  setQ('')
                  setCat('All')
                  setYear('All')
                }}
                className="mt-4 text-[13.5px] font-medium text-[#59110B] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* SPOTLIGHT DOSSIER (Flagship Top Feature) */}
              {spotlightPub && (
                <div className="group rounded-[12px] border border-[#E4DACB] bg-white p-6 sm:p-8 md:p-10 shadow-sm transition-all duration-300 hover:border-[#59110B] hover:shadow-[0_20px_40px_-12px_rgba(89,17,11,0.12)]">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                    {/* Left: Tactile A4 Document Stage */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-[320px] rounded-[10px] bg-gradient-to-b from-[#F7F3EC] to-[#ECE3D2] p-6 sm:p-8 flex items-center justify-center border border-[#E4DACB]/80 shadow-inner group/stage">
                        <button
                          type="button"
                          onClick={() => setViewerPub(spotlightPub)}
                          className="relative aspect-[1/1.414] w-[210px] sm:w-[240px] rounded-[3px] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/10 transition-all duration-300 group-hover/stage:-translate-y-2 group-hover/stage:shadow-[0_20px_40px_rgba(89,17,11,0.22)] block cursor-pointer text-left"
                          title="Click to launch in-page PDF reader"
                        >
                          {/* Tactile Book Spine Gradient */}
                          <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-black/10 to-transparent z-10" />
                          <Image
                            src={resolveCover(spotlightPub)}
                            alt={`Research Dossier: ${spotlightPub.title} - IFSA NIT Trichy`}
                            fill
                            sizes="(max-width: 768px) 240px, 320px"
                            className="object-cover"
                            priority
                          />
                          {/* Hover Action Badge */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/stage:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20">
                            <span className="rounded-full bg-white/95 backdrop-blur-xs px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wide uppercase text-[#59110B] shadow-md flex items-center gap-1.5">
                              <Eye className="h-3.5 w-3.5" />
                              <span>Read Dossier</span>
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Right: Editorial Typography & Actions */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.2] text-[#1C1917] tracking-tight group-hover:text-[#59110B] transition-colors">
                          <button
                            type="button"
                            onClick={() => setViewerPub(spotlightPub)}
                            className="text-left hover:underline cursor-pointer"
                          >
                            {spotlightPub.title}
                          </button>
                        </h2>

                        <p className="mt-2.5 font-mono text-[12px] font-medium text-[#7A5424] tracking-wide">
                          {spotlightPub.authors}
                        </p>

                        <p className="mt-4 text-[15px] sm:text-[15.5px] leading-[1.7] text-[#44403C]">
                          {spotlightPub.abstract}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="mt-8 flex flex-wrap items-center gap-3.5 pt-6 border-t border-[#F4ECE1]">
                        <button
                          type="button"
                          onClick={() => setViewerPub(spotlightPub)}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-[5px] bg-[#59110B] px-6 text-[13.5px] font-medium text-white shadow-sm transition-all hover:bg-[#400A06] hover:shadow-md cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Read Full Dossier</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveModalPub(spotlightPub)}
                          className="inline-flex h-11 items-center justify-center rounded-[5px] border border-[#E4DACB] bg-[#FAF8F5] px-5 text-[13px] font-medium text-[#1C1917] hover:border-[#59110B] hover:text-[#59110B] transition-colors cursor-pointer"
                        >
                          Executive Briefing
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleCopyCitation(spotlightPub, e)}
                          className="inline-flex h-11 items-center justify-center rounded-[5px] border border-[#E4DACB] bg-white px-4 text-[12.5px] font-mono text-[#78716C] hover:border-[#59110B] hover:text-[#59110B] transition-colors cursor-pointer"
                        >
                          {copiedId === spotlightPub.id ? '✓ Citation Copied' : '📋 Cite Report'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RHYTHMIC 3-COLUMN RESEARCH GALLERY */}
              <div>
                {spotlightPub && (
                  <div className="flex items-center justify-between pb-6 border-b border-[#E4DACB]">
                    <div>
                      <h3 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#1C1917]">
                        Research Desks &amp; Sector Notes
                      </h3>
                      <p className="mt-1 text-[14px] text-[#78716C]">
                        Peer-reviewed equity initiations, fintech sector notes, and macro briefs.
                      </p>
                    </div>
                    <span className="font-mono text-[12px] text-[#7A5424] font-medium">
                      {galleryPubs.length} Documents
                    </span>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {galleryPubs.map((pub) => {
                    const coverUrl = resolveCover(pub)

                    return (
                      <article
                        key={pub.id}
                        className="group relative flex flex-col justify-end overflow-hidden rounded-[12px] border border-[#E4DACB] bg-[#FAF8F5] shadow-xs transition-all duration-300 hover:border-[#59110B] hover:shadow-[0_20px_40px_-10px_rgba(89,17,11,0.18)] min-h-[500px] sm:min-h-[520px]"
                      >
                        {/* 1. Underlying Full-Bleed Cover Image */}
                        <div 
                          className="absolute inset-0 z-0 cursor-pointer"
                          onClick={() => setViewerPub(pub)}
                        >
                          <Image
                            src={coverUrl}
                            alt={`Research Report: ${pub.title} - IFSA NIT Trichy`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />

                          {/* Hover Bottom Dark Scrim */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                          {/* Hover Action Overlay */}
                          <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <span className="inline-flex items-center gap-2 font-mono text-[13.5px] font-semibold text-white tracking-wide">
                              <Eye className="h-4 w-4" />
                              <span>Read Dossier</span>
                              <span className="text-[16px] transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </span>
                            <span className="rounded-full bg-white/20 backdrop-blur-xs px-2.5 py-0.5 font-mono text-[11px] text-white/90">
                              PDF Reader
                            </span>
                          </div>
                        </div>

                        {/* 2. Sliding Description Panel (Exact Content & Styling) */}
                        <div className="relative z-20 flex flex-col justify-between rounded-b-[12px] border-t border-[#E4DACB] bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-full shadow-[0_-6px_24px_rgba(0,0,0,0.06)]">
                          <div>
                            <h4 className="font-serif text-[18.5px] font-normal leading-[1.3] text-[#1C1917] group-hover:text-[#59110B] transition-colors line-clamp-2">
                              <button
                                type="button"
                                onClick={() => setViewerPub(pub)}
                                className="text-left hover:underline cursor-pointer"
                              >
                                {pub.title}
                              </button>
                            </h4>

                            <p className="mt-1.5 font-mono text-[11px] text-[#78716C] line-clamp-1">
                              {pub.authors}
                            </p>

                            <p className="mt-3 text-[13px] leading-relaxed text-[#57534E] line-clamp-3">
                              {pub.abstract}
                            </p>
                          </div>

                          {/* Footer Action Bar */}
                          <div className="mt-6 flex items-center justify-between gap-2 border-t border-[#F4ECE1] pt-4">
                            <button
                              type="button"
                              onClick={() => setViewerPub(pub)}
                              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#59110B] hover:text-[#400A06] transition-colors cursor-pointer"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>Read Dossier</span>
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setActiveModalPub(pub)}
                                className="rounded-[4px] border border-[#E4DACB] bg-[#FAF8F5] px-2.5 py-1 text-[11.5px] font-medium text-[#44403C] hover:border-[#59110B] hover:text-[#59110B] transition-colors cursor-pointer"
                              >
                                Briefing
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleCopyCitation(pub, e)}
                                title="Copy Citation"
                                className="rounded-[4px] border border-transparent px-2 py-1 text-[11.5px] font-mono text-[#78716C] hover:text-[#59110B] transition-colors cursor-pointer"
                              >
                                {copiedId === pub.id ? '✓' : 'Cite'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Review Process */}
      <section className="border-t border-[#E4DACB] bg-[#F4ECE1] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-[#7A5424]">
              Quality Assurance Framework
            </p>
            <h2 className="mt-3 font-serif text-[32px] font-normal tracking-tight text-[#1C1917] sm:text-[38px]">
              How we publish institutional research
            </h2>
            <p className="mt-3 text-[15px] text-[#44403C]">
              Every published report passes through a rigorous five-stage pipeline to guarantee mathematical precision and unbiased analysis.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col justify-between rounded-[8px] border border-[#E4DACB] bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#59110B] font-serif text-[15px] font-normal text-white">
                    {step.n}
                  </div>
                  <h3 className="mt-4 font-serif text-[16px] font-normal text-[#1C1917]">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-[#78716C]">
                    {step.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Briefing Modal with Crisp Thumbnail Preview */}
      {activeModalPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-[10px] border border-[#E4DACB] bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4DACB]">
              <span className="rounded-[3px] bg-[#F4ECE1] px-2.5 py-0.5 font-mono text-[10.5px] font-medium uppercase text-[#7A5424]">
                {activeModalPub.category}
              </span>
              <button
                onClick={() => setActiveModalPub(null)}
                className="text-[18px] text-[#78716C] hover:text-[#1C1917] h-8 w-8 flex items-center justify-center rounded-full hover:bg-[#F4ECE1]"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Modal Cover Image */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative aspect-[1/1.414] w-[160px] sm:w-[190px] rounded-[3px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/25 to-transparent z-10" />
                  <Image
                    src={resolveCover(activeModalPub)}
                    alt={activeModalPub.title}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Modal Details */}
              <div className="md:col-span-8">
                <h3 className="font-serif text-[22px] sm:text-[25px] font-normal leading-snug text-[#1C1917]">
                  {activeModalPub.title}
                </h3>
                <p className="mt-1.5 font-mono text-[12px] text-[#7A5424] font-medium">
                  {activeModalPub.authors}
                </p>

                <div className="mt-4 rounded-[6px] bg-[#FAF8F5] p-5 border border-[#E4DACB]">
                  <h4 className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#78716C]">
                    Executive Abstract &amp; Key Findings
                  </h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#44403C]">
                    {activeModalPub.abstract}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E4DACB] pt-5">
              <button
                type="button"
                onClick={() => {
                  setViewerPub(activeModalPub)
                  setActiveModalPub(null)
                }}
                className="inline-flex items-center gap-2 rounded-[5px] bg-[#59110B] px-5 py-2.5 text-[13px] font-medium text-white shadow-xs hover:bg-[#400A06] transition-all cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                <span>Read Full Report in Reader</span>
              </button>

              <div className="flex items-center gap-2.5">
                <a
                  href={resolvePdf(activeModalPub)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[4px] border border-[#E4DACB] bg-[#FAF8F5] px-3.5 py-2 text-[12.5px] font-mono text-[#44403C] hover:border-[#59110B] transition-colors"
                  title="Open PDF directly in new tab"
                >
                  Raw Tab ↗
                </a>
                <button
                  onClick={(e) => handleCopyCitation(activeModalPub, e)}
                  className="rounded-[4px] border border-[#E4DACB] bg-[#FAF8F5] px-4 py-2 text-[12.5px] font-mono text-[#44403C] hover:border-[#59110B]"
                >
                  {copiedId === activeModalPub.id ? '✓ Copied' : 'Copy Citation'}
                </button>
                <button
                  onClick={() => setActiveModalPub(null)}
                  className="rounded-[4px] border border-[#E4DACB] px-4 py-2 text-[13px] font-medium text-[#78716C] hover:text-[#1C1917]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flagship In-Page PDF Viewer Modal */}
      <PdfViewerModal
        pub={viewerPub}
        allPubs={pubs}
        isOpen={!!viewerPub}
        onClose={() => setViewerPub(null)}
        onSelectPub={(p) => setViewerPub(p)}
      />
    </>
  )
}
