import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const loadingOverlayVariants = cva('fixed inset-0 z-50 flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-background/80 backdrop-blur-sm',
      glass: 'bg-black/20 backdrop-blur-md',
      dark: 'bg-black/90',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface LoadingOverlayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>,
    VariantProps<typeof loadingOverlayVariants> {
  show: boolean
  message?: string
  spinner?: 'default' | 'dots' | 'pulse' | 'bars'
}

export function LoadingOverlay({
  show,
  message,
  spinner = 'default',
  variant = 'default',
  className,
  ...props
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(loadingOverlayVariants({ variant }), className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          <div className="flex flex-col items-center gap-4">
            {spinner === 'default' && <DefaultSpinner />}
            {spinner === 'dots' && <DotsSpinner />}
            {spinner === 'pulse' && <PulseSpinner />}
            {spinner === 'bars' && <BarsSpinner />}

            {message && (
              <motion.p
                className="text-sm text-text-muted"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {message}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DefaultSpinner() {
  return (
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full border-4 border-border-default" />
      <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
    </div>
  )
}

function DotsSpinner() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-3 w-3 rounded-full bg-primary"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  )
}

function PulseSpinner() {
  return (
    <div className="relative h-12 w-12">
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/30"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="absolute inset-2 rounded-full bg-primary" />
    </div>
  )
}

function BarsSpinner() {
  return (
    <div className="flex items-end gap-1 h-12">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-primary rounded-sm"
          animate={{ height: [12, 24, 12] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}
