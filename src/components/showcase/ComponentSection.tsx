import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ComponentSectionProps {
  title: string
  description?: string
  children: ReactNode
  delay?: number
}

export function ComponentSection({
  title,
  description,
  children,
  delay = 0,
}: ComponentSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.3, delay, ease: [0, 0, 0.2, 1] }}
      className="mb-16"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-text-muted">{description}</p>
        )}
      </div>
      <div className="rounded-lg border border-border-default bg-surface p-8">
        {children}
      </div>
    </motion.section>
  )
}
