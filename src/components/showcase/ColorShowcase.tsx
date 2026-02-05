import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useTheme } from '@/lib/theme-provider'
import type { ThemeColors } from '@/themes/types'

interface ColorSwatchProps {
  name: string
  value: string
  showName?: boolean
}

function ColorSwatch({ name, value, showName = true }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      className="group relative flex flex-col items-center gap-2"
      onClick={handleCopy}
      type="button"
    >
      <div
        className="h-16 w-full rounded-lg border border-border-default shadow-sm transition-transform group-hover:scale-105 group-hover:shadow-md"
        style={{ backgroundColor: value }}
      />
      <div className="flex items-center gap-1">
        {copied ? (
          <Check className="h-3 w-3 text-success" />
        ) : (
          <Copy className="h-3 w-3 text-text-muted opacity-0 transition-opacity group-hover:opacity-50" />
        )}
        {showName && (
          <span className="text-xs text-text-muted">
            {name}
          </span>
        )}
      </div>
      <span className="text-[10px] font-mono text-text-muted">
        {value}
      </span>
    </button>
  )
}

export function ColorShowcase() {
  const { theme } = useTheme()
  const colors = theme.colors

  return (
    <div className="space-y-8">
      {/* Gray Scale */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Gray Scale</h3>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
          {Object.entries(colors.gray).map(([key, value]) => (
            <ColorSwatch key={key} name={key} value={value} />
          ))}
        </div>
      </div>

      {/* Semantic Colors */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Semantic Colors</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ColorSwatch name="background" value={colors.background} />
          <ColorSwatch name="surface" value={colors.surface} />
          <ColorSwatch name="elevated" value={colors.elevated} />
          <ColorSwatch name="text-primary" value={colors['text-primary']} />
          <ColorSwatch name="text-muted" value={colors['text-muted']} />
          <ColorSwatch name="text-disabled" value={colors['text-disabled']} />
          <ColorSwatch name="border-default" value={colors['border-default']} />
          <ColorSwatch name="border-subtle" value={colors['border-subtle']} />
        </div>
      </div>

      {/* Brand Colors */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <ColorSwatch name="primary" value={colors.primary} />
          <ColorSwatch name="primary-fg" value={colors['primary-foreground']} />
          <ColorSwatch name="secondary" value={colors.secondary} />
          <ColorSwatch name="secondary-fg" value={colors['secondary-foreground']} />
          <ColorSwatch name="accent" value={colors.accent} />
          <ColorSwatch name="accent-fg" value={colors['accent-foreground']} />
        </div>
      </div>

      {/* Status Colors */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Status Colors</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <ColorSwatch name="destructive" value={colors.destructive} />
          <ColorSwatch name="destructive-fg" value={colors['destructive-foreground']} />
          <ColorSwatch name="success" value={colors.success} />
          <ColorSwatch name="warning" value={colors.warning} />
        </div>
      </div>

      {/* Usage Tip */}
      <div className="rounded-lg bg-elevated border border-border-subtle p-4">
        <p className="text-sm text-text-muted">
          <span className="font-semibold text-text-primary">💡 Tip:</span> Click any color swatch to copy its hex value. Colors automatically update when you switch themes.
        </p>
      </div>
    </div>
  )
}
