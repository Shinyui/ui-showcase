import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toastVariants = cva('relative w-full px-4 py-3 rounded-md border shadow-lg', {
  variants: {
    variant: {
      default: 'bg-surface border-border-default text-text-primary',
      info: 'bg-blue-950/90 border-blue-800 text-blue-100',
      success: 'bg-green-950/90 border-green-800 text-green-100',
      warning: 'bg-yellow-950/90 border-yellow-800 text-yellow-100',
      error: 'bg-red-950/90 border-red-800 text-red-100',
      glass: 'glass text-text-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  icon?: React.ReactNode
  duration?: number
  onClose?: () => void
  action?: {
    label: string
    onClick: () => void
  }
}

export function Toast({
  title,
  description,
  icon,
  duration = 5000,
  onClose,
  action,
  variant = 'default',
  className,
  ...props
}: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(toastVariants({ variant }), className)}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          {...props}
        >
          <div className="flex items-start gap-3">
            {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
            <div className="flex-1 min-w-0">
              {title && (
                <p className="text-sm font-semibold">{title}</p>
              )}
              {description && (
                <p className="text-sm opacity-90 mt-0.5">{description}</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium hover:underline"
            >
              {action.label}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ===== TOAST PROVIDER =====
interface ToastItem {
  id: string
  props: ToastProps
}

interface ToastContextValue {
  showToast: (props: Omit<ToastProps, 'id'>) => string
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export interface ToastProviderProps {
  children: React.ReactNode
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const showToast = React.useCallback((props: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => {
      const newToasts = [...prev, { id, props }]
      return newToasts.slice(-maxToasts)
    })
    return id
  }, [maxToasts])

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  }

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className={cn('fixed z-50 flex flex-col gap-2 max-w-sm w-full', positionClasses[position])}>
        <AnimatePresence mode="popLayout">
          {toasts.map(({ id, props }) => (
            <Toast key={id} {...props} onClose={() => removeToast(id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
