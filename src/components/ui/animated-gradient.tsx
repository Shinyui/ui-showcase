import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const animatedGradientVariants = cva('relative overflow-hidden', {
  variants: {
    variant: {
      flow: 'bg-gradient-animated',
      mesh: 'bg-gradient-mesh',
      aurora: 'bg-gradient-mesh',
      wave: '',
    },
    speed: {
      slow: '[animation-duration:20s]',
      normal: '[animation-duration:15s]',
      fast: '[animation-duration:10s]',
    },
  },
  defaultVariants: {
    variant: 'flow',
    speed: 'normal',
  },
})

export interface AnimatedGradientProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animatedGradientVariants> {
  colors?: string[]
  children?: React.ReactNode
}

export function AnimatedGradient({
  variant = 'flow',
  speed = 'normal',
  colors,
  children,
  className,
  ...props
}: AnimatedGradientProps) {
  const getGradientBackground = () => {
    // If custom colors provided, use them
    if (colors && colors.length > 0) {
      return `linear-gradient(-45deg, ${colors.join(', ')})`
    }

    // Otherwise use theme CSS variables
    switch (variant) {
      case 'flow':
      case 'mesh':
        return 'var(--gradient-animated)'
      case 'aurora':
        return 'var(--gradient-mesh-sunset)'
      case 'wave':
        return 'var(--gradient-animated)'
      default:
        return 'var(--gradient-animated)'
    }
  }

  const gradientBackground = getGradientBackground()

  return (
    <div
      className={cn(
        animatedGradientVariants({ variant, speed }),
        'bg-[length:400%_400%] animate-gradient-flow',
        className
      )}
      style={{
        backgroundImage: gradientBackground,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// ===== GRADIENT BORDER =====
export interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  colors?: string[]
  borderWidth?: number
  borderRadius?: number
  animate?: boolean
}

export function GradientBorder({
  colors,
  borderWidth = 2,
  borderRadius = 8,
  animate = false,
  className,
  children,
  ...props
}: GradientBorderProps) {
  // Use theme CSS variable for gradient when custom colors are not provided
  const gradientBackground = colors
    ? `linear-gradient(135deg, ${colors.join(', ')})`
    : 'var(--gradient-primary)'

  return (
    <div
      className={cn('relative', className)}
      style={{
        padding: `${borderRadius + borderWidth}px`,
        borderRadius: `${borderRadius + borderWidth}px`,
        background: gradientBackground,
        ...(animate && {
          backgroundSize: '200% 200%',
          animation: 'gradient-flow 3s ease infinite',
        }),
      }}
      {...props}
    >
      <div
        className="relative bg-background h-full"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        {children}
      </div>
    </div>
  )
}

// ===== GRADIENT BUTTON =====
export interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colors?: string[]
  variant?: 'primary' | 'accent' | 'custom'
  size?: 'sm' | 'md' | 'lg'
  shimmer?: boolean
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
}

export function GradientButton({
  colors,
  variant = 'custom',
  size = 'md',
  shimmer = false,
  className,
  children,
  ...props
}: GradientButtonProps) {
  // Use theme CSS variable for gradient when custom colors are not provided
  const gradientBackground = colors
    ? `linear-gradient(135deg, ${colors.join(', ')})`
    : 'var(--gradient-primary)'

  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-md font-medium text-white transition-all hover:scale-105 active:scale-95',
        sizeClasses[size],
        shimmer && 'shimmer',
        className
      )}
      style={{
        background: gradientBackground,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
