import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const errorStateVariants = cva('flex flex-col items-center justify-center p-8 text-center', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-8',
      lg: 'p-12',
    },
    variant: {
      default: '',
      glass: 'glass rounded-lg',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export interface ErrorStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>,
    VariantProps<typeof errorStateVariants> {
  title?: string
  message?: string
  code?: string | number
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  code,
  action,
  secondaryAction,
  size = 'md',
  variant = 'default',
  className,
  ...props
}: ErrorStateProps) {
  return (
    <motion.div
      className={cn(errorStateVariants({ size, variant }), className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      {...props}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Error Icon */}
        <motion.div
          className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>

        {/* Error Code */}
        {code && (
          <motion.div
            className="text-6xl font-bold text-destructive/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {code}
          </motion.div>
        )}

        {/* Title and Message */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
          {message && (
            <p className="text-sm text-text-muted">{message}</p>
          )}
        </div>

        {/* Actions */}
        {(action || secondaryAction) && (
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {action && (
              <button
                onClick={action.onClick}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-gray-8 transition-colors"
              >
                {action.label}
              </button>
            )}
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-4 py-2 border border-border-default rounded-md hover:bg-elevated transition-colors"
              >
                {secondaryAction.label}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
