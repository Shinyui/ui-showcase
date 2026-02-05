# Peek UI - Design Token Showcase

A comprehensive design system showcase built with React 19, TypeScript, Tailwind CSS v4, and Framer Motion. Features 7 beautiful themes, glassmorphism effects, animated gradients, and 50+ UI components.

## Features

### 🎨 Visual Effects
- **Glassmorphism**: Beautiful glass-effect components with blur and transparency
- **Gradients**: Eye-catching gradient effects for text, backgrounds, and buttons
- **Animations**: Spring-based animations with Framer Motion
- **Motion**: Micro-interactions, page transitions, and stagger animations

### 🎭 Themes (7 Available)
1. **Grayscale** - Default monochromatic theme
2. **Blue** - Professional blue primary color
3. **Green** - Nature/growth focused
4. **Purple** - Creative/vibrant
5. **Orange** - Warm/energetic
6. **Rose** - Elegant/soft
7. **Slate** - Neutral professional

### 🧩 Components (50+)

#### Base Components
- Button (with gradient, glass, glow, shimmer variants)
- Icon Button
- Link
- Spinner (default, dots, pulse, bars variants)
- Skeleton (text, avatar, card, list, table variants)

#### Form Components
- Form Layout, Form Field, Form Actions
- Helper Text, Error Message
- Dropdown, Radio Group
- Date Picker, Time Picker
- File Upload with drag-drop
- Search Input with debouncing
- OTP/PIN Input

#### Navigation Components
- App Bar, Sidebar
- Breadcrumb, Pagination
- Stepper, Bottom Navigation
- Anchor Link

#### Feedback & Overlay Components
- Alert (with glass variant)
- Toast (with provider)
- Popover, Sheet
- Loading Overlay
- Empty, Error, Success States

#### Data Display Components
- List, Table, Data Grid
- Accordion (with spring animation)
- Tree View
- Statistic (with counting animation)
- Progress Bar, Progress Circle
- Timeline
- Chart Container

#### Layout Components
- Page Layout, Page Header
- Section, Container
- Grid, Stack
- Responsive Wrapper

#### Pattern Components
- Form Pattern (with validation)
- CRUD Pattern
- Search & Filter Pattern
- Bulk Action Pattern
- Access Denied
- First-time Use (Onboarding)
- Loading, Error Patterns

#### Visual Effect Components
- Glass Card, Glass Panel, Glass Badge
- Gradient Text, Gradient BG
- Animated Gradient
- Gradient Border, Gradient Button

## Installation

```bash
cd peek-ui
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the showcase.

## Build

```bash
npm run build
```

## Project Structure

```
peek-ui/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   ├── showcase/        # Showcase-specific components
│   │   ├── ui/              # UI components (50+)
│   │   └── patterns/        # Pattern components
│   ├── lib/                 # Utilities (animations, glass, gradients)
│   ├── pages/               # Page components
│   ├── themes/              # Theme definitions (7 themes)
│   ├── App.tsx              # Main app component
│   ├── index.css            # Global styles with design tokens
│   └── main.tsx             # Entry point
```

## Design Tokens

### Glassmorphism Tokens
- Blur levels: sm (8px), md (16px), lg (24px), xl (32px)
- Background opacity: subtle, default, strong
- Border colors: light, highlight, dark, darkHighlight
- Shadows: sm, md, lg

### Gradient Tokens
- Primary gradient
- Accent gradient
- Neutral gradient
- Mesh sunset gradient
- Animated gradient

### Motion Tokens
- Spring presets: snappy, gentle, bouncy, stiff, heavy
- Duration presets: instant (100ms), fast (200ms), normal (300ms), slow (500ms), slower (800ms)
- Easing presets: outExpo, outQuart, inOut, spring
- Stagger patterns for lists

### Typography Tokens
- Line height: tight, normal, relaxed
- Letter spacing: tight, normal, wide
- Font weights: normal, medium, semibold, bold

## Usage Examples

### Glass Card Component

```tsx
import { GlassCard } from '@/components/ui/glass-card'

function MyComponent() {
  return (
    <GlassCard variant="default" title="My Card">
      <p>Card content with glass effect</p>
    </GlassCard>
  )
}
```

### Gradient Text Component

```tsx
import { GradientText } from '@/components/ui/gradient-text'

function MyComponent() {
  return (
    <GradientText variant="primary" weight="bold">
      Beautiful Gradient Text
    </GradientText>
  )
}
```

### Animation Presets

```tsx
import { motion, springPresets } from '@/lib/animations'

function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springPresets.gentle}
    >
      Animated content
    </motion.div>
  )
}
```

## Theme Switching

```tsx
import { useTheme } from '@/lib/theme-provider'

function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme()

  return (
    <select value={themeName} onChange={(e) => setTheme(e.target.value)}>
      <option value="grayscale">Grayscale</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="purple">Purple</option>
      <option value="orange">Orange</option>
      <option value="rose">Rose</option>
      <option value="slate">Slate</option>
    </select>
  )
}
```

## Accessibility

- All components follow WAI-ARIA best practices
- Keyboard navigation support
- Focus indicators
- Screen reader support
- Reduced motion support via `prefers-reduced-motion`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Credits

Built with:
- React 19.2.0
- TypeScript 5.8.2
- Tailwind CSS v4.1.18
- Framer Motion 12.31.0
- Radix UI components

