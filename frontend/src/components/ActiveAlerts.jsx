// Bell icon component
const BellIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

// Clock icon component
const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)


const ActiveAlerts = ({ alerts }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      return `${diffInMinutes}m`
    } else if (diffInHours < 24) {
      return `${diffInHours}h`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d`
    }
  }

  const getSeverityConfig = (severity) => {
    const configs = {
      'critical': {
        bg: 'bg-red-100',
        text: 'text-red-700',
        dot: 'bg-red-500'
      },
      'high': {
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        dot: 'bg-orange-500'
      },
      'medium': {
        bg: 'bg-yellow-100',
        text: 'text-yellow-700',
        dot: 'bg-yellow-500'
      },
      'low': {
        bg: 'bg-blue-100',
        text: 'text-blue-700',
        dot: 'bg-blue-500'
      },
      'info': {
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        dot: 'bg-gray-500'
      }
    }
    return configs[severity?.toLowerCase()] || configs['info']
  }

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-blue-300 p-4 rounded-lg shadow border border-gray-200">
        <div className="flex items-center text-gray-500 text-sm">
          <BellIcon className="w-4 h-4 mr-2" />
          <span>No active alerts</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Simple Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <BellIcon className="w-4 h-4 text-gray-600 mr-2 " />
          <h3 className="text-sm font-semibold text-gray-900">Active Alerts</h3>
        </div>
        <span className="text-xs text-gray-500">{alerts.length} active</span>
      </div>

      {/* Compact Alerts List */}
      <div className="divide-y divide-gray-100">
        {alerts.slice(0, 5).map((alert, index) => {
          const severityConfig = getSeverityConfig(alert.severity)
          
          return (
            <div
              key={alert.id || index}
              className="px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                {/* Left side - Severity and Message */}
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  {/* Severity Badge */}
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${severityConfig.bg} ${severityConfig.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${severityConfig.dot} mr-1`}></span>
                    {alert.severity?.toUpperCase() || 'INFO'}
                  </span>

                  {/* Alert Message */}
                  <p className="text-sm text-gray-900 truncate">
                    {alert.message || alert.description}
                  </p>

                  {/* Optional Symbol */}
                  {alert.symbol && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                      {alert.symbol}
                    </span>
                  )}
                </div>

                {/* Right side - Timestamp */}
                <div className="flex items-center text-xs text-gray-500 ml-3 flex-shrink-0">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  <span>{formatTimestamp(alert.timestamp || alert.createdAt)}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ActiveAlerts
