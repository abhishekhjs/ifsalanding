import type { Database } from '@/types/database'

export type Pub = Database['public']['Tables']['publications']['Row']

export const COVER_MAP: Record<string, string> = {
  'pub-cheap-sovereignty': '/publications/covers/end-of-cheap-sovereignty.webp',
  'pub-big-beautiful-bill': '/publications/covers/one-big-beautiful-bill.webp',
  'pub-ai-bubble': '/publications/covers/is-ai-bubble-about-to-burst.webp',
  'pub-wmi-microfinance': '/publications/covers/sustaining-rural-credit-access.webp',
  'pub-wise-plc': '/publications/covers/wise-plc.webp',
  'pub-kia-motors': '/publications/covers/kia-motors.webp',
  'pub-hcltech': '/publications/covers/hcltech.webp',
}

export const PDF_MAP: Record<string, string> = {
  'pub-cheap-sovereignty': '/END%20OF%20CHEAP%20SOVEREIGNTY%20REPORT.pdf',
  'pub-big-beautiful-bill': '/one%20big%20beatiful%20bill.pdf',
  'pub-ai-bubble': '/is%20ai%20bubble%20about%20to%20burst.pdf',
  'pub-wmi-microfinance': '/Sustaining%20Rural%20Credit%20Access.pdf',
  'pub-wise-plc': '/wise%20pe%20report.pdf',
  'pub-kia-motors': '/kia%20motors%20equity%20report.pdf',
  'pub-hcltech': '/hcl%20tech%20equity%20report.pdf',
}

export function resolveCover(pub: Pub): string {
  if (pub.cover_image) return pub.cover_image
  if (COVER_MAP[pub.id]) return COVER_MAP[pub.id]
  const titleLower = pub.title.toLowerCase()
  if (titleLower.includes('cheap sovereignty')) return '/publications/covers/end-of-cheap-sovereignty.webp'
  if (titleLower.includes('beautiful bill')) return '/publications/covers/one-big-beautiful-bill.webp'
  if (titleLower.includes('bubble')) return '/publications/covers/is-ai-bubble-about-to-burst.webp'
  if (titleLower.includes('rural credit') || titleLower.includes('microfinance')) return '/publications/covers/sustaining-rural-credit-access.webp'
  if (titleLower.includes('wise')) return '/publications/covers/wise-plc.webp'
  if (titleLower.includes('kia')) return '/publications/covers/kia-motors.webp'
  if (titleLower.includes('hcl')) return '/publications/covers/hcltech.webp'
  return '/publications/covers/end-of-cheap-sovereignty.webp'
}

export function resolvePdf(pub: Pub): string {
  if (pub.pdf_link && pub.pdf_link !== '#' && !pub.pdf_link.startsWith('/publications')) return pub.pdf_link
  if (PDF_MAP[pub.id]) return PDF_MAP[pub.id]
  const titleLower = pub.title.toLowerCase()
  if (titleLower.includes('cheap sovereignty')) return '/END%20OF%20CHEAP%20SOVEREIGNTY%20REPORT.pdf'
  if (titleLower.includes('beautiful bill')) return '/one%20big%20beatiful%20bill.pdf'
  if (titleLower.includes('bubble')) return '/is%20ai%20bubble%20about%20to%20burst.pdf'
  if (titleLower.includes('rural credit') || titleLower.includes('microfinance')) return '/Sustaining%20Rural%20Credit%20Access.pdf'
  if (titleLower.includes('wise')) return '/wise%20pe%20report.pdf'
  if (titleLower.includes('kia')) return '/kia%20motors%20equity%20report.pdf'
  if (titleLower.includes('hcl')) return '/hcl%20tech%20equity%20report.pdf'
  return '/END%20OF%20CHEAP%20SOVEREIGNTY%20REPORT.pdf'
}
