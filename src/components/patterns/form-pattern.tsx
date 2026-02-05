import * as React from 'react'
import { motion } from 'framer-motion'
import { FormLayout, FormField, FormActions } from '@/components/ui/form-layout'
import { HelperText } from '@/components/ui/helper-text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface FormField {
  name: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  placeholder?: string
  required?: boolean
  description?: string
  disabled?: boolean
}

export interface FormPatternProps {
  fields: FormField[]
  onSubmit?: (data: Record<string, string>) => void
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  loading?: boolean
  title?: string
  description?: string
  className?: string
}

export function FormPattern({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel,
  onCancel,
  loading = false,
  title,
  description,
  className,
}: FormPatternProps) {
  const [formData, setFormData] = React.useState<Record<string, string>>({})
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [touched, setTouched] = React.useState<Set<string>>(new Set())

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (name: string) => {
    setTouched(prev => new Set(prev).add(name))
    // Validate on blur
    const field = fields.find(f => f.name === name)
    if (field?.required && !formData[name]) {
      setErrors(prev => ({ ...prev, [name]: `${field.label} is required` }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(new Set(fields.map(f => f.name)))
      return
    }

    onSubmit?.(formData)
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
          {description && (
            <p className="text-sm text-text-muted mt-2">{description}</p>
          )}
        </div>
      )}

      <FormLayout onSubmit={handleSubmit}>
        {fields.map(field => (
          <FormField
            key={field.name}
            label={field.label}
            required={field.required}
            description={field.description}
          >
            <Input
              type={field.type || 'text'}
              name={field.name}
              placeholder={field.placeholder}
              disabled={field.disabled || loading}
              value={formData[field.name] || ''}
              onChange={e => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field.name)}
              aria-invalid={touched.has(field.name) && !!errors[field.name]}
              aria-describedby={
                field.description ? `${field.name}-description` : undefined
              }
            />
            {touched.has(field.name) && errors[field.name] && (
              <HelperText variant="error" id={`${field.name}-error`}>
                {errors[field.name]}
              </HelperText>
            )}
          </FormField>
        ))}

        <FormActions>
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelLabel || 'Cancel'}
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : submitLabel}
          </Button>
        </FormActions>
      </FormLayout>
    </motion.div>
  )
}
