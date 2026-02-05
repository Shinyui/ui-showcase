export interface ThemeColors {
  gray: Record<number, string>
  background: string
  surface: string
  elevated: string
  'text-primary': string
  'text-muted': string
  'text-disabled': string
  'border-default': string
  'border-subtle': string
  primary: string
  'primary-foreground': string
  secondary: string
  'secondary-foreground': string
  accent: string
  'accent-foreground': string
  destructive: string
  'destructive-foreground': string
  success: string
  warning: string
}

export interface ThemeRadius {
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export interface ThemeShadow {
  sm: string
  md: string
  lg: string
  xl: string
}

export interface ThemeFontFamily {
  sans: string[]
  mono: string[]
}

export interface ThemeFontSize {
  xs: string
  sm: string
  base: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
}

export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface ThemeAnimation {
  fast: string
  normal: string
  slow: string
}

export interface ThemeEasing {
  'ease-out': string
  'ease-in-out': string
}

// ===== GLASSMORPHISM TOKENS =====
export interface ThemeGlass {
  blur: { sm: string; md: string; lg: string; xl: string }
  saturate: string
  bg: { subtle: string; default: string; strong: string }
  bgDark: { subtle: string; default: string; strong: string }
  border: { light: string; highlight: string; dark: string; darkHighlight: string; glow: string }
  shadow: { sm: string; md: string; lg: string; xl: string }
}

// ===== GRADIENT TOKENS =====
export interface ThemeGradient {
  primary: string
  primarySubtle: string
  accent: string
  accentSubtle: string
  neutral: string
  meshSunset: string
  animated: string
  // Theme-specific gradient colors (for CSS gradients)
  primaryStart: string
  primaryEnd: string
  accentStart: string
  accentEnd: string
}

// ===== ENHANCED MOTION TOKENS =====
export interface ThemeMotion {
  spring: { snappy: string; gentle: string; bouncy: string; stiff: string; heavy: string }
  duration: { instant: string; fast: string; normal: string; slow: string; slower: string }
  easing: { outExpo: string; outQuart: string; inOut: string; spring: string }
  stagger: { container: string; item: string }
}

// ===== ENHANCED TYPOGRAPHY TOKENS =====
export interface ThemeTypography {
  lineHeight: { tight: string; normal: string; relaxed: string }
  letterSpacing: { tight: string; normal: string; wide: string }
  headingScale: { h1: string; h2: string; h3: string; h4: string; h5: string; h6: string }
  fontWeight: { normal: string; medium: string; semibold: string; bold: string }
}

// ===== Z-INDEX SCALE =====
export interface ThemeZIndex {
  dropdown: string
  sticky: string
  modal: string
  popover: string
  tooltip: string
}

// ===== OPACITY TOKENS =====
export interface ThemeOpacity {
  subtle: string
  medium: string
  strong: string
}

export interface DesignSystemTheme {
  name: string
  displayName: string
  colors: ThemeColors
  radius: ThemeRadius
  shadow: ThemeShadow
  fontFamily: ThemeFontFamily
  fontSize: ThemeFontSize
  spacing: ThemeSpacing
  animation: ThemeAnimation
  easing: ThemeEasing
  // New visual effect tokens
  glass?: ThemeGlass
  gradient?: ThemeGradient
  motion?: ThemeMotion
  typography?: ThemeTypography
  zIndex?: ThemeZIndex
  opacity?: ThemeOpacity
}
