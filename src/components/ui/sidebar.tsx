import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sidebarVariants = cva('h-full border-r border-border-default', {
  variants: {
    variant: {
      default: 'bg-surface',
      glass: 'glass',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  open?: boolean
  onClose?: () => void
  width?: 'sm' | 'md' | 'lg'
  collapsible?: boolean
  header?: React.ReactNode
  footer?: React.ReactNode
}

const widthClasses = {
  sm: 'w-64',
  md: 'w-72',
  lg: 'w-80',
}

export function Sidebar({
  open = true,
  onClose,
  width = 'md',
  variant = 'default',
  collapsible = false,
  header,
  footer,
  children,
  className,
  ...props
}: SidebarProps) {
  const [internalOpen, setInternalOpen] = React.useState(open)

  const isOpen = collapsible ? internalOpen : open

  const toggleOpen = () => {
    if (collapsible) {
      setInternalOpen(!internalOpen)
    }
    onClose?.()
  }

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleOpen}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={cn(
          sidebarVariants({ variant }),
          'fixed lg:relative z-50 flex flex-col transition-all duration-300',
          isOpen ? widthClasses[width] : 'w-0 lg:w-16',
          className
        )}
        initial={false}
        animate={{
          width: isOpen ? (typeof width === 'string' ? `${width === 'sm' ? 16 : width === 'md' ? 18 : 20}rem` : '18rem') : '0rem',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        {...props}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {header && (
            <div className="flex items-center justify-between p-4 border-b border-border-default">
              {isOpen && header}
              {collapsible && (
                <button
                  onClick={toggleOpen}
                  className="p-1 hover:bg-elevated rounded transition-colors lg:hidden"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {isOpen && children}
          </div>

          {footer && isOpen && (
            <div className="p-4 border-t border-border-default">
              {footer}
            </div>
          )}
        </div>
      </motion.aside>
    </>
  )
}

// ===== SIDEBAR ITEM =====
export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  label: string
  active?: boolean
  collapsed?: boolean
}

export function SidebarItem({
  icon,
  label,
  active = false,
  collapsed = false,
  className,
  children,
  ...props
}: SidebarItemProps) {
  return (
    <button
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
        'hover:bg-elevated focus:outline-none focus:bg-elevated',
        active && 'bg-elevated border-r-2 border-primary',
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {!collapsed && (
        <span className="text-sm font-medium text-text-primary">{label}</span>
      )}
      {children}
    </button>
  )
}

// ===== SIDEBAR GROUP =====
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  collapsed?: boolean
}

export function SidebarGroup({
  title,
  collapsed = false,
  className,
  children,
  ...props
}: SidebarGroupProps) {
  return (
    <div className={cn('py-2', className)} {...props}>
      {title && !collapsed && (
        <h3 className="px-4 mb-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  )
}
