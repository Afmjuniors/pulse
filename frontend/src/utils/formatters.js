// Utility functions for formatting values

/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

/**
 * Format a large number as volume (with B, M, K suffixes)
 */
export const formatVolume = (value) => {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`
  }
  return `$${value.toFixed(2)}`
}

/**
 * Format a number as percentage with + or - sign
 */
export const formatPercent = (value) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

/**
 * Format a date object to locale string
 */
export const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Format a date object to time string
 */
export const formatTime = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

/**
 * Format a date object to datetime string
 */
export const formatDateTime = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Shorten a long number (e.g., 1,234,567 -> 1.2M)
 */
export const formatShortNumber = (value) => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`
  }
  return value.toString()
}
