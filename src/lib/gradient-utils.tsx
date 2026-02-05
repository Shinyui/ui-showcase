/**
 * Gradient utility classes and presets
 */

export type GradientVariant =
  | 'primary'
  | 'primary-subtle'
  | 'accent'
  | 'accent-subtle'
  | 'neutral'
  | 'mesh-sunset'
  | 'animated'
  | 'custom'

export type GradientPreset = Exclude<GradientVariant, 'custom'>

export type GradientDirection =
  | 'to-right'
  | 'to-left'
  | 'to-bottom'
  | 'to-top'
  | 'to-br'
  | 'to-bl'
  | 'to-tr'
  | 'to-tl'

export interface GradientOptions {
  variant?: GradientVariant
  direction?: GradientDirection
  animated?: boolean
  colors?: string[]
  angle?: number
}

/**
 * Predefined gradient configurations
 */
export const gradientPresets: Record<GradientPreset, {
  background: string
  colors?: readonly string[]
  angle?: number
  type?: string
}> = {
  primary: {
    background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
    colors: ['#ffffff', '#a3a3a3'],
    angle: 135,
  },
  'primary-subtle': {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(163, 163, 163, 0.2) 100%)',
    colors: ['rgba(255, 255, 255, 0.2)', 'rgba(163, 163, 163, 0.2)'],
    angle: 135,
  },
  accent: {
    background: 'linear-gradient(135deg, #d4d4d4 0%, #737373 100%)',
    colors: ['#d4d4d4', '#737373'],
    angle: 135,
  },
  'accent-subtle': {
    background: 'linear-gradient(135deg, rgba(212, 212, 212, 0.2) 0%, rgba(115, 115, 115, 0.2) 100%)',
    colors: ['rgba(212, 212, 212, 0.2)', 'rgba(115, 115, 115, 0.2)'],
    angle: 135,
  },
  neutral: {
    background: 'linear-gradient(135deg, #262626 0%, #404040 100%)',
    colors: ['#262626', '#404040'],
    angle: 135,
  },
  'mesh-sunset': {
    background:
      'radial-gradient(at 0% 0%, rgba(255, 255, 255, 0.5) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(212, 212, 212, 0.5) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(163, 163, 163, 0.5) 0, transparent 50%), radial-gradient(at 0% 100%, rgba(115, 115, 115, 0.5) 0, transparent 50%)',
    type: 'mesh',
  },
  animated: {
    background: 'linear-gradient(-45deg, #404040, #737373, #a3a3a3, #d4d4d4)',
    colors: ['#404040', '#737373', '#a3a3a3', '#d4d4d4'],
    angle: -45,
  },
}

/**
 * Direction to angle mapping
 */
export const directionToAngle: Record<GradientDirection, number> = {
  'to-right': 90,
  'to-left': 270,
  'to-bottom': 180,
  'to-top': 0,
  'to-br': 135,
  'to-bl': 225,
  'to-tr': 45,
  'to-tl': 315,
}

/**
 * Get gradient classes based on variant
 */
export function getGradientClasses(options: GradientOptions = {}): string {
  const { variant = 'primary', animated = false } = options

  const baseClasses = 'gradient-base'

  const variantClasses: Record<string, string> = {
    primary: 'gradient-primary',
    'primary-subtle': 'gradient-primary-subtle',
    accent: 'gradient-accent',
    'accent-subtle': 'gradient-accent-subtle',
    neutral: 'gradient-neutral',
    'mesh-sunset': 'gradient-mesh',
    animated: 'gradient-animated',
    custom: 'gradient-custom',
  }
  const variantClass = variantClasses[variant] || ''

  const animatedClass = animated ? 'gradient-animated' : ''

  return [baseClasses, variantClass, animatedClass].filter(Boolean).join(' ')
}

/**
 * Get inline gradient styles
 */
export function getGradientStyles(options: GradientOptions = {}): React.CSSProperties {
  const { variant = 'primary', direction, colors, angle } = options

  // Custom gradient with provided colors
  if (colors && colors.length > 0) {
    const gradientAngle = angle ?? (direction ? directionToAngle[direction] : 135)
    return {
      background: `linear-gradient(${gradientAngle}deg, ${colors.join(', ')})`,
    }
  }

  // Predefined gradient (exclude 'custom' variant)
  if (variant !== 'custom') {
    const preset = gradientPresets[variant as GradientPreset]
    if (preset) {
      return { background: preset.background }
    }
  }

  // Default fallback
  return { background: gradientPresets.primary.background }
}

