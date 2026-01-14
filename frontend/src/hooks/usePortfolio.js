import { useState, useEffect } from 'react'
import { getPortfolio } from '../services/api'

/**
 * Custom hook for fetching and managing portfolio data
 * @param {number} pollingInterval - Optional polling interval in milliseconds
 * @returns {Object} - Portfolio data, loading state, error, and refetch function
 */
export const usePortfolio = (pollingInterval = null) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchPortfolio = async () => {
    try {
      setError(null)
      const response = await getPortfolio()
      setData(response.data.data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching portfolio:', err)
      setError(err.message || 'Failed to fetch portfolio data')
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    setLoading(true)
    fetchPortfolio()
  }

  useEffect(() => {
    fetchPortfolio()

    // Set up polling if interval is provided
    if (pollingInterval) {
      const interval = setInterval(() => {
        fetchPortfolio()
      }, pollingInterval)

      return () => clearInterval(interval)
    }
  }, [pollingInterval])

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch
  }
}
