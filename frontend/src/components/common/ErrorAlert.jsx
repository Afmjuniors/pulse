// Reusable Error Alert Component

const ErrorAlert = ({ title = 'Error', message, className = '' }) => {
  return (
    <div className={`bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg ${className}`}>
      <p className="font-semibold">{title}</p>
      {message && <p className="mt-1">{message}</p>}
    </div>
  )
}

export default ErrorAlert
