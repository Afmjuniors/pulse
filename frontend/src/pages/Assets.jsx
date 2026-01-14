import { useState, useEffect } from 'react'
import { useAssets } from '../hooks'
import { 
  Badge, 
  Button, 
  LoadingSpinner, 
  ErrorAlert, 
  SearchInput, 
  SortableTableHeader, 
  Pagination, 
  ChangeIndicator 
} from '../components/common'
import { formatCurrency, formatVolume, formatPercent } from '../utils/formatters'

const Assets = () => {
  // Use the custom hook
  const { stocks, crypto, loading, error } = useAssets()
  
  // Local state for filtering, pagination, search, and sorting
  const [filter, setFilter] = useState('all') // 'all', 'stocks', 'crypto'
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // Items per page
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  // Sort function
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortAssets = (assets) => {
    if (!sortConfig.key) return assets

    return [...assets].sort((a, b) => {
      let aValue, bValue

      switch (sortConfig.key) {
        case 'price':
          aValue = a.price || a.currentPrice || 0
          bValue = b.price || b.currentPrice || 0
          break
        case 'change':
          aValue = a.changePercent || a.change24h || 0
          bValue = b.changePercent || b.change24h || 0
          break
        case 'volume':
          aValue = a.volume || a.volume24h || 0
          bValue = b.volume || b.volume24h || 0
          break
        case 'symbol':
          aValue = a.symbol || ''
          bValue = b.symbol || ''
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        case 'name':
          aValue = a.name || ''
          bValue = b.name || ''
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        default:
          return 0
      }

      if (sortConfig.direction === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
  }

  // Combine and filter assets
  const getFilteredAssets = () => {
    let assets = []
    
    if (filter === 'all' || filter === 'stocks') {
      assets = [...assets, ...stocks.map(stock => ({ ...stock, type: 'Stock' }))]
    }
    
    if (filter === 'all' || filter === 'crypto') {
      assets = [...assets, ...crypto.map(c => ({ ...c, type: 'Crypto' }))]
    }
    
    // Apply search filter
    if (searchTerm) {
      assets = assets.filter(asset => 
        asset.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply sorting
    assets = sortAssets(assets)
    
    return assets
  }

  const filteredAssets = getFilteredAssets()

  // Pagination logic
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem)

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter, searchTerm])



  return (
    <div>
      {/* Header with Title and Filters */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assets</h1>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'primary' : 'default'}
          >
            All ({stocks.length + crypto.length})
          </Button>
          <Button
            onClick={() => setFilter('stocks')}
            variant={filter === 'stocks' ? 'primary' : 'default'}
          >
            Stocks ({stocks.length})
          </Button>
          <Button
            onClick={() => setFilter('crypto')}
            variant={filter === 'crypto' ? 'primary' : 'default'}
          >
            Crypto ({crypto.length})
          </Button>
        </div>
      </div>      {/* Search Bar */}
      <div className="mb-6">
        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by symbol or name..."
          className="max-w-md"
        />
      </div>

      {loading && <LoadingSpinner message="Loading assets..." />}

      {error && <ErrorAlert message={error} className="mb-6" />}

      {!loading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900/50 overflow-hidden">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <SortableTableHeader
                    label="Symbol"
                    sortKey="symbol"
                    currentSortKey={sortConfig.key}
                    currentSortDirection={sortConfig.direction}
                    onSort={handleSort}
                    align="left"
                  />
                  <SortableTableHeader
                    label="Name"
                    sortKey="name"
                    currentSortKey={sortConfig.key}
                    currentSortDirection={sortConfig.direction}
                    onSort={handleSort}
                    align="left"
                  />
                  <SortableTableHeader
                    label="Price"
                    sortKey="price"
                    currentSortKey={sortConfig.key}
                    currentSortDirection={sortConfig.direction}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableTableHeader
                    label="Change"
                    sortKey="change"
                    currentSortKey={sortConfig.key}
                    currentSortDirection={sortConfig.direction}
                    onSort={handleSort}
                    align="right"
                  />
                  <SortableTableHeader
                    label="Volume"
                    sortKey="volume"
                    currentSortKey={sortConfig.key}
                    currentSortDirection={sortConfig.direction}
                    onSort={handleSort}
                    align="right"
                  />
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentAssets.length > 0 ? (
                  currentAssets.map((asset, index) => {
                    const changePercent = asset.changePercent || asset.change24h || 0
                    
                    return (
                      <tr key={`${asset.type}-${asset.symbol}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={asset.type === 'Crypto' ? 'purple' : 'primary'}>
                            {asset.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">{asset.symbol}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-gray-300">{asset.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(asset.price || asset.currentPrice)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <ChangeIndicator 
                            value={changePercent} 
                            formatValue={formatPercent}
                            className="justify-end text-sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatVolume(asset.volume || asset.volume24h || 0)}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      No assets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination and Footer */}
          {filteredAssets.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsInfo={{
                start: indexOfFirstItem + 1,
                end: Math.min(indexOfLastItem, filteredAssets.length),
                total: filteredAssets.length
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Assets
