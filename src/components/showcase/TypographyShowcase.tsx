import { useTheme } from '@/lib/theme-provider'

interface TypographyItemProps {
  label: string
  value: string
  children: React.ReactNode
}

function TypographyItem({ label, value, children }: TypographyItemProps) {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-mono text-text-muted">{label}</span>
        <span className="text-[10px] font-mono text-text-disabled">{value}</span>
      </div>
    </div>
  )
}

export function TypographyShowcase() {
  const { theme } = useTheme()

  const typography = theme.typography
  const fontSize = theme.fontSize
  const fontFamily = theme.fontFamily

  return (
    <div className="space-y-8">
      {/* Heading Scale */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Heading Scale</h3>
        <div className="space-y-3">
          <TypographyItem
            label="H1"
            value={typography?.headingScale?.h1 || '2.625rem'}
          >
            <h1 className="font-bold text-text-primary" style={{ fontSize: typography?.headingScale?.h1 }}>
              Heading 1
            </h1>
          </TypographyItem>
          <TypographyItem
            label="H2"
            value={typography?.headingScale?.h2 || '2.125rem'}
          >
            <h2 className="font-bold text-text-primary" style={{ fontSize: typography?.headingScale?.h2 }}>
              Heading 2
            </h2>
          </TypographyItem>
          <TypographyItem
            label="H3"
            value={typography?.headingScale?.h3 || '1.75rem'}
          >
            <h3 className="font-bold text-text-primary" style={{ fontSize: typography?.headingScale?.h3 }}>
              Heading 3
            </h3>
          </TypographyItem>
          <TypographyItem
            label="H4"
            value={typography?.headingScale?.h4 || '1.375rem'}
          >
            <h4 className="font-semibold text-text-primary" style={{ fontSize: typography?.headingScale?.h4 }}>
              Heading 4
            </h4>
          </TypographyItem>
          <TypographyItem
            label="H5"
            value={typography?.headingScale?.h5 || '1.1875rem'}
          >
            <h5 className="font-semibold text-text-primary" style={{ fontSize: typography?.headingScale?.h5 }}>
              Heading 5
            </h5>
          </TypographyItem>
          <TypographyItem
            label="H6"
            value={typography?.headingScale?.h6 || '1.0625rem'}
          >
            <h6 className="font-medium text-text-primary" style={{ fontSize: typography?.headingScale?.h6 }}>
              Heading 6
            </h6>
          </TypographyItem>
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Font Weight</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <TypographyItem
            label="Normal"
            value={typography?.fontWeight?.normal || '400'}
          >
            <p style={{ fontWeight: typography?.fontWeight?.normal || 400 }} className="text-text-primary">
              The quick brown fox jumps over the lazy dog.
            </p>
          </TypographyItem>
          <TypographyItem
            label="Medium"
            value={typography?.fontWeight?.medium || '500'}
          >
            <p style={{ fontWeight: typography?.fontWeight?.medium || 500 }} className="text-text-primary">
              The quick brown fox jumps over the lazy dog.
            </p>
          </TypographyItem>
          <TypographyItem
            label="Semibold"
            value={typography?.fontWeight?.semibold || '600'}
          >
            <p style={{ fontWeight: typography?.fontWeight?.semibold || 600 }} className="text-text-primary">
              The quick brown fox jumps over the lazy dog.
            </p>
          </TypographyItem>
          <TypographyItem
            label="Bold"
            value={typography?.fontWeight?.bold || '700'}
          >
            <p style={{ fontWeight: typography?.fontWeight?.bold || 700 }} className="text-text-primary">
              The quick brown fox jumps over the lazy dog.
            </p>
          </TypographyItem>
        </div>
      </div>

      {/* Font Size */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Font Size</h3>
        <div className="space-y-2">
          <TypographyItem label="xs" value={fontSize.xs}>
            <p className="text-text-primary" style={{ fontSize: fontSize.xs }}>
              Extra Small Text
            </p>
          </TypographyItem>
          <TypographyItem label="sm" value={fontSize.sm}>
            <p className="text-text-primary" style={{ fontSize: fontSize.sm }}>
              Small Text
            </p>
          </TypographyItem>
          <TypographyItem label="base" value={fontSize.base}>
            <p className="text-text-primary" style={{ fontSize: fontSize.base }}>
              Base Text
            </p>
          </TypographyItem>
          <TypographyItem label="lg" value={fontSize.lg}>
            <p className="text-text-primary" style={{ fontSize: fontSize.lg }}>
              Large Text
            </p>
          </TypographyItem>
          <TypographyItem label="xl" value={fontSize.xl}>
            <p className="text-text-primary" style={{ fontSize: fontSize.xl }}>
              Extra Large Text
            </p>
          </TypographyItem>
          <TypographyItem label="2xl" value={fontSize['2xl']}>
            <p className="text-text-primary" style={{ fontSize: fontSize['2xl'] }}>
              2X Large Text
            </p>
          </TypographyItem>
          <TypographyItem label="3xl" value={fontSize['3xl']}>
            <p className="text-text-primary" style={{ fontSize: fontSize['3xl'] }}>
              3X Large Text
            </p>
          </TypographyItem>
          <TypographyItem label="4xl" value={fontSize['4xl']}>
            <p className="text-text-primary" style={{ fontSize: fontSize['4xl'] }}>
              4X Large Text
            </p>
          </TypographyItem>
        </div>
      </div>

      {/* Line Height */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Line Height</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-elevated border border-border-subtle p-3">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-xs font-mono font-semibold text-text-primary">Tight</span>
              <span className="text-[10px] font-mono text-text-muted">
                {typography?.lineHeight?.tight || '1.2'}
              </span>
            </div>
            <p
              className="text-sm text-text-primary"
              style={{ lineHeight: typography?.lineHeight?.tight || '1.2' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="rounded-lg bg-elevated border border-border-subtle p-3">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-xs font-mono font-semibold text-text-primary">Normal</span>
              <span className="text-[10px] font-mono text-text-muted">
                {typography?.lineHeight?.normal || '1.5'}
              </span>
            </div>
            <p
              className="text-sm text-text-primary"
              style={{ lineHeight: typography?.lineHeight?.normal || '1.5' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="rounded-lg bg-elevated border border-border-subtle p-3">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-xs font-mono font-semibold text-text-primary">Relaxed</span>
              <span className="text-[10px] font-mono text-text-muted">
                {typography?.lineHeight?.relaxed || '1.75'}
              </span>
            </div>
            <p
              className="text-sm text-text-primary"
              style={{ lineHeight: typography?.lineHeight?.relaxed || '1.75' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Letter Spacing */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Letter Spacing</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <TypographyItem
            label="Tight"
            value={typography?.letterSpacing?.tight || '-0.02em'}
          >
            <p
              className="text-sm font-semibold uppercase text-text-primary"
              style={{ letterSpacing: typography?.letterSpacing?.tight || '-0.02em' }}
            >
              TIGHT SPACING
            </p>
          </TypographyItem>
          <TypographyItem
            label="Normal"
            value={typography?.letterSpacing?.normal || '0.01em'}
          >
            <p
              className="text-sm font-semibold uppercase text-text-primary"
              style={{ letterSpacing: typography?.letterSpacing?.normal || '0.01em' }}
            >
              NORMAL SPACING
            </p>
          </TypographyItem>
          <TypographyItem
            label="Wide"
            value={typography?.letterSpacing?.wide || '0.04em'}
          >
            <p
              className="text-sm font-semibold uppercase text-text-primary"
              style={{ letterSpacing: typography?.letterSpacing?.wide || '0.04em' }}
            >
              WIDE SPACING
            </p>
          </TypographyItem>
        </div>
      </div>

      {/* Font Family */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-text-primary">Font Family</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-elevated border border-border-subtle p-4">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-xs font-mono font-semibold text-text-primary">Sans</span>
            </div>
            <p
              className="text-lg text-text-primary"
              style={{ fontFamily: fontFamily.sans.join(', ') }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="mt-2 text-[10px] font-mono text-text-muted">
              {fontFamily.sans.join(', ')}
            </p>
          </div>
          <div className="rounded-lg bg-elevated border border-border-subtle p-4">
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-xs font-mono font-semibold text-text-primary">Mono</span>
            </div>
            <p
              className="text-lg text-text-primary"
              style={{ fontFamily: fontFamily.mono.join(', ') }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="mt-2 text-[10px] font-mono text-text-muted">
              {fontFamily.mono.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Usage Tip */}
      <div className="rounded-lg bg-elevated border border-border-subtle p-4">
        <p className="text-sm text-text-muted">
          <span className="font-semibold text-text-primary">💡 Tip:</span> Typography values are defined per theme. Switch themes to see how different typography scales affect the visual hierarchy.
        </p>
      </div>
    </div>
  )
}
