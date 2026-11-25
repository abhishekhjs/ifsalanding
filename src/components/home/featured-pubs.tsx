'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Pub } from '@/lib/publication-utils'
import { FALLBACK_PUBLICATIONS } from '@/lib/fallback-data'
import { PdfViewerModal } from '@/components/publications/pdf-viewer-modal'
import { SidewaysWordReveal } from '@/components/animata/text/sideways-word-reveal'
import { CardReveal } from '@/components/animata/container/card-reveal'

interface HomeFeaturedPubsProps {
  pubs: Pub[]
}

export function HomeFeaturedPubs({ pubs }: HomeFeaturedPubsProps) {
  const [copied, setCopied] = useState(false)
  const [viewerPub, setViewerPub] = useState<Pub | null>(null)

  // Use actual IFSA publications, falling back to full fallback data
  const effectivePubs = pubs && pubs.length >= 4 ? pubs : FALLBACK_PUBLICATIONS
  const leadPub = effectivePubs[0]
  const sidePubs = effectivePubs.slice(1, 4)

  const handleCopyCitation = () => {
    const citation = `IFSA NIT Trichy (${leadPub.year}). ${leadPub.title}. Research Report. Available at IFSA NIT Trichy Research Archive.`
    navigator.clipboard.writeText(citation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handleOpenPdf = (pub: Pub) => {
    if (pub && pub.pdf_link) {
      setViewerPub(pub)
    }
  }

  return (
    <section className="relative border-b border-[#E6DFD3] bg-[#FAF7F0] pt-14 pb-18 sm:pt-18 sm:pb-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="max-w-[900px]">
          <SidewaysWordReveal
            lines={['Featured Equity', 'Research & Theses']}
            className="font-serif font-black tracking-[-0.035em] text-[#111418] text-[40px] sm:text-[54px] md:text-[66px] lg:text-[74px] leading-[0.95]"
            accentBarClassName="mt-4 h-[4px] w-18 bg-[#CBA258]"
          />
        </div>

        {/* Subhead Row with link */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <p className="max-w-[560px] text-[14px] sm:text-[15px] leading-relaxed text-[#78716C]">
            Institutional-grade valuation models and thematic sector notes authored by student analysts.
          </p>

          <Link
            href="/publications"
            className="inline-flex items-center text-[12px] sm:text-[12.5px] font-medium text-[#111418] border-b border-[#111418] pb-0.5 hover:text-[#185133] hover:border-[#185133] transition-colors w-fit shrink-0"
          >
            Explore all 7 publications →
          </Link>
        </div>

        {/* ── Two-Column Dossier & Notes Grid ─────────────────────────── */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Lead Institutional Dossier Card with Ledger Shadow */}
          <div className="lg:col-span-7 xl:col-span-7">
            <CardReveal index={0} threshold={0.12}>
              <div className="border border-[#111418] bg-[#FAF7F0] p-7 sm:p-9 md:p-10 shadow-[6px_6px_0px_0px_#111418] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_#111418]">
                {/* Kicker */}
                <div className="font-mono text-[10px] sm:text-[10.5px] font-semibold tracking-[0.14em] uppercase text-[#78716C]">
                  LEAD INSTITUTIONAL DOSSIER · {leadPub.year}
                </div>

                {/* Title */}
                <h3 className="mt-3.5 font-serif font-black text-[28px] sm:text-[34px] md:text-[38px] leading-[1.05] tracking-tight text-[#111418]">
                  {leadPub.title}
                </h3>

                {/* Author desk */}
                <div className="mt-3 font-mono text-[11px] text-[#78716C]">
                  {leadPub.authors}
                </div>

                {/* Description */}
                <p className="mt-4 text-[13px] sm:text-[13.5px] leading-relaxed text-[#555048]">
                  {leadPub.abstract}
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {leadPub.pdf_link ? (
                    <button
                      type="button"
                      onClick={() => handleOpenPdf(leadPub)}
                      className="inline-flex items-center justify-center bg-[#111418] px-5 py-2.5 text-[12.5px] font-semibold text-[#FAF7F0] transition-colors hover:bg-[#185133]"
                    >
                      Read Full Dossier
                    </button>
                  ) : (
                    <Link
                      href="/publications"
                      className="inline-flex items-center justify-center bg-[#111418] px-5 py-2.5 text-[12.5px] font-semibold text-[#FAF7F0] transition-colors hover:bg-[#185133]"
                    >
                      Read Full Dossier
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleCopyCitation}
                    className="inline-flex items-center justify-center border border-[#111418] bg-transparent px-5 py-2.5 text-[12.5px] font-semibold text-[#111418] transition-colors hover:bg-white"
                  >
                    {copied ? 'Citation Copied!' : 'Cite report'}
                  </button>
                </div>
              </div>
            </CardReveal>
          </div>

          {/* Right Column: Stacked Actual Equity Notes */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col pt-1">
            {sidePubs.map((pub, idx) => {
              const num = String(idx + 2).padStart(2, '0')
              const tag = `${pub.year} ${pub.category.toUpperCase()} NOTE`

              return (
                <CardReveal
                  key={pub.id}
                  index={idx + 1}
                  threshold={0.12}
                  className="border-b border-[#E6DFD3] pb-6 mb-6 last:border-b-0 last:mb-0 last:pb-0"
                >
                  {pub.pdf_link ? (
                    <button
                      type="button"
                      onClick={() => handleOpenPdf(pub)}
                      className="group block text-left w-full cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[10.5px] text-[#78716C] mt-1 shrink-0 font-medium">
                          {num}
                        </span>
                        <div>
                          <h4 className="font-serif font-black text-[18px] sm:text-[20px] leading-snug text-[#111418] transition-colors group-hover:text-[#185133]">
                            {pub.title}
                          </h4>
                          <div className="mt-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-[#78716C]">
                            {tag}
                          </div>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <Link href="/publications" className="group block">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[10.5px] text-[#78716C] mt-1 shrink-0 font-medium">
                          {num}
                        </span>
                        <div>
                          <h4 className="font-serif font-black text-[18px] sm:text-[20px] leading-snug text-[#111418] transition-colors group-hover:text-[#185133]">
                            {pub.title}
                          </h4>
                          <div className="mt-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-[#78716C]">
                            {tag}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </CardReveal>
              )
            })}
          </div>
        </div>
      </div>

      {/* Interactive PDF Modal for all actual reports */}
      {viewerPub && (
        <PdfViewerModal
          pub={viewerPub}
          isOpen={!!viewerPub}
          onClose={() => setViewerPub(null)}
        />
      )}
    </section>
  )
}
