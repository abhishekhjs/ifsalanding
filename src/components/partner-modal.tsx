'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Props {
  open: boolean
  onClose: () => void
}

export function PartnerModal({ open, onClose }: Props) {
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    // Server action will be wired here - for now just mark sent
    await fetch('/api/partner-inquiry', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).catch(() => null)
    setSent(true)
  }

  const inputStyle = { width: '100%', border: '1px solid var(--border-strong)', background: '#fff', borderRadius: 4, padding: '11px 12px', fontSize: 15, fontFamily: 'inherit', marginTop: 6 }
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-slate)' }

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); setSent(false) } }}>
      <DialogContent style={{ background: '#fff', maxWidth: 480, borderRadius: 8, boxShadow: 'var(--shadow-modal)' }}>
        <DialogHeader>
          <DialogTitle style={{ font: "400 22px var(--font-serif), Georgia, serif", color: 'var(--text-charcoal)' }}>Partner with IFSA NIT Trichy</DialogTitle>
        </DialogHeader>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <p style={{ fontSize: 15, color: 'var(--text-slate)' }}>Thank you. We will be in touch within 2 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
            <label style={labelStyle}>
              Name
              <input required name="name" type="text" placeholder="Your name" style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Organisation
              <input required name="organisation" type="text" placeholder="Company / institution" style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Email
              <input required name="email" type="email" placeholder="you@example.com" style={inputStyle} />
            </label>
            <label style={labelStyle}>
              Message
              <textarea required name="message" rows={4} placeholder="Tell us about the collaboration you have in mind." style={{ ...inputStyle, resize: 'vertical' }} />
            </label>
            <button type="submit" style={{ background: 'var(--mahogany-base)', color: '#fff', border: 0, borderRadius: 4, padding: '13px 24px', font: "500 15px var(--font-sans), sans-serif", cursor: 'pointer', marginTop: 4 }}>
              Send enquiry
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
