import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  Star,
  Search,
  Download,
  ExternalLink,
  Heart,
  Settings,
  Menu,
  Folder,
  File,
  Image,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ComponentSection } from '@/components/showcase/ComponentSection'
// New visual effects components
import { GradientText } from '@/components/ui/gradient-text'
import { GradientBg } from '@/components/ui/gradient-bg'
import { AnimatedGradient } from '@/components/ui/animated-gradient'
import { Spinner, DotsSpinner } from '@/components/ui/spinner'
import { SkeletonCard } from '@/components/ui/skeleton'
import { SearchInput } from '@/components/ui/search-input'
import { OtpInput } from '@/components/ui/otp-input'
import { ProgressBar, ProgressCircle } from '@/components/ui/progress-bar'
import { Statistic } from '@/components/ui/statistic'
import { EmptyState } from '@/components/ui/empty-state'
import { ErrorState } from '@/components/ui/error-state'
import { SuccessState } from '@/components/ui/success-state'
import { Accordion } from '@/components/ui/accordion'
import { Pagination } from '@/components/ui/pagination'
import { GlassmorphismShowcase } from '@/components/showcase/GlassmorphismShowcase'
import { ColorShowcase } from '@/components/showcase/ColorShowcase'
import { TypographyShowcase } from '@/components/showcase/TypographyShowcase'

// Additional UI components
import { Show, Hide } from '@/components/ui/responsive-wrapper'
import { FormLayout, FormField, FormActions, FormRow } from '@/components/ui/form-layout'
import { TimePicker } from '@/components/ui/time-picker'
import { Link } from '@/components/ui/link'
import { ChartContainer, ChartLegend } from '@/components/ui/chart-container'
import { Popover } from '@/components/ui/popover'
import { RadioGroup } from '@/components/ui/radio'
import { HelperText } from '@/components/ui/helper-text'
import { Sheet, SheetHeader, SheetBody, SheetFooter } from '@/components/ui/sheet'
import { Tree } from '@/components/ui/tree'
import { Dropdown } from '@/components/ui/dropdown'
import { FileUpload } from '@/components/ui/file-upload'
import { Table } from '@/components/ui/table'
import { DataGrid, DataGridItem } from '@/components/ui/data-grid'
import { AppBar } from '@/components/ui/app-bar'

// Pattern components
import { FirstTimeUse } from '@/components/patterns/first-time-use'
import { ErrorPattern } from '@/components/patterns/error-pattern'
import { SearchFilterPattern } from '@/components/patterns/search-filter-pattern'
import { FormPattern } from '@/components/patterns/form-pattern'
import { AccessDenied } from '@/components/patterns/access-denied'
import { BulkActionPattern } from '@/components/patterns/bulk-action-pattern'
import { LoadingPattern } from '@/components/patterns/loading-pattern'
import { CRUDPattern } from '@/components/patterns/crud-pattern'

