'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'ifsa-cookie-consent'

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const consent = localStorage.getItem(STORAGE_KEY)
      if (!consent) {
        // Slight delay so it doesn't jarringly pop on immediate first paint
        const timer = setTimeout(() => setVisible(true), 1200)
        return () => clearTimeout(timer)
      }
    } catch {
      // In case localStorage is blocked in private browsing
      setVisible(true)
    }
  }, [])

  const handleConsent = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          role="region"
          aria-label="Cookie and Privacy Consent"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[380px]"
        >
          <div className="relative border-2 border-[#111418] bg-[#FAF7F0] p-5 sm:p-6 shadow-[6px_6px_0px_0px_#111418] text-[#111418]">
            {/* Close button */}
            <button
              onClick={() => handleConsent('declined')}
              aria-label="Close cookie banner"
              className="absolute top-3.5 right-3.5 p-1 text-[#7A756D] hover:text-[#111418] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Heading */}
            <h3 className="font-serif text-[18px] sm:text-[19px] font-bold leading-tight tracking-tight text-[#111418] pr-6">
              Respecting your privacy
            </h3>

            {/* Explanation */}
            <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-[#4A453E]">
              We use essential session storage and privacy-preserving analytics to evaluate research readership. Form submissions are strictly confidential and never sold to third parties.
            </p>

            <div className="mt-2">
              <Link
                href="/privacy"
                onClick={() => setVisible(false)}
                className="font-sans text-[12px] font-semibold text-[#184E32] underline hover:text-[#111418] transition-colors"
              >
                Read our full Privacy Policy →
              </Link>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleConsent('accepted')}
                className="flex-1 bg-[#111418] text-white text-[12px] font-semibold py-2 px-3 hover:bg-black transition-colors text-center shadow-xs"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => handleConsent('declined')}
                className="flex-1 border border-[#111418] bg-transparent text-[#111418] text-[12px] font-medium py-2 px-3 hover:bg-black/5 transition-colors text-center"
              >
                Necessary Only
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
