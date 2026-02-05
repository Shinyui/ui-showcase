import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface AccessDeniedProps {
  title?: string
  message?: string
  contactEmail?: string
  backLabel?: string
  onBack?: () => void
  contactLabel?: string
  className?: string
}

export function AccessDenied({
  title = 'Access Denied',
  message = "You don't have permission to access this resource.",
  contactEmail,
  backLabel = 'Go Back',
  onBack,
  contactLabel = 'Contact Support',
  className,
}: AccessDeniedProps) {
  const handleContact = () => {
    if (contactEmail) {
      window.location.href = `mailto:${contactEmail}`
    }
  }

  return (
    <motion.div
      className={cn(
        'flex flex-col items-center justify-center min-h-[400px] p-8 text-center',
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Lock Icon */}
      <motion.div
        className="rounded-full bg-destructive/10 flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <svg className="h-10 w-10 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </motion.div>

      {/* Title and Message */}
      <motion.h1
        className="text-2xl font-bold text-text-primary mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="text-text-muted mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {message}
      </motion.p>

      {/* Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {backLabel}
          </Button>
        )}
        {contactEmail && (
          <Button onClick={handleContact}>
            {contactLabel}
          </Button>
        )}
      </motion.div>
    </motion.div>
  )
}
