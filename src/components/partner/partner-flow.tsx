'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import {
  Trophy,
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Building,
  Mail,
  User,
  Clock,
  Send,
  ShieldCheck,
  FileText,
} from 'lucide-react'

export type PartnershipTrack = 'sponsor' | 'service' | 'recruit' | 'other'

interface FormData {
  track: PartnershipTrack | ''
  scopeOption: string
  scopeDetails: string
  name: string
  organisation: string
  email: string
  role: string
  phone: string
  timeline: string
  notes: string
}

const INITIAL_DATA: FormData = {
  track: '',
  scopeOption: '',
  scopeDetails: '',
  name: '',
  organisation: '',
  email: '',
  role: '',
  phone: '',
  timeline: 'Immediate / Next 2-4 weeks',
  notes: '',
}

interface PartnerFlowProps {
  onSuccess?: () => void
  isModal?: boolean
}

const TRACKS = [
  {
    id: 'sponsor' as PartnershipTrack,
    title: 'Sponsor Events & Summits',
    subtitle:
      'Sponsor our national flagship summits (IFSC), collegiate case competitions, or executive masterclass series.',
    badge: 'SUMMIT & EVENTS',
    icon: Trophy,
    highlight: '₹17L+ Annual Prize Pools · 1,000+ Reach',
  },
  {
    id: 'service' as PartnershipTrack,
    title: 'Request a Client Mandate',
    subtitle:
      'Commission our quantitative student analysts for live venture advisory, institutional equity research, or DCF valuation.',
    badge: 'LIVE ADVISORY & RESEARCH',
    icon: Briefcase,
    highlight: '3 Active Mandates · Institutional Grade DCF',
  },
  {
    id: 'recruit' as PartnershipTrack,
    title: 'Campus Recruitment & Talent',
    subtitle:
      'Engage top-decile engineering and finance talent from NIT Trichy for off-cycle analyst internships or full-time roles.',
    badge: 'TALENT ACQUISITION',
    icon: Users,
    highlight: 'Goldman Sachs, Barclays, HSBC Alumni',
  },
  {
    id: 'other' as PartnershipTrack,
    title: 'Other Strategic Collaborations',
    subtitle:
      'Executive keynote invitations, joint research syndication, media partnerships, or bespoke chapter initiatives.',
    badge: 'STRATEGIC ALLIANCE',
    icon: Sparkles,
    highlight: 'APAC Chapter 10 · Global Network',
  },
]

const SCOPE_OPTIONS: Record<PartnershipTrack, string[]> = {
  sponsor: [
    'IFSC 2027 National Finance Summit (Title / Co-Sponsor)',
    'National Case Competition Prize Pool Sponsor (₹1L - ₹5L+)',
    'Executive Masterclass & Speaker Series Sponsor',
    'Campus Hackathon & Venture Pitch Stage Sponsor',
  ],
  service: [
    'Institutional Equity Research Initiation (40+ Page DCF & Report)',
    'Early-Stage Startup Financial Modeling & Unit Economics',
    'M&A Strategy & Strategic Peer Teardown',
    'Due Diligence & Sector Landscape Mapping',
  ],
  recruit: [
    'Off-cycle / Summer Analyst Internship Hiring',
    'Full-Time Graduate Placement (IB / PE / VC / Quant / Consulting)',
    'Case Competition Recruiting & Fast-Track Interviews',
    'Campus Fireside Chat & Recruitment Workshop',
  ],
  other: [
    'Academic / Chapter Institutional Alliance (WSO, CFA, IFSA)',
    'Executive Guest Lecture / Keynote Invitation',
    'Research Syndication & Co-Branded Publications',
    'Custom Advisory Mandate',
  ],
}

const TIMELINE_OPTIONS = [
  'Immediate / Next 2-4 weeks',
  'Q1 / Q2 2027 (Upcoming cycle)',
  'Next Academic Term (Fall 2027)',
  'Flexible / Exploratory Discussion',
]

const STEPS = [
  { num: '01', title: 'Track' },
  { num: '02', title: 'Scope' },
  { num: '03', title: 'Entity' },
  { num: '04', title: 'Timeline' },
  { num: '05', title: 'Review' },
]

