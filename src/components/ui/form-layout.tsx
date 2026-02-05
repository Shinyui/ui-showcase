import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const formLayoutVariants = cva('space-y-6', {
  variants: {
    spacing: {
      tight: 'space-y-4',
      normal: 'space-y-6',
      relaxed: 'space-y-8',
    },
  },
  defaultVariants: {
    spacing: 'normal',
  },
})

export interface FormLayoutProps
  extends React.HTMLAttributes<HTMLFormElement>,
    VariantProps<typeof formLayoutVariants> {
  children: React.ReactNode
}

const FormLayout = React.forwardRef<HTMLFormElement, FormLayoutProps>(
  ({ className, spacing, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn(formLayoutVariants({ spacing }), className)}
        {...props}
      >
        {children}
      </form>
    )
  }
)
FormLayout.displayName = 'FormLayout'

export { FormLayout, formLayoutVariants }

// ===== FORM ROW =====
export interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function FormRow({ className, children, ...props }: FormRowProps) {
  return (
    <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4', className)} {...props}>
      {children}
    </div>
  )
}

// ===== FORM FIELD =====
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  required?: boolean
  description?: string
  children: React.ReactNode
}

export function FormField({ label, required, description, children, className, ...props }: FormFieldProps) {
  return (
    <div className={cn('flex-1 space-y-2', className)} {...props}>
      {label && (
        <label className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      {description && <p className="text-sm text-text-muted">{description}</p>}
    </div>
  )
}

// ===== FORM ACTIONS =====
export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'space-between'
  children: React.ReactNode
}

const alignVariants = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  'space-between': 'justify-between',
}

export function FormActions({ align = 'right', children, className, ...props }: FormActionsProps) {
  return (
    <div className={cn('flex gap-3 pt-4 sm:pt-4 flex-col sm:flex-row', alignVariants[align], className)} {...props}>
      {children}
    </div>
  )
}
