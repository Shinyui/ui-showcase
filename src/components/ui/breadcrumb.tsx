import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const breadcrumbVariants = cva('flex items-center gap-2 text-sm', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbProps
  extends React.OlHTMLAttributes<HTMLOListElement>,
    VariantProps<typeof breadcrumbVariants> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  homeIcon?: React.ReactNode
}

export function Breadcrumb({
  items,
  separator,
  homeIcon,
  size = 'md',
  className,
  ...props
}: BreadcrumbProps) {
  const defaultSeparator = separator || (
    <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn(breadcrumbVariants({ size }), className)} {...props}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-text-muted">{defaultSeparator}</span>}

              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 transition-colors',
                    isLast
                      ? 'text-text-primary font-medium'
                      : 'text-text-muted hover:text-text-primary'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1',
                    isLast ? 'text-text-primary font-medium' : 'text-text-muted'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