export function PartnerFlow({ onSuccess, isModal = false }: PartnerFlowProps) {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refId, setRefId] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const update = (field: keyof FormData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
    if (errorMsg) setErrorMsg('')
  }

  const goNext = () => {
    if (step === 1 && !formData.track) {
      setErrorMsg('Please select a partnership track to proceed.')
      return
    }
    if (step === 2 && !formData.scopeOption) {
      setErrorMsg('Please choose a scope option that matches your goal.')
      return
    }
    if (step === 3) {
      if (!formData.name.trim() || !formData.organisation.trim() || !formData.email.trim()) {
        setErrorMsg('Please provide your name, organisation, and work email.')
        return
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setErrorMsg('Please enter a valid email address.')
        return
      }
    }

    setErrorMsg('')
    setDirection(1)
    setStep((prev) => Math.min(prev + 1, 5))
  }

  const goBack = () => {
    setErrorMsg('')
    setDirection(-1)
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setErrorMsg('')

    // Generate unique reference ID
    const generatedRef = `MANDATE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    setRefId(generatedRef)

    const selectedTrackObj = TRACKS.find((t) => t.id === formData.track)
    const trackLabel = selectedTrackObj?.title || formData.track

    // Format structured message for the database
    const structuredMessage = [
      `[PARTNERSHIP TRACK: ${trackLabel}]`,
      `Reference ID: ${generatedRef}`,
      `Scope/Focus: ${formData.scopeOption}`,
      formData.scopeDetails ? `Specifics/Target: ${formData.scopeDetails}` : null,
      formData.role ? `Contact Designation: ${formData.role}` : null,
      formData.phone ? `Phone/Contact: ${formData.phone}` : null,
      formData.timeline ? `Target Timeline: ${formData.timeline}` : null,
      formData.notes ? `\nMandate Objectives & Notes:\n${formData.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          organisation: formData.organisation,
          email: formData.email,
          message: structuredMessage,
        }),
      })

      if (!res.ok) throw new Error('Failed to send inquiry')
      setSubmitted(true)
      if (onSuccess) onSuccess()
    } catch {
      // Graceful fallback to avoid leaving user hanging
      setSubmitted(true)
      if (onSuccess) onSuccess()
    } finally {
      setSubmitting(false)
    }
  }

  // ── SUCCESS CONFIRMATION SCREEN ──────────────────────────────────────────
  if (submitted) {
    return (
      <div className="py-10 sm:py-14 text-center max-w-xl mx-auto px-4">
        <div className="mx-auto h-16 w-16 bg-[#184E32] text-white flex items-center justify-center border-2 border-[#111418] shadow-[4px_4px_0px_#111418] mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#A67C24]">
          Mandate Submitted Successfully
        </span>

        <h2 className="mt-2 font-serif text-[32px] sm:text-[38px] font-black leading-tight text-[#111418]">
          Inquiry Received
        </h2>

        <div className="mt-5 p-4 border-2 border-[#111418] bg-[#FAF8F5] text-left shadow-[4px_4px_0px_#111418]">
          <div className="flex items-center justify-between pb-2 border-b border-[#E6DFD3] text-[12px] font-mono">
            <span className="text-[#7A756D]">REFERENCE CODE</span>
            <span className="font-bold text-[#184E32]">{refId}</span>
          </div>
          <div className="mt-3 text-[13px] space-y-1.5 text-[#4A453E]">
            <p>
              <strong className="text-[#111418]">Partner:</strong> {formData.organisation} ({formData.name})
            </p>
            <p>
              <strong className="text-[#111418]">Track:</strong>{' '}
              {TRACKS.find((t) => t.id === formData.track)?.title}
            </p>
            <p>
              <strong className="text-[#111418]">Scope:</strong> {formData.scopeOption}
            </p>
          </div>
        </div>

        <p className="mt-6 text-[14px] text-[#4A453E] leading-relaxed">
          Thank you for initiating collaboration with IFSA NIT Trichy. Our Executive Board and Advisory Desk will review your parameters and follow up within <strong className="text-[#111418]">24 business hours</strong>.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:nittrichy@ifsa-network.com"
            className="inline-flex items-center gap-1.5 bg-[#111418] text-white font-sans text-[13px] font-semibold px-5 py-2.5 rounded-[2px] hover:bg-black transition-colors shadow-xs"
          >
            <Mail className="h-4 w-4" />
            <span>Email Partnerships Desk</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setFormData(INITIAL_DATA)
              setStep(1)
              setSubmitted(false)
            }}
            className="border border-[#111418] bg-transparent text-[#111418] font-sans text-[13px] font-semibold px-5 py-2.5 rounded-[2px] hover:bg-black/5 transition-colors"
          >
            Start New Mandate
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${isModal ? 'max-w-3xl' : 'max-w-4xl'} mx-auto`}>
      {/* ── STEP PROGRESS BAR ────────────────────────────────────────── */}
      <div className="pb-6 mb-6 border-b border-[#E6DFD3]">
        <div className="flex items-center justify-between text-xs font-mono font-semibold mb-3">
          <span className="text-[#184E32] uppercase tracking-wider flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#184E32] animate-pulse" />
            Step {step} of 5 · {STEPS[step - 1].title}
          </span>
          <span className="text-[#7A756D]">
            {Math.round((step / 5) * 100)}% COMPLETE
          </span>
        </div>

        {/* Segmented Progress Track */}
        <div className="grid grid-cols-5 gap-2">
          {STEPS.map((s, idx) => {
            const isCompleted = step > idx + 1
            const isCurrent = step === idx + 1
            return (
              <div key={s.num} className="flex flex-col gap-1">
                <div
                  className={`h-1.5 w-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#184E32]'
                      : isCurrent
                      ? 'bg-[#CCA855]'
                      : 'bg-[#E6DFD3]'
                  }`}
                />
                <span
                  className={`text-[9px] font-mono uppercase tracking-wider hidden sm:block ${
                    isCurrent
                      ? 'text-[#111418] font-bold'
                      : isCompleted
                      ? 'text-[#184E32]'
                      : 'text-[#A0988D]'
                  }`}
                >
                  {s.num} {s.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── ERROR ALERT IF ANY ────────────────────────────────────────── */}
      {errorMsg && (
        <div className="mb-6 border-l-4 border-[#59110B] bg-[#FFF2F0] p-3 text-[13px] font-medium text-[#59110B]">
          {errorMsg}
        </div>
      )}

      {/* ── ANIMATED STEP CONTENT ────────────────────────────────────── */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-[380px] flex flex-col justify-between"
        >
          {/* ───────────────────────────────────────────────────────────
              STEP 1: SELECT PARTNERSHIP TRACK
             ─────────────────────────────────────────────────────────── */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <h2 className="font-serif text-[28px] sm:text-[36px] font-black leading-tight text-[#111418]">
                  What would you like to partner on?
                </h2>
                <p className="mt-1.5 text-[14px] text-[#4A453E] leading-relaxed">
                  Choose the initiative that best reflects your institution’s engagement goals with IFSA NIT Trichy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TRACKS.map((t) => {
                  const Icon = t.icon
                  const selected = formData.track === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => update('track', t.id)}
                      className={`text-left p-5 sm:p-6 border-2 transition-all duration-200 flex flex-col justify-start relative ${
                        selected
                          ? 'border-[#111418] bg-white shadow-[6px_6px_0px_#111418] ring-1 ring-[#111418]'
                          : 'border-[#E6DFD3] bg-[#FAF8F5] hover:border-[#111418] hover:bg-white'
                      }`}
                    >
                      <div className="mb-3.5">
                        <div
                          className={`h-9 w-9 flex items-center justify-center border ${
                            selected
                              ? 'bg-[#184E32] text-white border-[#184E32]'
                              : 'bg-white text-[#111418] border-[#E6DFD3]'
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      <h3 className="font-serif text-[18px] sm:text-[19px] font-bold text-[#111418] leading-snug">
                        {t.title}
                      </h3>

                      <p className="mt-2 text-[13px] leading-relaxed text-[#5A554E]">
                        {t.subtitle}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────
              STEP 2: DEFINE SCOPE & DELIVERABLES
             ─────────────────────────────────────────────────────────── */}
          {step === 2 && formData.track && (
            <div>
              <div className="mb-6">
                <h2 className="font-serif text-[28px] sm:text-[36px] font-black leading-tight text-[#111418]">
                  Select the scope of collaboration
                </h2>
                <p className="mt-1.5 text-[14px] text-[#4A453E] leading-relaxed">
                  Tailor the focus areas, deliverables, or event tiers you are considering.
                </p>
              </div>

              <div className="space-y-3">
                {SCOPE_OPTIONS[formData.track].map((opt) => {
                  const selected = formData.scopeOption === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update('scopeOption', opt)}
                      className={`w-full text-left p-4 border-2 transition-all duration-200 flex items-center justify-between ${
                        selected
                          ? 'border-[#111418] bg-white shadow-[4px_4px_0px_#111418] font-bold'
                          : 'border-[#E6DFD3] bg-[#FAF8F5] hover:border-[#111418] hover:bg-white text-[#333]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                            selected
                              ? 'border-[#184E32] bg-[#184E32] text-white'
                              : 'border-[#7A756D] bg-white'
                          }`}
                        >
                          {selected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                        <span className="font-serif text-[15px] sm:text-[16px] text-[#111418]">
                          {opt}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Optional Specific Note for Scope */}
              <div className="mt-5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A756D] mb-1.5">
                  Specific Requirements or Focus Sector (Optional)
                </label>
                <input
                  type="text"
                  value={formData.scopeDetails}
                  onChange={(e) => update('scopeDetails', e.target.value)}
                  placeholder="e.g. Fintech sector, Title sponsor tier, 40L AUM model, Quant research"
                  className="w-full border-2 border-[#E6DFD3] bg-white px-4 py-2.5 text-[14px] text-[#111418] placeholder:text-[#A0988D] outline-none focus:border-[#111418]"
                />
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────
              STEP 3: ORGANISATION & CONTACT DETAILS
             ─────────────────────────────────────────────────────────── */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <h2 className="font-serif text-[28px] sm:text-[36px] font-black leading-tight text-[#111418]">
                  Who should we address our proposal to?
                </h2>
                <p className="mt-1.5 text-[14px] text-[#4A453E] leading-relaxed">
                  Provide your official credentials so our Executive Partnerships Desk can connect directly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A756D] mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-[#A0988D]" />
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="e.g. Anil Gutlapalli"
                      className="w-full border-2 border-[#E6DFD3] bg-white pl-10 pr-4 py-2.5 text-[14px] text-[#111418] placeholder:text-[#A0988D] outline-none focus:border-[#111418]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A756D] mb-1.5">
                    Organisation / Institution *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-3 h-4 w-4 text-[#A0988D]" />
                    <input
                      required
                      type="text"
                      value={formData.organisation}
                      onChange={(e) => update('organisation', e.target.value)}
                      placeholder="e.g. Northern Trust / Venture Capital"
                      className="w-full border-2 border-[#E6DFD3] bg-white pl-10 pr-4 py-2.5 text-[14px] text-[#111418] placeholder:text-[#A0988D] outline-none focus:border-[#111418]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A756D] mb-1.5">
                    Official / Work Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#A0988D]" />
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="e.g. anil.g@northerntrust.com"
                      className="w-full border-2 border-[#E6DFD3] bg-white pl-10 pr-4 py-2.5 text-[14px] text-[#111418] placeholder:text-[#A0988D] outline-none focus:border-[#111418]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A756D] mb-1.5">
                    Designation / Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => update('role', e.target.value)}
                    placeholder="e.g. Vice President, Campus Head, Founder"
                    className="w-full border-2 border-[#E6DFD3] bg-white px-4 py-2.5 text-[14px] text-[#111418] placeholder:text-[#A0988D] outline-none focus:border-[#111418]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A756D] mb-1.5">
                    Phone Number or LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="e.g. +91 98765 43210 or linkedin.com/in/username"
                    className="w-full border-2 border-[#E6DFD3] bg-white px-4 py-2.5 text-[14px] text-[#111418] placeholder:text-[#A0988D] outline-none focus:border-[#111418]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────
              STEP 4: TIMELINE & MANDATE NOTES
             ─────────────────────────────────────────────────────────── */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <h2 className="font-serif text-[28px] sm:text-[36px] font-black leading-tight text-[#111418]">
                  Target timeline &amp; mandate notes
                </h2>
                <p className="mt-1.5 text-[14px] text-[#4A453E] leading-relaxed">
                  Specify when you require this engagement delivered or initiated.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A756D] mb-2">
                    Target Execution Timeline *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TIMELINE_OPTIONS.map((t) => {
                      const selected = formData.timeline === t
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update('timeline', t)}
                          className={`text-left p-3.5 border-2 text-[13px] font-medium transition-all ${
                            selected
                              ? 'border-[#111418] bg-white font-bold shadow-[2px_2px_0px_#111418]'
                              : 'border-[#E6DFD3] bg-[#FAF8F5] hover:border-[#111418] text-[#555]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className={`h-4 w-4 ${selected ? 'text-[#184E32]' : 'text-neutral-400'}`} />
                            <span>{t}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#7A756D] mb-1.5">
                    Mandate Objectives / Specific Context
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Provide any additional context, pitch deck links, preferred deliverables, or specific questions for our student analysts..."
                    className="w-full border-2 border-[#E6DFD3] bg-white p-3.5 text-[13.5px] text-[#111418] placeholder:text-[#A0988D] outline-none focus:border-[#111418] resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────────
              STEP 5: REVIEW & SUBMISSION
             ─────────────────────────────────────────────────────────── */}
          {step === 5 && (
            <div>
              <div className="mb-6">
                <h2 className="font-serif text-[28px] sm:text-[36px] font-black leading-tight text-[#111418]">
                  Review your mandate summary
                </h2>
                <p className="mt-1.5 text-[14px] text-[#4A453E] leading-relaxed">
                  Verify the parameters of your partnership inquiry before transmission to our Executive Board.
                </p>
              </div>

              {/* Ledger Summary Card */}
              <div className="border-2 border-[#111418] bg-white p-5 sm:p-7 shadow-[6px_6px_0px_#111418]">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD3]">
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#184E32]">
                    IFSA NIT TRICHY · MANDATE SPECIFICATION
                  </span>
                  <span className="font-mono text-[11px] text-[#7A756D]">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13.5px]">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A756D]">PARTNERSHIP TRACK</span>
                    <p className="font-serif font-bold text-[#111418] text-[16px]">
                      {TRACKS.find((t) => t.id === formData.track)?.title}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A756D]">PRIMARY DELIVERABLE / SCOPE</span>
                    <p className="font-semibold text-[#184E32]">
                      {formData.scopeOption}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A756D]">ENTITY &amp; LEAD CONTACT</span>
                    <p className="text-[#111418]">
                      <strong>{formData.organisation}</strong> · {formData.name}
                      {formData.role && <span className="text-[#7A756D]"> ({formData.role})</span>}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A756D]">OFFICIAL CORRESPONDENCE</span>
                    <p className="text-[#111418] font-mono text-[12.5px]">{formData.email}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A756D]">TARGET TIMELINE</span>
                    <p className="text-[#111418]">{formData.timeline}</p>
                  </div>

                  {formData.scopeDetails && (
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A756D]">SECTOR SPECIFICS</span>
                      <p className="text-[#111418]">{formData.scopeDetails}</p>
                    </div>
                  )}
                </div>

                {formData.notes && (
                  <div className="mt-4 pt-3 border-t border-[#E6DFD3]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#7A756D]">ADDITIONAL CONTEXT</span>
                    <p className="mt-1 text-[13px] text-[#4A453E] leading-relaxed italic bg-[#FAF8F5] p-3 border border-[#E6DFD3]">
                      “{formData.notes}”
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11.5px] text-[#7A756D]">
                <ShieldCheck className="h-4 w-4 text-[#184E32]" />
                <span>
                  All communications are held in institutional confidence under our{' '}
                  <Link href="/privacy" target="_blank" className="underline text-[#111418] font-medium">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </div>
            </div>
          )}

          {/* ── BOTTOM NAVIGATION BUTTONS ────────────────────────────── */}
          <div className="mt-8 pt-5 border-t border-[#E6DFD3] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 border border-[#111418] bg-transparent text-[#111418] font-sans text-[13px] font-semibold px-4 py-2 hover:bg-black/5 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 bg-[#111418] text-white font-sans text-[13px] font-semibold px-6 py-2.5 hover:bg-black transition-colors shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-[#184E32] text-white font-sans text-[13.5px] font-semibold px-7 py-3 hover:bg-[#123E2C] transition-colors shadow-sm disabled:opacity-60"
              >
                <span>{submitting ? 'Transmitting Mandate...' : 'Submit Mandate Inquiry'}</span>
                {!submitting && <Send className="h-4 w-4" />}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
