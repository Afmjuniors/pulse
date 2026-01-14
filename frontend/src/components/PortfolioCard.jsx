// Icons components
const ArrowUpIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 4l8 8h-6v8h-4v-8H4z" />
  </svg>
)

const ArrowDownIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 20l-8-8h6V4h4v8h6z" />
  </svg>
)

const PortfolioCard = ({ performance }) => {
  if (!performance) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500">Loading portfolio data...</p>
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatPercent = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      {/* Total Portfolio Value Card */}
      <div className="bg-gradient-to-br from-blue-200 to-blue-200 text-black p-4 rounded-lg shadow-lg flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
        <h2 className="text-xl font-semibold mb-2 opacity-90">Total Portfolio Value</h2>
        <p className="text-4xl font-bold mb-4">{formatCurrency(totalValue)}</p>
        </div>
        <div className={`flex items-center space-x-2 ${isPositiveChange ? 'text-green-500' : 'text-red-100'}`}>
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
