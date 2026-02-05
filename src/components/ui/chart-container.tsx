import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const chartContainerVariants = cva('rounded-lg overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-surface border border-border-default',
      glass: 'glass',
      minimal: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chartContainerVariants> {
  title?: string
  description?: string
  actions?: React.ReactNode
  loading?: boolean
  error?: string
  height?: number | string
}

export function ChartContainer({
  title,
  description,
  actions,
  loading = false,
  error,
  height = 400,
  variant = 'default',
  className,
  children,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={cn(chartContainerVariants({ variant }), 'p-6', className)}
      {...props}
    >
      {/* Header */}
      {(title || description || actions) && (
        <div className="flex items-start justify-between mb-6">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-text-muted mt-1">{description}</p>
            )}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}

      {/* Chart Content */}
      <div style={{ height: typeof height === 'number' ? `${height}px` : height }}>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

// ===== CHART LEGEND =====
export interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{
    name: string
    color: string
  }>
}

export function ChartLegend({ items, className, ...props }: ChartLegendProps) {
  return (
    <div className={cn('flex flex-wrap gap-4', className)} {...props}>
      {items.map(item => (
        <div key={item.name} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-text-muted">{item.name}</span>
        </div>
      ))}
    </div>
  )
}

// ===== CHART TOOLTIP =====
export interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    color: string
  }>
  label?: string
}

export function ChartTooltip({ active, payload, label, className, ...props }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'glass px-3 py-2 rounded-lg shadow-lg',
        className
      )}
      {...props}
    >
      {label && <p className="text-sm font-medium text-text-primary mb-1">{label}</p>}
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-text-muted">{entry.name}:</span>
          <span className="font-medium text-text-primary">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}
