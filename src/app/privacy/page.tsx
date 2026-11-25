import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Shield, Lock, FileText, Database, UserCheck, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Governance',
  description:
    'Learn how IFSA NIT Trichy collects, protects, and governs personal information submitted through partner inquiries, summit registrations, and recruitment forms.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & Data Governance | IFSA NIT Trichy',
    description:
      'Our commitment to data privacy, zero commercialization, and responsible governance of all form submissions.',
    url: '/privacy',
  },
}

const POLICY_SECTIONS = [
  {
    icon: FileText,
    title: '1. Information Collected Through Forms',
    desc: 'We collect personal information only when you voluntarily provide it through our website forms and digital applications:',
    items: [
      {
        heading: 'Partner & Client Mandate Inquiries (Partner Modal / Clients Page)',
        detail:
          'When commissioning an equity research mandate, live venture advisory, or sponsorship, we collect your full name, institutional email address, organisation or company name, and the specific mandate scope.',
      },
      {
        heading: 'Event & Summit Registrations (IFSC & Masterclasses)',
        detail:
          'When registering as a delegate for the IFSA National Finance Summit or masterclass sessions, we collect your name, university or college affiliation, academic department, contact email, phone number, and team member details for case competitions.',
      },
      {
        heading: 'Student Analyst Recruitments & Membership Applications',
        detail:
          'During campus recruitment cycles, candidates submit their NIT Trichy roll number, degree programme, academic performance metrics (CGPA), resume/curriculum vitae, prior analytical experience, and equity research sample write-ups.',
      },
      {
        heading: 'Research Access & General Correspondence',
        detail:
          'If you contact our desks for publication downloads, press inquiries, or institutional collaborations, we record your name, email, and inquiry history.',
      },
    ],
  },
  {
    icon: UserCheck,
    title: '2. How We Use Form Submissions',
    desc: 'Information submitted through our forms is utilized strictly for academic, chapter governance, and advisory execution purposes:',
    items: [
      {
        heading: 'Mandate Scoping & Advisory Execution',
        detail:
          'Client inquiry details are used exclusively by our Executive Board to evaluate project feasibility, prepare formal proposals, execute non-disclosure agreements (NDAs), and assign student research desks.',
      },
      {
        heading: 'Summit Logistics & Delegate Accreditation',
        detail:
          'Event registration data enables badge issuance, venue security clearance at NIT Trichy campus, competition scoring, cash prize disbursement, and verified certificate distribution.',
      },
      {
        heading: 'Analyst Evaluation & Induction',
        detail:
          'Recruitment responses and resumes are reviewed solely by the Editorial and Quantitative leads to conduct double-blind evaluations, schedule technical interviews, and select incoming cohorts.',
      },
      {
        heading: 'Strict Zero-Monetization Guarantee',
        detail:
          'We do not sell, rent, license, trade, or share your personal information or form submissions with third-party advertisers, data aggregators, or marketing brokers under any circumstances.',
      },
    ],
  },
  {
    icon: Lock,
    title: '3. Data Confidentiality & Client Privilege',
    desc: 'Live financial advisory mandates operate under rigorous institutional standards:',
    items: [
      {
        heading: 'Non-Disclosure Agreements (NDAs)',
        detail:
          'All student analysts working on proprietary startup and corporate mandates (e.g. Varicash, Climate B, myMFD) sign bilateral NDAs before accessing client financial models or strategic materials.',
      },
      {
        heading: 'Restricted Access Permissions',
        detail:
          'Access to raw form databases is restricted exclusively to authorized chapter executives (President, Vice President, Head of Research) and chapter faculty advisors at NIT Trichy.',
      },
    ],
  },
  {
    icon: Database,
    title: '4. Cookies & Analytics Technologies',
    desc: 'Our website uses minimal, privacy-preserving web technologies:',
    items: [
      {
        heading: 'Essential Session Storage',
        detail:
          'We use local browser storage (`localStorage`) solely to remember your UI preferences, such as dismissing the announcement banner or saving your cookie consent choices.',
      },
      {
        heading: 'Privacy-Preserving Telemetry',
        detail:
          'We employ Vercel Analytics and Speed Insights to measure aggregate page load speeds and visitor counts without recording IP addresses, tracking personal identities across websites, or serving behavioral advertisements.',
      },
    ],
  },
  {
    icon: Shield,
    title: '5. Data Retention & Your Rights',
    desc: 'You maintain full ownership and control over your personal data:',
    items: [
      {
        heading: 'Retention Timelines',
        detail:
          'Event and mandate data is retained for the active academic cycle or project duration. Recruitment candidate dossiers are permanently archived or deleted once the selection cycle concludes.',
      },
      {
        heading: 'Right to Access & Deletion',
        detail:
          'You may at any time request a copy of the data we hold regarding your inquiries, or request immediate and permanent deletion of your contact records from our systems.',
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-[#FAF7F0] min-h-screen text-[#111418]">
      {/* ── Page Header / Hero ────────────────────────────────────────── */}
      <section className="relative border-b border-[#E6DFD3] py-14 sm:py-20 lg:py-24">
        {/* Subtle engineering ledger grid background */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #E6DFD3 1px, transparent 1px), linear-gradient(to bottom, #E6DFD3 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            backgroundPosition: 'center top',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[840px]">
            <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

            <h1 className="mt-6 font-serif text-[38px] sm:text-[52px] md:text-[60px] font-black leading-[1.05] tracking-tight text-[#111418]">
              Privacy Policy &amp;
              <br />
              Data Governance
            </h1>

            <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-[#4A453E]">
              The International Finance Students Association at NIT Trichy is committed to transparency, fiduciary integrity, and the uncompromising security of personal information shared across our client advisory mandates, summit delegate applications, and analyst recruitment forms.
            </p>

            <p className="mt-2 font-mono text-[12px] text-[#7A756D]">
              Last updated: November 2026 · Official APAC Chapter 10
            </p>
          </div>
        </div>
      </section>

      {/* ── Core Policy Content ────────────────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:gap-14">
            {POLICY_SECTIONS.map((section) => {
              const Icon = section.icon
              return (
                <div
                  key={section.title}
                  className="border-2 border-[#111418] bg-white p-7 sm:p-10 shadow-[6px_6px_0px_0px_#111418]"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-[#E6DFD3]">
                    <div className="h-8 w-8 bg-[#184E32] flex items-center justify-center text-white shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-[#111418] tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  <p className="mt-4 font-sans text-[14px] text-[#4A453E] leading-relaxed">
                    {section.desc}
                  </p>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {section.items.map((item) => (
                      <div
                        key={item.heading}
                        className="border border-[#E6DFD3] bg-[#FAF8F5] p-5 rounded-[4px] flex flex-col justify-start"
                      >
                        <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-[#111418]">
                          {item.heading}
                        </h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#5A554E]">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* ── Contact & Data Inquiries ────────────────────────── */}
            <div className="border-2 border-[#111418] bg-[#184E32] p-8 sm:p-12 text-[#FAF7F0] shadow-[8px_8px_0px_0px_#111418] relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-5 w-5 text-[#CCA855]" />
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#CCA855]">
                    Data Controller Contact
                  </span>
                </div>

                <h2 className="font-serif text-[28px] sm:text-[34px] font-bold leading-tight tracking-tight text-white">
                  Questions regarding your data?
                </h2>

                <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-[#FAF7F0]/90">
                  To exercise your data privacy rights, request removal of your form submissions, or clarify our confidential handling procedures, please write directly to our executive board:
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:nittrichy@ifsa-network.com"
                    className="inline-flex items-center gap-2 bg-white text-[#111418] font-sans text-[13px] font-semibold px-5 py-2.5 rounded-[2px] hover:bg-[#FAF7F0] transition-colors shadow-xs"
                  >
                    nittrichy@ifsa-network.com
                  </a>

                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 border border-white/50 text-white font-sans text-[13px] font-medium px-4 py-2.5 rounded-[2px] hover:bg-white/10 transition-colors"
                  >
                    ← Return to Homepage
                  </Link>
                </div>

                <p className="mt-6 font-mono text-[11px] text-white/70">
                  Department of Management Studies / T&amp;P Complex, National Institute of Technology, Tiruchirappalli, Tamil Nadu 620015, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
