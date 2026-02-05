import React, { createContext, useContext, useEffect, useState } from 'react'
import type { DesignSystemTheme } from '@/themes/types'
import { getTheme, defaultTheme } from '@/themes'

interface ThemeContextType {
  theme: DesignSystemTheme
  themeName: string
  setTheme: (name: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultThemeName?: string
}

export function ThemeProvider({ children, defaultThemeName = defaultTheme }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<string>(defaultThemeName)
  const [theme, setTheme] = useState<DesignSystemTheme>(getTheme(defaultThemeName))

  useEffect(() => {
    const newTheme = getTheme(themeName)
    setTheme(newTheme)

    // Apply CSS custom properties for theme colors to work with Tailwind v4
    const root = document.documentElement
    const colors = newTheme.colors

    // Apply gray scale as Tailwind v4 color-* variables
    Object.entries(colors.gray).forEach(([key, value]) => {
      root.style.setProperty(`--color-gray-${key}`, value)
    })

    // Apply semantic colors as Tailwind v4 color-* variables
    root.style.setProperty('--color-background', colors.background)
    root.style.setProperty('--color-surface', colors.surface)
    root.style.setProperty('--color-elevated', colors.elevated)
    root.style.setProperty('--color-text-primary', colors['text-primary'])
    root.style.setProperty('--color-text-muted', colors['text-muted'])
    root.style.setProperty('--color-text-disabled', colors['text-disabled'])
    root.style.setProperty('--color-border-default', colors['border-default'])
    root.style.setProperty('--color-border-subtle', colors['border-subtle'])
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-primary-foreground', colors['primary-foreground'])
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-secondary-foreground', colors['secondary-foreground'])
    root.style.setProperty('--color-accent', colors.accent)
    root.style.setProperty('--color-accent-foreground', colors['accent-foreground'])
    root.style.setProperty('--color-destructive', colors.destructive)
    root.style.setProperty('--color-destructive-foreground', colors['destructive-foreground'])
    root.style.setProperty('--color-success', colors.success)
    root.style.setProperty('--color-warning', colors.warning)

    // Apply other theme properties
    root.style.setProperty('--radius-sm', theme.radius.sm)
    root.style.setProperty('--radius-md', theme.radius.md)
    root.style.setProperty('--radius-lg', theme.radius.lg)
    root.style.setProperty('--radius-xl', theme.radius.xl)
    root.style.setProperty('--radius-full', theme.radius.full)

    // Apply font families
    root.style.setProperty('--font-sans', theme.fontFamily.sans.join(', '))
    root.style.setProperty('--font-mono', theme.fontFamily.mono.join(', '))

    // ===== APPLY VISUAL EFFECT TOKENS (if available) =====
    if (newTheme.glass) {
      const glass = newTheme.glass
      root.style.setProperty('--glass-blur-sm', glass.blur.sm)
      root.style.setProperty('--glass-blur-md', glass.blur.md)
      root.style.setProperty('--glass-blur-lg', glass.blur.lg)
      root.style.setProperty('--glass-blur-xl', glass.blur.xl)
      root.style.setProperty('--glass-saturate', glass.saturate)
      root.style.setProperty('--glass-bg-subtle', glass.bg.subtle)
      root.style.setProperty('--glass-bg-default', glass.bg.default)
      root.style.setProperty('--glass-bg-strong', glass.bg.strong)
      root.style.setProperty('--glass-bg-subtle-dark', glass.bgDark.subtle)
      root.style.setProperty('--glass-bg-default-dark', glass.bgDark.default)
      root.style.setProperty('--glass-bg-strong-dark', glass.bgDark.strong)
      root.style.setProperty('--glass-border-light', glass.border.light)
      root.style.setProperty('--glass-border-highlight', glass.border.highlight)
      root.style.setProperty('--glass-border-dark', glass.border.dark)
      root.style.setProperty('--glass-border-dark-highlight', glass.border.darkHighlight)
      root.style.setProperty('--glass-shadow-sm', glass.shadow.sm)
      root.style.setProperty('--glass-shadow-md', glass.shadow.md)
      root.style.setProperty('--glass-shadow-lg', glass.shadow.lg)
    }

    if (newTheme.gradient) {
      const gradient = newTheme.gradient
      root.style.setProperty('--gradient-primary', gradient.primary)
      root.style.setProperty('--gradient-primary-subtle', gradient.primarySubtle)
      root.style.setProperty('--gradient-accent', gradient.accent)
      root.style.setProperty('--gradient-accent-subtle', gradient.accentSubtle)
      root.style.setProperty('--gradient-neutral', gradient.neutral)
      root.style.setProperty('--gradient-mesh-sunset', gradient.meshSunset)
      root.style.setProperty('--gradient-animated', gradient.animated)
      // Individual gradient colors for components
      root.style.setProperty('--gradient-primary-start', gradient.primaryStart)
      root.style.setProperty('--gradient-primary-end', gradient.primaryEnd)
      root.style.setProperty('--gradient-accent-start', gradient.accentStart)
      root.style.setProperty('--gradient-accent-end', gradient.accentEnd)
    }

    if (newTheme.motion) {
      const motion = newTheme.motion
      // Durations
      root.style.setProperty('--duration-instant', motion.duration.instant)
      root.style.setProperty('--duration-fast', motion.duration.fast)
      root.style.setProperty('--duration-normal', motion.duration.normal)
      root.style.setProperty('--duration-slow', motion.duration.slow)
      root.style.setProperty('--duration-slower', motion.duration.slower)
      // Easing
      root.style.setProperty('--ease-out-expo', motion.easing.outExpo)
      root.style.setProperty('--ease-out-quart', motion.easing.outQuart)
      root.style.setProperty('--ease-spring', motion.easing.spring)
    }

    if (newTheme.typography) {
      const typography = newTheme.typography
      root.style.setProperty('--line-height-tight', typography.lineHeight.tight)
      root.style.setProperty('--line-height-normal', typography.lineHeight.normal)
      root.style.setProperty('--line-height-relaxed', typography.lineHeight.relaxed)
      root.style.setProperty('--letter-spacing-tight', typography.letterSpacing.tight)
      root.style.setProperty('--letter-spacing-normal', typography.letterSpacing.normal)
      root.style.setProperty('--letter-spacing-wide', typography.letterSpacing.wide)
      root.style.setProperty('--font-weight-normal', typography.fontWeight.normal)
      root.style.setProperty('--font-weight-medium', typography.fontWeight.medium)
      root.style.setProperty('--font-weight-semibold', typography.fontWeight.semibold)
      root.style.setProperty('--font-weight-bold', typography.fontWeight.bold)
    }

    if (newTheme.zIndex) {
      const zIndex = newTheme.zIndex
      root.style.setProperty('--z-dropdown', zIndex.dropdown)
      root.style.setProperty('--z-sticky', zIndex.sticky)
      root.style.setProperty('--z-modal', zIndex.modal)
      root.style.setProperty('--z-popover', zIndex.popover)
      root.style.setProperty('--z-tooltip', zIndex.tooltip)
    }

    if (newTheme.opacity) {
      const opacity = newTheme.opacity
      root.style.setProperty('--opacity-subtle', opacity.subtle)
      root.style.setProperty('--opacity-medium', opacity.medium)
      root.style.setProperty('--opacity-strong', opacity.strong)
    }

  }, [themeName])

  const handleSetTheme = (name: string) => {
    setThemeName(name)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeName, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
