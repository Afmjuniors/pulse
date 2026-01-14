import { useState, useEffect, useCallback } from 'react'

/**
 * Generic hook for API requests with caching and polling
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @param {boolean} options.immediate - Whether to fetch immediately on mount
 * @param {number} options.pollingInterval - Optional polling interval in milliseconds
 * @param {Function} options.onSuccess - Callback on successful fetch
 * @param {Function} options.onError - Callback on error
 * @returns {Object} - Data, loading state, error, and utility functions
 */
export const useApiRequest = (apiFunction, options = {}) => {
  const {
    immediate = true,
    pollingInterval = null,
    onSuccess = null,
    onError = null
  } = options

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const execute = useCallback(async (isInitialLoad = true) => {
    try {
      if (isInitialLoad) {
        setLoading(true)
      } else {
        setIsRefreshing(true)
      }
      
      setError(null)
      const response = await apiFunction()
      const responseData = response.data?.data || response.data
      
      setData(responseData)
      setLastUpdated(new Date())
      
      if (onSuccess) {
        onSuccess(responseData)
      }
    } catch (err) {
      console.error('API request error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Request failed'
      setError(errorMessage)
      
      if (onError) {
        onError(err)
      }
    } finally {
      if (isInitialLoad) {
        setLoading(false)
      } else {
        setIsRefreshing(false)
      }
    }
  }, [apiFunction, onSuccess, onError])

  const refetch = useCallback(() => {
    execute(true)
  }, [execute])

  useEffect(() => {
    if (immediate) {
      execute(true)
    }

    // Set up polling if interval is provided
    if (pollingInterval) {
      const interval = setInterval(() => {
        execute(false)
      }, pollingInterval)

      return () => clearInterval(interval)
    }
  }, [immediate, pollingInterval, execute])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
    setIsRefreshing(false)
    setLastUpdated(null)
  }, [])

  return {
    data,
    loading,
    error,
    lastUpdated,
    isRefreshing,
    refetch,
    execute,
    reset
  }
}
