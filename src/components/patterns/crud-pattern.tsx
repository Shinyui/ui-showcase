import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table } from '@/components/ui/table'
import { IconButton } from '@/components/ui/icon-button'
import { Dialog } from '@/components/ui/dialog'
import { FormPattern } from './form-pattern'
import { cn } from '@/lib/utils'

export interface CRUDItem {
  id: string
  [key: string]: any
}

export interface CRUDColumn {
  id: string
  header: string
  cell: (item: CRUDItem) => React.ReactNode
}

export interface CRUDPatternProps {
  data: CRUDItem[]
  columns: CRUDColumn[]
  keyField: string
  onCreate?: () => void
  onEdit?: (item: CRUDItem) => void
  onDelete?: (item: CRUDItem) => void
  onView?: (item: CRUDItem) => void
  searchPlaceholder?: string
  createLabel?: string
  loading?: boolean
  title?: string
  actions?: React.ReactNode
  className?: string
}

export function CRUDPattern({
  data,
  columns,
  keyField,
  onCreate,
  onEdit,
  onDelete,
  onView,
  searchPlaceholder = 'Search...',
  createLabel = 'Create New',
  loading = false,
  title,
  actions,
  className,
}: CRUDPatternProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set())
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [itemToDelete, setItemToDelete] = React.useState<CRUDItem | null>(null)

  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data

    return data.filter(item =>
      Object.values(item).some(
        value =>
          value &&
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [data, searchQuery])

  const handleDelete = (item: CRUDItem) => {
    setItemToDelete(item)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      onDelete?.(itemToDelete)
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  const actionColumn: CRUDColumn = {
    id: 'actions',
    header: 'Actions',
    cell: (item: CRUDItem) => (
      <div className="flex items-center gap-2">
        {onView && (
          <IconButton
            size="sm"
            variant="ghost"
            onClick={() => onView(item)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </IconButton>
        )}
        {onEdit && (
          <IconButton
            size="sm"
            variant="ghost"
            onClick={() => onEdit(item)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </IconButton>
        )}
        {onDelete && (
          <IconButton
            size="sm"
            variant="ghost"
            onClick={() => handleDelete(item)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </IconButton>
        )}
      </div>
    ),
  }

  return (
    <motion.div
      className={cn('space-y-6', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          {title && <h1 className="text-2xl font-bold text-text-primary">{title}</h1>}
        </div>
        <div className="flex items-center gap-3">
          {actions}
          {onCreate && (
            <Button onClick={onCreate}>{createLabel}</Button>
          )}
        </div>
      </div>

      {/* Search */}
      <Input
        type="search"
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className=""
      />

      {/* Table */}
      <Table
        data={filteredData}
        columns={[...columns, actionColumn]}
        keyField={keyField}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <div className="glass p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Confirm Delete
          </h3>
          <p className="text-text-muted mb-6">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </motion.div>
  )
}
