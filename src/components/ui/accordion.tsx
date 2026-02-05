import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const accordionVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'border border-border-default rounded-lg overflow-hidden',
      glass: 'glass rounded-lg overflow-hidden',
      separated: 'divide-y divide-border-default',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  items: AccordionItem[]
  multiple?: boolean
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

export function Accordion({
  items,
  multiple = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  variant = 'default',
  className,
  ...props
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = React.useState<Set<string>>(
    new Set(Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [])
  )

  const isControlled = controlledValue !== undefined
  const openItems = isControlled
    ? new Set(Array.isArray(controlledValue) ? controlledValue : controlledValue ? [controlledValue] : [])
    : internalOpen

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)

    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      if (multiple) {
        newOpenItems.add(id)
      } else {
        newOpenItems.clear()
        newOpenItems.add(id)
      }
    }

    if (!isControlled) {
      setInternalOpen(newOpenItems)
    }

    const valueArray = Array.from(newOpenItems)
    onValueChange?.(multiple ? valueArray : valueArray[0] || '')
  }

  return (
    <div className={cn(accordionVariants({ variant }), className)} {...props}>
      {items.map(item => (
        <AccordionItem
          key={item.id}
          {...item}
          isOpen={openItems.has(item.id)}
          onToggle={() => toggleItem(item.id)}
          variant={variant}
        />
      ))}
    </div>
  )
}

interface AccordionItemProps extends AccordionItem {
  isOpen: boolean
  onToggle: () => void
  variant: VariantProps<typeof accordionVariants>['variant']
}

function AccordionItem({
  title,
  content,
  icon,
  disabled = false,
  isOpen,
  onToggle,
  variant,
}: AccordionItemProps) {
  return (
    <div className={cn(
      'border-b border-border-default last:border-b-0',
      variant === 'separated' && 'border-b last:border-b-0'
    )}>
      <motion.button
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between p-4 text-left transition-colors',
          'hover:bg-elevated focus:outline-none focus:bg-elevated',
          disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
        )}
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        whileTap={{ scale: disabled ? 1 : 0.99 }}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="font-medium text-text-primary">{title}</span>
        </div>
        <motion.svg
          className="h-5 w-5 text-text-muted flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4 pt-0 text-text-muted">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
