import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const radioVariants = cva('', {
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

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
  description?: string
}

export interface RadioGroupProps
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'>,
    VariantProps<typeof radioVariants> {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  layout?: 'vertical' | 'horizontal'
  label?: string
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  variant = 'default',
  layout = 'vertical',
  label,
  className,
  ...props
}: RadioGroupProps) {
  const handleChange = (optionValue: string) => {
    onChange?.(optionValue)
  }

  return (
    <fieldset className={cn('space-y-2', className)} {...props}>
      {label && (
        <legend className="text-sm font-medium text-text-primary">{label}</legend>
      )}
      <div
        className={cn(
          'space-y-2',
          layout === 'horizontal' && 'sm:flex sm:space-y-0 sm:space-x-6'
        )}
      >
        {options.map(option => (
          <label
            key={option.value}
            className={cn(
              'relative flex items-start gap-3 cursor-pointer',
              'p-3 rounded-md border border-transparent',
              'hover:bg-elevated transition-colors',
              option.disabled && 'opacity-50 cursor-not-allowed',
              value === option.value && 'bg-elevated border-border-subtle',
              radioVariants({ variant })
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              disabled={option.disabled}
              className={cn(
                'h-4 w-4 mt-0.5 rounded-full border-2',
                'border-border-default text-primary',
                'focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'disabled:opacity-50'
              )}
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-text-primary">
                {option.label}
              </span>
              {option.description && (
                <p className="text-sm text-text-muted mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
