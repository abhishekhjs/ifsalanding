import type { Metadata } from 'next'
import { ClientsPageClient } from './clients-client'

export const metadata: Metadata = {
  title: 'Clients & Partners',
  description:
    'Corporate partners, high-growth venture advisory mandates, and institutional collaborators working with IFSA NIT Trichy.',
  alternates: {
    canonical: '/clients',
  },
  openGraph: {
    title: 'Clients & Partners | IFSA NIT Trichy',
    description: 'Corporate partners, high-growth venture advisory mandates, and institutional collaborators working with IFSA NIT Trichy.',
    url: '/clients',
  },
}

export default function ClientsPage() {
  const clientsSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Clients & Partners - IFSA NIT Trichy',
    url: 'https://ifsanitt.vercel.app/clients',
    description: 'Corporate partners, high-growth venture advisory mandates, and institutional collaborators working with IFSA NIT Trichy.',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ifsanitt.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Clients & Partners',
        item: 'https://ifsanitt.vercel.app/clients',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clientsSchema) }}
      />
      <ClientsPageClient />
    </>
  )
}
