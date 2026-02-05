import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const searchInputVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        glass: 'glass',
        glow: 'focus:shadow-[0_0_20px_rgba(163,163,163,0.3)]',
      },
      size: {
        sm: 'h-11 sm:h-9 px-4 sm:px-3 py-3 sm:py-2 text-base sm:text-sm',
        md: 'h-11 sm:h-10 px-4 sm:px-4 py-3 sm:py-2 text-base sm:text-sm',
        lg: 'h-12 sm:h-12 px-5 sm:px-5 py-3 sm:py-2 text-lg sm:text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof searchInputVariants> {
  onSearch?: (query: string) => void
  debounceMs?: number
  icon?: React.ReactNode
  showExternalIcon?: boolean
  clearButton?: boolean
}

export function SearchInput({
  onSearch,
  debounceMs = 300,
  variant = 'default',
  size = 'md',
  icon,
  clearButton = true,
  className,
  value: controlledValue,
  onChange: controlledOnChange,
  ...props
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState('')
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const defaultIcon = icon || (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )

  const debouncedSearchRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    if (!isControlled) {
      setInternalValue(newValue)
    }

    controlledOnChange?.(e)

    if (debouncedSearchRef.current) {
      clearTimeout(debouncedSearchRef.current)
    }

    debouncedSearchRef.current = setTimeout(() => {
      onSearch?.(newValue)
    }, debounceMs)
  }

  const handleClear = () => {
    const emptyValue = ''

    if (!isControlled) {
      setInternalValue(emptyValue)
    }

    const syntheticEvent = {
      target: { value: emptyValue },
    } as React.ChangeEvent<HTMLInputElement>

    controlledOnChange?.(syntheticEvent)
    onSearch?.(emptyValue)
  }

  React.useEffect(() => {
    return () => {
      if (debouncedSearchRef.current) {
        clearTimeout(debouncedSearchRef.current)
      }
    }
  }, [])

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
      {defaultIcon}
      </div>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        className={cn(
          'w-full pl-10 pr-10 rounded-md border border-border-default',
          'bg-background text-text-primary placeholder:text-text-muted',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'transition-all touch-manipulation',
          searchInputVariants({ variant, size })
        )}
        {...props}
      />
      {clearButton && value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
