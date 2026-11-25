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
      className="relative z-50 flex items-center justify-center bg-[#0D1014] px-4 py-2 text-[12px] font-mono text-[#E4DFD7] border-b border-[#222]"
    >
      <div className="flex items-center gap-2">
        <span className="text-[#E5484D] text-[10px]">●</span>
        <span>
          3 live mandates active — Varicash · Climate B · myMFD
        </span>
        <Link
          href="/clients"
          className="ml-2 inline-flex items-center text-[#E4DFD7] hover:underline"
        >
          View mandates →
        </Link>
      </div>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center text-[#888] transition-colors hover:text-white"
      >
        <span className="text-[13px] leading-none">✕</span>
      </button>
    </div>
  )
}
