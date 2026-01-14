import { useState, useEffect } from 'react'
import { getPortfolio, getDashboard } from '../services/api'
import PortfolioCard from '../components/PortfolioCard'
import TopMovers from '../components/TopMovers'
import RecentNews from '../components/RecentNews'
import ActiveAlerts from '../components/ActiveAlerts'

const Dashboard = () => {
  const [performance, setPerformance] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Fetch both portfolio and dashboard data in parallel
        const [portfolioResponse, dashboardResponse] = await Promise.all([
          getPortfolio(),
          getDashboard()
        ])
        
        setPerformance(portfolioResponse.data.data)
        setDashboardData(dashboardResponse.data.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>
      
      {loading && (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-6">
          {/* Portfolio Performance Section */}
          {performance && <PortfolioCard performance={performance} />}
          
          {/* Active Alerts Section */}
          {dashboardData && dashboardData.activeAlerts && (
            <ActiveAlerts alerts={dashboardData.activeAlerts} />
          )}
          
          {/* Top Movers and News Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Top Movers (Gainers and Losers stacked) */}
            <div className="lg:col-span-1">
              {dashboardData && (
                <TopMovers 
                  topGainers={dashboardData.topGainers} 
                  topLosers={dashboardData.topLosers}
                  compact={true}
                />
              )}
            </div>

            {/* Right Column - Recent News */}
            <div className="lg:col-span-2">
              {dashboardData && dashboardData.recentNews && (
                <RecentNews news={dashboardData.recentNews} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
