import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const datePickerVariants = cva('', {
  variants: {
    variant: {
      default: '',
      glass: 'glass',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>,
    VariantProps<typeof datePickerVariants> {
  value?: Date
  onChange?: (date: Date | undefined) => void
  label?: string
  error?: string
  minDate?: Date
  maxDate?: Date
}

export function DatePicker({
  value,
  onChange,
  label,
  error,
  minDate,
  maxDate,
  variant = 'default',
  className,
  id,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedMonth, setSelectedMonth] = React.useState(new Date())
  const pickerRef = React.useRef<HTMLDivElement>(null)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const handleDateSelect = (date: Date) => {
    if (minDate && date < minDate) return
    if (maxDate && date > maxDate) return
    onChange?.(date)
    setIsOpen(false)
  }

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()

    const days: Date[] = []

    // Add empty cells for days before the first day
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(new Date(year, month, 1 - startDayOfWeek + i))
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    return isSameDay(date, new Date())
  }

  const isSelected = (date: Date) => {
    return value ? isSameDay(date, value) : false
  }

  const isDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const days = getDaysInMonth(selectedMonth)

  return (
    <div ref={pickerRef} className={cn('relative', className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 sm:px-3 sm:py-2 min-h-11 text-left',
          'bg-background border border-border-default rounded-md',
          'hover:border-border-subtle transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary',
          error && 'border-destructive'
        )}
      >
        <span className={cn(!value && 'text-text-muted')}>
          {value ? formatDate(value) : 'Select a date'}
        </span>
        <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              'absolute z-50 mt-1 p-4 rounded-lg shadow-lg max-h-[70vh] overflow-y-auto',
              'bg-surface border border-border-default bottom-[calc(100%+0.25rem)] sm:top-auto sm:bottom-auto',
              datePickerVariants({ variant })
            )}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => {
                  const newMonth = new Date(selectedMonth)
                  newMonth.setMonth(newMonth.getMonth() - 1)
                  setSelectedMonth(newMonth)
                }}
                className="p-1 hover:bg-elevated rounded transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-medium text-text-primary">
                {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                type="button"
                onClick={() => {
                  const newMonth = new Date(selectedMonth)
                  newMonth.setMonth(newMonth.getMonth() + 1)
                  setSelectedMonth(newMonth)
                }}
                className="p-1 hover:bg-elevated rounded transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-text-muted py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, i) => {
                const isCurrentMonth = date.getMonth() === selectedMonth.getMonth()
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    disabled={isDisabled(date) || !isCurrentMonth}
                    className={cn(
                      'h-11 w-full sm:h-8 sm:w-8 text-sm rounded-md transition-colors',
                      'hover:bg-elevated focus:outline-none focus:ring-2 focus:ring-primary',
                      isSelected(date) && 'bg-primary text-primary-foreground',
                      isToday(date) && !isSelected(date) && 'border border-primary',
                      isDisabled(date) && 'opacity-30 cursor-not-allowed',
                      !isCurrentMonth && 'text-text-muted opacity-50'
                    )}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
