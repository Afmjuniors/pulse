// Reusable Button Component

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    default: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500',
    primary: 'bg-blue-600 dark:bg-blue-500 text-white shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-blue-500',
    danger: 'bg-red-600 dark:bg-red-500 text-white shadow-md hover:bg-red-700 dark:hover:bg-red-600 focus:ring-red-500',
    success: 'bg-green-600 dark:bg-green-500 text-white shadow-md hover:bg-green-700 dark:hover:bg-green-600 focus:ring-green-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
