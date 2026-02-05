import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tableVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'border border-border-default rounded-lg overflow-hidden',
      glass: 'glass rounded-lg overflow-hidden',
      simple: '',
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

export interface Column<T> {
  id: string
  header: string
  cell: (item: T) => React.ReactNode
  className?: string
}

export interface TableProps<T>
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  columns: Column<T>[]
  data: T[]
  keyField: keyof T
  sortable?: boolean
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  selectable?: boolean
  selectedItems?: Set<string>
  onSelectionChange?: (selectedItems: Set<string>) => void
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  variant = 'default',
  size = 'md',
  sortable = false,
  onSort,
  sortColumn,
  sortDirection,
  selectable = false,
  selectedItems = new Set(),
  onSelectionChange,
  className,
  ...props
}: TableProps<T>) {
  const [internalSelected, setInternalSelected] = React.useState<Set<string>>(new Set())

  const isControlled = selectedItems !== undefined
  const selected = isControlled ? selectedItems : internalSelected

  const handleSort = (columnId: string) => {
    if (!sortable) return

    const direction =
      sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort?.(columnId, direction)
  }

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked
      ? new Set(data.map(item => String(item[keyField])))
      : new Set()

    if (!isControlled) {
      setInternalSelected(newSelection)
    }
    onSelectionChange?.(newSelection)
  }

  const handleSelectRow = (key: string, checked: boolean) => {
    const newSelection = new Set(selected)
    if (checked) {
      newSelection.add(key)
    } else {
      newSelection.delete(key)
    }

    if (!isControlled) {
      setInternalSelected(newSelection)
    }
    onSelectionChange?.(newSelection)
  }

  const allSelected =
    data.length > 0 && selected.size === data.length
  const someSelected = selected.size > 0 && selected.size < data.length

  return (
    <div className="overflow-x-auto">
      <table
        className={cn(tableVariants({ variant, size }), className)}
        {...props}
      >
        <thead className="bg-surface">
          <tr>
            {selectable && (
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={someSelected && !allSelected ? (input) => {
                    if (input) {
                      input.indeterminate = true
                    }
                  } : undefined}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border-default text-primary focus:ring-primary"
                />
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.id}
                className={cn(
                  'px-4 py-3 text-left font-semibold text-text-primary',
                  column.className,
                  sortable && 'cursor-pointer hover:bg-elevated transition-colors select-none'
                )}
                onClick={() => handleSort(column.id)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {sortable && sortColumn === column.id && (
                    <svg
                      className={cn(
                        'h-4 w-4 transition-transform',
                        sortDirection === 'desc' && 'transform rotate-180'
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-default">
          {data.map((row, rowIndex) => {
            const key = String(row[keyField])
            const isSelected = selected.has(key)

            return (
              <tr
                key={key}
                className={cn(
                  'transition-colors',
                  isSelected && 'bg-elevated',
                  !isSelected && 'hover:bg-elevated/50'
                )}
              >
                {selectable && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectRow(key, e.target.checked)}
                      className="rounded border-border-default text-primary focus:ring-primary"
                    />
                  </td>
                )}
                {columns.map(column => (
                  <td
                    key={column.id}
                    className={cn('px-4 py-3 text-text-primary', column.className)}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-muted">No data available</p>
        </div>
      )}
    </div>
  )
}
