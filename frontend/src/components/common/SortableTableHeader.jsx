import { ArrowUpIcon, ArrowDownIcon } from './Icons'

// Reusable Sortable Table Header Component

const SortableTableHeader = ({ 
  label, 
  sortKey, 
  currentSortKey, 
  currentSortDirection, 
  onSort,
  align = 'left',
  className = ''
}) => {
  const isActive = currentSortKey === sortKey
  
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const justifyClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return (
    <th 
      className={`px-6 py-3 ${alignmentClasses[align]} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <div className={`flex items-center ${justifyClasses[align]} space-x-1`}>
        <span>{label}</span>
        {isActive && (
          currentSortDirection === 'asc' ? 
            <ArrowUpIcon className="w-3 h-3" /> : 
            <ArrowDownIcon className="w-3 h-3" />
        )}
      </div>
    </th>
  )
}

export default SortableTableHeader
