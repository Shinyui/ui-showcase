import * as React from 'react'
import { ErrorState } from '@/components/ui/error-state'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface ErrorPatternProps {
  title?: string
  message?: string
  code?: string | number
  showRetry?: boolean
  showHome?: boolean
  onRetry?: () => void
  onHome?: () => void
  retryLabel?: string
  homeLabel?: string
  className?: string
}

export function ErrorPattern({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  code,
  showRetry = true,
  showHome = true,
  onRetry,
  onHome,
  retryLabel = 'Try Again',
  homeLabel = 'Go Home',
  className,
}: ErrorPatternProps) {
  const handleHome = () => {
    if (onHome) {
      onHome()
    } else {
      window.location.href = '/'
    }
  }

  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    } else {
      window.location.reload()
    }
  }

  return (
    <ErrorState
      title={title}
      message={message}
      code={code}
      className={className}
      action={showRetry ? { label: retryLabel, onClick: handleRetry } : undefined}
      secondaryAction={showHome ? { label: homeLabel, onClick: handleHome } : undefined}
    />
  )
}

// ===== ERROR BOUNDARY =====
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return (
        <ErrorPattern
          code={500}
          onRetry={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

// ===== ASYNC ERROR BOUNDARY =====
export interface AsyncErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AsyncErrorBoundary({
  children,
  fallback,
}: AsyncErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) =>
        fallback || <ErrorPattern code={500} onRetry={resetError} />
      }
    >
      {children}
    </ErrorBoundary>
  )
}
