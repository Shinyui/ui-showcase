import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressBarVariants = cva('w-full overflow-hidden', {
  variants: {
    variant: {
      default: 'bg-elevated rounded-full',
      glass: 'glass rounded-full',
      glow: 'bg-elevated rounded-full shadow-[0_0_10px_rgba(163,163,163,0.3)]',
    },
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressBarVariants> {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  color?: 'primary' | 'success' | 'warning' | 'destructive'
  striped?: boolean
  animated?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = false,
  color = 'primary',
  striped = false,
  animated = false,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
  }

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between mb-2 text-sm">
          {label && <span className="text-text-primary">{label}</span>}
          {showPercentage && <span className="text-text-muted">{Math.round(percentage)}%</span>}
        </div>
      )}

      <div
        className={cn(progressBarVariants({ variant, size }), className)}
        {...props}
      >
        <motion.div
          className={cn(
            'h-full rounded-full transition-colors',
            colorClasses[color],
            striped && 'bg-[length:20px_20px] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[0_0]',
            animated && striped && 'animate-[progress-bar-stripes_1s_linear_infinite]'
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  )
}

// ===== CIRCULAR PROGRESS =====
export interface ProgressCircleProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
  showPercentage?: boolean
  color?: 'primary' | 'success' | 'warning' | 'destructive'
}

export function ProgressCircle({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  label,
  showPercentage = false,
  color = 'primary',
}: ProgressCircleProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const colorClasses = {
    primary: 'stroke-primary',
    success: 'stroke-success',
    warning: 'stroke-warning',
    destructive: 'stroke-destructive',
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-elevated"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className={colorClasses[color]}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-xs text-text-muted">{label}</span>}
        {showPercentage ? (
          <span className="text-2xl font-semibold text-text-primary">
            {Math.round(percentage)}%
          </span>
        ) : (
          <span className="text-2xl font-semibold text-text-primary">
            {value}
          </span>
        )}
      </div>
    </div>
  )
}
