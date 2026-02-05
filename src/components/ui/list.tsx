import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const listVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'divide-y divide-border-default',
      glass: 'divide-y divide-glass-border-dark glass rounded-lg',
      spaced: 'space-y-2',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface ListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listVariants> {
  items: Array<{
    id: string
    title: string
    description?: string
    icon?: React.ReactNode
    action?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
  }>
  selectable?: boolean
  selectedId?: string
}

export function List({
  items,
  selectable = false,
  selectedId,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ListProps) {
  return (
    <div className={cn(listVariants({ variant, size }), className)} {...props}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
        >
          <ListItem
            {...item}
            selectable={selectable}
            selected={selectedId === item.id}
          />
        </motion.div>
      ))}
    </div>
  )
}

interface ListItemProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  disabled?: boolean
  selectable?: boolean
  selected?: boolean
  onClick?: () => void
}

function ListItem({
  title,
  description,
  icon,
  action,
  disabled = false,
  selectable = false,
  selected = false,
  onClick,
}: ListItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-4 p-4 text-left transition-colors',
        'hover:bg-elevated focus:outline-none focus:bg-elevated',
        selected && 'bg-elevated border-l-2 border-primary',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        !disabled && onClick && 'cursor-pointer'
      )}
    >
      {selectable && (
        <div className={cn(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
          selected ? 'border-primary bg-primary' : 'border-border-default'
        )}>
          {selected && (
            <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      )}

      {icon && <div className="flex-shrink-0">{icon}</div>}

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{title}</p>
        {description && (
          <p className="text-xs text-text-muted truncate">{description}</p>
        )}
      </div>

      {action && <div className="flex-shrink-0">{action}</div>}
    </button>
  )
}
