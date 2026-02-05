import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const popoverVariants = cva('rounded-lg shadow-lg border', {
  variants: {
    variant: {
      default: 'bg-surface border-border-default',
      glass: 'glass border-glass-border-light',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: React.ReactNode
  content: React.ReactNode
  variant?: VariantProps<typeof popoverVariants>['variant']
  placement?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
  className?: string
}

export function Popover({
  open: controlledOpen,
  onOpenChange,
  trigger,
  content,
  variant = 'default',
  placement = 'bottom',
  offset = 8,
  className,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const handleToggle = () => {
    if (isControlled) {
      onOpenChange?.(!isOpen)
    } else {
      setInternalOpen(!isOpen)
    }
  }

  const handleClose = () => {
    if (isControlled) {
      onOpenChange?.(false)
    } else {
      setInternalOpen(false)
    }
  }

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  const getPlacementStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = { position: 'absolute' }

    switch (placement) {
      case 'top':
        styles.bottom = 'calc(100% + 8px)'
        styles.left = '50%'
        styles.transform = 'translateX(-50%)'
        break
      case 'bottom':
        styles.top = 'calc(100% + 8px)'
        styles.left = '50%'
        styles.transform = 'translateX(-50%)'
        break
      case 'left':
        styles.right = 'calc(100% + 8px)'
        styles.top = '50%'
        styles.transform = 'translateY(-50%)'
        break
      case 'right':
        styles.left = 'calc(100% + 8px)'
        styles.top = '50%'
        styles.transform = 'translateY(-50%)'
        break
    }

    return styles
  }

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            className={cn('z-50 max-w-[calc(100vw-2rem)] sm:max-w-none', popoverVariants({ variant }), className)}
            style={getPlacementStyles()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
