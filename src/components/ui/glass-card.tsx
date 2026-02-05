import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glassCardVariants = cva('relative overflow-hidden', {
  variants: {
    variant: {
      subtle: 'backdrop-blur-sm bg-glass-bg-subtle border border-glass-border-light',
      default: 'backdrop-blur-md bg-glass-bg-default border border-glass-border-light border-t border-l border-glass-border-highlight shadow-glass-md',
      strong: 'backdrop-blur-lg bg-glass-bg-strong border border-glass-border-highlight shadow-glass-md',
      liquid: 'backdrop-blur-xl bg-glass-bg-default border border-glass-border-glow shadow-glass-lg',
      gradient: 'backdrop-blur-xl bg-gradient-to-br from-glass-bg-subtle to-glass-bg-strong border border-glass-border-highlight shadow-glass-lg',
    },
    hover: {
      none: '',
      lift: 'hover:-translate-y-1 transition-all duration-300 ease-out',
      glow: 'hover:shadow-glass-xl hover:scale-[1.02] hover:border-glass-border-glow transition-all duration-300 ease-out',
      premium: 'hover:shadow-glow-lg hover:scale-[1.03] hover:border-glass-border-glow transition-all duration-300 ease-out',
    },
  },
  defaultVariants: {
    variant: 'default',
    hover: 'none',
  },
})

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  title?: string
  description?: string
  footer?: React.ReactNode
  children: React.ReactNode
}

export function GlassCard({
  variant = 'default',
  hover = 'none',
  title,
  description,
  footer,
  children,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(glassCardVariants({ variant, hover }), 'rounded-lg p-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={hover === 'lift' ? { y: -4 } : hover === 'glow' ? { scale: 1.02 } : hover === 'premium' ? { scale: 1.03 } : {}}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full shimmer-pointer" />

      <div className="relative z-10">
        {title && (
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm text-text-muted mb-4">{description}</p>
        )}
        <div className="space-y-4">{children}</div>
        {footer && (
          <div className="mt-6 pt-4 border-t border-glass-border-dark">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ===== GLASS PANEL =====
export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof glassCardVariants>['variant']
  children: React.ReactNode
}

export function GlassPanel({
  variant = 'default',
  children,
  className,
  ...props
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn(glassCardVariants({ variant }), 'rounded-xl p-8', className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// ===== GLASS BADGE =====
export interface GlassBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof glassCardVariants>['variant']
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
}

export function GlassBadge({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: GlassBadgeProps) {
  return (
    <div
      className={cn(
        glassCardVariants({ variant }),
        'inline-flex items-center justify-center rounded-full',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
