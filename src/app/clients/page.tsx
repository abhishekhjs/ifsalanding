import type { Metadata } from 'next'
import { ClientsPageClient } from './clients-client'

export const metadata: Metadata = {
  title: 'Clients & Partners',
  description: 'Companies and institutions that work with IFSA NIT Trichy on research, projects and campus events.',
  openGraph: {
    title: 'Clients & Partners | IFSA NIT Trichy',
    description: 'Companies and institutions that work with IFSA NIT Trichy on research, projects and campus events.',
    url: '/clients',
  },
}

export default function ClientsPage() {
  const clientsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Clients & Partners - IFSA NIT Trichy',
    url: 'https://ifsanitt.vercel.app/clients',
    description: 'Companies and institutions that work with IFSA NIT Trichy on research, projects and campus events.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clientsSchema) }}
      />
      <ClientsPageClient />
    </>
  )
}
