'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { PartnerModal } from '@/components/partner-modal'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Publications', href: '/publications' },
  { label: 'Clients & Advisory', href: '/clients' },
  { label: 'Events & Summits', href: '/events' },
  { label: 'About & Mentors', href: '/about' },
]

export function NavBar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [showCta, setShowCta] = useState(pathname !== '/')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)

      if (pathname === '/') {
        const heroEl = document.getElementById('hero-section')
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect()
          // Show navbar CTA once the user has scrolled past the hero section
          setShowCta(rect.bottom <= 120)
        } else {
          setShowCta(window.scrollY > 480)
        }
      } else {
        setShowCta(true)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-[0_4px_16px_-4px_rgba(89,17,11,0.06)] border-b border-[#E4DACB]'
            : 'bg-[#FAF8F5]/75 backdrop-blur-sm border-b border-[#E4DACB]/60'
          }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 h-17 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="IFSA NIT Trichy, home"
            className="group flex items-center gap-3 text-[#1C1917] no-underline focus:outline-none"
          >
            <div className="relative overflow-hidden rounded-[6px] border border-[#E4DACB] shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/icon.jpg"
                alt="IFSA NIT Trichy"
                width={40}
                height={40}
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-[19px] font-normal tracking-tight text-[#1C1917] group-hover:text-[#59110B] transition-colors">
                IFSA
              </span>
              <span className="font-mono text-[9.5px] font-medium tracking-[0.14em] uppercase text-[#7A5424] mt-0.5">
                NIT Trichy Chapter
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
            {NAV.map((n) => {
              const active = pathname === n.href
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative px-3.5 py-2 rounded-full text-[13.5px] font-medium transition-all duration-200 ${active
                      ? 'bg-[#59110B] text-white shadow-sm'
                      : 'text-[#44403C] hover:text-[#59110B] hover:bg-[#F4ECE1]/80'
                    }`}
                >
                  {n.label}
                </Link>
              )
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center min-w-[145px] justify-end">
            <AnimatePresence>
              {showCta && (
                <motion.button
                  key="nav-partner-cta"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setModalOpen(true)}
                  className="relative inline-flex items-center justify-center rounded-full bg-[#59110B] px-5 py-2 text-[13.5px] font-medium text-white shadow-[0_2px_8px_-2px_rgba(89,17,11,0.3)] transition-all hover:bg-[#400A06] hover:shadow-[0_4px_12px_rgba(89,17,11,0.25)] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Partner with us</span>
                  <span className="ml-1 text-[11px] opacity-80">↗</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-[6px] border border-[#E4DACB] bg-white text-[#1C1917] shadow-sm hover:border-[#59110B]"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#FAF8F5] p-6 border-l border-[#E4DACB]">
              <div className="flex items-center gap-3 pb-6 border-b border-[#E4DACB]">
                <Image
                  src="/icon.jpg"
                  alt="IFSA NIT Trichy"
                  width={36}
                  height={36}
                  className="rounded-[6px] object-cover"
                />
                <div>
                  <h2 className="font-serif font-normal text-[#1C1917] text-[18px]">IFSA NIT Trichy</h2>
                  <p className="font-mono text-[10px] uppercase text-[#7A5424]">Ambition Meets Impact</p>
                </div>
              </div>
              <nav className="flex flex-col gap-2 mt-6">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`py-3 px-3 rounded-[6px] text-[15px] font-medium transition-colors ${pathname === n.href
                        ? 'bg-[#59110B] text-white'
                        : 'text-[#1C1917] hover:bg-[#F4ECE1]'
                      }`}
                  >
                    {n.label}
                  </Link>
                ))}
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-4 w-full rounded-[6px] bg-[#59110B] py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-[#400A06]"
                >
                  Partner with us ↗
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
