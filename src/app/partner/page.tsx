import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { PartnerFlow } from '@/components/partner/partner-flow'
import { Mail, Linkedin, Building, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Partner with IFSA NIT Trichy | Client Advisory & Event Sponsorship',
  description:
    'Commission institutional equity research mandates, sponsor our national collegiate finance summits, or recruit high-conviction finance and quantitative talent from NIT Trichy.',
  alternates: {
    canonical: '/partner',
  },
  openGraph: {
    title: 'Partner with IFSA NIT Trichy | Client Advisory & Event Sponsorship',
    description:
      'Step-by-step onboarding for client mandates, summit sponsorships, and campus talent recruiting.',
    url: '/partner',
  },
}

export default function PartnerPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen text-[#111418]">
      {/* ── Page Header / Hero ────────────────────────────────────────── */}
      <section className="relative border-b border-[#E6DFD3] py-14 sm:py-20">
        {/* Engineering ledger grid background */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #E6DFD3 1px, transparent 1px), linear-gradient(to bottom, #E6DFD3 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            backgroundPosition: 'center top',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12 text-center max-w-3xl">
          <h1 className="font-serif text-[42px] sm:text-[56px] md:text-[64px] font-black leading-[1.03] tracking-tight text-[#111418]">
            Partner with IFSA
            <br />
            NIT Trichy
          </h1>

          <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-[#4A453E] max-w-2xl mx-auto">
            Engage our student analyst pods for live venture advisory, sponsor premier national finance summits, or recruit quantitative and corporate finance talent.
          </p>
        </div>
      </section>

      {/* ── Interactive Onboarding Questionnaire Form ────────────────── */}
      <section className="py-12 sm:py-18">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="border-2 border-[#111418] bg-white p-6 sm:p-10 md:p-12 shadow-[8px_8px_0px_0px_#111418]">
            <PartnerFlow />
          </div>

          {/* ── Alternative Direct Channels ────────────────────────────── */}
          <div className="mt-12 p-6 border-2 border-[#111418] bg-[#FAF8F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[4px_4px_0px_#111418]">
            <div>
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#A67C24]">
                DIRECT ADVISORY CHANNELS
              </span>
              <h3 className="font-serif text-[18px] sm:text-[20px] font-bold text-[#111418] mt-1">
                Prefer an immediate discussion?
              </h3>
              <p className="text-[13px] text-[#5A554E] mt-0.5">
                Our Executive Board welcomes direct correspondence from funds, founders, and corporate partners.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:nittrichy@ifsa-network.com"
                className="inline-flex items-center gap-2 bg-[#111418] text-white font-sans text-[12.5px] font-semibold px-4.5 py-2 hover:bg-black transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>nittrichy@ifsa-network.com</span>
              </a>

              <a
                href="https://linkedin.com/company/ifsa-nit-trichy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[#111418] bg-white text-[#111418] font-sans text-[12.5px] font-semibold px-4 py-2 hover:bg-black/5 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn Page</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
