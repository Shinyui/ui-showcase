import * as React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Sheet, SheetHeader, SheetBody } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export interface FilterOption {
  id: string
  label: string
  value?: string
}

export interface FilterGroup {
  id: string
  label: string
  type: 'checkbox' | 'radio' | 'select'
  options: FilterOption[]
}

export interface SearchFilterPatternProps {
  searchPlaceholder?: string
  filters?: FilterGroup[]
  onSearchChange?: (query: string) => void
  onFilterChange?: (filters: Record<string, string[]>) => void
  resultsCount?: number
  showResultsCount?: boolean
  clearFiltersLabel?: string
  filterButtonLabel?: string
  className?: string
}

export function SearchFilterPattern({
  searchPlaceholder = 'Search...',
  filters = [],
  onSearchChange,
  onFilterChange,
  resultsCount,
  showResultsCount = true,
  clearFiltersLabel = 'Clear all',
  filterButtonLabel = 'Filters',
  className,
}: SearchFilterPatternProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false)
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string[]>>({})
  const [filterValues, setFilterValues] = React.useState<Record<string, string[]>>({})

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange?.(value)
  }

  const handleFilterChange = (groupId: string, value: string) => {
    setFilterValues(prev => {
      const currentValues = prev[groupId] || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]

      const updated = { ...prev, [groupId]: newValues }
      setActiveFilters(updated)
      onFilterChange?.(updated)
      return updated
    })
  }

  const clearAllFilters = () => {
    setFilterValues({})
    setActiveFilters({})
    onFilterChange?.({})
  }

  const activeFilterCount = Object.values(activeFilters).flat().length

  return (
    <motion.div
      className={cn('space-y-4', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filter Button */}
        {filters.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setFilterSheetOpen(true)}
            className="relative"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {filterButtonLabel}
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-text-muted">Active filters:</span>
          {Object.entries(activeFilters).map(([groupId, values]) =>
            values.map(value => {
              const group = filters.find(g => g.id === groupId)
              const option = group?.options.find(o => o.value === value)
              return (
                <span
                  key={`${groupId}-${value}`}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-elevated rounded-md text-sm"
                >
                  {option?.label || value}
                  <button
                    onClick={() => handleFilterChange(groupId, value)}
                    className="hover:text-destructive"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )
            })
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7"
          >
            {clearFiltersLabel}
          </Button>
        </div>
      )}

      {/* Results Count */}
      {showResultsCount && resultsCount !== undefined && (
        <p className="text-sm text-text-muted">
          {resultsCount} {resultsCount === 1 ? 'result' : 'results'} found
        </p>
      )}

      {/* Filter Sheet */}
      <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <SheetHeader
          title="Filters"
          onClose={() => setFilterSheetOpen(false)}
        />
        <SheetBody>
          <div className="space-y-6">
            {filters.map(group => (
              <div key={group.id}>
                <h3 className="text-sm font-medium text-text-primary mb-3">
                  {group.label}
                </h3>
                <div className="space-y-2">
                  {group.options.map(option => (
                    <div key={option.id} className="flex items-center gap-2">
                      <Checkbox
                        id={`${group.id}-${option.id}`}
                        checked={filterValues[group.id]?.includes(option.value || option.id) || false}
                        onCheckedChange={() => handleFilterChange(group.id, option.value || option.id)}
                      />
                      <Label
                        htmlFor={`${group.id}-${option.id}`}
                        className="text-sm text-text-primary cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SheetBody>
      </Sheet>
    </motion.div>
  )
}
