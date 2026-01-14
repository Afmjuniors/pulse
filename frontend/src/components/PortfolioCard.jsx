import { ArrowUpIcon, ArrowDownIcon } from './common'
import { formatCurrency, formatPercent } from '../utils/formatters'

const PortfolioCard = ({ performance }) => {
  if (!performance) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/50">
        <p className="text-gray-500 dark:text-gray-400">Loading portfolio data...</p>
      </div>
    )
  }

  const { 
    totalValue, 
    totalChange, 
    totalChangePercent, 
    assets
  } = performance

  // Calculate best and worst performers
  const bestPerformer = assets.reduce((best, asset) => 
    asset.changePercent > best.changePercent ? asset : best
  )
  
  const worstPerformer = assets.reduce((worst, asset) => 
    asset.changePercent < worst.changePercent ? asset : worst
  )

  // Calculate asset allocation
  const assetAllocation = assets.map(asset => ({
    assetId: asset.assetId,
    percentage: (asset.value / totalValue) * 100,
    value: asset.value,
    quantity: asset.quantity,
    currentPrice: asset.currentPrice
  }))

  const isPositiveChange = totalChange >= 0

  return (
    <div className="space-y-6">
      {/* Total Portfolio Value Card */}
      <div className="bg-gradient-to-br from-blue-200 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-black dark:text-white p-4 rounded-lg shadow-lg dark:shadow-gray-900/50 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
        <h2 className="text-xl font-semibold mb-2 opacity-90 dark:opacity-100">Total Portfolio Value</h2>
        <p className="text-4xl font-bold mb-4">{formatCurrency(totalValue)}</p>
        </div>
        <div className={`flex items-center space-x-2 ${isPositiveChange ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositiveChange ? (
            <ArrowUpIcon className="w-5 h-5" />
          ) : (
            <ArrowDownIcon className="w-5 h-5" />
          )}
          <span className="text-xl font-semibold">
            {formatCurrency(Math.abs(totalChange))} ({formatPercent(totalChangePercent)})
          </span>
        </div>
      </div>

     
    </div>
  )
}

export default PortfolioCard
