'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import { Pub, resolveCover, resolvePdf } from '@/lib/publication-utils'
import { PdfViewerModal } from '@/components/publications/pdf-viewer-modal'

interface HomeFeaturedPubsProps {
  pubs: Pub[]
}

export function HomeFeaturedPubs({ pubs }: HomeFeaturedPubsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [viewerPub, setViewerPub] = useState<Pub | null>(null)
  const leadPub = pubs[0]
  const restPubs = pubs.slice(1, 4)

  const handleCopyCitation = (pub: Pub) => {
    const citation = `IFSA NIT Trichy (${pub.year}). ${pub.title}. Research Report. Available at IFSA NIT Trichy Research Archive.`
    navigator.clipboard.writeText(citation)
    setCopiedId(pub.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  return (
    <section className="border-b border-[#E4DACB] bg-[#FAF8F5] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#E4DACB] pb-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-serif text-[32px] font-normal tracking-tight text-[#1C1917] sm:text-[40px]">
              Featured Equity Research &amp; Theses
            </h2>
            <p className="mt-2 text-[15px] text-[#78716C]">
              Institutional-grade valuation models and thematic sector notes authored by student analysts.
            </p>
          </div>
          <Link
            href="/publications"
            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[#59110B] transition-colors hover:text-[#400A06]"
          >
            <span className="border-b border-[#B48344] pb-0.5">Explore all 7 publications</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {pubs.length === 0 ? (
          <div className="mt-12 rounded-[6px] border border-dashed border-[#BFAFA0] p-12 text-center text-[14px] text-[#78716C]">
            No publication records currently cataloged.
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Lead Spotlight Card */}
            {leadPub && (
              <div className="lg:col-span-6">
                <div className="group flex h-full flex-col justify-between rounded-[10px] border border-[#E4DACB] bg-white p-7 md:p-8 shadow-xs transition-all duration-300 hover:border-[#59110B] hover:shadow-[0_16px_32px_-8px_rgba(89,17,11,0.12)]">
                  <div>
                    {/* Integrated Tactile Cover Stage */}
                    <div className="rounded-[8px] bg-gradient-to-b from-[#F7F3EC] to-[#ECE3D2] p-5 flex items-center justify-center border border-[#E4DACB]/80 shadow-inner group/stage">
                      <button
                        type="button"
                        onClick={() => setViewerPub(leadPub)}
                        className="relative aspect-[1/1.414] h-[190px] rounded-[2px] overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.16)] ring-1 ring-black/10 transition-transform duration-300 group-hover/stage:-translate-y-1.5 group-hover/stage:scale-[1.03] block cursor-pointer text-left"
                        title="Click to launch in-page PDF reader"
                      >
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/25 to-transparent z-10" />
                        <Image
                          src={resolveCover(leadPub)}
                          alt={leadPub.title}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </button>
                    </div>

                    <h3 className="mt-6 font-serif text-[23px] sm:text-[25px] leading-snug font-normal text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                      <button
                        type="button"
                        onClick={() => setViewerPub(leadPub)}
                        className="text-left hover:underline cursor-pointer"
                      >
                        {leadPub.title}
                      </button>
                    </h3>
                    <p className="mt-2 font-mono text-[11.5px] text-[#7A5424] font-medium">
                      {leadPub.authors}
                    </p>

                    <p className="mt-3.5 text-[14px] leading-relaxed text-[#44403C]">
                      {leadPub.abstract}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-[#F4ECE1] pt-5">
                    <div className="flex items-center justify-between gap-4 text-[13px]">
                      <button
                        type="button"
                        onClick={() => setViewerPub(leadPub)}
                        className="inline-flex items-center gap-1.5 font-medium text-[#59110B] hover:text-[#400A06] transition-colors cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Read Full Dossier</span>
                      </button>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleCopyCitation(leadPub)}
                          className="font-mono text-[11.5px] text-[#78716C] hover:text-[#59110B] transition-colors cursor-pointer"
                        >
                          {copiedId === leadPub.id ? '✓ Citation Copied' : 'Cite report'}
                        </button>
                        <Link
                          href="/publications"
                          className="font-medium text-[#78716C] hover:text-[#1C1917]"
                        >
                          All notes →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right Column: Stacked Editorial Records with Mini Document Thumbs */}
            <div className="flex flex-col gap-4 lg:col-span-6">
              {restPubs.map((pub) => {
                const coverUrl = resolveCover(pub)

                return (
                  <div
                    key={pub.id}
                    className="group flex flex-col justify-between rounded-[8px] border border-[#E4DACB] bg-white p-5 transition-all duration-200 hover:border-[#59110B] hover:shadow-sm sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex items-start gap-4 max-w-[460px]">
                      {/* Mini Thumbnail */}
                      <button
                        type="button"
                        onClick={() => setViewerPub(pub)}
                        className="relative shrink-0 aspect-[1/1.414] w-[56px] rounded-[2px] overflow-hidden shadow-xs ring-1 ring-black/10 transition-transform group-hover:-translate-y-0.5 mt-0.5 block cursor-pointer text-left"
                        title="Click to launch in-page PDF reader"
                      >
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-black/20 to-transparent z-10" />
                        <Image
                          src={coverUrl}
                          alt={pub.title}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </button>

                      <div>
                        <h4 className="font-serif text-[16.5px] font-normal leading-snug text-[#1C1917] group-hover:text-[#59110B] transition-colors line-clamp-2">
                          <button
                            type="button"
                            onClick={() => setViewerPub(pub)}
                            className="text-left hover:underline cursor-pointer"
                          >
                            {pub.title}
                          </button>
                        </h4>
                        <p className="mt-1 font-mono text-[11px] text-[#78716C] line-clamp-1">
                          {pub.authors}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 sm:self-center">
                      <button
                        onClick={() => handleCopyCitation(pub)}
                        title="Copy Citation"
                        className="text-[12px] font-mono text-[#78716C] hover:text-[#59110B] cursor-pointer"
                      >
                        {copiedId === pub.id ? '✓ Copied' : 'Cite'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewerPub(pub)}
                        className="inline-flex items-center gap-1 rounded-[4px] border border-[#BFAFA0] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#59110B] group-hover:bg-[#59110B] group-hover:text-white transition-all cursor-pointer"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Read</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Flagship In-Page PDF Viewer Modal */}
      <PdfViewerModal
        pub={viewerPub}
        allPubs={pubs}
        isOpen={!!viewerPub}
        onClose={() => setViewerPub(null)}
        onSelectPub={(p) => setViewerPub(p)}
      />
    </section>
  )
}
