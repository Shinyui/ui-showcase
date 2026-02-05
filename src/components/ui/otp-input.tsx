import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const otpInputVariants = cva('', {
  variants: {
    variant: {
      default: 'border border-border-default focus:border-primary',
      glass: 'glass border border-glass-border-light focus:border-glass-border-highlight',
      glow: 'border border-border-default focus:shadow-[0_0_15px_rgba(163,163,163,0.3)] focus:border-primary',
    },
    size: {
      sm: 'h-11 w-11 sm:h-10 sm:w-10 text-base sm:text-sm',
      md: 'h-12 w-12 sm:h-12 sm:w-12 text-base sm:text-base',
      lg: 'h-14 w-14 text-lg sm:text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface OtpInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'pattern'>,
    VariantProps<typeof otpInputVariants> {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  pattern?: RegExp
}

export function OtpInput({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  pattern = /^[0-9]*$/,
  variant = 'default',
  size = 'md',
  className,
  disabled,
  autoFocus,
  ...props
}: OtpInputProps) {
  const [internalValue, setInternalValue] = React.useState('')
  const [focusedIndex, setFocusedIndex] = React.useState(0)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, newValue: string) => {
    // Only allow the specified pattern
    if (!pattern.test(newValue)) {
      return
    }

    const newValueArray = value.split('')

    // Replace the value at the current index
    if (newValue.length > 0) {
      newValueArray[index] = newValue[0]

      // Auto-focus next input
      if (index < length - 1 && newValue.length > 0) {
        inputRefs.current[index + 1]?.focus()
      }
    } else {
      // If backspace, focus previous input
      if (index > 0 && newValueArray[index]) {
        inputRefs.current[index - 1]?.focus()
      }
      newValueArray[index] = ''
    }

    const newValueString = newValueArray.join('').slice(0, length)

    if (!isControlled) {
      setInternalValue(newValueString)
    }

    onChange?.(newValueString)

    // Check if complete
    if (newValueString.length === length) {
      onComplete?.(newValueString)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length)

    if (pastedData.split('').every(char => pattern.test(char))) {
      if (!isControlled) {
        setInternalValue(pastedData)
      }

      onChange?.(pastedData)

      if (pastedData.length === length) {
        onComplete?.(pastedData)
        inputRefs.current[length - 1]?.focus()
      }
    }
  }

  const handleFocus = (index: number) => {
    setFocusedIndex(index)
  }

  // Reset value when length changes
  React.useEffect(() => {
    if (value.length > length) {
      const truncatedValue = value.slice(0, length)
      if (!isControlled) {
        setInternalValue(truncatedValue)
      }
      onChange?.(truncatedValue)
    }
  }, [length, value, isControlled, onChange])

  // Auto-focus first input on mount
  React.useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0]?.focus()
    }
  }, [autoFocus])

  return (
    <div className={cn('flex gap-2 sm:gap-2', className)} {...props}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={ref => {
            inputRefs.current[index] = ref
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ''}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={cn(
            'flex items-center justify-center text-center rounded-md',
            'bg-background text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'transition-all',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            otpInputVariants({ variant, size }),
            focusedIndex === index && 'ring-2 ring-primary'
          )}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}
