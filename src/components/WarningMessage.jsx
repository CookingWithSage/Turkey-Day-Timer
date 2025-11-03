// WarningMessage component - Display warnings and alerts

function WarningMessage({ type, message, actionableSteps }) {
  if (!type) return null

  const styles = {
    warning: {
      container: 'bg-yellow-50 border-l-4 border-yellow-400 p-4 md:p-5',
      icon: '⚠️',
      iconLabel: 'Warning',
      textColor: 'text-yellow-800',
      role: 'alert',
      ariaLive: 'polite'
    },
    urgent: {
      container: 'bg-red-50 border-l-4 border-red-400 p-4 md:p-5',
      icon: '🚨',
      iconLabel: 'Urgent',
      textColor: 'text-red-800',
      role: 'alert',
      ariaLive: 'assertive'
    },
    info: {
      container: 'bg-blue-50 border-l-4 border-blue-400 p-4 md:p-5',
      icon: 'ℹ️',
      iconLabel: 'Information',
      textColor: 'text-blue-800',
      role: 'status',
      ariaLive: 'polite'
    }
  }

  const style = styles[type] || styles.info

  return (
    <div
      className={`${style.container} rounded-md mb-4`}
      role={style.role}
      aria-live={style.ariaLive}
    >
      <div className="flex items-start gap-3">
        <span
          className="text-2xl md:text-3xl flex-shrink-0"
          role="img"
          aria-label={style.iconLabel}
        >
          {style.icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${style.textColor} mb-2 text-sm md:text-base`}>
            {message}
          </p>
          {actionableSteps && actionableSteps.length > 0 && (
            <div className={`text-xs md:text-sm ${style.textColor} mt-2`}>
              <p className="font-medium mb-1">What to do:</p>
              <ul className="list-disc list-inside space-y-1 leading-relaxed">
                {actionableSteps.map((step, index) => (
                  <li key={index} className="break-words">{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WarningMessage
