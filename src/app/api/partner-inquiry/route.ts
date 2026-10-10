import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database'

type InquiryInsert = Database['public']['Tables']['partnership_inquiries']['Insert']

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, organisation, email, message } = body as InquiryInsert

    if (!name || !organisation || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const payload: InquiryInsert = { name, organisation, email, message }
    const { error } = await supabase
      .from('partnership_inquiries')
      .insert(payload as never)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Partner inquiry error:', err)
    return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 })
  }
}

