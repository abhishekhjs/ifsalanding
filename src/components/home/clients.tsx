import Link from 'next/link'
import Image from 'next/image'

const CLIENT_PARTNERS = [
  // Only these 3 are live active mandates
  {
    name: 'Varicash',
    badge: 'Live Mandate',
    domain: 'Fintech & Lending',
    tagline: 'Loan Against Mutual Funds (LAMF) Rails',
    logo: '/varicash-logo.png',
  },
  {
    name: 'Climate B Venture',
    badge: 'Live Mandate',
    domain: 'Climate & ESG Analytics',
    tagline: 'Physical & Transition Risk Modeling',
    logo: '/climate-b-logo.png',
  },
  {
    name: 'myMFD',
    badge: 'Live Mandate',
    domain: 'WealthTech & SaaS',
    tagline: 'Digital Operating System for MFDs',
    logo: '/mymfd-logo.png',
  },
  // Completed Mandates
  {
    name: 'Carbon6',
    badge: 'Completed Mandate',
    domain: 'Climate Finance & ESG',
    tagline: 'EU ETS vs. India PAT Framework',
    logo: '/carbon6-framed.png',
  },
  {
    name: 'Spotlight Partners',
    badge: 'Completed Mandate',
    domain: 'Venture Capital & Valuation',
    tagline: 'Startup Valuation & LTV/CAC',
    logo: '/spotlight-framed.png',
  },
  {
    name: 'VentureWolf',
    badge: 'Completed Mandate',
    domain: 'Corporate Debt Advisory',
    tagline: 'MSME Hybrid Debt & Mezzanine',
    logo: '/venturewolf-framed.png',
  },
  {
    name: 'Infisum Inc.',
    badge: 'Completed Mandate',
    domain: 'International Tax & Policy',
    tagline: 'UAE Corporate & R&D Tax Credit',
    logo: '/infisum-framed.png',
  },
  {
    name: 'Cosmo Health',
    badge: 'Completed Mandate',
    domain: 'Healthcare Intelligence',
    tagline: 'Digital Health TAM & Unit Economics',
    logo: '/cosmo-framed.png',
  },
  {
    name: 'FundCapita',
    badge: 'Completed Mandate',
    domain: 'Fintech Syndication',
    tagline: 'Early-Stage Venture Platform GTM',
    logo: '/fundcapita-framed.png',
  },
]

const CORPORATE_LOGOS = [
  { name: 'EY', src: '/ey-framed.png' },
  { name: 'ZS Associates', src: '/zs-framed.png' },
  { name: 'SBI Funds', src: '/sbi-framed.png' },
  { name: 'Pernod Ricard', src: '/pernod-framed.png' },
  { name: 'Microsoft', src: '/microsoft-framed.png' },
  { name: 'Novartis', src: '/novartis-framed.png' },
  { name: 'P&G', src: '/pg-framed.png' },
]

export function HomeClients() {
  const repeatedLogos = [...CORPORATE_LOGOS, ...CORPORATE_LOGOS, ...CORPORATE_LOGOS]

  return (
    <section className="border-b border-[#E4DACB] bg-[#FAF8F5] py-16 md:py-22">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 text-center">
        {/* Top Header: Alumni Placements */}
        <h2 className="font-serif text-[28px] font-normal text-[#1C1917] sm:text-[34px]">
          Our Alumni Are Placed At
        </h2>

        {/* Auto-scrolling company logos ribbon */}
        <div className="relative mt-10 overflow-hidden">
          {/* Gradient fade edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-36 bg-gradient-to-r from-[#FAF8F5] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-36 bg-gradient-to-l from-[#FAF8F5] to-transparent" />

          {/* Scrolling track */}
          <div className="flex w-max items-center gap-6 sm:gap-7 py-3 animate-[partner-scroll_32s_linear_infinite]">
            {repeatedLogos.map((partner, idx) => (
              <div
                key={idx}
                className="flex aspect-[2.9/1] h-18 sm:h-22 shrink-0 items-center justify-center rounded-[10px] sm:rounded-[12px] border border-[#E4DACB] bg-white p-3 sm:p-4 shadow-xs"
              >
                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo - IFSA NIT Trichy corporate partner`}
                    width={260}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 mx-auto max-w-xs border-t border-[#E4DACB]" />

        {/* Bottom Section: Live Client Projects & Advisory */}
        <div>
          <h3 className="font-serif text-[28px] font-normal text-[#1C1917] sm:text-[34px]">
            Trusted by High-Growth Ventures &amp; Industry Leaders
          </h3>
          <p className="mx-auto mt-3 max-w-[64ch] text-[15px] leading-relaxed text-[#44403C]">
            Our analysts execute active credit modeling, climate analytics, and digital operating architecture alongside delivered institutional corporate mandates.
          </p>

          {/* Client Partner Big Logo Tiles Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENT_PARTNERS.map((client) => {
              const isLive = client.badge === 'Live Mandate'

              return (
                <Link
                  key={client.name}
                  href="/clients"
                  className={`group flex flex-col justify-between rounded-[10px] border bg-white p-6 text-left shadow-[0_2px_8px_-2px_rgba(28,25,23,0.04)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-6px_rgba(89,17,11,0.12)] ${
                    isLive
                      ? 'border-[#1B6F38]/30 hover:border-[#1B6F38]'
                      : 'border-[#E4DACB] hover:border-[#59110B]'
                  }`}
                >
                  <div>
                    {/* Top Badge */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F4ECE1]">
                      <span
                        className={`rounded-[4px] px-2.5 py-1 font-mono text-[10px] font-medium uppercase ${
                          isLive
                            ? 'bg-[#EAF5EC] text-[#1B6F38] font-semibold border border-[#1B6F38]/20'
                            : 'bg-[#F4ECE1] text-[#7A5424]'
                        }`}
                      >
                        {isLive ? '● Live Mandate' : client.badge}
                      </span>
                    </div>

                    {/* Big Prominent Logo Stage */}
                    <div className="relative my-4 flex aspect-[3/1] w-full items-center justify-center rounded-[8px] bg-white p-2.5 sm:p-3 border border-[#E4DACB] shadow-2xs group-hover:border-[#59110B]/50 transition-colors">
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo - IFSA NIT Trichy client mandate`}
                        width={360}
                        height={120}
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    {/* Name & Tagline */}
                    <h4 className="font-serif text-[18px] font-normal text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                      {client.name}
                    </h4>
                    <p className="mt-1 text-[13px] leading-snug text-[#78716C]">
                      {client.tagline}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-[#F4ECE1] pt-3 flex items-center justify-between text-[12.5px] font-medium text-[#59110B]">
                    <span>Explore Case Study</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Link to partnership details */}
          <div className="mt-12">
            <Link
              href="/clients"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#59110B] transition-colors hover:text-[#400A06]"
            >
              <span className="border-b border-[#B48344] pb-0.5">Explore 3 live mandates &amp; 6 completed case studies</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes partner-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[partner-scroll_32s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
