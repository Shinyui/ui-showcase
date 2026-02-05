import { motion } from 'framer-motion'
import { ComponentSection } from '@/components/showcase/ComponentSection'
import { GradientText } from '@/components/ui/gradient-text'
import { GradientBg } from '@/components/ui/gradient-bg'
import { AnimatedGradient } from '@/components/ui/animated-gradient'
import { GlassmorphismShowcase } from '@/components/showcase/GlassmorphismShowcase'
import { ColorShowcase } from '@/components/showcase/ColorShowcase'
import { TypographyShowcase } from '@/components/showcase/TypographyShowcase'

export function ComponentsShowcase() {

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className="container mx-auto max-w-6xl px-4 py-16 md:py-24"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center rounded-full border border-border-default bg-surface px-4 py-1.5"
          >
            <span className="text-sm text-text-muted">
              Design System Showcase
            </span>
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary md:text-6xl">
            UI Theme Showcase
          </h1>
          <p className="text-lg text-text-muted md:text-xl">
            A premium design system featuring 4 themes with liquid glass
            effects, animated gradients, and beautiful visual components.
          </p>
        </div>
      </motion.section>

      {/* Components Showcase */}
      <div className="container mx-auto max-w-6xl px-4 pb-16">
        {/* ===== DESIGN TOKENS ===== */}
        <ComponentSection
          title="Color Palette"
          description="Complete color system for the design theme."
        >
          <ColorShowcase />
        </ComponentSection>

        <ComponentSection
          title="Typography"
          description="Typography scale and font styles."
          delay={0.05}
        >
          <TypographyShowcase />
        </ComponentSection>

        {/* ===== VISUAL EFFECTS SECTION ===== */}
        <ComponentSection
          title="Glassmorphism Effects"
          description="Beautiful glass-effect components with blur and transparency."
          delay={0.07}
        >
          <GlassmorphismShowcase />
        </ComponentSection>

        <ComponentSection
          title="Gradient Effects"
          description="Theme-responsive gradients that automatically adapt to each theme's unique color palette. Try switching themes to see how gradients transform!"
          delay={0.08}
        >
          <div className="space-y-8">
            {/* Gradient Text - Theme-adaptive */}
            <div>
              <p className="text-sm text-text-muted mb-4">Gradient Text (uses theme primary & accent gradients)</p>
              <div className="flex flex-wrap gap-6">
                <GradientText variant="primary" weight="bold" className="text-2xl">
                  Primary Gradient
                </GradientText>
                <GradientText variant="accent" weight="bold" className="text-2xl">
                  Accent Gradient
                </GradientText>
                <GradientText variant="subtle" weight="bold" className="text-2xl">
                  Subtle Gradient
                </GradientText>
              </div>
            </div>

            {/* Gradient Backgrounds - Theme-adaptive */}
            <div>
              <p className="text-sm text-text-muted mb-4">Gradient Backgrounds (each uses a different theme gradient)</p>
              <div className="grid gap-4 md:grid-cols-3">
                <GradientBg variant="primary" className="h-32 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-lg drop-shadow-lg">Primary</span>
                </GradientBg>
                <GradientBg variant="accent" className="h-32 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-lg drop-shadow-lg">Accent</span>
                </GradientBg>
                <GradientBg variant="mesh" className="h-32 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-lg drop-shadow-lg">Mesh</span>
                </GradientBg>
              </div>
            </div>

            {/* Animated Gradient - Theme-adaptive */}
            <div>
              <p className="text-sm text-text-muted mb-4">Animated Gradient (uses theme's animated gradient palette)</p>
              <div className="rounded-lg overflow-hidden">
                <AnimatedGradient variant="flow" className="h-40 flex items-center justify-center">
                  <span className="text-white font-bold text-xl drop-shadow-lg">Animated Flow Gradient</span>
                </AnimatedGradient>
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-lg bg-surface border border-border-default p-4">
              <p className="text-sm text-text-muted">
                💡 <strong>Tip:</strong> Each theme defines its own unique gradient colors. Switch themes using the dropdown above to see how
                the <GradientText variant="primary" weight="semibold"> primary gradient</GradientText>,
                <GradientText variant="accent" weight="semibold"> accent gradient</GradientText>, and
                <GradientText variant="primary" weight="semibold"> animated effects</GradientText> transform!
              </p>
            </div>
          </div>
        </ComponentSection>
      </div>
    </div>
  )
}
