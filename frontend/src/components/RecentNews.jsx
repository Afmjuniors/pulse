// Clock icon component
const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// News icon component
const NewsIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
)

const RecentNews = ({ news }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      'market': 'bg-blue-100 text-blue-800 border-blue-200',
      'crypto': 'bg-purple-100 text-purple-800 border-purple-200',
      'stock': 'bg-green-100 text-green-800 border-green-200',
      'earnings': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'economy': 'bg-red-100 text-red-800 border-red-200',
      'technology': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'finance': 'bg-teal-100 text-teal-800 border-teal-200',
      'default': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category?.toLowerCase()] || colors['default']
  }

  if (!news || news.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center py-8">
          <NewsIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No recent news available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-3">
        <div className="flex items-center">
          <NewsIcon className="w-6 h-6 text-black mr-3" />
          <h2 className="text-xl font-bold text-black">Recent News Feed</h2>
        </div>
        <p className="text-gray-700 text-sm mt-1">Latest market updates and insights</p>
      </div>

      {/* News Items */}
      <div className="divide-y divide-gray-200">
        {news.slice(0, 5).map((item, index) => (
          <div
            key={item.id || index}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              {/* Category Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                  item.category
                )}`}
              >
                {item.category || 'News'}
              </span>

              {/* Timestamp */}
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{formatTimestamp(item.timestamp || item.publishedAt)}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>

            {/* Source and Additional Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  {item.source || item.publisher}
                </span>
                {item.symbol && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {item.symbol}
                  </span>
                )}
              </div>
              
              {item.sentiment && (
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.sentiment === 'positive'
                      ? 'bg-green-100 text-green-700'
                      : item.sentiment === 'negative'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {item.sentiment}
                </span>
              )}
            </div>

            {/* Optional Description */}
            {item.description && (
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer - View All Link */}
      {news.length > 5 && (
        <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-200">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            View all news ({news.length} total)
          </button>
        </div>
      )}
    </div>
  )
}

export default RecentNews
