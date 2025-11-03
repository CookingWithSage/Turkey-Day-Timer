// Button component - Reusable button with variants

function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button', ...props }) {
  // Min 44px height for touch targets (WCAG 2.5.5)
  const baseStyles = 'w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-lg font-semibold text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-offset-2'

  const variantStyles = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800 focus:ring-orange-500 focus-visible:ring-orange-500 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-300',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400 focus-visible:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-100'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
