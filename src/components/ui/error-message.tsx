import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const errorMessageVariants = cva(
  'text-sm font-medium flex items-center gap-2',
  {
    variants: {
      variant: {
        default: 'text-destructive',
        glass: 'text-destructive bg-destructive/10 glass px-3 py-2 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorMessageVariants> {
  id?: string
  icon?: React.ReactNode
}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ className, variant, id, icon, children, ...props }, ref) => {
    const defaultIcon = icon || (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    )

    return (
      <motion.div
        ref={ref}
        id={id}
        className={cn(errorMessageVariants({ variant }), className)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        {...props}
      >
        {defaultIcon}
        <span>{children}</span>
      </motion.div>
    )
  }
)
ErrorMessage.displayName = 'ErrorMessage'

export { ErrorMessage, errorMessageVariants }

// ===== ERROR BOUNDARY COMPONENT =====
export interface ErrorStateProps {
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while processing your request.',
  actionLabel = 'Try again',
  onAction,
  className,
}: ErrorStateProps) {
  return (
    <motion.div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center space-y-4',
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <svg className="h-8 w-8 text-destructive" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-muted max-w-sm">{message}</p>
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-gray-8 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  )
}
