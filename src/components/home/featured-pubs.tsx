'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Pub, resolveCover } from '@/lib/publication-utils'
import { PdfViewerModal } from '@/components/publications/pdf-viewer-modal'

gsap.registerPlugin(ScrollTrigger)

interface HomeFeaturedPubsProps {
  pubs: Pub[]
}

export function HomeFeaturedPubs({ pubs }: HomeFeaturedPubsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [viewerPub, setViewerPub] = useState<Pub | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const leadCardRef = useRef<HTMLDivElement>(null)
  const leadBookRef = useRef<HTMLButtonElement>(null)
  const listItemsRef = useRef<(HTMLDivElement | null)[]>([])

  const leadPub = pubs[0]
  const restPubs = pubs.slice(1, 4)

  const handleCopyCitation = (pub: Pub) => {
    const citation = `IFSA NIT Trichy (${pub.year}). ${pub.title}. Research Report. Available at IFSA NIT Trichy Research Archive.`
    navigator.clipboard.writeText(citation)
    setCopiedId(pub.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  // GSAP ScrollTrigger Entrance Choreography
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const section = sectionRef.current

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      }

      // 2. Lead Spotlight Card 3D Unfold
      if (leadCardRef.current) {
        gsap.fromTo(
          leadCardRef.current,
          {
            opacity: 0,
            x: -30,
            y: 20,
            scale: 0.96,
            rotateY: 6,
            transformPerspective: 1200,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leadCardRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        )
      }

      // 3. Stacked Research Dossier Rows Cascade
      const items = listItemsRef.current.filter(Boolean) as HTMLDivElement[]
      if (items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            x: 35,
            y: 15,
            scale: 0.98,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: items[0],
              start: 'top 84%',
              once: true,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [pubs])

  // Interactive 3D Tactile Book Lift on Lead Spotlight
  const handleLeadMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!leadBookRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotY = (x / (rect.width / 2)) * 12
    const rotX = -(y / (rect.height / 2)) * 10

    gsap.to(leadBookRef.current, {
      rotateY: rotY,
      rotateX: rotX,
      z: 22,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
      overwrite: 'auto',
    })
  }, [])

  const handleLeadMouseLeave = useCallback(() => {
    if (!leadBookRef.current) return
    gsap.to(leadBookRef.current, {
      rotateY: 0,
      rotateX: 0,
      z: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }, [])

  return (
    <section ref={sectionRef} className="border-b border-[#E4DACB] bg-[#F0EAE0] py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col justify-between gap-4 border-b border-[#E4DACB] pb-8 md:flex-row md:items-end"
        >
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
          <div className="mt-12 flex flex-col gap-10">

            {/* ── Row A: Lead pub cover LEFT · text RIGHT ───────────────── */}
            {leadPub && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                {/* Left: Tactile cover card */}
                <div className="lg:col-span-6 [perspective:1200px]">
                  <div
                    ref={leadCardRef}
                    onMouseMove={handleLeadMouseMove}
                    onMouseLeave={handleLeadMouseLeave}
                    className="group flex h-full flex-col justify-between rounded-[12px] border border-[#E4DACB] bg-white p-7 md:p-8 shadow-xs transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(89,17,11,0.14)] hover:border-[#59110B]/30"
                  >
                    <div>
                      {/* Integrated Tactile Cover Stage */}
                      <div className="rounded-[8px] bg-gradient-to-b from-[#F7F3EC] to-[#ECE3D2] p-6 flex items-center justify-center border border-[#E4DACB]/80 shadow-inner group/stage [perspective:800px]">
                        <button
                          ref={leadBookRef}
                          type="button"
                          onClick={() => setViewerPub(leadPub)}
                          className="relative aspect-[1/1.414] h-[200px] rounded-[3px] overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.18)] ring-1 ring-black/10 block cursor-pointer text-left will-change-transform [transform-style:preserve-3d]"
                          title="Click to launch in-page PDF reader"
                        >
                          <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/35 via-black/15 to-transparent z-10" />
                          <div className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-white/20 to-transparent z-10" />
                          <Image
                            src={resolveCover(leadPub)}
                            alt={`Featured Research Dossier: ${leadPub.title} - IFSA NIT Trichy`}
                            fill
                            sizes="240px"
                            className="object-cover"
                          />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#7A5424] pt-4">
                        <span>Lead Institutional Dossier</span>
                        <span>{leadPub.year}</span>
                      </div>

                      <h3 className="mt-3 font-serif text-[23px] sm:text-[26px] leading-snug font-normal text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                        <button
                          type="button"
                          onClick={() => setViewerPub(leadPub)}
                          className="text-left hover:underline cursor-pointer"
                        >
                          {leadPub.title}
                        </button>
                      </h3>
                      <p className="mt-2 font-mono text-[12px] text-[#7A5424] font-medium">
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

                {/* Right: Stacked editorial list */}
                <div className="flex flex-col gap-4 lg:col-span-6">
                  {restPubs.map((pub, idx) => {
                    const coverUrl = resolveCover(pub)
                    return (
                      <div
                        key={pub.id}
                        ref={(el) => { listItemsRef.current[idx] = el }}
                        className="group relative flex flex-col justify-between rounded-[10px] border border-[#E4DACB] bg-white p-5 transition-all duration-300 hover:shadow-[0_8px_20px_-4px_rgba(89,17,11,0.08)] hover:border-[#59110B]/40 hover:-translate-y-0.5 sm:flex-row sm:items-center gap-4 will-change-transform"
                      >
                        <div className="flex items-start gap-4 max-w-[460px]">
                          {/* Mini Thumbnail */}
                          <button
                            type="button"
                            onClick={() => setViewerPub(pub)}
                            className="relative shrink-0 aspect-[1/1.414] w-[58px] rounded-[2px] overflow-hidden shadow-xs ring-1 ring-black/10 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 mt-0.5 block cursor-pointer text-left"
                            title="Click to launch in-page PDF reader"
                          >
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-black/25 to-transparent z-10" />
                            <Image
                              src={coverUrl}
                              alt={`Research Report: ${pub.title} - IFSA NIT Trichy`}
                              fill
                              sizes="60px"
                              className="object-cover"
                            />
                          </button>

                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A5424]">
                              {pub.year} Equity Note
                            </span>
                            <h4 className="font-serif text-[16.5px] font-normal leading-snug text-[#1C1917] group-hover:text-[#59110B] transition-colors line-clamp-2 mt-0.5">
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
                            className="inline-flex items-center gap-1 rounded-[4px] border border-[#BFAFA0] bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-[#59110B] group-hover:bg-[#59110B] group-hover:text-white transition-all duration-200 cursor-pointer shadow-2xs"
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
