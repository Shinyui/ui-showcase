import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const stackVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: {
    direction: 'column',
    align: 'start',
    justify: 'start',
    wrap: 'nowrap',
    gap: 'md',
  },
})

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType
}

export function Stack({
  as: Component = 'div',
  direction = 'column',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap = 'md',
  className,
  children,
  ...props
}: StackProps) {
  return (
    <Component
      className={cn(stackVariants({ direction, align, justify, wrap, gap }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

// ===== SPACER =====
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | 'sm' | 'md' | 'lg' | 'xl'
  flex?: boolean
}

const sizeClasses = {
  sm: 'h-4',
  md: 'h-8',
  lg: 'h-12',
  xl: 'h-16',
}

export function Spacer({
  size = 'md',
  flex = false,
  className,
  ...props
}: SpacerProps) {
  if (flex) {
    return <div className={cn('flex-1', className)} {...props} />
  }

  if (typeof size === 'number') {
    return <div style={{ height: `${size}px` }} className={className} {...props} />
  }

  return <div className={cn(sizeClasses[size], className)} {...props} />
}
