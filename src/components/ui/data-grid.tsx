import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const dataGridVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'bg-surface border border-border-default rounded-lg overflow-hidden',
      glass: 'glass rounded-lg overflow-hidden',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface DataGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataGridVariants> {
  columns: number
  gap?: number
  children: React.ReactNode
}

export function DataGrid({
  columns,
  gap = 4,
  variant = 'default',
  className,
  children,
  ...props
}: DataGridProps) {
  return (
    <div
      className={cn(dataGridVariants({ variant }), 'p-2 sm:p-4 overflow-x-auto smooth-scroll-mobile', className)}
      {...props}
    >
      <div
        className={cn('grid min-w-[600px]')}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: `${gap * 0.25}rem`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export interface DataGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DataGridItem({ className, children, ...props }: DataGridItemProps) {
  return (
    <div className={cn('p-3 sm:p-4 rounded-md bg-elevated', className)} {...props}>
      {children}
    </div>
  )
}
