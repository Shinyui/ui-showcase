import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const linkVariants = cva(
  'inline-flex items-center gap-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-text-primary underline-offset-4 hover:underline',
        primary: 'text-primary font-medium underline-offset-4 hover:underline',
        muted: 'text-text-muted underline-offset-4 hover:underline hover:text-text-primary',
        nav: 'text-text-muted hover:text-text-primary transition-colors',
        gradient: 'bg-gradient bg-clip-text text-transparent hover:opacity-80',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      underline: {
        none: 'underline-none',
        hover: 'hover:underline',
        always: 'underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      underline: 'hover',
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string
  external?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, underline, external, children, ...props }, ref) => {
    return (
      <a
        className={cn(linkVariants({ variant, size, underline, className }))}
        ref={ref}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {external && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    )
  }
)
Link.displayName = 'Link'

export { Link, linkVariants }
