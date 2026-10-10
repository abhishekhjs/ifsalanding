import Link from 'next/link'
import Image from 'next/image'

const FOOT_COLS = [
  {
    title: 'Our Work',
    items: [
      { label: 'Publications', href: '/publications' },
      { label: 'Clients & Partners', href: '/clients' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'About',
    items: [
      { label: 'Who we are', href: '/about' },
      { label: 'Mentors & Team', href: '/about#team' },
      { label: 'How to join', href: '/about#join' },
    ],
  },
  {
    title: 'Partner',
    items: [
      { label: 'Ways to partner', href: '/clients' },
      { label: 'Sponsor an event', href: '/events' },
      { label: 'Recruit from campus', href: '/clients' },
    ],
  },
]

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ifsa-nit-trichy',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/ifsanitt',
    path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4zM17.5 6.5h.01',
  },
]

export function Footer() {
  return (
    <footer className="border-t border-[#E4DACB] bg-[#FAF8F5] pt-14 pb-10 md:pt-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/icon.jpg"
                alt="IFSA NIT Trichy"
                width={32}
                height={32}
                className="shrink-0 rounded-[6px] border border-[#E4DACB] object-cover"
              />
              <span className="font-serif text-[18px] font-normal text-[#1C1917]">
                IFSA NIT Trichy
              </span>
            </div>
            <p className="mt-3 max-w-[280px] text-[13.5px] leading-relaxed text-[#78716C]">
              The 10th APAC chapter of the International Finance Students Association. Founded Dec 2, 2024 at NIT Trichy.
            </p>
            <a
              href="mailto:nittrichy@ifsa-network.com"
              className="mt-2 inline-block text-[13.5px] font-medium text-[#59110B] transition-colors hover:text-[#400A06] hover:underline"
            >
              nittrichy@ifsa-network.com
            </a>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#E4DACB] bg-white text-[#44403C] transition-all hover:border-[#59110B] hover:text-[#59110B]"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOT_COLS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#7A5424]">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 list-none p-0 m-0">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-[#44403C] transition-colors hover:text-[#59110B]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col flex-wrap justify-between gap-3 border-t border-[#E4DACB] pt-6 sm:flex-row text-[13px] text-[#78716C]">
          <p>© {new Date().getFullYear()} IFSA NIT Trichy · Ambition Meets Impact.</p>
          <p>10th APAC Chapter · In strategic partnership with Wall Street Oasis (WSO)</p>
        </div>
      </div>
    </footer>
  )
}
