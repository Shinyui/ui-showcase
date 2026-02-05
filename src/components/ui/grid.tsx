import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gridVariants = cva('w-full', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
      12: 'grid-cols-12',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  defaultVariants: {
    cols: 3,
    gap: 'md',
  },
})

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType
}

export function Grid({
  as: Component = 'div',
  cols = 3,
  gap = 'md',
  className,
  children,
  ...props
}: GridProps) {
  return (
    <Component
      className={cn('grid', gridVariants({ cols, gap }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}

// ===== GRID ITEM =====
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full'
  rowSpan?: 1 | 2 | 3 | 4 | 'full'
}

export function GridItem({
  colSpan = 1,
  rowSpan = 1,
  className,
  children,
  ...props
}: GridItemProps) {
  const colSpanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    full: 'col-span-full',
  }

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
    full: 'row-span-full',
  }

  return (
    <div
      className={cn(colSpanClasses[colSpan], rowSpanClasses[rowSpan], className)}
      {...props}
    >
      {children}
    </div>
  )
}