/**
 * Create a custom linear gradient
 */
export function createLinearGradient(
  colors: string[],
  angle: number = 135
): string {
  return `linear-gradient(${angle}deg, ${colors.join(', ')})`
}

/**
 * Create a radial gradient
 */
export function createRadialGradient(
  colors: string[],
  shape: 'circle' | 'ellipse' = 'circle',
  position: string = 'center'
): string {
  return `radial-gradient(${shape} at ${position}, ${colors.join(', ')})`
}

/**
 * Create a conic gradient
 */
export function createConicGradient(
  colors: string[],
  fromAngle: number = 0,
  position: string = 'center'
): string {
  return `conic-gradient(from ${fromAngle}deg at ${position}, ${colors.join(', ')})`
}

/**
 * Create a mesh gradient (multiple radial gradients)
 */
export function createMeshGradient(
  stops: Array<{
    color: string
    position: string // e.g., "0% 0%", "100% 50%"
    size?: string // e.g., "50%", "transparent 50%"
  }>
): string {
  const gradients = stops.map(stop => {
    const size = stop.size || 'transparent 50%'
    return `radial-gradient(at ${stop.position}, ${stop.color} 0, ${size})`
  })

  return gradients.join(', ')
}

/**
 * Gradient animation keyframes
 */
export const gradientAnimations = {
  flow: `
    @keyframes gradient-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `,
  mesh: `
    @keyframes mesh-move {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 100%; }
    }
  `,
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `,
  pulse: `
    @keyframes gradient-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
  `,
} as const

/**
 * Get gradient animation class
 */
export function getGradientAnimation(type: 'flow' | 'mesh' | 'shimmer' | 'pulse' = 'flow'): string {
  return `gradient-${type}`
}

/**
 * Gradient utility for text
 */
export interface TextGradientOptions {
  colors?: string[]
  angle?: number
  variant?: GradientVariant
}

export function getTextGradientStyles(options: TextGradientOptions = {}): React.CSSProperties {
  const { colors, angle = 135, variant } = options

  let gradient: string

  if (colors && colors.length > 0) {
    gradient = createLinearGradient(colors, angle)
  } else if (variant && variant !== 'custom') {
    const preset = gradientPresets[variant as GradientPreset]
    gradient = preset?.background || createLinearGradient(['#ffffff', '#a3a3a3'], angle)
  } else {
    gradient = createLinearGradient(['#ffffff', '#a3a3a3'], angle)
  }

  return {
    background: gradient,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }
}

/**
 * HOC to add gradient background to any component
 */
export function withGradient<P extends object>(
  Component: React.ComponentType<P>,
  defaultGradientOptions?: GradientOptions
) {
  return function GradientComponent(props: P & React.HTMLAttributes<HTMLDivElement>) {
    const { className, style, ...rest } = props
    const gradientStyles = getGradientStyles(defaultGradientOptions)

    return <Component className={className || ''} style={{ ...gradientStyles, ...style }} {...(rest as P)} />
  }
}

/**
 * Common color palettes for gradients
 */
export const gradientPalettes = {
  // Warm colors
  sunset: ['#ff6b6b', '#feca57', '#ff9ff3'],
  fire: ['#ff416c', '#ff4b2b'],
  peach: ['#fad961', '#f76b1c'],

  // Cool colors
  ocean: ['#667eea', '#764ba2'],
  sky: ['#56ccf2', '#2f80ed'],
  arctic: ['#a8edea', '#fed6e3'],

  // Nature colors
  forest: ['#11998e', '#38ef7d'],
  moss: ['#134e5e', '#71b280'],

  // Dark/neutral colors
  midnight: ['#0f2027', '#203a43', '#2c5364'],
  slate: ['#1c1c1c', '#363636'],

  // Vibrant colors
  neon: ['#f093fb', '#f5576c'],
  aurora: ['#4facfe', '#00f2fe'],
  galaxy: ['#8e2de2', '#4a00e0'],
} as const