export function ComponentsShowcase() {
  const [sliderValue, setSliderValue] = useState([50])
  const [switches, setSwitches] = useState({
    notifications: true,
    autoSave: false,
    darkMode: true,
  })
  const [checkboxes, setCheckboxes] = useState({
    terms: false,
    newsletter: true,
    updates: false,
  })

  // Additional state for new components
  const [radioValue, setRadioValue] = useState('option1')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [treeSelectedId, setTreeSelectedId] = useState('1')
  const [timePickerValue, setTimePickerValue] = useState<Date | undefined>(new Date())

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

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
              UI Theme Showcase - Design Token Showcase
            </span>
          </motion.div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary md:text-6xl">
            UI Theme Showcase
          </h1>
          <p className="text-lg text-text-muted md:text-xl">
            A premium design system featuring 4 themes with liquid glass
            effects, animated gradients, and 50+ beautiful components.
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

        <ComponentSection
          title="Buttons"
          description="A variety of button styles and sizes for different actions."
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="primary">
              <Download className="h-4 w-4" />
              Primary
            </Button>
            <Button variant="secondary">
              <Star className="h-4 w-4" />
              Secondary
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">
              <ExternalLink className="h-4 w-4" />
              Destructive
            </Button>
          </motion.div>
          <Separator className="my-6" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button disabled>Disabled</Button>
          </motion.div>
        </ComponentSection>

        <ComponentSection
          title="Cards"
          description="Content containers with various layout options."
          delay={0.1}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  A brief description of the card content goes here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-muted">
                  Cards are versatile containers that can hold any type of
                  content.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Feature Card</CardTitle>
                  <Badge>Pro</Badge>
                </div>
                <CardDescription>
                  Showcasing badges and custom layouts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Check className="h-4 w-4 text-success" />
                    <span>Feature one</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Check className="h-4 w-4 text-success" />
                    <span>Feature two</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Check className="h-4 w-4 text-success" />
                    <span>Feature three</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">2,847</div>
                  <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Badge variant="success">+12.5%</Badge>
                    <span>from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ComponentSection>

        <ComponentSection
          title="Form Elements"
          description="Input fields and labels for data entry."
          delay={0.2}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </ComponentSection>

        <ComponentSection
          title="Interactive Controls"
          description="Checkboxes, switches, and sliders for user input."
          delay={0.3}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">Checkboxes</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="terms"
                    checked={checkboxes.terms}
                    onCheckedChange={(checked) =>
                      setCheckboxes({ ...checkboxes, terms: checked as boolean })
                    }
                  />
                  <Label htmlFor="terms" className="cursor-pointer">
                    I agree to the terms and conditions
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="newsletter"
                    checked={checkboxes.newsletter}
                    onCheckedChange={(checked) =>
                      setCheckboxes({ ...checkboxes, newsletter: checked as boolean })
                    }
                  />
                  <Label htmlFor="newsletter" className="cursor-pointer">
                    Subscribe to newsletter
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="updates"
                    checked={checkboxes.updates}
                    onCheckedChange={(checked) =>
                      setCheckboxes({ ...checkboxes, updates: checked as boolean })
                    }
                  />
                  <Label htmlFor="updates" className="cursor-pointer">
                    Receive product updates
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">Switches</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notifications</Label>
                  <Switch
                    id="notifications"
                    checked={switches.notifications}
                    onCheckedChange={(checked) =>
                      setSwitches({ ...switches, notifications: checked as boolean })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="autosave">Auto Save</Label>
                  <Switch
                    id="autosave"
                    checked={switches.autoSave}
                    onCheckedChange={(checked) =>
                      setSwitches({ ...switches, autoSave: checked as boolean })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkmode">Dark Mode</Label>
                  <Switch
                    id="darkmode"
                    checked={switches.darkMode}
                    onCheckedChange={(checked) =>
                      setSwitches({ ...switches, darkMode: checked as boolean })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <h3 className="font-semibold text-text-primary">Slider</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="volume">Volume</Label>
                    <span className="text-sm text-text-muted">
                      {sliderValue[0]}%
                    </span>
                  </div>
                  <Slider
                    id="volume"
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </ComponentSection>

        <ComponentSection
          title="Navigation"
          description="Tab-based navigation for organizing content."
          delay={0.4}
        >
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-name">Name</Label>
                    <Input
                      id="current-name"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-email">Email</Label>
                    <Input
                      id="current-email"
                      type="email"
                      defaultValue="john@example.com"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New</Label>
                    <Input id="new-password" type="password" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your application settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-muted">
                    Configure your application preferences and notifications.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ComponentSection>

        <ComponentSection
          title="Feedback Components"
          description="Tooltips and dialogs for user feedback."
          delay={0.5}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">Tooltips</h3>
              <TooltipProvider>
                <div className="flex flex-wrap gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a helpful tooltip!</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open settings</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">Dialog</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </ComponentSection>

        <ComponentSection
          title="Badges"
          description="Status indicators and labels."
          delay={0.6}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </motion.div>
        </ComponentSection>

        {/* ===== NEW: VISUAL EFFECTS SECTION ===== */}
        <ComponentSection
          title="Glassmorphism Effects"
          description="Beautiful glass-effect components with blur and transparency."
          delay={0.7}
        >
          <GlassmorphismShowcase />
        </ComponentSection>

        <ComponentSection
          title="Gradient Effects"
          description="Theme-responsive gradients that automatically adapt to each theme's unique color palette. Try switching themes to see how gradients transform!"
          delay={0.75}
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

        <ComponentSection
          title="Enhanced Buttons"
          description="Buttons with gradient, glass, glow, and shimmer effects."
          delay={0.8}
        >
          <div className="flex flex-wrap gap-4">
            <Button variant="gradient">Gradient Button</Button>
            <Button variant="glass">Glass Button</Button>
            <Button variant="glow">Glow Button</Button>
            <Button variant="shimmer">Shimmer Button</Button>
          </div>
        </ComponentSection>

        <ComponentSection
          title="Loading States"
          description="Various loading indicators for different use cases."
          delay={0.85}
        >
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="flex-1 min-w-max"><Spinner /></div>
            <div className="flex-1 min-w-max"><DotsSpinner /></div>
            <div className="flex-1 min-w-max"><Spinner variant="primary" /></div>
            <div className="flex-1 min-w-max"><SkeletonCard /></div>
          </div>
        </ComponentSection>

        <ComponentSection
          title="Progress Indicators"
          description="Linear and circular progress bars."
          delay={0.9}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <ProgressBar value={65} label="Project Progress" showPercentage />
            <div className="flex items-center justify-center">
              <ProgressCircle value={75} showPercentage />
            </div>
          </div>
        </ComponentSection>

        <ComponentSection
          title="Statistics"
          description="Animated statistic displays with trend indicators."
          delay={0.95}
        >
          <div className="grid gap-6 md:grid-cols-3">
            <Statistic
              value={2847}
              label="Total Users"
              trend={{ value: 12.5, isPositive: true }}
            />
            <Statistic
              value={156}
              label="New Signups"
              trend={{ value: 8.2, isPositive: true }}
            />
            <Statistic
              value={98.5}
              label="Satisfaction Rate"
              suffix="%"
              trend={{ value: 2.1, isPositive: false }}
            />
          </div>
        </ComponentSection>

        <ComponentSection
          title="States & Alerts"
          description="Empty, error, and success states."
          delay={1.0}
        >
          <div className="grid gap-6 md:grid-cols-3">
            <EmptyState />
            <ErrorState code={404} message="Page not found" />
            <SuccessState title="Success!" message="Changes saved successfully." />
          </div>
        </ComponentSection>

        <ComponentSection
          title="Input Enhancements"
          description="Enhanced input components with visual effects."
          delay={1.05}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <SearchInput placeholder="Search..." />
            <OtpInput length={6} />
          </div>
        </ComponentSection>

        <ComponentSection
          title="Data Display"
          description="Accordion, pagination, and timeline components."
          delay={1.1}
        >
          <div className="space-y-6">
            <Accordion
              items={[
                { id: '1', title: 'What is UI Theme Showcase?', content: 'UI Theme Showcase is a design system showcase with beautiful components.' },
                { id: '2', title: 'How do I get started?', content: 'Simply install the package and import the components you need.' },
                { id: '3', title: 'Can I customize themes?', content: 'Yes! UI Theme Showcase supports multiple color themes with glassmorphism effects.' },
              ]}
            />
            <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />
          </div>
        </ComponentSection>

        {/* ===== NEW: ADDITIONAL UI COMPONENTS ===== */}
        <ComponentSection title="AppBar" description="Top app bar with actions." delay={1.15}>
          <AppBar
            title="App Title"
            leading={<Button size="icon" variant="ghost"><Menu className="h-4 w-4" /></Button>}
            actions={
              <>
                <Button size="icon" variant="ghost"><Search className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost"><Settings className="h-4 w-4" /></Button>
              </>
            }
          />
        </ComponentSection>

        <ComponentSection title="Popover & Dropdown" description="Floating content components." delay={1.3}>
          <div className="flex flex-wrap gap-4">
            <Popover
              trigger={<Button variant="outline">Click for Popover</Button>}
              content={<div className="p-2">This is a popover content!</div>}
            />
            <Dropdown
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
              ]}
              placeholder="Select an option"
              onChange={(v) => console.log(v)}
            />
          </div>
        </ComponentSection>

        <ComponentSection title="Radio & Helper Text" description="Radio buttons with helper text." delay={1.35}>
          <div className="space-y-4">
            <RadioGroup
              name="plan"
              value={radioValue}
              onChange={setRadioValue}
              label="Choose a plan"
              options={[
                { value: 'option1', label: 'Free Plan', description: 'Basic features included' },
                { value: 'option2', label: 'Pro Plan', description: 'All features unlocked' },
              ]}
            />
            <HelperText>This is a helper text with additional information.</HelperText>
            <HelperText variant="error">This is an error message.</HelperText>
          </div>
        </ComponentSection>

        <ComponentSection title="Sheet" description="Side sheet component." delay={1.4}>
          <Button onClick={() => setSheetOpen(true)}>Open Sheet</Button>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetHeader title="Sheet Title" description="Sheet description" onClose={() => setSheetOpen(false)} />
            <SheetBody>
              <p className="text-text-muted">This is the sheet body content.</p>
            </SheetBody>
            <SheetFooter>
              <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button>
              <Button>Save</Button>
            </SheetFooter>
          </Sheet>
        </ComponentSection>

        <ComponentSection title="Tree" description="Hierarchical tree view." delay={1.45}>
          <Tree
              data={[
                {
                  id: '1',
                  label: 'Documents',
                  icon: <Folder className="h-4 w-4" />,
                  children: [
                    { id: '1-1', label: 'Report.pdf', icon: <File className="h-4 w-4" /> },
                    { id: '1-2', label: 'Budget.xlsx', icon: <File className="h-4 w-4" /> },
                  ],
                },
                {
                  id: '2',
                  label: 'Pictures',
                  icon: <Folder className="h-4 w-4" />,
                  children: [
                    { id: '2-1', label: 'Vacation.jpg', icon: <Image className="h-4 w-4" /> },
                  ],
                },
              ]}
              selectedId={treeSelectedId}
              onSelect={setTreeSelectedId}
              defaultExpanded={['1']}
            />
        </ComponentSection>

        <ComponentSection title="Time Picker" description="Time selection component." delay={1.5}>
          <TimePicker
            value={timePickerValue}
            onChange={setTimePickerValue}
            label="Select Time"
            hour12
          />
        </ComponentSection>

        <ComponentSection title="File Upload" description="Drag and drop file upload." delay={1.55}>
          <FileUpload
              accept="image/*,.pdf"
              maxSize={5 * 1024 * 1024}
              multiple
              label="Upload files"
              description="Drag files here or click to browse"
            />
        </ComponentSection>

        <ComponentSection title="Table" description="Sortable, selectable table." delay={1.6}>
          <Table
            data={[
              { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active' },
              { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
              { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
            ]}
            columns={[
              { id: 'name', header: 'Name', cell: (row) => row.name },
              { id: 'email', header: 'Email', cell: (row) => row.email },
              { id: 'status', header: 'Status', cell: (row) => row.status },
            ]}
            keyField="id"
            selectable
            sortable
          />
        </ComponentSection>

        <ComponentSection title="Data Grid" description="Responsive grid layout." delay={1.65}>
          <DataGrid columns={3} gap={4}>
            <DataGridItem>
              <div className="text-sm font-medium">Item 1</div>
              <div className="text-xs text-text-muted">Description</div>
            </DataGridItem>
            <DataGridItem>
              <div className="text-sm font-medium">Item 2</div>
              <div className="text-xs text-text-muted">Description</div>
            </DataGridItem>
            <DataGridItem>
              <div className="text-sm font-medium">Item 3</div>
              <div className="text-xs text-text-muted">Description</div>
            </DataGridItem>
          </DataGrid>
        </ComponentSection>

        <ComponentSection title="Links & Responsive" description="Link variants and responsive utilities." delay={1.7}>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Link href="#" variant="default">Default Link</Link>
              <Link href="#" variant="primary">Primary Link</Link>
              <Link href="#" variant="gradient">Gradient Link</Link>
              <Link href="#" external>External Link</Link>
            </div>
            <div className="p-4 bg-elevated rounded-lg">
              <Show at="md"><span className="text-sm text-text-muted">Only visible on md+ screens</span></Show>
              <Hide at="md"><span className="text-sm text-text-muted">Only visible on sm screens</span></Hide>
            </div>
          </div>
        </ComponentSection>

        <ComponentSection title="Form Layout" description="Structured form components." delay={1.75}>
          <FormLayout>
            <FormRow>
              <FormField label="Full Name" required>
                <Input placeholder="John Doe" />
              </FormField>
              <FormField label="Email" required description="We'll never share your email.">
                <Input type="email" placeholder="john@example.com" />
              </FormField>
            </FormRow>
            <FormActions>
              <Button variant="ghost">Cancel</Button>
              <Button>Submit</Button>
            </FormActions>
          </FormLayout>
        </ComponentSection>

        <ComponentSection title="Chart Container" description="Container for charts with legend." delay={1.8}>
          <ChartContainer
            title="Sales Overview"
            description="Monthly sales data"
            height={200}
          >
            <div className="flex items-center justify-center h-full text-text-muted">
              Chart placeholder
            </div>
          </ChartContainer>
          <div className="mt-4">
            <ChartLegend
              items={[
                { name: 'Product A', color: '#3b82f6' },
                { name: 'Product B', color: '#8b5cf6' },
                { name: 'Product C', color: '#ec4899' },
              ]}
            />
          </div>
        </ComponentSection>

        {/* ===== PATTERN COMPONENTS ===== */}
        <ComponentSection title="Patterns" description="Complex UI patterns for common use cases." delay={1.85}>
          <Tabs defaultValue="search">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="search">Search & Filter</TabsTrigger>
              <TabsTrigger value="form">Form Pattern</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Action</TabsTrigger>
              <TabsTrigger value="loading">Loading</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="mt-4">
              <SearchFilterPattern
                filters={[
                  {
                    id: 'category',
                    label: 'Category',
                    type: 'checkbox',
                    options: [
                      { id: 'cat1', label: 'Electronics' },
                      { id: 'cat2', label: 'Clothing' },
                      { id: 'cat3', label: 'Books' },
                    ],
                  },
                ]}
                resultsCount={42}
              />
            </TabsContent>

            <TabsContent value="form" className="mt-4">
              <FormPattern
                title="Contact Form"
                fields={[
                  { name: 'name', label: 'Name', required: true, placeholder: 'Your name' },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'message', label: 'Message', placeholder: 'Your message' },
                ]}
                onSubmit={(data) => console.log(data)}
              />
            </TabsContent>

            <TabsContent value="bulk" className="mt-4">
              <BulkActionPattern
                items={[
                  { id: '1', name: 'Item 1' },
                  { id: '2', name: 'Item 2' },
                  { id: '3', name: 'Item 3' },
                ]}
                actions={[
                  { id: 'delete', label: 'Delete', variant: 'destructive', onClick: () => {} },
                ]}
              />
            </TabsContent>

            <TabsContent value="loading" className="mt-4">
              <div className="space-y-4">
                <LoadingPattern type="skeleton" />
              </div>
            </TabsContent>
          </Tabs>
        </ComponentSection>

        <ComponentSection title="First Time UX" description="Onboarding flow component." delay={1.9}>
          <FirstTimeUse
            steps={[
              {
                id: '1',
                title: 'Welcome to UI Theme Showcase',
                description: 'A beautiful design system with 50+ components.',
                content: <div className="text-6xl">👋</div>,
              },
              {
                id: '2',
                title: 'Glassmorphism Effects',
                description: 'Stunning glass effects with blur and transparency.',
                content: <div className="text-6xl">✨</div>,
              },
              {
                id: '3',
                title: 'Ready to Go',
                description: 'Start building beautiful applications today.',
                content: <div className="text-6xl">🚀</div>,
              },
            ]}
          />
        </ComponentSection>

        <ComponentSection title="Error & Access States" description="Error and access denied patterns." delay={1.95}>
          <div className="grid gap-6 md:grid-cols-2">
            <ErrorPattern
              title="Oops! Something went wrong"
              code={500}
              showRetry
              showHome
            />
            <AccessDenied
              title="Access Denied"
              message="You don't have permission to view this resource."
              contactEmail="support@example.com"
            />
          </div>
        </ComponentSection>

        <ComponentSection title="CRUD Pattern" description="Complete CRUD interface with table." delay={2.0}>
          <CRUDPattern
            title="Users"
            data={[
              { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin' },
              { id: '2', name: 'Bob', email: 'bob@example.com', role: 'User' },
              { id: '3', name: 'Charlie', email: 'charlie@example.com', role: 'User' },
            ]}
            columns={[
              { id: 'name', header: 'Name', cell: (row) => row.name },
              { id: 'email', header: 'Email', cell: (row) => row.email },
              { id: 'role', header: 'Role', cell: (row) => row.role },
            ]}
            keyField="id"
            onCreate={() => {}}
            onEdit={(item) => console.log('Edit', item)}
            onDelete={(item) => console.log('Delete', item)}
            createLabel="Add User"
          />
        </ComponentSection>
      </div>
    </div>
  )
}
