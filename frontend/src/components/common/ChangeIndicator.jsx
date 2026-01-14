import { ArrowUpIcon, ArrowDownIcon } from './Icons'

// Reusable Change Indicator Component (for displaying percentage changes)

const ChangeIndicator = ({ value, formatValue, showIcon = true, className = '' }) => {
  const isPositive = value >= 0
  
  const displayValue = formatValue 
    ? formatValue(value) 
    : `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

  return (
    <div className={`flex items-center ${className} ${
      isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
    }`}>
      {showIcon && (
        isPositive ? (
          <ArrowUpIcon className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 mr-1" />
        )
      )}
      <span className="font-semibold">{displayValue}</span>
    </div>
  )
}

export default ChangeIndicator
