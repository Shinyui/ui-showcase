import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const appBarVariants = cva('sticky top-0 z-30 w-full', {
  variants: {
    variant: {
      default: 'bg-surface border-b border-border-default',
      glass: 'glass border-b border-border-default',
      elevated: 'bg-surface shadow-md',
    },
    size: {
      sm: 'h-14',
      md: 'h-16',
      lg: 'h-20',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface AppBarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof appBarVariants> {
  title?: string
  leading?: React.ReactNode
  actions?: React.ReactNode
}

export function AppBar({
  title,
  leading,
  actions,
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: AppBarProps) {
  const content = children || (
    <>
      {leading && <div className="flex items-center">{leading}</div>}
      {title && (
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      )}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </>
  )

  return (
    <header
      className={cn(
        appBarVariants({ variant, size }),
        'flex items-center justify-between px-4 sm:px-6',
        className
      )}
      {...props}
    >
      {content}
    </header>
  )
}
