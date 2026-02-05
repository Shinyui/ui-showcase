import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const helperTextVariants = cva('text-sm', {
  variants: {
    variant: {
      default: 'text-text-muted',
      error: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface HelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof helperTextVariants> {
  id?: string
}

const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ className, variant, id, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        id={id}
        className={cn(helperTextVariants({ variant }), className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
HelperText.displayName = 'HelperText'

export { HelperText, helperTextVariants }
