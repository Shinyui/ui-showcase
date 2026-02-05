import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import { ThemeSwitcher } from '@/components/showcase/ThemeSwitcher'
import { Separator } from '@/components/ui/separator'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border-default bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Palette className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            UI Theme Showcase
          </span>
        </div>
        <ThemeSwitcher />
      </div>
    </motion.header>
  )
}
