import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const skeletonVariants = cva('animate-pulse rounded', {
  variants: {
    variant: {
      default: 'bg-elevated',
      muted: 'bg-surface',
      shimmer: 'relative overflow-hidden bg-elevated shimmer',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

export { Skeleton, skeletonVariants }

// ===== PRE-BUILT SKELETON COMPONENTS =====

export interface SkeletonTextProps extends Omit<SkeletonProps, 'children'> {
  lines?: number
  className?: string
}

export function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}

export interface SkeletonAvatarProps extends SkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const avatarSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
}

export function SkeletonAvatar({ size = 'md', className, ...props }: SkeletonAvatarProps) {
  return (
    <Skeleton
      className={cn('rounded-full', avatarSizes[size], className)}
      {...props}
    />
  )
}

export interface SkeletonCardProps extends SkeletonProps {
  showAvatar?: boolean
  showTitle?: boolean
  textLines?: number
}

export function SkeletonCard({
  showAvatar = true,
  showTitle = true,
  textLines = 3,
  className,
  ...props
}: SkeletonCardProps) {
  return (
    <div className={cn('p-4 space-y-4', className)} {...props}>
      {showAvatar && (
        <div className="flex items-center space-x-4">
          <SkeletonAvatar />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      )}
      {showTitle && <Skeleton className="h-6 w-3/4" />}
      <SkeletonText lines={textLines} />
    </div>
  )
}

export interface SkeletonListProps extends SkeletonProps {
  items?: number
  showAvatar?: boolean
}

export function SkeletonList({ items = 5, showAvatar = true, className, ...props }: SkeletonListProps) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {showAvatar && <SkeletonAvatar size="sm" />}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export interface SkeletonTableProps extends SkeletonProps {
  rows?: number
  columns?: number
}

export function SkeletonTable({ rows = 5, columns = 4, className, ...props }: SkeletonTableProps) {
  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Header */}
      <div className="flex space-x-4 mb-4 pb-2 border-b border-border-default">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-6 flex-1" />
        ))}
      </div>
      {/* Rows */}
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, j) => (
              <Skeleton key={j} className="h-10 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
