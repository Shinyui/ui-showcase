import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const alertVariants = cva('relative w-full px-4 py-3 rounded-md border', {
  variants: {
    variant: {
      default: 'bg-surface border-border-default text-text-primary',
      info: 'bg-blue-950/30 border-blue-900/50 text-blue-100',
      success: 'bg-green-950/30 border-green-900/50 text-green-100',
      warning: 'bg-yellow-950/30 border-yellow-900/50 text-yellow-100',
      error: 'bg-red-950/30 border-red-900/50 text-red-100',
      glass: 'glass text-text-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const iconVariants = {
  default: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  info: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  success: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  warning: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
  error: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
  glass: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

export function Alert({
  title,
  icon,
  dismissible = false,
  onDismiss,
  variant = 'default',
  className,
  children,
  ...props
}: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  const defaultIcon = icon !== undefined ? icon : iconVariants[variant]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(alertVariants({ variant }), className)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="alert"
          {...props}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5 text-current opacity-80">
              {defaultIcon}
            </div>
            <div className="flex-1 space-y-1">
              {title && (
                <p className="text-sm font-semibold">{title}</p>
              )}
              {children && (
                <p className="text-sm leading-relaxed opacity-90">{children}</p>
              )}
            </div>
            {dismissible && (
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
