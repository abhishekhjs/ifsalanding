'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import {
  X,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  BookOpen,
  Maximize2,
  Minimize2,
  RotateCw
} from 'lucide-react'
import { Pub, resolveCover, resolvePdf } from '@/lib/publication-utils'

interface PdfViewerModalProps {
  pub: Pub | null
  allPubs?: Pub[]
  isOpen: boolean
  onClose: () => void
  onSelectPub?: (pub: Pub) => void
}

export function PdfViewerModal({
  pub,
  allPubs = [],
  isOpen,
  onClose,
  onSelectPub
}: PdfViewerModalProps) {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const windowRef = useRef<HTMLDivElement>(null)

  // Find index in allPubs list
  const currentIndex = pub && allPubs.length > 0 ? allPubs.findIndex((p) => p.id === pub.id) : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < allPubs.length - 1

  const handlePrev = useCallback(() => {
    if (hasPrev && onSelectPub) {
      setIsLoading(true)
      onSelectPub(allPubs[currentIndex - 1])
    }
  }, [hasPrev, onSelectPub, allPubs, currentIndex])

  const handleNext = useCallback(() => {
    if (hasNext && onSelectPub) {
      setIsLoading(true)
      onSelectPub(allPubs[currentIndex + 1])
    }
  }, [hasNext, onSelectPub, allPubs, currentIndex])

  // Handle keyboard events (ESC to close or restore, Left/Right arrows to cycle)
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMaximized) {
          setIsMaximized(false)
        } else {
          onClose()
        }
      } else if (e.key === 'ArrowLeft' && !e.target?.toString().includes('Input')) {
        handlePrev()
      } else if (e.key === 'ArrowRight' && !e.target?.toString().includes('Input')) {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    // Prevent background scrolling unless minimized
    const originalOverflow = document.body.style.overflow
    if (!isMinimized) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalOverflow
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose, handlePrev, handleNext, isMaximized, isMinimized])

  // Reset loading state when publication changes
  useEffect(() => {
    if (pub) {
      setIsLoading(true)
      setIframeKey((prev) => prev + 1)
      setIsMinimized(false)
    }
  }, [pub?.id])

  if (!isOpen || !pub) return null

  const pdfUrl = resolvePdf(pub)
  const coverUrl = resolveCover(pub)

  // Pure clean view mode: fits full floating window with document zoomed out
  const embedSrc = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&zoom=70&view=Fit`

  const handleCopyCitation = (e: React.MouseEvent) => {
    e.stopPropagation()
    const citation = `IFSA NIT Trichy (${pub.year}). "${pub.title}". Research Report. IFSA NIT Trichy Chapter Archive.`
    navigator.clipboard.writeText(citation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handleReload = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  // MINIMIZED FLOATING DOCK PILL (Light Theme, Bottom Right)
  if (isMinimized) {
    return (
      <aside
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 rounded-full bg-[#FAF8F5] border border-[#BFAFA0] px-4 py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.18)] cursor-pointer hover:border-[#59110B] hover:shadow-[0_20px_45px_rgba(89,17,11,0.18)] transition-all hover:scale-[1.02] group"
        role="button"
        tabIndex={0}
        title="Click to restore research dossier"
      >
        <div className="relative aspect-[1/1.414] h-8 rounded-xs overflow-hidden shadow-xs ring-1 ring-black/10">
          <Image
            src={coverUrl}
            alt={pub.title}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-[#7A5424]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#59110B] animate-pulse" />
            <span>Reading</span>
          </div>
          <p className="font-serif text-[13px] text-[#1C1917] font-normal max-w-[210px] sm:max-w-[280px] truncate">
            {pub.title}
          </p>
        </div>

        <div className="flex items-center gap-1.5 pl-2 border-l border-[#E4DACB]">
          <span className="rounded-full bg-[#F4ECE1] p-1 text-[#44403C] group-hover:bg-[#59110B] group-hover:text-white transition-colors">
            <Maximize2 className="h-3 w-3" />
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="rounded-full p-1 text-[#78716C] hover:bg-[#F4ECE1] hover:text-[#1C1917] transition-colors"
            title="Close reader"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 md:p-8 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        // Close if user clicks outside the window frame
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* FLOATING WINDOW CONTAINER (Light Theme) */}
      <div
        ref={windowRef}
        className={`relative flex flex-col bg-[#FAF8F5] text-[#1C1917] select-none transition-all duration-300 overflow-hidden border border-[#E4DACB] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.06)] ${
          isMaximized
            ? 'fixed inset-0 w-full h-full rounded-none border-0'
            : 'w-full max-w-[1240px] h-[90vh] max-h-[920px] rounded-[14px] sm:rounded-[18px]'
        }`}
      >
        {/* WINDOW HEADER: ONLY TITLE ON LEFT · CLEAN ACTIONS ON RIGHT */}
        <header className="relative z-20 flex items-center justify-between gap-4 border-b border-[#E4DACB] bg-[#FAF8F5] px-4 sm:px-6 py-3.5 shadow-xs">
          {/* LEFT: ONLY THE ARTICLE TITLE */}
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-[17px] sm:text-[20px] font-normal leading-snug text-[#1C1917] truncate">
              {pub.title}
            </h2>
          </div>

          {/* RIGHT: CLEAN ESSENTIAL ACTIONS */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Steppers */}
            {allPubs.length > 1 && (
              <div className="flex items-center rounded-[5px] border border-[#E4DACB] bg-white p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  title="Previous publication (←)"
                  className="flex h-7 w-7 items-center justify-center rounded text-[#44403C] hover:bg-[#FAF8F5] hover:text-[#1C1917] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!hasNext}
                  title="Next publication (→)"
                  className="flex h-7 w-7 items-center justify-center rounded text-[#44403C] hover:bg-[#FAF8F5] hover:text-[#1C1917] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Copy Citation */}
            <button
              type="button"
              onClick={handleCopyCitation}
              title="Copy academic citation"
              className="inline-flex h-8 items-center gap-1.5 rounded-[5px] border border-[#E4DACB] bg-white px-3 text-[12px] font-mono text-[#44403C] hover:border-[#59110B] hover:text-[#59110B] shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#78716C]" />
                  <span className="hidden sm:inline">Cite</span>
                </>
              )}
            </button>

            {/* Direct Download */}
            <a
              href={pdfUrl}
              download={`${pub.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`}
              title="Download publication PDF"
              className="inline-flex h-8 items-center gap-1.5 rounded-[5px] bg-[#59110B] hover:bg-[#400A06] text-white px-3.5 text-[12px] font-medium shadow-2xs transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* External New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open raw PDF in new browser tab"
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-[5px] border border-[#E4DACB] bg-white text-[#78716C] hover:border-[#59110B] hover:text-[#1C1917] shadow-2xs transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Maximize / Restore Toggle */}
            <button
              type="button"
              onClick={() => setIsMaximized((v) => !v)}
              title={isMaximized ? 'Restore floating window' : 'Expand full screen'}
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-[5px] border border-[#E4DACB] bg-white text-[#78716C] hover:border-[#59110B] hover:text-[#1C1917] shadow-2xs transition-colors cursor-pointer"
            >
              {isMaximized ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Reload Document */}
            <button
              type="button"
              onClick={handleReload}
              title="Reload document"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-[5px] border border-[#E4DACB] bg-white text-[#78716C] hover:border-[#59110B] hover:text-[#1C1917] shadow-2xs transition-colors cursor-pointer"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>

            <div className="h-5 w-[1px] bg-[#E4DACB] mx-0.5" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              title="Close reader (Esc)"
              className="flex h-8 w-8 items-center justify-center rounded-[5px] border border-[#E4DACB] bg-white text-[#78716C] hover:bg-[#F4ECE1] hover:text-[#1C1917] hover:border-[#59110B] shadow-2xs transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* MAIN DOCUMENT VIEWPORT (Clean Mode) */}
        <main className="relative flex-1 w-full bg-[#ECE7DF] overflow-hidden flex flex-col items-center justify-center">
          {/* Loading Skeletal State */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#FAF8F5]/92 backdrop-blur-2xs text-center p-6 animate-in fade-in duration-150">
              <div className="relative aspect-[1/1.414] w-[100px] sm:w-[120px] rounded-[3px] overflow-hidden shadow-lg ring-1 ring-black/10 mb-3 animate-pulse">
                <Image
                  src={coverUrl}
                  alt={pub.title}
                  fill
                  sizes="120px"
                  className="object-cover opacity-80"
                />
              </div>

              <div className="flex items-center gap-2 text-[#7A5424] font-mono text-[12.5px] tracking-wide">
                <RotateCw className="h-3.5 w-3.5 animate-spin text-[#59110B]" />
                <span>Loading Research Report...</span>
              </div>
              <p className="mt-1 text-[12px] text-[#78716C] font-serif max-w-[360px] line-clamp-1">
                {pub.title}
              </p>
            </div>
          )}

          {/* PDF Frame Canvas - fits full floating window */}
          <div className="relative w-full h-full p-0 overflow-hidden bg-[#525659]">
            <iframe
              key={iframeKey}
              src={embedSrc}
              title={pub.title}
              onLoad={() => setIsLoading(false)}
              className="w-full h-full border-0 bg-[#525659]"
            />
          </div>
        </main>

        {/* BOTTOM PUBLICATION SWITCHER DRAWER (Light Theme) */}
        {allPubs.length > 0 && (
          <footer className="relative z-20 border-t border-[#E4DACB] bg-[#FAF8F5]">
            {/* Drawer Toggle Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#FAF8F5] border-b border-[#E4DACB]/60">
              <button
                type="button"
                onClick={() => setIsDrawerOpen((v) => !v)}
                className="group flex items-center gap-2 text-[12px] font-mono text-[#44403C] hover:text-[#59110B] transition-colors cursor-pointer"
              >
                <BookOpen className="h-3.5 w-3.5 text-[#7A5424]" />
                <span className="font-medium">
                  Directory ({allPubs.length} Publications)
                </span>
                <span className="text-[10.5px] text-[#78716C] group-hover:text-[#59110B]">
                  {isDrawerOpen ? '▾ Hide Carousel' : '▸ Expand Carousel'}
                </span>
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#78716C]">
                <span className="hidden sm:inline">Navigate:</span>
                <kbd className="hidden sm:inline rounded border border-[#E4DACB] bg-white px-1.5 py-0.5 text-[10px] text-[#44403C] shadow-2xs">
                  ←
                </kbd>
                <kbd className="hidden sm:inline rounded border border-[#E4DACB] bg-white px-1.5 py-0.5 text-[10px] text-[#44403C] shadow-2xs">
                  →
                </kbd>
                <span className="hidden sm:inline text-zinc-400">·</span>
                <span className="hidden sm:inline">
                  Press <kbd className="rounded border border-[#E4DACB] bg-white px-1 py-0.5 text-[10px] text-[#44403C] shadow-2xs">ESC</kbd> to close
                </span>
              </div>
            </div>

            {/* Collapsible Horizontal Strip of Publications */}
            {isDrawerOpen && (
              <div className="p-3 sm:p-4 bg-[#F5EFE6] overflow-x-auto no-scrollbar animate-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center gap-3 min-w-max pb-1">
                  {allPubs.map((item) => {
                    const isActive = item.id === pub.id
                    const itemCover = resolveCover(item)

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          if (!isActive && onSelectPub) {
                            setIsLoading(true)
                            onSelectPub(item)
                          }
                        }}
                        className={`group relative flex items-center gap-2.5 rounded-[8px] border p-2 text-left transition-all cursor-pointer ${
                          isActive
                            ? 'border-[#59110B] bg-white shadow-sm ring-1 ring-[#59110B]/30'
                            : 'border-[#E4DACB] bg-white/80 hover:bg-white hover:border-[#BFAFA0]'
                        }`}
                      >
                        {/* Mini Cover */}
                        <div className="relative aspect-[1/1.414] h-[48px] rounded-[2px] overflow-hidden shadow-xs shrink-0 ring-1 ring-black/10">
                          <Image
                            src={itemCover}
                            alt={item.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="w-[170px] sm:w-[200px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[9px] font-semibold uppercase text-[#7A5424]">
                              {item.category}
                            </span>
                            <span className="font-mono text-[9px] text-[#78716C]">· {item.year}</span>
                          </div>
                          <h4
                            className={`mt-0.5 font-serif text-[12px] leading-tight line-clamp-1 ${
                              isActive ? 'text-[#59110B] font-medium' : 'text-[#1C1917] group-hover:text-[#59110B]'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p className="mt-0.5 font-mono text-[10px] text-[#78716C] truncate">
                            {item.authors}
                          </p>
                        </div>

                        {isActive && (
                          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#59110B] text-[8.5px] font-bold text-white shadow-xs">
                            ✓
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  )
}
