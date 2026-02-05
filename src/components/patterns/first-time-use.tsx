import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/ui/progress-bar'
import { cn } from '@/lib/utils'

export interface OnboardingStep {
  id: string
  title: string
  description: string
  content?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  skipable?: boolean
}

export interface FirstTimeUseProps {
  steps: OnboardingStep[]
  onComplete?: () => void
  onSkip?: () => void
  completeLabel?: string
  skipLabel?: string
  nextLabel?: string
  previousLabel?: string
  showProgress?: boolean
  className?: string
}

export function FirstTimeUse({
  steps,
  onComplete,
  onSkip,
  completeLabel = 'Get Started',
  skipLabel = 'Skip',
  nextLabel = 'Next',
  previousLabel = 'Previous',
  showProgress = true,
  className,
}: FirstTimeUseProps) {
  const [currentStep, setCurrentStep] = React.useState(0)

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStepData.actionLabel && currentStepData.onAction) {
      currentStepData.onAction()
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onSkip?.()
  }

  return (
    <motion.div
      className={cn('p-8', className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Progress */}
      {showProgress && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-text-muted mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} variant="glass" />
        </div>
      )}

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-center mb-8"
      >
        {/* Illustration/Content */}
        {currentStepData.content && (
          <div className="mb-6 flex justify-center">
            {currentStepData.content}
          </div>
        )}

        {/* Title */}
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          {currentStepData.title}
        </h2>

        {/* Description */}
        <p className="text-lg text-text-muted">
          {currentStepData.description}
        </p>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {currentStep > 0 && (
            <Button variant="ghost" onClick={handlePrevious}>
              {previousLabel}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {currentStepData.skipable !== false && currentStep < steps.length - 1 && (
            <Button variant="ghost" onClick={handleSkip}>
              {skipLabel}
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1
              ? completeLabel
              : currentStepData.actionLabel || nextLabel}
          </Button>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              index === currentStep
                ? 'bg-primary w-8'
                : index < currentStep
                ? 'bg-primary/50'
                : 'bg-border-default'
            )}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
