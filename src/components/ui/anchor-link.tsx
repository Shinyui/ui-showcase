import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const anchorLinkVariants = cva('inline-flex items-center gap-2', {
  variants: {
    variant: {
      default: 'text-primary hover:underline',
      ghost: 'text-text-muted hover:text-text-primary',
      glass: 'glass px-3 py-1 rounded-md text-primary hover:text-primary-foreground',
      button: 'px-3 py-1.5 rounded-md bg-elevated text-text-primary hover:bg-border-default',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface AnchorLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>,
    VariantProps<typeof anchorLinkVariants> {
  href: string
  icon?: React.ReactNode
  showExternalIcon?: boolean
}

export function AnchorLink({
  href,
  icon,
  variant = 'default',
  size = 'md',
  showExternalIcon = false,
  className,
  children,
  ...props
}: AnchorLinkProps) {
  const isExternal = href.startsWith('http') || href.startsWith('//')

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={cn(anchorLinkVariants({ variant, size }), className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {(showExternalIcon || isExternal) && (
        <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </motion.a>
  )
}
