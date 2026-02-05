import * as React from 'react'
import { LoadingOverlay } from '@/components/ui/loading-overlay'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export interface LoadingPatternProps {
  type?: 'overlay' | 'skeleton' | 'spinner' | 'dots'
  message?: string
  fullScreen?: boolean
  className?: string
}

export function LoadingPattern({
  type = 'overlay',
  message,
  fullScreen = false,
  className,
}: LoadingPatternProps) {
  if (type === 'overlay') {
    return (
      <LoadingOverlay
        show={true}
        message={message}
        variant="glass"
        className={cn(fullScreen && 'fixed inset-0', className)}
      />
    )
  }

  if (type === 'skeleton') {
    return (
      <div className={cn('space-y-4 p-6', className)}>
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

// ===== PAGE LOADING =====
export interface PageLoadingProps {
  message?: string
  logo?: React.ReactNode
}

export function PageLoading({ message = 'Loading...', logo }: PageLoadingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {logo && <div className="mb-8">{logo}</div>}
      <div className="relative h-16 w-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-border-default" />
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      </div>
      {message && (
        <p className="text-text-muted animate-pulse">{message}</p>
      )}
    </div>
  )
}

// ===== CONTENT LOADING =====
export interface ContentLoadingProps {
  rows?: number
  className?: string
}

export function ContentLoading({ rows = 3, className }: ContentLoadingProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex gap-4">
            <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
