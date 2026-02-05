import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-elevated text-text-primary',
        primary: 'bg-primary text-primary-foreground hover:bg-gray-8',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-gray-4',
        glass: 'glass hover:bg-glass-bg-strong',
        glow: 'bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-105',
        ghost: 'hover:bg-elevated/50',
      },
      size: {
        sm: 'h-11 w-11 sm:h-8 sm:w-8',
        md: 'h-11 w-11 sm:h-10 sm:w-10',
        lg: 'h-12 w-12',
        xl: 'h-14 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode
  label?: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, label, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        aria-label={label}
        {...props}
      >
        {icon}
      </button>
    )
  }
)
IconButton.displayName = 'IconButton'

export { IconButton, iconButtonVariants }
