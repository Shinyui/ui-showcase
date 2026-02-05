import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const responsiveWrapperVariants = cva('w-full', {
  variants: {
    aspectRatio: {
      square: 'aspect-square',
      video: 'aspect-video',
      '4/3': 'aspect-[4/3]',
      '3/2': 'aspect-[3/2]',
      '16/9': 'aspect-[16/9]',
      '21/9': 'aspect-[21/9]',
    },
  },
  defaultVariants: {
    aspectRatio: undefined,
  },
})

export interface ResponsiveWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof responsiveWrapperVariants> {
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export function ResponsiveWrapper({
  aspectRatio,
  breakpoint,
  className,
  children,
  ...props
}: ResponsiveWrapperProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<string>('md')

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setCurrentBreakpoint('sm')
      else if (width < 768) setCurrentBreakpoint('md')
      else if (width < 1024) setCurrentBreakpoint('lg')
      else setCurrentBreakpoint('xl')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (breakpoint && currentBreakpoint !== breakpoint) {
    return null
  }

  return (
    <div
      className={cn(responsiveWrapperVariants({ aspectRatio }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

// ===== SHOW / AT =====
export interface ShowAtProps {
  at: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export function Show({ at, children }: ShowAtProps) {
  const breakpoints = {
    sm: 'hidden sm:block',
    md: 'hidden md:block',
    lg: 'hidden lg:block',
    xl: 'hidden xl:block',
  }

  return <div className={breakpoints[at]}>{children}</div>
}

// ===== HIDE / AT =====
export interface HideAtProps {
  at: 'sm' | 'md' | 'lg' | 'xl' | 'mobile' | 'desktop'
  children: React.ReactNode
}

export function Hide({ at, children }: HideAtProps) {
  const breakpoints: Record<string, string> = {
    sm: 'block sm:hidden',
    md: 'block md:hidden',
    lg: 'block lg:hidden',
    xl: 'block xl:hidden',
    mobile: 'hidden sm:block',
    desktop: 'block sm:hidden',
  }

  return <div className={breakpoints[at]}>{children}</div>
}
