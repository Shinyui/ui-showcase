import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Shield, Palette, Info, MousePointer2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ===== GLASS CARD COMPONENT =====
interface GlassCardProps {
  variant?: 'subtle' | 'default' | 'strong' | 'liquid'
  hover?: 'none' | 'lift' | 'glow' | 'premium'
  title?: string
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

function GlassCard({
  variant = 'default',
  hover = 'none',
  title,
  description,
  icon,
  children,
  className
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const variantStyles = {
    subtle: 'backdrop-blur-sm bg-white/10 dark:bg-white/5 border border-white/20',
    default: 'backdrop-blur-md bg-white/15 dark:bg-white/10 border border-white/20 border-t border-l border-white/30',
    strong: 'backdrop-blur-lg bg-white/20 dark:bg-white/15 border border-white/30 shadow-glass-strong',
    liquid: 'backdrop-blur-xl bg-white/12 dark:bg-white/8 border border-white/25 border-t border-l border-white/40 shadow-glass-liquid',
  }

  const hoverStyles = {
    none: '',
    lift: 'hover:-translate-y-1 transition-all duration-300 ease-out',
    glow: 'hover:shadow-glass-glow hover:scale-[1.02] hover:border-white/40 transition-all duration-300 ease-out',
    premium: 'hover:shadow-glass-premium hover:scale-[1.03] hover:border-white/50 transition-all duration-300 ease-out',
  }

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6',
        variantStyles[variant],
        hoverStyles[hover],
        'cursor-pointer',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover === 'lift' ? { y: -4 } : hover === 'glow' ? { scale: 1.02 } : hover === 'premium' ? { scale: 1.03 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Light reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className={cn(
            'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
            'bg-gradient-to-br from-white/25 to-white/10',
            'border border-white/30',
            'transition-all duration-300',
            isHovered && 'scale-110 rotate-3'
          )}>
            {icon}
          </div>
        )}
        {title && (
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            {description}
          </p>
        )}
        {children}
      </div>

      {/* Glow effect on hover */}
      {hover === 'glow' || hover === 'premium' ? (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.15), transparent 50%)',
          }}
        />
      ) : null}
    </motion.div>
  )
}

// ===== DECORATIVE BACKGROUND ORB =====
function DecorativeOrb({ className, delay = 0, style }: { className?: string, delay?: number, style?: React.CSSProperties }) {
  return (
    <motion.div
      className={cn('absolute rounded-full blur-3xl', className)}
      style={style}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1, delay }}
    />
  )
}

// ===== MAIN SHOWCASE COMPONENT =====
export function GlassmorphismShowcase() {
  return (
    <div className="w-full">
      {/* Background with gradient and decorative elements */}
      <div className="relative min-h-[800px] rounded-3xl overflow-hidden border border-white/10">
        {/* Gradient background - uses theme gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'var(--gradient-mesh-sunset)' }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Decorative orbs - uses theme colors */}
        <DecorativeOrb
          className="w-96 h-96 -top-48 -left-48"
          style={{ background: 'var(--color-primary)', opacity: 0.4 }}
          delay={0.2}
        />
        <DecorativeOrb
          className="w-80 h-80 top-20 -right-40"
          style={{ background: 'var(--color-secondary)', opacity: 0.35 }}
          delay={0.4}
        />
        <DecorativeOrb
          className="w-72 h-72 bottom-20 left-1/4"
          style={{ background: 'var(--color-accent)', opacity: 0.25 }}
          delay={0.6}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2"
            >
              <Sparkles className="h-4 w-4" style={{ color: 'var(--color-text-muted)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Liquid Glass Effects
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Glassmorphism Showcase
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              Premium liquid glass cards with enhanced blur, light reflections, and hover glow effects.
              The glass effect adapts to each theme's unique color palette.
            </p>
          </div>

          {/* Glass Variant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard
              variant="subtle"
              title="Subtle Glass"
              description="Light glassmorphism with minimal blur and transparency."
              icon={<Palette className="h-6 w-6" style={{ color: 'var(--color-text-primary)' }} />}
            >
              <div className="text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                <div className="flex justify-between">
                  <span>Blur:</span>
                  <span className="font-mono">12px</span>
                </div>
                <div className="flex justify-between">
                  <span>Opacity:</span>
                  <span className="font-mono">10%</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              variant="default"
              title="Default Glass"
              description="Balanced glass effect with standard blur and light border highlights."
              icon={<Shield className="h-6 w-6" style={{ color: 'var(--color-text-primary)' }} />}
            >
              <div className="text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                <div className="flex justify-between">
                  <span>Blur:</span>
                  <span className="font-mono">20px</span>
                </div>
                <div className="flex justify-between">
                  <span>Opacity:</span>
                  <span className="font-mono">15%</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              variant="strong"
              title="Strong Glass"
              description="Heavy glassmorphism with maximum blur and opacity."
              icon={<Zap className="h-6 w-6" style={{ color: 'var(--color-text-primary)' }} />}
            >
              <div className="text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                <div className="flex justify-between">
                  <span>Blur:</span>
                  <span className="font-mono">28px</span>
                </div>
                <div className="flex justify-between">
                  <span>Opacity:</span>
                  <span className="font-mono">20%</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              variant="liquid"
              hover="premium"
              title="Liquid Glass"
              description="Premium liquid glass with enhanced hover glow effect."
              icon={<Sparkles className="h-6 w-6" style={{ color: 'var(--color-text-primary)' }} />}
            >
              <div className="text-xs space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                <div className="flex justify-between">
                  <span>Blur:</span>
                  <span className="font-mono">36px</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturate:</span>
                  <span className="font-mono" style={{ content: 'var(--glass-saturate)' }}>200%</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Hover Effects Section */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <MousePointer2 className="h-5 w-5" style={{ color: 'var(--color-text-muted)' }} />
              <h3 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Hover Effects
              </h3>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Try hovering over the cards below to see different interaction effects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard
                variant="default"
                hover="lift"
                title="Lift Effect"
                description="Card lifts up on hover with smooth vertical transition."
                icon={<Info className="h-6 w-6" style={{ color: 'var(--color-text-primary)' }} />}
              />

              <GlassCard
                variant="liquid"
                hover="glow"
                title="Glow Effect"
                description="Soft glow appears around card edges on hover."
                icon={<Sparkles className="h-6 w-6 text-white/80" />}
              />

              <GlassCard
                variant="liquid"
                hover="premium"
                title="Premium Glow"
                description="Enhanced glow with scale transform and brighter borders."
                icon={<Zap className="h-6 w-6 text-white/80" />}
              />
            </div>
          </div>

          {/* Design Specs */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              Design Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Blur Levels</h4>
                <ul className="space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                  <li>Subtle: 12px</li>
                  <li>Default: 20px</li>
                  <li>Strong: 28px</li>
                  <li>Liquid: 36px</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Background</h4>
                <ul className="space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                  <li>Subtle: bg-white/10</li>
                  <li>Default: bg-white/15</li>
                  <li>Strong: bg-white/20</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Border Colors</h4>
                <ul className="space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                  <li>Base: border-white/20</li>
                  <li>Highlight: border-white/30</li>
                  <li>Glow: border-white/40</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>Animation</h4>
                <ul className="space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                  <li>Duration: 150-300ms</li>
                  <li>Easing: ease-out</li>
                  <li>Theme-based colors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
