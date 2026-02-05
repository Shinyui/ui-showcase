import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-gray-8 focus-visible:ring-gray-4',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-gray-4 focus-visible:ring-gray-4',
        outline:
          'border border-border-default bg-transparent hover:bg-elevated focus-visible:ring-gray-4',
        ghost:
          'bg-transparent hover:bg-elevated focus-visible:ring-gray-4',
        link:
          'text-text-primary underline-offset-4 hover:underline focus-visible:ring-gray-4',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive',
        // ===== NEW: VISUAL EFFECT VARIANTS =====
        gradient:
          'bg-gradient text-white hover:opacity-90 focus-visible:ring-gray-4',
        glass:
          'glass hover:bg-glass-bg-strong focus-visible:ring-gray-4',
        glow:
          'bg-primary text-primary-foreground shadow-lg hover:shadow-xl focus-visible:ring-gray-4 hover:scale-105',
        shimmer:
          'relative overflow-hidden bg-primary text-primary-foreground shimmer',
      },
      size: {
        sm: 'h-9 sm:h-8 px-3 sm:px-2 min-h-9 sm:min-h-8 text-xs',
        md: 'h-11 sm:h-10 px-4 sm:px-4 py-2 min-h-11 sm:min-h-10',
        lg: 'h-11 px-8 min-h-11',
        icon: 'h-11 w-11 sm:h-10 sm:w-10 min-h-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
