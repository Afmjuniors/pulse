import { usePortfolio, useDashboard } from '../hooks'
import { LoadingSpinner, ErrorAlert, RefreshIcon } from '../components/common'
import PortfolioCard from '../components/PortfolioCard'
import TopMovers from '../components/TopMovers'
import RecentNews from '../components/RecentNews'
import ActiveAlerts from '../components/ActiveAlerts'

const Dashboard = () => {
  // Use custom hooks with 30 second polling
  const portfolio = usePortfolio(30000)
  const dashboard = useDashboard(30000)
  
  // Combined loading and error states
  // Combined loading and error states
  const loading = portfolio.loading || dashboard.loading
  const error = portfolio.error || dashboard.error
  const lastUpdated = portfolio.lastUpdated || dashboard.lastUpdated
  const isRefreshing = false // We'll handle this through the hooks

  return (
    <div className="min-h-screen">
      {/* Header with Last Updated Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        {lastUpdated && !loading && (
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            {isRefreshing && (
              <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                <RefreshIcon className="w-4 h-4 animate-spin" />
                <span className="text-xs">Updating...</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {loading && <LoadingSpinner message="Loading dashboard..." className="animate-fadeIn" />}

      {error && <ErrorAlert message={error} className="mb-6 animate-slideDown" />}

      {!loading && !error && (
        <div className="space-y-6 animate-fadeIn">
          {/* Portfolio Performance Section */}
          {portfolio.data && (
            <div className="transition-all duration-300 hover:shadow-lg">
              <PortfolioCard performance={portfolio.data} />
            </div>
          )}
          
          {/* Active Alerts Section */}
          {dashboard.activeAlerts.length > 0 && (
            <div className="transition-all duration-300 hover:shadow-lg">
              <ActiveAlerts alerts={dashboard.activeAlerts} />
            </div>
          )}
          
          {/* Top Movers and News Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Left Column - Top Movers (Gainers and Losers stacked) */}
            <div className="lg:col-span-1 transition-all duration-300 hover:scale-[1.02]">
              <TopMovers 
                topGainers={dashboard.topGainers} 
                topLosers={dashboard.topLosers}
                compact={true}
              />
            </div>

            {/* Right Column - Recent News */}
            <div className="lg:col-span-2 transition-all duration-300 hover:shadow-lg">
              {dashboard.recentNews.length > 0 && (
                <RecentNews news={dashboard.recentNews} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Dashboard