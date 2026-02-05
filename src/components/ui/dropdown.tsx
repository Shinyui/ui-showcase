import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const dropdownVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-surface border border-border-default shadow-lg',
      glass: 'glass',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof dropdownVariants> {
  options: DropdownOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  trigger?: React.ReactNode
}

export function Dropdown({
  options,
  value,
  placeholder = 'Select an option...',
  onChange,
  variant = 'default',
  trigger,
  className,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)} {...props}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 sm:px-3 sm:py-2 min-h-11 text-left',
          'bg-background border border-border-default rounded-md',
          'hover:border-border-subtle transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary'
        )}
      >
        <span className={cn(!selectedOption && 'text-text-muted')}>
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.icon}
              {selectedOption.label}
            </span>
          ) : (
            placeholder
          )}
        </span>
        <svg
          className={cn(
            'h-4 w-4 transition-transform',
            isOpen && 'transform rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              'absolute z-50 w-full mt-1 rounded-md py-1',
              dropdownVariants({ variant })
            )}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                disabled={option.disabled}
                className={cn(
                  'w-full flex items-center gap-2 px-4 py-3 sm:px-3 sm:py-2 min-h-11 text-left',
                  'hover:bg-elevated transition-colors',
                  'focus:outline-none focus:bg-elevated',
                  option.disabled && 'opacity-50 cursor-not-allowed',
                  option.value === value && 'bg-elevated'
                )}
              >
                {option.icon}
                <span className="flex-1">{option.label}</span>
                {option.value === value && (
                  <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
