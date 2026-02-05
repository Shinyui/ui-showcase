import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const fileUploadVariants = cva('', {
  variants: {
    variant: {
      default: 'border-2 border-dashed border-border-default hover:border-border-subtle',
      glass: 'glass border-2 border-dashed border-glass-border-light hover:border-glass-border-highlight',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
  onFilesChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  label?: string
  description?: string
  error?: string
}

export function FileUpload({
  onFilesChange,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  label = 'Drop files here or click to browse',
  description,
  error,
  variant = 'default',
  className,
  disabled,
  ...props
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const [internalError, setInternalError] = React.useState<string>()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    if (maxSize && file.size > maxSize) {
      setInternalError(`File "${file.name}" exceeds maximum size of ${formatBytes(maxSize)}`)
      return false
    }
    return true
  }

  const handleFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles)
    const validFiles: File[] = []

    if (maxFiles && files.length + fileArray.length > maxFiles) {
      setInternalError(`Maximum ${maxFiles} files allowed`)
      return
    }

    for (const file of fileArray) {
      if (validateFile(file)) {
        validFiles.push(file)
      }
    }

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
      setInternalError(undefined)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (!disabled) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center p-8 rounded-lg cursor-pointer transition-all',
          fileUploadVariants({ variant }),
          isDragging && 'border-primary bg-primary/5',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-destructive'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
          {...props}
        />

        <motion.div
          className="flex flex-col items-center text-center space-y-2"
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <svg
            className="h-10 w-10 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm font-medium text-text-primary">{label}</p>
          {description && (
            <p className="text-xs text-text-muted">{description}</p>
          )}
          <p className="text-xs text-text-muted">
            {accept && `Accepted: ${accept}`}
            {maxSize && ` • Max size: ${formatBytes(maxSize)}`}
          </p>
        </motion.div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            className="space-y-2 mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 bg-surface border border-border-default rounded-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <svg className="h-5 w-5 text-text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{file.name}</p>
                    <p className="text-xs text-text-muted">{formatBytes(file.size)}</p>
                  </div>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index)
                    }}
                    className="p-1 hover:bg-elevated rounded transition-colors"
                  >
                    <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {(error || internalError) && (
        <p className="text-sm text-destructive mt-1">{error || internalError}</p>
      )}
    </div>
  )
}
