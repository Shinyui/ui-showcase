import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gradientTextVariants = cva('', {
  variants: {
    variant: {
      primary: '',
      accent: '',
      subtle: '',
      custom: '',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'primary',
    weight: 'semibold',
  },
})

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof gradientTextVariants> {
  colors?: string[]
  angle?: number
  animate?: boolean
}

export function GradientText({
  variant = 'primary',
  weight = 'semibold',
  colors,
  angle = 135,
  animate = false,
  className,
  children,
  ...props
}: GradientTextProps) {
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
        return 'linear-gradient(135deg, var(--color-text-muted) 0%, var(--color-text-disabled) 100%)'
      default:
        return 'var(--gradient-primary)'
    }
  }

  const style: React.CSSProperties = {
    backgroundImage: getGradientBackground(),
    ...(animate && {
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 3s ease infinite',
    }),
  }

  return (
    <>
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <span
        className={cn(
          'bg-clip-text text-transparent',
          gradientTextVariants({ variant, weight }),
          className
        )}
        style={style}
        {...props}
      >
        {children}
      </span>
    </>
  )
}
