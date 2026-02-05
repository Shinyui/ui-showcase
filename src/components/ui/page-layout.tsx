import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const pageLayoutVariants = cva('w-full min-h-screen', {
  variants: {
    variant: {
      default: 'bg-background',
      centered: 'bg-background flex items-center justify-center',
      fullScreen: 'h-screen overflow-hidden',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface PageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function PageLayout({
  header,
  sidebar,
  footer,
  maxWidth = 'full',
  variant = 'default',
  className,
  children,
  ...props
}: PageLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div
      className={cn(pageLayoutVariants({ variant }), className)}
      {...props}
    >
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {sidebar && (
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            {sidebar}
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          {header && (
            <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              {header}
            </header>
          )}

          {/* Main Content Area */}
          <main className={cn('flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8', maxWidthClasses[maxWidth])}>
            {children}
          </main>

          {/* Footer */}
          {footer && <footer>{footer}</footer>}
        </div>
      </div>
    </div>
  )
}

// ===== PAGE HEADER =====
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  breadcrumbs?: React.ReactNode
  backLink?: React.ReactNode
}

export function PageHeader({
  title,
  subtitle,
  actions,
  breadcrumbs,
  backLink,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)} {...props}>
      {breadcrumbs && (
        <nav className="mb-4" aria-label="Breadcrumb">
          {breadcrumbs}
        </nav>
      )}

      <div className="flex items-start justify-between">
        <div className="flex-1">
          {backLink && (
            <div className="mb-2">{backLink}</div>
          )}
          <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-lg text-text-muted">{subtitle}</p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 ml-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
