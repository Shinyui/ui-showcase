import type { DesignSystemTheme } from './types'
import { slateTheme } from './slate-theme'
import { midnightVelvetTheme } from './midnight-velvet-theme'
import { neonIntimacyTheme } from './neon-intimacy-theme'
import { roseWhisperTheme } from './rose-whisper-theme'
import { darkDesireTheme } from './dark-desire-theme'
import { sultrySunsetTheme } from './sultry-sunset-theme'
import { etherealSilkTheme } from './ethereal-silk-theme'
import { noirSeductionTheme } from './noir-seduction-theme'
import { velvetNightTheme } from './velvet-night-theme'

// UI Theme Showcase - Design Token Themes
export const themes: Record<string, DesignSystemTheme> = {
  slate: slateTheme,
  'midnight-velvet': midnightVelvetTheme,
  'neon-intimacy': neonIntimacyTheme,
  'rose-whisper': roseWhisperTheme,
  'dark-desire': darkDesireTheme,
  'sultry-sunset': sultrySunsetTheme,
  'ethereal-silk': etherealSilkTheme,
  'noir-seduction': noirSeductionTheme,
  'velvet-night': velvetNightTheme,
}

export const defaultTheme = 'midnight-velvet'

export function getTheme(name: string): DesignSystemTheme {
  return themes[name] || themes[defaultTheme]
}

export function getAllThemes(): DesignSystemTheme[] {
  return Object.values(themes)
}
