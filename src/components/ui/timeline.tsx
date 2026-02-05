import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const timelineVariants = cva('relative', {
  variants: {
    variant: {
      default: '',
      glass: 'glass p-6 rounded-lg',
    },
    align: {
      left: '',
      center: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    align: 'left',
  },
})

export interface TimelineItem {
  id: string
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
  status?: 'complete' | 'current' | 'pending' | 'error'
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  items: TimelineItem[]
  showConnector?: boolean
}

export function Timeline({
  items,
  variant = 'default',
  align = 'left',
  showConnector = true,
  className,
  ...props
}: TimelineProps) {
  return (
    <div className={cn(timelineVariants({ variant, align }), className)} {...props}>
      {items.map((item, index) => (
        <TimelineItemComponent
          key={item.id}
          {...item}
          showConnector={showConnector && index < items.length - 1}
          index={index}
        />
      ))}
    </div>
  )
}

interface TimelineItemComponentProps extends TimelineItem {
  showConnector: boolean
  index: number
}

function TimelineItemComponent({
  title,
  description,
  date,
  icon,
  status = 'complete',
  showConnector,
  index,
}: TimelineItemComponentProps) {
  const statusColors = {
    complete: 'bg-primary',
    current: 'bg-primary ring-4 ring-primary/30',
    pending: 'bg-border-default',
    error: 'bg-destructive',
  }

  return (
    <motion.div
      className="relative flex gap-4 pb-8 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
    >
      {/* Icon */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0',
            statusColors[status]
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.1, type: 'spring' }}
        >
          {icon || (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </motion.div>

        {/* Connector */}
        {showConnector && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-full bg-border-default" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        {date && (
          <p className="text-xs text-text-muted mb-1">{date}</p>
        )}
        <h4 className="text-sm font-semibold text-text-primary">{title}</h4>
        {description && (
          <p className="text-sm text-text-muted mt-1">{description}</p>
        )}
      </div>
    </motion.div>
  )
}
