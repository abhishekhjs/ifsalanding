import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, BookOpen, Calendar, Compass, Handshake, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found. Explore IFSA NIT Trichy research, events, and initiatives.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  const quickLinks = [
    { label: 'Home', href: '/', icon: Home, desc: 'Return to our homepage and overview' },
    { label: 'About Us & Mentors', href: '/about', icon: Compass, desc: 'Learn about our founders, team, and mentors' },
    { label: 'Publications & Research', href: '/publications', icon: BookOpen, desc: 'Read institutional equity research reports' },
    { label: 'Events & Initiatives', href: '/events', icon: Calendar, desc: 'Explore summits, case competitions & masterclasses' },
    { label: 'Clients & Partners', href: '/clients', icon: Handshake, desc: 'Discover our live venture advisory mandates' },
  ]

  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        {/* Status indicator */}
        <div className="inline-flex items-center rounded-full border border-[#E4DACB] bg-white px-3.5 py-1.5 shadow-2xs">
          <span className="font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-[#7A5424]">
            HTTP 404 · Resource Not Found
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-6 font-serif text-[42px] sm:text-[54px] font-normal leading-tight text-[#1C1917]">
          Lost in the <span className="italic text-[#59110B]">Financial Markets</span>?
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-[#57534E]">
          The dossier, page, or link you are searching for does not exist or has been relocated.
          Use the directory below to navigate back to our live chapter initiatives.
        </p>

        {/* Directory cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
          {quickLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-3.5 rounded-[10px] border border-[#E4DACB] bg-white p-4 shadow-xs transition-all hover:-translate-y-0.5 hover:border-[#59110B] hover:shadow-md"
              >
                <div className="rounded-[8px] bg-[#FAF8F5] p-2.5 text-[#59110B] border border-[#E4DACB] transition-colors group-hover:bg-[#59110B] group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-serif text-[16px] font-normal text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                    {item.label}
                  </h2>
                  <p className="mt-0.5 text-[12.5px] text-[#78716C] leading-snug">
                    {item.desc}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Primary CTA */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[8px] bg-[#59110B] px-6 py-3 font-mono text-[13px] font-medium tracking-wide uppercase text-white shadow-sm transition-all hover:bg-[#430D08] hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
