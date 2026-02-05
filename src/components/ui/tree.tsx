import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TreeNode {
  id: string
  label: string
  icon?: React.ReactNode
  children?: TreeNode[]
  disabled?: boolean
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  data: TreeNode[]
  defaultExpanded?: string[]
  selectable?: boolean
  selectedId?: string
  onSelect?: (id: string) => void
  onExpand?: (id: string) => void
  onCollapse?: (id: string) => void
}

export function Tree({
  data,
  defaultExpanded = [],
  selectable = true,
  selectedId,
  onSelect,
  onExpand,
  onCollapse,
  className,
  ...props
}: TreeProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set(defaultExpanded))

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
      onCollapse?.(id)
    } else {
      newExpanded.add(id)
      onExpand?.(id)
    }
    setExpanded(newExpanded)
  }

  const handleSelect = (id: string) => {
    if (selectable) {
      onSelect?.(id)
    }
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      {data.map(node => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          level={0}
          expanded={expanded}
          selectedId={selectedId}
          onToggleExpand={toggleExpand}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}

interface TreeNodeComponentProps {
  node: TreeNode
  level: number
  expanded: Set<string>
  selectedId?: string
  onToggleExpand: (id: string) => void
  onSelect: (id: string) => void
}

function TreeNodeComponent({
  node,
  level,
  expanded,
  selectedId,
  onToggleExpand,
  onSelect,
}: TreeNodeComponentProps) {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded.has(node.id)
  const isSelected = selectedId === node.id

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) {
            onToggleExpand(node.id)
          }
          onSelect(node.id)
        }}
        disabled={node.disabled}
        className={cn(
          'w-full flex items-center gap-2 py-2 px-2 rounded-md transition-colors',
          'hover:bg-elevated focus:outline-none focus:bg-elevated',
          isSelected && 'bg-elevated border-l-2 border-primary',
          node.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Expand/Collapse Icon */}
        <div className="w-4 h-4 flex items-center justify-center">
          {hasChildren ? (
            <motion.svg
              className="w-3 h-3 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          ) : null}
        </div>

        {/* Node Icon */}
        {node.icon && <span className="flex-shrink-0">{node.icon}</span>}

        {/* Label */}
        <span className="text-sm text-text-primary truncate">{node.label}</span>
      </button>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {node.children!.map(child => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                level={level + 1}
                expanded={expanded}
                selectedId={selectedId}
                onToggleExpand={onToggleExpand}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
