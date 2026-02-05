import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const paginationVariants = cva('flex items-center gap-2', {
  variants: {
    variant: {
      default: '',
      glass: 'glass p-2 rounded-lg',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
  maxVisiblePages?: number
  siblingCount?: number
  boundaryCount?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  size = 'md',
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 7,
  className,
  ...props
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const halfVisible = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)

    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages, maxVisiblePages - 1)
    }

    if (currentPage >= totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 2)
    }

    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push('...')
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  const buttonClass = (isActive: boolean, isDisabled: boolean) =>
    cn(
      'min-w-[2.5rem] h-10 flex items-center justify-center rounded-md transition-all',
      'focus:outline-none focus:ring-2 focus:ring-primary',
      isActive && 'bg-primary text-primary-foreground',
      !isActive && !isDisabled && 'hover:bg-elevated text-text-primary',
      isDisabled && 'opacity-50 cursor-not-allowed text-text-muted'
    )

  return (
    <div className={cn(paginationVariants({ variant, size }), className)} {...props}>
      {showFirstLast && (
        <motion.button
          whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
          whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
          onClick={() => onPageChange?.(1)}
          disabled={currentPage === 1}
          className={buttonClass(false, currentPage === 1)}
          aria-label="First page"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </motion.button>
      )}

      {showPrevNext && (
        <motion.button
          whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
          whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonClass(false, currentPage === 1)}
          aria-label="Previous page"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}

      {pages.map((page, index) => {
        if (typeof page === 'string') {
          return (
            <span key={index} className="min-w-[2.5rem] h-10 flex items-center justify-center text-text-muted">
              {page}
            </span>
          )
        }

        return (
          <motion.button
            key={index}
            whileHover={{ scale: page !== currentPage ? 1.05 : 1 }}
            whileTap={{ scale: page !== currentPage ? 0.95 : 1 }}
            onClick={() => onPageChange?.(page)}
            disabled={page === currentPage}
            className={buttonClass(page === currentPage, false)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </motion.button>
        )
      })}

      {showPrevNext && (
        <motion.button
          whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
          whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={buttonClass(false, currentPage === totalPages)}
          aria-label="Next page"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {showFirstLast && (
        <motion.button
          whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
          whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
          onClick={() => onPageChange?.(totalPages)}
          disabled={currentPage === totalPages}
          className={buttonClass(false, currentPage === totalPages)}
          aria-label="Last page"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}
    </div>
  )
}
