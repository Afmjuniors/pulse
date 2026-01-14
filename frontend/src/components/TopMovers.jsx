import { ArrowUpIcon, ArrowDownIcon } from './common'
import { formatCurrency, formatPercent } from '../utils/formatters'

const TopMovers = ({ topGainers, topLosers, compact = false }) => {
  const renderMoverCard = (asset, isGainer) => (
    <div
      key={asset.symbol}
      className={`bg-white dark:bg-gray-800 p-2 rounded-lg border-l-4 ${
        isGainer ? 'border-green-500 dark:border-green-400' : 'border-red-500 dark:border-red-400'
      } hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`font-bold text-gray-900 dark:text-white ${compact ? 'text-sm' : 'text-lg'}`}>
              {asset.symbol}
            </span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
              {asset.type || 'Stock'}
            </span>
          </div>
          <p className={`text-gray-600 dark:text-gray-400 mb-2 ${compact ? 'text-xs truncate' : 'text-sm'}`}>
            {asset.name}
          </p>
          <p className={`font-semibold text-gray-900 dark:text-white ${compact ? 'text-sm' : 'text-lg'}`}>
            {formatCurrency(asset.currentPrice || asset.price)}
          </p>
        </div>
        <div className="text-right">
          <div
            className={`flex items-center justify-end font-semibold ${
              compact ? 'text-sm' : 'text-lg'
            } ${isGainer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
          >
            {isGainer ? (
              <ArrowUpIcon className={`${compact ? 'w-3 h-3' : 'w-5 h-5'} mr-1`} />
            ) : (
              <ArrowDownIcon className={`${compact ? 'w-3 h-3' : 'w-5 h-5'} mr-1`} />
            )}
            <span>{formatPercent(asset.changePercent || asset.change24h)}</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Compact vertical layout
  if (compact) {
    return (
      <div className="space-y-4">
        {/* Top Gainers */}
        <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 p-4 rounded-lg shadow-lg dark:shadow-gray-900/50 border border-green-100 dark:border-green-800">
          <div className="flex items-center mb-3">
            <div className="bg-green-500 dark:bg-green-600 p-2 rounded-lg mr-2">
              <ArrowUpIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top 3 Gainers</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">Best performers</p>
            </div>
          </div>
          <div className="space-y-2">
            {topGainers && topGainers.length > 0 ? (
              topGainers.slice(0, 3).map((asset) => renderMoverCard(asset, true))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">No gainers data available</p>
            )}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800 p-4 rounded-lg shadow-lg dark:shadow-gray-900/50 border border-red-100 dark:border-red-800">
          <div className="flex items-center mb-3">
            <div className="bg-red-500 dark:bg-red-600 p-2 rounded-lg mr-2">
              <ArrowDownIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top 3 Losers</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">Worst performers</p>
            </div>
          </div>
          <div className="space-y-2">
            {topLosers && topLosers.length > 0 ? (
              topLosers.slice(0, 3).map((asset) => renderMoverCard(asset, false))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">No losers data available</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Default horizontal layout
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Top Gainers */}
      <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg shadow-lg border border-green-100">
        <div className="flex items-center mb-4">
          <div className="bg-green-500 p-2 rounded-lg mr-3">
            <ArrowUpIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Top 3 Gainers</h2>
            <p className="text-sm text-gray-600">Best performing assets today</p>
          </div>
        </div>
        <div className="space-y-3">
          {topGainers && topGainers.length > 0 ? (
            topGainers.slice(0, 3).map((asset) => renderMoverCard(asset, true))
          ) : (
            <p className="text-gray-500 text-center py-4">No gainers data available</p>
          )}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-lg shadow-lg border border-red-100">
        <div className="flex items-center mb-4">
          <div className="bg-red-500 p-2 rounded-lg mr-3">
            <ArrowDownIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Top 3 Losers</h2>
            <p className="text-sm text-gray-600">Worst performing assets today</p>
          </div>
        </div>
        <div className="space-y-3">
          {topLosers && topLosers.length > 0 ? (
            topLosers.slice(0, 3).map((asset) => renderMoverCard(asset, false))
          ) : (
            <p className="text-gray-500 text-center py-4">No losers data available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TopMovers
