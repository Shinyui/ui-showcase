import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const successStateVariants = cva('flex flex-col items-center justify-center p-8 text-center', {
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

export interface SuccessStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>,
    VariantProps<typeof successStateVariants> {
  title?: string
  message?: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function SuccessState({
  title = 'Success!',
  message = 'Your action was completed successfully.',
  action,
  secondaryAction,
  size = 'md',
  variant = 'default',
  className,
  ...props
}: SuccessStateProps) {
  return (
    <motion.div
      className={cn(successStateVariants({ size, variant }), className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      {...props}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Success Icon with Checkmark Animation */}
        <motion.div
          className="relative w-20 h-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
        >
          {/* Circle */}
          <motion.div
            className="absolute inset-0 rounded-full bg-success/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          />

          {/* Checkmark */}
          <motion.svg
            className="absolute inset-0 w-full h-full p-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>

          {/* Confetti particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: ['#22c55e', '#4ade80', '#86efac'][i % 3],
                top: '50%',
                left: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 40,
                y: Math.sin((i * Math.PI * 2) / 8) * 40,
              }}
              transition={{
                delay: 0.5 + i * 0.05,
                duration: 0.8,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>

        {/* Title and Message */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
          {message && (
            <p className="text-sm text-text-muted">{message}</p>
          )}
        </motion.div>

        {/* Actions */}
        {(action || secondaryAction) && (
          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
