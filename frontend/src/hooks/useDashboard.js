import { useState, useEffect } from 'react'
import { getDashboard } from '../services/api'

/**
 * Custom hook for fetching and managing dashboard data
 * @param {number} pollingInterval - Optional polling interval in milliseconds
 * @returns {Object} - Dashboard data, loading state, error, and refetch function
 */
export const useDashboard = (pollingInterval = null) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchDashboard = async () => {
    try {
      setError(null)
      const response = await getDashboard()
      setData(response.data.data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching dashboard:', err)
      setError(err.message || 'Failed to fetch dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    setLoading(true)
    fetchDashboard()
  }

  useEffect(() => {
    fetchDashboard()

    // Set up polling if interval is provided
    if (pollingInterval) {
      const interval = setInterval(() => {
        fetchDashboard()
      }, pollingInterval)

      return () => clearInterval(interval)
    }
  }, [pollingInterval])

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch,
    // Convenience accessors for dashboard data
    topGainers: data?.topGainers || [],
    topLosers: data?.topLosers || [],
    recentNews: data?.recentNews || [],
    activeAlerts: data?.activeAlerts || []
  }
}
