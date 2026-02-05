import type { Transition, Variants } from 'framer-motion'

// ===== SPRING PRESETS =====
export const springPresets = {
  snappy: { type: 'spring' as const, stiffness: 300, damping: 25, mass: 0.8 },
  gentle: { type: 'spring' as const, stiffness: 150, damping: 20, mass: 1 },
  bouncy: { type: 'spring' as const, stiffness: 100, damping: 10, mass: 1 },
  stiff: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 0.5 },
  heavy: { type: 'spring' as const, stiffness: 80, damping: 25, mass: 1.5 },
} as const

// ===== DURATION PRESETS =====
export const durationPresets = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const

// ===== EASING PRESETS =====
export const easingPresets = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const

// ===== STAGGER PATTERNS =====
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}

// ===== PAGE TRANSITIONS =====
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } },
}

// ===== MICRO-INTERACTION VARIANTS =====
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 17 } },
  tap: { scale: 0.95 },
}

export const buttonVariants: Variants = {
  rest: { scale: 1, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
  hover: {
    scale: 1.02,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
  tap: { scale: 0.98 },
}

export const cardVariants: Variants = {
  offscreen: { y: 20, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20 },
}

export const scaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  exit: { scale: 0.8, opacity: 0 },
}

export const slideInLeft: Variants = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  exit: { x: -50, opacity: 0 },
}

export const slideInRight: Variants = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  exit: { x: 50, opacity: 0 },
}

// ===== MODAL TRANSITIONS =====
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const modalContent: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
}

// ===== DRAWER/SHEET TRANSITIONS =====
export const drawerOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

export const drawerContent: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
}

// ===== LIST VARIANTS =====
export const listContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

export const listItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300 },
  },
}

// ===== ACCORDION VARIANTS =====
export const accordionContent: Variants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
}

export const accordionIcon: Variants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

// ===== TOAST NOTIFICATION VARIANTS =====
export const toastVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

// ===== TAB VARIANTS =====
export const tabContent: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, x: -10 },
}

// ===== COMMON TRANSITION CONFIG =====
export const commonTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
}

export const fastTransition: Transition = {
  duration: 0.15,
}

export const slowTransition: Transition = {
  duration: 0.5,
}

// ===== UTILITY FUNCTIONS =====
/**
 * Get a spring preset by name
 */
export function getSpringPreset(name: keyof typeof springPresets) {
  return springPresets[name]
}

/**
 * Get a duration preset by name
 */
export function getDuration(name: keyof typeof durationPresets) {
  return durationPresets[name]
}

/**
 * Create a custom spring animation
 */
export function createSpring(
  stiffness: number = 200,
  damping: number = 25,
  mass: number = 1
) {
  return { type: 'spring' as const, stiffness, damping, mass }
}

/**
 * Create a custom tween animation
 */
export function createTween(
  duration: number = 0.3,
  ease: number[] = [0.4, 0, 0.2, 1]
) {
  return { type: 'tween' as const, duration, ease }
}
