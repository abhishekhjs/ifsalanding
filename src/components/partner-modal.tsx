'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

interface Props {
  open: boolean
  onClose: () => void
}

export function PartnerModal({ open, onClose }: Props) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      await fetch('/api/partner-inquiry', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      setSent(true)
    } catch {
      // Graceful fallback
      setSent(true)
    } finally {
      setLoading(false)
    }
  }


  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose()
          setSent(false)
        }
      }}
    >
      <DialogContent
        showCloseButton={true}
        className="max-w-[94vw] sm:max-w-[860px] md:max-w-[920px] lg:max-w-[960px] p-3 sm:p-4 rounded-[28px] sm:rounded-[32px] overflow-hidden border border-[#E4DACB] bg-[#FAF8F5] shadow-[0_25px_60px_-15px_rgba(28,25,23,0.35)] gap-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch w-full">
          
          {/* ── LEFT COLUMN: Form Section ────────────────────────────── */}
          <div className="lg:col-span-6 flex flex-col justify-between p-4 sm:p-7 sm:py-6">
            <div>
              {/* Header Title */}
              <div className="mb-6">
                <DialogTitle className="font-serif text-[30px] sm:text-[34px] font-normal tracking-tight text-[#1C1917] leading-tight">
                  Partner with Us
                </DialogTitle>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#78716C]">
                  Engage our analyst pods for venture advisory, event sponsorship, or quant talent recruitment.
                </p>
              </div>

              {sent ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-[#EAF5EC] border border-[#1B6F38]/20 flex items-center justify-center text-[#1B6F38] mb-4">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="font-serif text-[22px] font-normal text-[#1C1917]">
                    Inquiry Received
                  </h4>
                  <p className="mt-2 text-[13.5px] text-[#78716C] max-w-[280px]">
                    Thank you for reaching out. Our partnerships team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      onClose()
                      setSent(false)
                    }}
                    className="mt-6 rounded-full bg-[#59110B] px-6 py-2.5 text-[13px] font-medium text-white shadow-xs hover:bg-[#400A06] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full rounded-[14px] border border-[#E4DACB] bg-white px-4 py-3 text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] shadow-[0_2px_6px_rgba(28,25,23,0.03)] outline-none transition-all duration-200 focus:border-[#59110B] focus:ring-2 focus:ring-[#59110B]/10 hover:border-[#BFAFA0]"
                    />
                  </div>

                  <div>
                    <input
                      required
                      name="organisation"
                      type="text"
                      placeholder="Company / Institution"
                      className="w-full rounded-[14px] border border-[#E4DACB] bg-white px-4 py-3 text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] shadow-[0_2px_6px_rgba(28,25,23,0.03)] outline-none transition-all duration-200 focus:border-[#59110B] focus:ring-2 focus:ring-[#59110B]/10 hover:border-[#BFAFA0]"
                    />
                  </div>

                  <div>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="Work email address"
                      className="w-full rounded-[14px] border border-[#E4DACB] bg-white px-4 py-3 text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] shadow-[0_2px_6px_rgba(28,25,23,0.03)] outline-none transition-all duration-200 focus:border-[#59110B] focus:ring-2 focus:ring-[#59110B]/10 hover:border-[#BFAFA0]"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      name="message"
                      rows={3}
                      placeholder="Scope of collaboration or mandate..."
                      className="w-full rounded-[14px] border border-[#E4DACB] bg-white px-4 py-3 text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] shadow-[0_2px_6px_rgba(28,25,23,0.03)] outline-none transition-all duration-200 focus:border-[#59110B] focus:ring-2 focus:ring-[#59110B]/10 hover:border-[#BFAFA0] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-[14px] bg-[#59110B] py-3.5 px-6 font-sans text-[14px] font-semibold text-white shadow-[0_12px_24px_-6px_rgba(89,17,11,0.35)] transition-all duration-200 hover:bg-[#400A06] hover:shadow-[0_16px_28px_-6px_rgba(89,17,11,0.45)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none mt-2 flex items-center justify-center gap-2"
                  >
                    <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                    {!loading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Row: Direct Alternative Channels */}
            {!sent && (
              <div className="mt-6 pt-5 border-t border-[#E4DACB]/80">
                <div className="flex items-center justify-between">
                  <span className="text-[11.5px] font-mono text-[#78716C] uppercase tracking-wider">
                    Or connect directly
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href="mailto:ifsa@nitt.edu"
                      aria-label="Email IFSA NIT Trichy"
                      className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E4DACB] bg-white text-[#44403C] shadow-2xs transition-all hover:border-[#59110B] hover:text-[#59110B] hover:shadow-xs"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href="https://linkedin.com/company/ifsa-nit-trichy"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="IFSA NIT Trichy LinkedIn"
                      className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E4DACB] bg-white text-[#44403C] shadow-2xs transition-all hover:border-[#59110B] hover:text-[#59110B] hover:shadow-xs"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN: Plain Mesh Gradient Artwork ──────────── */}
          <div className="lg:col-span-6 hidden lg:block">
            <div className="relative h-full min-h-[460px] w-full overflow-hidden rounded-[22px] sm:rounded-[24px] border border-[#E4DACB]/70 bg-[#FAF8F5] shadow-inner">
              <Image
                src="/mesh-gradient.png"
                alt="IFSA Gradient Artwork"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}
