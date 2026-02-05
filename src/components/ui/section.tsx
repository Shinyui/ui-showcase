import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sectionVariants = cva('', {
  variants: {
    variant: {
      default: '',
      glass: 'glass rounded-lg',
      elevated: 'bg-surface rounded-lg border border-border-default shadow-md',
      outlined: 'border border-border-default rounded-lg',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
})

export interface SectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'ref'>,
    VariantProps<typeof sectionVariants> {
  title?: string
  description?: string
  actions?: React.ReactNode
  headerSeparator?: boolean
}

export function Section({
  title,
  description,
  actions,
  headerSeparator = false,
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(sectionVariants({ variant, padding }), className)}
      {...props}
    >
      {(title || description || actions) && (
        <div className={cn(
          'mb-6',
          headerSeparator && 'pb-4 border-b border-border-default'
        )}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {title && (
                <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-text-muted">{description}</p>
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-2 ml-4">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}

      {children}
    </section>
  )
}
