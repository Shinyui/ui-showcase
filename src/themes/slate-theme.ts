import type { DesignSystemTheme } from './types'

export const slateTheme: DesignSystemTheme = {
  name: 'slate',
  displayName: 'Slate',
  colors: {
    gray: {
      0: '#0f172a',
      1: '#1e293b',
      2: '#334155',
      3: '#475569',
      4: '#64748b',
      5: '#94a3b8',
      6: '#cbd5e1',
      7: '#e2e8f0',
      8: '#f1f5f9',
      9: '#f8fafc',
    },
    background: '#0f172a',
    surface: '#1e293b',
    elevated: '#334155',
    'text-primary': '#ffffff',
    'text-muted': '#cbd5e1',
    'text-disabled': '#64748b',
    'border-default': '#334155',
    'border-subtle': '#1e293b',
    primary: '#64748b',
    'primary-foreground': '#ffffff',
    secondary: '#94a3b8',
    'secondary-foreground': '#ffffff',
    accent: '#cbd5e1',
    'accent-foreground': '#0f172a',
    destructive: '#ef4444',
    'destructive-foreground': '#ffffff',
    success: '#22c55e',
    warning: '#f59e0b',
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
  },
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
    'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  glass: {
    // Enhanced blur levels for premium liquid glass effect
    blur: { sm: '12px', md: '20px', lg: '28px', xl: '36px' },
    saturate: '200%', // Increased for stronger glass texture

    // Liquid glass backgrounds - using slate tones with recommended 15-30% opacity
    bg: {
      subtle: 'rgba(100, 116, 139, 0.08)',   // More transparent
      default: 'rgba(100, 116, 139, 0.15)',  // 15-30% recommended range
      strong: 'rgba(100, 116, 139, 0.25)',   // Richer opacity
    },
    bgDark: {
      subtle: 'rgba(15, 23, 42, 0.25)',
      default: 'rgba(15, 23, 42, 0.45)',
      strong: 'rgba(15, 23, 42, 0.65)',
    },

    // Borders - creating light reflection effects
    border: {
      light: 'rgba(203, 213, 225, 0.15)',      // Base border
      highlight: 'rgba(203, 213, 225, 0.35)',  // Top/Left highlight for light reflection
      dark: 'rgba(51, 65, 85, 0.3)',           // Bottom/Right shadow for depth
      darkHighlight: 'rgba(203, 213, 225, 0.25)',
      glow: 'rgba(148, 163, 184, 0.5)',
    },

    // Enhanced shadow system with inset shadows for depth
    shadow: {
      sm: '0 4px 12px -2px rgba(15, 23, 42, 0.3)',
      md: '0 8px 32px -4px rgba(15, 23, 42, 0.4), 0 0 0 1px rgba(203, 213, 225, 0.1) inset',
      lg: '0 20px 50px -8px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(203, 213, 225, 0.15) inset',
      xl: '0 20px 25px -5px rgba(15, 23, 42, 0.3), 0 8px 10px -6px rgba(15, 23, 42, 0.3)',
    },
  },
  gradient: {
    primary: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    primarySubtle: 'linear-gradient(135deg, rgba(100, 116, 139, 0.2) 0%, rgba(71, 85, 105, 0.2) 100%)',
    accent: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
    accentSubtle: 'linear-gradient(135deg, rgba(203, 213, 225, 0.2) 0%, rgba(148, 163, 184, 0.2) 100%)',
    neutral: 'linear-gradient(135deg, #334155 0%, #64748b 100%)',
    meshSunset: 'radial-gradient(at 0% 0%, rgba(100, 116, 139, 0.5) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(148, 163, 184, 0.5) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(203, 213, 225, 0.5) 0, transparent 50%), radial-gradient(at 0% 100%, rgba(15, 23, 42, 0.5) 0, transparent 50%)',
    animated: 'linear-gradient(-45deg, #64748b, #94a3b8, #cbd5e1, #e2e8f0)',
    primaryStart: '#64748b',
    primaryEnd: '#475569',
    accentStart: '#cbd5e1',
    accentEnd: '#94a3b8',
  },
  motion: {
    spring: { snappy: '300,25,0.8', gentle: '150,20,1', bouncy: '100,10,1', stiff: '400,30,0.5', heavy: '80,25,1.5' },
    duration: { instant: '100ms', fast: '200ms', normal: '300ms', slow: '500ms', slower: '800ms' },
    easing: { outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)', outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)', inOut: 'cubic-bezier(0.4, 0, 0.2, 1)', spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    stagger: { container: '0.1,0.3', item: '300,24,0' },
  },
  typography: {
    lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' },
    letterSpacing: { tight: '-0.025em', normal: '0', wide: '0.025em' },
    headingScale: { h1: '2.25rem', h2: '1.875rem', h3: '1.5rem', h4: '1.25rem', h5: '1.125rem', h6: '1rem' },
    fontWeight: { normal: '400', medium: '500', semibold: '600', bold: '700' },
  },
  zIndex: { dropdown: '20', sticky: '30', modal: '50', popover: '40', tooltip: '60' },
  opacity: { subtle: '0.3', medium: '0.6', strong: '0.9' },
}
