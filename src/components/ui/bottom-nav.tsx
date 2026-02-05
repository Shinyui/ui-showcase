import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const bottomNavVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-surface border-t border-border-default',
      glass: 'glass border-t border-glass-border-light',
    },
    fixed: {
      true: 'fixed bottom-0 left-0 right-0 z-40',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    fixed: true,
  },
})

export interface BottomNavItem {
  id: string
  label: string
  icon: React.ReactNode
  badge?: number | string
}

export interface BottomNavProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bottomNavVariants> {
  items: BottomNavItem[]
  activeId?: string
  onItemChange?: (id: string) => void
  labeled?: boolean
  fixed?: boolean
}

export function BottomNav({
  items,
  activeId,
  onItemChange,
  variant = 'default',
  labeled = false,
  fixed = true,
  className,
  ...props
}: BottomNavProps) {
  return (
    <nav
      className={cn(
        bottomNavVariants({ variant, fixed }),
        'safe-area-inset-bottom',
        className
      )}
      {...props}
    >
      <div className={cn(
        'flex items-center px-2',
        fixed ? 'max-w-lg mx-auto' : 'w-full',
        labeled ? 'h-20' : 'h-16'
      )}>
        {items.map(item => {
          const isActive = item.id === activeId

          return (
            <motion.button
              key={item.id}
              onClick={() => onItemChange?.(item.id)}
              className="relative flex flex-col items-center justify-center flex-1 min-w-0"
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={cn(
                  'relative flex items-center justify-center transition-colors',
                  isActive ? 'text-primary' : 'text-text-muted'
                )}
              >
                {item.icon}

                {item.badge && (
                  <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1 flex items-center justify-center bg-destructive text-white text-xs font-medium rounded-full">
                    {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {labeled && (
                <span
                  className={cn(
                    'mt-1 text-xs font-medium transition-colors',
                    isActive ? 'text-primary' : 'text-text-muted'
                  )}
                >
                  {item.label}
                </span>
              )}

              {isActive && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary rounded-full"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
