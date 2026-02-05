import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

export interface BulkAction {
  id: string
  label: string
  icon?: React.ReactNode
  variant?: 'default' | 'destructive'
  onClick: (selectedIds: string[]) => void
}

export interface BulkActionPatternProps {
  items: Array<{ id: string; [key: string]: any }>
  actions: BulkAction[]
  onSelectChange?: (selectedIds: string[]) => void
  selectAllLabel?: string
  selectedCountLabel?: (count: number) => string
  clearSelectionLabel?: string
  className?: string
}

export function BulkActionPattern({
  items,
  actions,
  onSelectChange,
  selectAllLabel = 'Select all',
  selectedCountLabel = (count) => `${count} selected`,
  clearSelectionLabel = 'Clear selection',
  className,
}: BulkActionPatternProps) {
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())

  const handleSelectAll = (checked: boolean) => {
    const newSelection = checked
      ? new Set(items.map(item => item.id))
      : new Set<string>()
    setSelectedIds(newSelection)
    onSelectChange?.(Array.from(newSelection))
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelection = new Set(selectedIds)
    if (checked) {
      newSelection.add(id)
    } else {
      newSelection.delete(id)
    }
    setSelectedIds(newSelection)
    onSelectChange?.(Array.from(newSelection))
  }

  const clearSelection = () => {
    setSelectedIds(new Set())
    onSelectChange?.([])
  }

  const allSelected = items.length > 0 && selectedIds.size === items.length
  const someSelected = selectedIds.size > 0 && selectedIds.size < items.length

  return (
    <div className={cn('space-y-4', className)}>
      {/* Bulk Action Bar */}
      <AnimatePresence>
        {selectedIds.size > 0 && (
          <motion.div
            className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="text-sm font-medium text-primary">
              {selectedCountLabel(selectedIds.size)}
            </span>
            <div className="flex items-center gap-2">
              {actions.map(action => (
                <Button
                  key={action.id}
                  size="sm"
                  variant={action.variant || 'default'}
                  onClick={() => action.onClick(Array.from(selectedIds))}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </Button>
              ))}
              <Button
                size="sm"
                variant="ghost"
                onClick={clearSelection}
              >
                {clearSelectionLabel}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items List with Selection */}
      <div className="space-y-2">
        {/* Select All Header */}
        {items.length > 0 && (
          <div className="flex items-center gap-3 p-3 bg-surface rounded-md">
            <Checkbox
              checked={allSelected}
              ref={someSelected && !allSelected ? (input) => {
                if (input) input.indeterminate = true
              } : undefined}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm font-medium text-text-primary">
              {selectAllLabel}
            </span>
          </div>
        )}

        {/* Individual Items */}
        {items.map(item => (
          <motion.div
            key={item.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-md border transition-colors',
              selectedIds.has(item.id)
                ? 'bg-primary/10 border-primary/30'
                : 'bg-surface border-border-default hover:border-border-subtle'
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Checkbox
              checked={selectedIds.has(item.id)}
              onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
            />
            <span className="flex-1 text-sm text-text-primary">
              {item.name || item.title || item.id}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
