import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gradientBgVariants = cva('', {
  variants: {
    variant: {
      primary: '',
      accent: '',
      subtle: '',
      neutral: '',
      mesh: '',
    },
    animation: {
      none: '',
      pulse: 'animate-pulse',
      shimmer: 'shimmer',
    },
  },
  defaultVariants: {
    variant: 'primary',
    animation: 'none',
  },
})

export interface GradientBgProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientBgVariants> {
  colors?: string[]
  angle?: number
  intensity?: 'low' | 'medium' | 'high'
}

export function GradientBg({
  variant = 'primary',
  animation = 'none',
  colors,
  angle = 135,
  intensity = 'medium',
  className,
  children,
  ...props
}: GradientBgProps) {
  // Get gradient background based on variant
  const getGradientBackground = () => {
    // If custom colors provided, use them
    if (colors && colors.length > 0) {
      return `linear-gradient(${angle}deg, ${colors.join(', ')})`
    }

    // Otherwise use theme CSS variables
    switch (variant) {
      case 'primary':
        return 'var(--gradient-primary)'
      case 'accent':
        return 'var(--gradient-accent)'
      case 'subtle':
        return 'var(--gradient-primary-subtle)'
      case 'neutral':
        return 'var(--gradient-neutral)'
      case 'mesh':
        return 'var(--gradient-mesh-sunset)'
      default:
        return 'var(--gradient-primary)'
    }
  }

  const style: React.CSSProperties = {
    backgroundImage: getGradientBackground(),
  }

  return (
    <div
      className={cn('relative', gradientBgVariants({ variant, animation }), className)}
      style={style}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// ===== GRADIENT OVERLAY =====
export interface GradientOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'radial'
  colors?: string[]
  opacity?: number
}

export function GradientOverlay({
  variant = 'top',
  colors,
  opacity = 0.5,
  className,
  ...props
}: GradientOverlayProps) {
  const gradients = {
    top: 'to-bottom',
    bottom: 'to-top',
    left: 'to-right',
    right: 'to-left',
    center: 'radial-gradient(circle, var(--color-background) 0%, transparent 70%)',
    radial: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
  }

  const defaultColors = ['var(--gradient-primary-start)', 'var(--gradient-primary-end)']

  const style: React.CSSProperties = {
    background: variant === 'center' || variant === 'radial'
      ? gradients[variant]
      : `linear-gradient(${gradients[variant as keyof typeof gradients]}, ${colors?.[0] || defaultColors[0]}, transparent)`,
    opacity,
  }

  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={style}
      {...props}
    />
  )
}
