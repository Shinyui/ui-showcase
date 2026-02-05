import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statisticVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-surface border border-border-default rounded-lg p-6',
      glass: 'glass rounded-lg p-6',
      minimal: 'p-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface StatisticProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>,
    VariantProps<typeof statisticVariants> {
  value: number
  label?: string
  prefix?: string
  suffix?: string
  precision?: number
  loading?: boolean
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
  animate?: boolean
}

export function Statistic({
  value,
  label,
  prefix,
  suffix,
  precision = 0,
  loading = false,
  trend,
  icon,
  animate = true,
  variant = 'default',
  className,
  ...props
}: StatisticProps) {
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    if (!animate) {
      setDisplayValue(value)
      return
    }

    const duration = 1000
    const startTime = performance.now()
    const startValue = displayValue

    const updateValue = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (value - startValue) * easeOutQuart

      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateValue)
      }
    }

    requestAnimationFrame(updateValue)
  }, [value, animate])

  const formatValue = (val: number) => {
    return val.toFixed(precision)
  }

  return (
    <motion.div
      className={cn(statisticVariants({ variant }), className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      {...props}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {label && (
            <p className="text-sm text-text-muted mb-1">{label}</p>
          )}

          {loading ? (
            <div className="h-8 w-24 bg-elevated rounded animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-1">
              {prefix && (
                <span className="text-text-muted">{prefix}</span>
              )}
              <span className="text-3xl font-semibold text-text-primary">
                {formatValue(displayValue)}
              </span>
              {suffix && (
                <span className="text-text-muted text-lg">{suffix}</span>
              )}
            </div>
          )}

          {trend && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                'flex items-center gap-1 mt-2 text-sm',
                trend.isPositive ? 'text-success' : 'text-destructive'
              )}
            >
              <svg
                className={cn(
                  'h-4 w-4',
                  !trend.isPositive && 'transform rotate-180'
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span>
                {trend.isPositive ? '+' : '-'}
                {Math.abs(trend.value)}%
              </span>
            </motion.div>
          )}
        </div>

        {icon && (
          <div className="text-primary opacity-80">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ===== STATISTIC GROUP =====
export interface StatisticGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
}

export function StatisticGroup({
  children,
  columns = 3,
  className,
  ...props
}: StatisticGroupProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
