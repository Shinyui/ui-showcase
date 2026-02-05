import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const timePickerVariants = cva('', {
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

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>,
    VariantProps<typeof timePickerVariants> {
  value?: Date
  onChange?: (time: Date | undefined) => void
  label?: string
  error?: string
  hour12?: boolean
}

export function TimePicker({
  value,
  onChange,
  label,
  error,
  hour12 = false,
  variant = 'default',
  className,
  id,
  ...props
}: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [hour, setHour] = React.useState(value?.getHours() || 12)
  const [minute, setMinute] = React.useState(value?.getMinutes() || 0)
  const [period, setPeriod] = React.useState<'am' | 'pm'>(value?.getHours() ?? 12 >= 12 ? 'pm' : 'am')
  const pickerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (value) {
      setHour(value.getHours())
      setMinute(value.getMinutes())
      setPeriod(value.getHours() >= 12 ? 'pm' : 'am')
    }
  }, [value])

  const formatTime = (h: number, m: number) => {
    if (hour12) {
      const p = h >= 12 ? 'pm' : 'am'
      const displayHour = h % 12 || 12
      return `${displayHour}:${m.toString().padStart(2, '0')} ${p}`
    }
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }

  const handleTimeSelect = (h: number, m: number, p: 'am' | 'pm') => {
    let finalHour = h
    if (hour12) {
      finalHour = p === 'pm' && h !== 12 ? h + 12 : p === 'am' && h === 12 ? 0 : h
    }

    const newDate = new Date()
    newDate.setHours(finalHour)
    newDate.setMinutes(m)
    newDate.setSeconds(0)
    newDate.setMilliseconds(0)

    onChange?.(newDate)
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

  const hours = hour12
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i)

  const minutes = Array.from({ length: 60 }, (_, i) => i)

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
        <span className="text-text-primary">
          {value ? formatTime(hour, minute) : 'Select a time'}
        </span>
        <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              'absolute z-50 mt-1 p-4 rounded-lg shadow-lg max-h-[70vh] overflow-y-auto',
              'bg-surface border border-border-default bottom-[calc(100%+0.25rem)] sm:top-auto sm:bottom-auto',
              timePickerVariants({ variant })
            )}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex gap-4">
              {/* Hours */}
              <div className="flex-1">
                <div className="text-xs font-medium text-text-muted mb-2 text-center">Hour</div>
                <div className="h-48 overflow-y-auto">
                  {hours.map(h => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHour(h)}
                      className={cn(
                        'w-full py-3 sm:py-2 min-h-11 text-sm rounded transition-colors',
                        'hover:bg-elevated focus:outline-none',
                        (hour12 ? (h === (hour % 12 || 12)) : h === hour) && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minutes */}
              <div className="flex-1">
                <div className="text-xs font-medium text-text-muted mb-2 text-center">Minute</div>
                <div className="h-48 overflow-y-auto">
                  {minutes.map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMinute(m)}
                      className={cn(
                        'w-full py-3 sm:py-2 min-h-11 text-sm rounded transition-colors',
                        'hover:bg-elevated focus:outline-none',
                        m === minute && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {m.toString().padStart(2, '0')}
                    </button>
                  ))}
                </div>
              </div>

              {/* AM/PM */}
              {hour12 && (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setPeriod('am')}
                    className={cn(
                      'flex-1 py-8 text-sm font-medium rounded transition-colors',
                      'hover:bg-elevated focus:outline-none',
                      period === 'am' && 'bg-primary text-primary-foreground'
                    )}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriod('pm')}
                    className={cn(
                      'flex-1 py-8 text-sm font-medium rounded transition-colors',
                      'hover:bg-elevated focus:outline-none',
                      period === 'pm' && 'bg-primary text-primary-foreground'
                    )}
                  >
                    PM
                  </button>
                </div>
              )}
            </div>

            {/* Apply Button */}
            <button
              type="button"
              onClick={() => handleTimeSelect(hour, minute, period)}
              className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-gray-8 transition-colors"
            >
              Apply
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}
