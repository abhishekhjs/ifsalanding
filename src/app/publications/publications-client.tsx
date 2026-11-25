'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Pub, resolveCover, resolvePdf } from '@/lib/publication-utils'
import { PdfViewerModal } from '@/components/publications/pdf-viewer-modal'

const CATS = ['All', 'Macro', 'Sector notes', 'Equity research', 'Case studies']

const PROCESS = [
  { n: '01', t: 'Idea & Scoping', b: 'An analyst pitches a company initiation, thematic thesis, or macro policy topic to the research board.' },
  { n: '02', t: 'Financial Modeling', b: 'The team constructs 3-statement forecast models, DCF valuations, and unit economic frameworks.' },
  { n: '03', t: 'Double-Blind Review', b: 'Two senior analysts independently audit all mathematical assumptions, data citations, and formulas.' },
  { n: '04', t: 'Board Sign-Off', b: 'The research directors and faculty/alumni mentors review the thesis, disclosures, and presentation quality.' },
  { n: '05', t: 'Public Release', b: 'The complete research report and abstract are published to our institutional distribution channels.' },
]

export function PublicationsPageClient({ pubs }: { pubs: Pub[] }) {
  const [cat, setCat] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeModalPub, setActiveModalPub] = useState<Pub | null>(null)
  const [viewerPub, setViewerPub] = useState<Pub | null>(null)

  const filtered = useMemo(() => {
    return pubs
      .filter((p) => cat === 'All' || p.category === cat)
      .sort((a, b) => b.year - a.year)
  }, [pubs, cat])

  // Split into Spotlight Feature (if viewing All) and Gallery Grid
  const isDefaultView = cat === 'All'
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
            <Breadcrumbs items={[{ label: 'Publications & Research' }]} />

            <h1 className="mt-6 font-serif text-[42px] sm:text-[56px] md:text-[66px] font-black leading-[1.02] tracking-[-0.03em] text-[#111418]">
              Chapter Publications &amp; Theses
            </h1>

            <p className="mt-6 text-[16px] sm:text-[17.5px] leading-[1.75] text-[#555048]">
              Institutional-grade equity research initiations, fintech sector breakdowns, macro policy analyses, and microfinance impact studies, authored by student analysts and audited via double-blind peer review.
            </p>
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS LISTING & ARCHIVE SECTION ────────────────────── */}
      <section className="py-14 md:py-20 bg-[#FAF7F0] border-b border-[#E6DFD3]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-10">
            {CATS.map((c) => {
              const count = c === 'All' ? pubs.length : pubs.filter((p) => p.category === c).length
              const active = cat === c
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`flex items-center gap-2 border px-4 py-2 text-[12.5px] font-semibold transition-all ${
                    active
                      ? 'border-[#184E32] bg-[#184E32] text-white shadow-xs'
                      : 'border-[#E6DFD3] bg-white text-[#555048] hover:border-[#111418] hover:text-[#111418]'
                  }`}
                >
                  <span>{c}</span>
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

          {/* Empty State */}
          {filtered.length === 0 ? (
            <div className="border border-dashed border-[#E6DFD3] p-16 text-center bg-white">
              <p className="text-[15px] text-[#555048]">
                No publications match your selected criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCat('All')
                }}
                className="mt-4 font-mono text-[12px] font-bold uppercase tracking-wider text-[#184E32] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* ── SPOTLIGHT DOSSIER (Flagship Top Feature) ─────────── */}
              {spotlightPub && (
                <div className="group border border-[#E6DFD3] bg-white p-7 sm:p-9 md:p-11 transition-all duration-300 hover:border-[#111418] hover:shadow-md">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                    {/* Left: Tactile A4 Document Stage */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-[340px] bg-[#FAF7F0] p-6 sm:p-8 flex items-center justify-center border border-[#E6DFD3] group/stage">
                        <button
                          type="button"
                          onClick={() => setViewerPub(spotlightPub)}
                          className="relative aspect-[1/1.414] w-[220px] sm:w-[250px] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.18)] border border-[#111418]/15 transition-all duration-300 group-hover/stage:-translate-y-2 group-hover/stage:shadow-[0_20px_40px_rgba(24,78,50,0.25)] block cursor-pointer text-left"
                          title="Click to launch in-page PDF reader"
                        >
                          {/* Tactile Book Spine Gradient */}
                          <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent z-10" />
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
                            <span className="bg-[#184E32] px-4 py-2 font-mono text-[11px] font-bold tracking-wide uppercase text-white shadow-md flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              <span>Read Dossier</span>
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Right: Editorial Typography & Actions */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#184E32] mb-3">
                          <span>FEATURED DOSSIER · {spotlightPub.category}</span>
                        </div>

                        <h2 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] font-black leading-[1.15] text-[#111418] tracking-[-0.02em] group-hover:text-[#184E32] transition-colors">
                          <button
                            type="button"
                            onClick={() => setViewerPub(spotlightPub)}
                            className="text-left hover:underline cursor-pointer"
                          >
                            {spotlightPub.title}
                          </button>
                        </h2>

                        <p className="mt-2.5 font-mono text-[11.5px] font-semibold text-[#8C7A6B] uppercase tracking-wider">
                          AUTHORS: {spotlightPub.authors} · {spotlightPub.year}
                        </p>

                        <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.75] text-[#555048]">
                          {spotlightPub.abstract}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-[#E6DFD3]">
                        <button
                          type="button"
                          onClick={() => setViewerPub(spotlightPub)}
                          className="inline-flex h-11 items-center justify-center gap-2 bg-[#184E32] px-6 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#133F28] cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Read Full Dossier</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveModalPub(spotlightPub)}
                          className="inline-flex h-11 items-center justify-center border border-[#111418] bg-[#FAF7F0] px-5 text-[13px] font-semibold text-[#111418] hover:bg-white transition-colors cursor-pointer"
                        >
                          Executive Briefing
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleCopyCitation(spotlightPub, e)}
                          className="inline-flex h-11 items-center justify-center border border-[#E6DFD3] bg-[#FAF7F0] px-4 text-[12px] font-mono uppercase tracking-wider text-[#555048] hover:border-[#111418] hover:text-[#111418] transition-colors cursor-pointer"
                        >
                          {copiedId === spotlightPub.id ? '✓ Citation Copied' : '📋 Cite Report'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── 3-COLUMN RESEARCH GALLERY ────────────────────────── */}
              <div>
                {spotlightPub && (
                  <div className="flex items-center justify-between pb-6 border-b border-[#E6DFD3]">
                    <div>
                      <h3 className="font-serif text-[26px] sm:text-[32px] font-black tracking-tight text-[#111418]">
                        Archive Catalogue
                      </h3>
                    </div>
                    <span className="font-mono text-[11.5px] text-[#184E32] font-bold uppercase tracking-wider border border-[#184E32]/30 bg-[#184E32]/10 px-3 py-1">
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
                        className="group relative flex flex-col justify-end overflow-hidden border border-[#E6DFD3] bg-[#FAF7F0] transition-all duration-300 hover:border-[#111418] hover:shadow-md min-h-[500px] sm:min-h-[520px]"
                      >
                        {/* 1. Underlying Cover Image */}
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                          {/* Hover Action Overlay */}
                          <div className="absolute inset-x-0 bottom-0 z-20 p-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <span className="inline-flex items-center gap-2 font-mono text-[13px] font-bold text-white tracking-wide uppercase">
                              <Eye className="h-4 w-4 text-[#4ADE80]" />
                              <span>Read Dossier</span>
                              <span className="text-[16px] transition-transform duration-200 group-hover:translate-x-1">→</span>
                            </span>
                            <span className="border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-white">
                              PDF Reader
                            </span>
                          </div>
                        </div>

                        {/* 2. Sliding Description Panel */}
                        <div className="relative z-20 flex flex-col justify-between border-t border-[#E6DFD3] bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-full shadow-[0_-6px_24px_rgba(0,0,0,0.06)]">
                          <div>
                            <div className="flex items-center justify-between pb-2 border-b border-[#E6DFD3]">
                              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#184E32]">
                                {pub.category}
                              </span>
                              <span className="font-mono text-[10.5px] text-[#8C7A6B]">
                                {pub.year}
                              </span>
                            </div>

                            <h4 className="mt-3 font-serif text-[18.5px] font-bold leading-[1.3] text-[#111418] group-hover:text-[#184E32] transition-colors line-clamp-2">
                              <button
                                type="button"
                                onClick={() => setViewerPub(pub)}
                                className="text-left hover:underline cursor-pointer"
                              >
                                {pub.title}
                              </button>
                            </h4>

                            <p className="mt-1.5 font-mono text-[11px] text-[#8C7A6B] line-clamp-1">
                              {pub.authors}
                            </p>

                            <p className="mt-3 text-[13px] leading-relaxed text-[#555048] line-clamp-3">
                              {pub.abstract}
                            </p>
                          </div>

                          {/* Footer Action Bar */}
                          <div className="mt-6 flex items-center justify-between gap-2 border-t border-[#E6DFD3] pt-4">
                            <button
                              type="button"
                              onClick={() => setViewerPub(pub)}
                              className="inline-flex items-center gap-1.5 font-mono text-[12px] font-bold uppercase tracking-wider text-[#184E32] hover:text-[#133F28] transition-colors cursor-pointer"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>Read Dossier</span>
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setActiveModalPub(pub)}
                                className="border border-[#E6DFD3] bg-[#FAF7F0] px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold text-[#111418] hover:border-[#111418] transition-colors cursor-pointer"
                              >
                                Briefing
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleCopyCitation(pub, e)}
                                title="Copy Citation"
                                className="border border-[#E6DFD3] bg-white px-2 py-1 text-[11px] font-mono text-[#8C7A6B] hover:border-[#111418] hover:text-[#111418] transition-colors cursor-pointer"
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

      {/* ── QUALITY ASSURANCE FRAMEWORK ──────────────────────────────── */}
      <section className="border-b border-[#E6DFD3] bg-[#FAF7F0] py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#184E32]">
              QUALITY ASSURANCE FRAMEWORK
            </p>
            <h2 className="mt-3 font-serif text-[32px] sm:text-[40px] font-black tracking-[-0.02em] text-[#111418]">
              How We Publish Institutional Research
            </h2>
            <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-[#555048]">
              Every published report passes through a rigorous five-stage pipeline to guarantee mathematical precision, source traceability, and unbiased analysis.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="flex flex-col justify-between border border-[#E6DFD3] bg-white p-7 transition-all duration-200 hover:border-[#111418] hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD3]">
                    <span className="font-mono text-[11px] font-bold text-[#184E32] tracking-wider">
                      {step.n}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#184E32]/30" />
                  </div>
                  <h3 className="mt-4 font-serif text-[17px] font-bold text-[#111418] leading-tight">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#555048]">
                    {step.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXECUTIVE BRIEFING MODAL ─────────────────────────────────── */}
      {activeModalPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl border border-[#111418] bg-[#FAF7F0] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6DFD3]">
              <span className="border border-[#184E32]/30 bg-[#184E32]/10 px-2.5 py-0.5 font-mono text-[10.5px] font-bold uppercase text-[#184E32]">
                {activeModalPub.category}
              </span>
              <button
                type="button"
                onClick={() => setActiveModalPub(null)}
                className="font-mono text-[14px] text-[#78716C] hover:text-[#111418] h-8 w-8 flex items-center justify-center border border-[#E6DFD3] hover:border-[#111418] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Modal Cover Image */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative aspect-[1/1.414] w-[160px] sm:w-[190px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-[#111418]/20">
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 to-transparent z-10" />
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
                <h3 className="font-serif text-[24px] sm:text-[27px] font-bold leading-snug text-[#111418]">
                  {activeModalPub.title}
                </h3>
                <p className="mt-1.5 font-mono text-[11.5px] font-semibold uppercase tracking-wider text-[#184E32]">
                  {activeModalPub.authors} · {activeModalPub.year}
                </p>

                <div className="mt-4 border border-[#E6DFD3] bg-white p-5">
                  <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#8C7A6B]">
                    Executive Abstract &amp; Key Findings
                  </h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#555048]">
                    {activeModalPub.abstract}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E6DFD3] pt-5">
              <button
                type="button"
                onClick={() => {
                  setViewerPub(activeModalPub)
                  setActiveModalPub(null)
                }}
                className="inline-flex items-center gap-2 bg-[#184E32] px-6 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#133F28] cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                <span>Read Full Report in Reader</span>
              </button>

              <div className="flex items-center gap-2.5">
                <a
                  href={resolvePdf(activeModalPub)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#E6DFD3] bg-white px-3.5 py-2 text-[12px] font-mono uppercase tracking-wider text-[#111418] hover:border-[#111418] transition-colors"
                  title="Open PDF directly in new tab"
                >
                  Raw Tab ↗
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopyCitation(activeModalPub, e)}
                  className="border border-[#E6DFD3] bg-white px-4 py-2 text-[12px] font-mono uppercase tracking-wider text-[#555048] hover:border-[#111418] hover:text-[#111418] transition-colors"
                >
                  {copiedId === activeModalPub.id ? '✓ Copied' : 'Copy Citation'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalPub(null)}
                  className="border border-[#E6DFD3] bg-[#FAF7F0] px-4 py-2 text-[12px] font-mono uppercase tracking-wider text-[#78716C] hover:border-[#111418] hover:text-[#111418] transition-colors"
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
    </div>
  )
}
