import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className={`mb-4 flex items-center text-[12.5px] font-mono ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[#78716C]">
        <li>
          <Link
            href="/"
            className="text-[#78716C] transition-colors hover:text-[#59110B] focus:outline-none"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 shrink-0 text-[#A8A29E]" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="font-medium text-[#59110B]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#59110B] focus:outline-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
