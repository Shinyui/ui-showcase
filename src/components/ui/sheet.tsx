import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sheetVariants = cva('fixed z-50 h-full', {
  variants: {
    variant: {
      default: 'bg-surface border-l border-border-default',
      glass: 'bg-glass-bg-default backdrop-blur-md border-l border-glass-border-light',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  variant?: VariantProps<typeof sheetVariants>['variant']
  side?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  overlay?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'w-80 max-w-[80vw]',
  md: 'w-96 max-w-[90vw]',
  lg: 'w-[28rem] max-w-[95vw]',
  xl: 'w-[32rem] max-w-[95vw]',
}

export function Sheet({
  open: controlledOpen = false,
  onOpenChange,
  children,
  variant = 'default',
  side = 'right',
  size = 'md',
  overlay = true,
  className,
}: SheetProps) {
  const [internalOpen, setInternalOpen] = React.useState(controlledOpen)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  React.useEffect(() => {
    if (!isControlled) {
      setInternalOpen(controlledOpen)
    }
  }, [controlledOpen, isControlled])

  const handleClose = () => {
    if (isControlled) {
      onOpenChange?.(false)
    } else {
      setInternalOpen(false)
    }
  }

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const sideClasses = {
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
  }

  const animationVariants = {
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {overlay && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
          )}

          <motion.div
            className={cn(
              sheetVariants({ variant }),
              sideClasses[side],
              sizeClasses[size],
              className
            )}
            initial={animationVariants[side].initial}
            animate={animationVariants[side].animate}
            exit={animationVariants[side].exit}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ===== SHEET HEADER =====
export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  onClose?: () => void
}

export function SheetHeader({ title, description, onClose, className, ...props }: SheetHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between p-6 border-b border-border-default', className)} {...props}>
      <div>
        {title && <h2 className="text-lg font-semibold text-text-primary">{title}</h2>}
        {description && <p className="text-sm text-text-muted mt-1">{description}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-elevated rounded transition-colors"
        >
          <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

// ===== SHEET BODY =====
export interface SheetBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SheetBody({ className, ...props }: SheetBodyProps) {
  return (
    <div className={cn('flex-1 overflow-y-auto p-6', className)} {...props} />
  )
}

// ===== SHEET FOOTER =====
export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div className={cn('flex items-center justify-end gap-3 p-6 border-t border-border-default', className)} {...props} />
  )
}
