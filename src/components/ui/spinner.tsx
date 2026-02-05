import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-2',
      lg: 'h-8 w-8 border-3',
      xl: 'h-12 w-12 border-4',
    },
    variant: {
      default: 'border-text-muted border-t-primary',
      primary: 'border-gray-6 border-t-gray-9',
      white: 'border-white/30 border-t-white',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label = 'Loading...', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant }), 'rounded-full', className)}
        role="status"
        aria-label={label}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </div>
    )
  }
)
Spinner.displayName = 'Spinner'

export { Spinner, spinnerVariants }

// ===== DOTS SPINNER VARIANTS =====
export interface DotsSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'white'
}

const dotSizes = {
  sm: 'h-1 w-1',
  md: 'h-2 w-2',
  lg: 'h-3 w-3',
}

const dotVariants = {
  default: 'bg-text-muted',
  primary: 'bg-primary',
  white: 'bg-white',
}

export function DotsSpinner({ className, size = 'md', variant = 'default', ...props }: DotsSpinnerProps) {
  return (
    <div className={cn('flex items-center gap-1', className)} role="status" {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full animate-pulse',
            dotSizes[size],
            dotVariants[variant]
          )}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  )
}

// ===== PULSE SPINNER =====
export interface PulseSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'white'
}

const pulseSizes = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
}

const pulseVariants = {
  default: 'bg-text-muted',
  primary: 'bg-primary',
  white: 'bg-white',
}

export function PulseSpinner({ className, size = 'md', variant = 'default', ...props }: PulseSpinnerProps) {
  return (
    <div className={cn('relative inline-flex', className)} role="status" {...props}>
      <div
        className={cn(
          'rounded-full animate-ping absolute',
          pulseSizes[size],
          pulseVariants[variant],
          'opacity-75'
        )}
      />
      <div
        className={cn(
          'rounded-full relative',
          pulseSizes[size],
          pulseVariants[variant]
        )}
      />
      <span className="sr-only">Loading</span>
    </div>
  )
}

// ===== BARS SPINNER =====
export interface BarsSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'white'
}

const barSizes = {
  sm: 'h-3 w-1',
  md: 'h-5 w-1.5',
  lg: 'h-7 w-2',
}

export function BarsSpinner({ className, size = 'md', variant = 'default', ...props }: BarsSpinnerProps) {
  return (
    <div className={cn('flex items-end gap-0.5', className)} role="status" {...props}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-sm animate-bounce',
            barSizes[size],
            dotVariants[variant]
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  )
}
