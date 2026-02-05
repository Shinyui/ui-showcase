import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const stepperVariants = cva('w-full', {
  variants: {
    orientation: {
      horizontal: 'flex items-center justify-between sm:flex-row flex-col sm:space-y-0 space-y-4',
      vertical: 'flex flex-col space-y-4',
    },
    variant: {
      default: '',
      glass: 'glass p-4 rounded-lg',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
  },
})

export interface Step {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
  status?: 'complete' | 'current' | 'pending'
}

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  steps: Step[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
  clickable?: boolean
  showLabels?: boolean
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  variant = 'default',
  clickable = false,
  showLabels = true,
  className,
  ...props
}: StepperProps) {
  const getStepStatus = (index: number): 'complete' | 'current' | 'pending' => {
    if (index < currentStep) return 'complete'
    if (index === currentStep) return 'current'
    return 'pending'
  }

  const handleStepClick = (index: number) => {
    if (clickable && index < currentStep) {
      onStepClick?.(index)
    }
  }

  return (
    <div
      className={cn(stepperVariants({ orientation, variant }), className)}
      {...props}
    >
      {steps.map((step, index) => {
        const status = step.status || getStepStatus(index)
        const isClickable = clickable && index < currentStep

        return (
          <div key={step.id} className="flex-1">
            <div
              className={cn(
                'flex items-center',
                orientation === 'horizontal' && 'w-full',
                orientation === 'vertical' && 'w-auto'
              )}
            >
              <StepIndicator
                status={status}
                icon={step.icon}
                index={index}
                clickable={isClickable}
                onClick={() => handleStepClick(index)}
              />

              {showLabels && (
                <div
                  className={cn(
                    'ml-3',
                    orientation === 'horizontal' && 'ml-3',
                    orientation === 'vertical' && 'ml-4'
                  )}
                >
                  <p
                    className={cn(
                      'text-sm font-medium',
                      status === 'current' && 'text-text-primary',
                      status === 'complete' && 'text-text-muted',
                      status === 'pending' && 'text-text-muted'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-text-muted">{step.description}</p>
                  )}
                </div>
              )}
            </div>

            {/* Connector Line */}
            {orientation === 'horizontal' && index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5',
                  status === 'complete' ? 'bg-primary' : 'bg-border-default'
                )}
                style={{
                  left: '50%',
                  width: 'calc(100% - 2rem)',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

interface StepIndicatorProps {
  status: 'complete' | 'current' | 'pending'
  icon?: React.ReactNode
  index: number
  clickable?: boolean
  onClick?: () => void
}

function StepIndicator({ status, icon, index, clickable, onClick }: StepIndicatorProps) {
  const baseClasses = 'relative flex items-center justify-center w-11 h-11 sm:w-8 sm:h-8 rounded-full transition-all duration-300'

  const statusClasses = {
    complete: 'bg-primary text-primary-foreground',
    current: 'bg-primary text-primary-foreground ring-4 ring-primary/20',
    pending: 'bg-border-default text-text-muted',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={!clickable}
      className={cn(
        baseClasses,
        statusClasses[status],
        clickable && status === 'complete' && 'cursor-pointer hover:scale-110'
      )}
      whileHover={clickable ? { scale: 1.1 } : {}}
      whileTap={clickable ? { scale: 0.95 } : {}}
    >
      {status === 'complete' ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : icon ? (
        icon
      ) : (
        <span className="text-sm font-medium">{index + 1}</span>
      )}

      {status === 'current' && (
        <motion.span
          className="absolute inset-0 rounded-full bg-primary"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ opacity: 0.3 }}
        />
      )}
    </motion.button>
  )
}
