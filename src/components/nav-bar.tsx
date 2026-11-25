'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { PartnerModal } from '@/components/partner-modal'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Publications', href: '/publications' },
  { label: 'Clients', href: '/clients' },
  { label: 'Events', href: '/events' },
]

export function NavBar() {
  const pathname = usePathname()
  const [modalOpen, setModalOpen] = useState(false)

  if (pathname !== '/') {
    return null
  }

  return (
    <>
      <header className="relative z-40 w-full bg-[#FAF7F0] overflow-hidden">
        {/* Full-bleed engineering ledger grid pattern behind navbar */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, #E6DFD3 1px, transparent 1px), linear-gradient(to bottom, #E6DFD3 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            backgroundPosition: 'center top',
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 h-[88px] flex items-center justify-between">
          {/* Brand Logo (Text only, left aligned) */}
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              aria-label="IFSA NIT Trichy, home"
              className="font-serif text-[18px] sm:text-[20px] font-bold tracking-tight text-[#111418] hover:opacity-80 transition-opacity no-underline"
            >
              IFSA NIT Trichy
            </Link>
          </div>

          {/* Center-Aligned Desktop Nav Links */}
          <nav aria-label="Primary" className="hidden md:flex items-center justify-center gap-7 lg:gap-8">
            {NAV.map((n) => {
              const active = n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-[13.5px] transition-colors ${
                    active
                      ? 'text-[#111418] font-bold'
                      : 'text-[#4A453E] font-medium hover:text-[#111418]'
                  }`}
                >
                  {n.label}
                </Link>
              )
            })}
          </nav>

          {/* Action CTA & Mobile Trigger (Right aligned) */}
          <div className="flex-1 flex items-center justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="hidden md:inline-flex bg-[#111418] text-white text-[12.5px] font-semibold px-4.5 py-2 hover:bg-[#2A2E33] transition-colors shadow-xs"
            >
              Partner with us
            </button>

            {/* Mobile hamburger */}
            <Sheet>
              <SheetTrigger
                aria-label="Open menu"
                className="md:hidden flex h-9 w-9 items-center justify-center border border-[#111418] bg-white text-[#111418]"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </SheetTrigger>
              <SheetContent side="right" className="p-6 border-l border-[#E6DFD3] bg-[#FAF7F0]">
                <div className="pb-5 border-b border-[#E6DFD3]">
                  <h2 className="font-serif font-bold text-[18px] text-[#111418]">IFSA NIT Trichy</h2>
                </div>
                <nav className="flex flex-col gap-3 mt-6">
                  {NAV.map((n) => {
                    const active = n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)
                    return (
                      <Link
                        key={n.href}
                        href={n.href}
                        className={`py-2 text-[15px] font-medium transition-colors ${
                          active
                            ? 'text-[#184E32] font-semibold'
                            : 'text-[#111418] hover:text-[#184E32]'
                        }`}
                      >
                        {n.label}
                      </Link>
                    )
                  })}
                  <button
                    onClick={() => setModalOpen(true)}
                    className="mt-4 w-full bg-[#111418] text-white py-2.5 text-[13.5px] font-semibold hover:bg-[#2A2E33]"
                  >
                    Partner with us
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
