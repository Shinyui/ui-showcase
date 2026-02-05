/**
 * Glassmorphism utility classes and variants
 */

export type GlassVariant = 'subtle' | 'default' | 'strong' | 'heavy'
export type GlassBlur = 'sm' | 'md' | 'lg' | 'xl'

export interface GlassOptions {
  variant?: GlassVariant
  blur?: GlassBlur
  border?: boolean
  shadow?: boolean
  darkMode?: boolean
}

/**
 * Glass variant class mappings
 */
export const glassVariants = {
  subtle: 'backdrop-blur-sm bg-glass-bg-subtle border border-glass-border-light',
  default: 'backdrop-blur-md bg-glass-bg-default border border-glass-border-light border-t border-l border-glass-border-highlight shadow-glass-md',
  strong: 'backdrop-blur-lg bg-glass-bg-strong border border-glass-border-highlight shadow-glass-md',
  heavy: 'backdrop-blur-xl bg-glass-bg-strong border border-glass-border-highlight border-t border-l border-glass-border-glow shadow-glass-lg',
  liquid: 'backdrop-blur-xl bg-glass-bg-default border border-glass-border-glow shadow-glass-lg',
} as const

/**
 * Dark mode glass variant mappings
 */
export const glassVariantsDark = {
  subtle: 'backdrop-blur-sm bg-glass-bg-subtle-dark border border-glass-border-dark',
  default: 'backdrop-blur-md bg-glass-bg-default-dark border border-glass-border-dark border-t border-l border-glass-border-dark-highlight shadow-glass-md',
  strong: 'backdrop-blur-lg bg-glass-bg-strong-dark border border-glass-border-dark-highlight shadow-glass-md',
  heavy: 'backdrop-blur-xl bg-glass-bg-strong-dark border border-glass-border-dark-highlight shadow-glass-lg',
} as const

/**
 * Get glass classes based on variant and options
 */
export function getGlassClasses(options: GlassOptions = {}): string {
  const {
    variant = 'default',
    blur = 'md',
    border = true,
    shadow = false,
    darkMode = false,
  } = options

  const baseVariant = darkMode ? glassVariantsDark : glassVariants
  const variantClasses = baseVariant[variant]

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  }[blur]

  const borderClasses = border ? 'border border-white/10 border-t border-l border-white/20' : ''
  const shadowClasses = shadow ? 'shadow-glass-md' : ''

  return [
    'relative',
    blurClasses,
    variantClasses,
    borderClasses,
    shadowClasses,
  ]
    .filter(Boolean)
    .join(' ')
}

/**
 * Get inline styles for glass effect
 */
export function getGlassStyles(options: GlassOptions = {}): React.CSSProperties {
  const { blur = 'md', darkMode = false } = options

  const blurValues = { sm: 12, md: 20, lg: 28, xl: 36 }
  const bgValues = darkMode
    ? { subtle: 'rgba(15, 23, 42, 0.25)', default: 'rgba(15, 23, 42, 0.45)', strong: 'rgba(15, 23, 42, 0.65)', heavy: 'rgba(15, 23, 42, 0.75)' }
    : { subtle: 'rgba(100, 116, 139, 0.08)', default: 'rgba(100, 116, 139, 0.15)', strong: 'rgba(100, 116, 139, 0.25)', heavy: 'rgba(100, 116, 139, 0.35)' }

  const variant = options.variant || 'default'

  return {
    backdropFilter: `blur(${blurValues[blur]}px) saturate(200%)`,
    WebkitBackdropFilter: `blur(${blurValues[blur]}px) saturate(200%)`,
    backgroundColor: bgValues[variant as keyof typeof bgValues],
    border: '1px solid rgba(203, 213, 225, 0.15)',
    borderTop: '1px solid rgba(203, 213, 225, 0.35)',
    borderLeft: '1px solid rgba(203, 213, 225, 0.35)',
  }
}

/**
 * Glass component prop types
 */
export interface GlassProps {
  variant?: GlassVariant
  blur?: GlassBlur
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  as?: React.ElementType
}

/**
 * HOC to add glass effect to any component
 */
export function withGlass<P extends object>(
  Component: React.ComponentType<P>,
  defaultGlassOptions?: GlassOptions
) {
  return function GlassComponent(props: P & GlassProps) {
    const { variant = defaultGlassOptions?.variant || 'default', className, ...rest } = props
    const glassClasses = getGlassClasses({ ...defaultGlassOptions, variant })

    return <Component className={`${glassClasses} ${className || ''}`} {...(rest as P)} />
  }
}

/**
 * Utility to check if browser supports backdrop-filter
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined') return false

  const el = document.createElement('div')
  const testValue = 'backdrop-filter: blur(10px)'
  el.style.cssText = testValue

  // Check standard property
  if (el.style.backdropFilter !== undefined) return true

  // Check webkit prefix
  if ('webkitBackdropFilter' in el.style) return true

  return false
}

/**
 * Get fallback styles for browsers that don't support backdrop-filter
 */
export function getGlassFallback(darkMode = false): React.CSSProperties {
  return {
    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }
}

/**
 * Responsive glass variants (different blur at different breakpoints)
 */
export const responsiveGlassVariants = {
  mobile: { blur: 'sm' as GlassBlur, variant: 'subtle' as GlassVariant },
  tablet: { blur: 'md' as GlassBlur, variant: 'default' as GlassVariant },
  desktop: { blur: 'lg' as GlassBlur, variant: 'strong' as GlassVariant },
} as const
