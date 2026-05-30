export function Spinner({ className, size = 'default' }: { className?: string; size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div
      className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary/30 border-t-primary ${className || ''}`}
    />
  )
}
