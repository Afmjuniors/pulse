import { useState, useEffect } from 'react'
import { getStocks, getCrypto } from '../services/api'

/**
 * Custom hook for fetching and managing assets data (stocks and crypto)
 * @param {Object} options - Configuration options
 * @param {number} options.pollingInterval - Optional polling interval in milliseconds
 * @param {string} options.filter - Filter type: 'all', 'stocks', or 'crypto'
 * @returns {Object} - Assets data, loading state, error, and utility functions
 */
export const useAssets = ({ pollingInterval = null, filter = 'all' } = {}) => {
  const [stocks, setStocks] = useState([])
  const [crypto, setCrypto] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchAssets = async () => {
    try {
      setError(null)
      const [stocksResponse, cryptoResponse] = await Promise.all([
        getStocks(),
        getCrypto()
      ])
      
      setStocks(stocksResponse.data || [])
      setCrypto(cryptoResponse.data || [])
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching assets:', err)
      setError(err.message || 'Failed to fetch assets data')
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    setLoading(true)
    fetchAssets()
  }

  useEffect(() => {
    fetchAssets()

    // Set up polling if interval is provided
    if (pollingInterval) {
      const interval = setInterval(() => {
        fetchAssets()
      }, pollingInterval)

      return () => clearInterval(interval)
    }
  }, [pollingInterval])

  // Get filtered assets based on filter type
  const getFilteredAssets = () => {
    const stocksWithType = stocks.map(stock => ({ ...stock, type: 'Stock' }))
    const cryptoWithType = crypto.map(c => ({ ...c, type: 'Crypto' }))

    switch (filter) {
      case 'stocks':
        return stocksWithType
      case 'crypto':
        return cryptoWithType
      case 'all':
      default:
        return [...stocksWithType, ...cryptoWithType]
    }
  }

  return {
    stocks,
    crypto,
    allAssets: getFilteredAssets(),
    loading,
    error,
    lastUpdated,
    refetch
  }
}
