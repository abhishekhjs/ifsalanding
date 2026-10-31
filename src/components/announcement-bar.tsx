'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'ifsa-announcement-dismissed-v1'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (!dismissed) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {}
  }

  if (!visible) return null

  return (
    <div
      role="banner"
      className="relative z-50 flex items-center justify-center gap-x-6 bg-[#59110B] px-4 py-2.5 sm:px-6"
    >
      <p className="text-center text-[13px] leading-5 text-white/90 font-sans">
        <span className="inline-flex items-center gap-2">
          {/* Live pulse dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span>
            3 live mandates active —{' '}
            <span className="font-medium text-white">Varicash · Climate B · myMFD</span>
          </span>
        </span>
        <Link
          href="/clients"
          className="ml-3 inline-flex items-center gap-1 border-b border-white/50 pb-px text-[13px] font-medium text-white transition-colors hover:border-white"
        >
          View mandates →
        </Link>
      </p>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
      >
        <svg viewBox="0 0 14 14" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7 .293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586 1.707.293Z" />
        </svg>
      </button>
    </div>
  )
}
