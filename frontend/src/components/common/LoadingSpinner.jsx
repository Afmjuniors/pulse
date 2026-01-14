// Reusable Loading Spinner Component

const LoadingSpinner = ({ size = 'md', message = 'Loading...', className = '' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  return (
    <div className={`bg-white dark:bg-gray-800 p-12 rounded-lg shadow dark:shadow-gray-900/50 text-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizes[size]} border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4`}></div>
      {message && <p className="text-gray-600 dark:text-gray-300">{message}</p>}
    </div>
  )
}

export default LoadingSpinner
