import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const emptyStateVariants = cva('flex flex-col items-center justify-center p-8 text-center', {
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-8',
      lg: 'p-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  icon,
  title = 'No data found',
  description,
  action,
  size = 'md',
  className,
  ...props
}: EmptyStateProps) {
  const defaultIcon = icon || (
    <svg className="h-16 w-16 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  )

  return (
    <motion.div
      className={cn(emptyStateVariants({ size }), className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      {...props}
    >
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          {defaultIcon}
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          {description && (
            <p className="text-sm text-text-muted">{description}</p>
          )}
        </div>

        {action && (
          <motion.button
            onClick={action.onClick}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-gray-8 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {action.label}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
