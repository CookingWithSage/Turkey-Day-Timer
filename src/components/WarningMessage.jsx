// WarningMessage component - Display warnings and alerts

function WarningMessage({ type, message, actionableSteps }) {
  if (!type) return null

  const styles = {
    warning: {
      container: 'bg-yellow-50 border-l-4 border-yellow-400 p-4',
      icon: '⚠️',
      textColor: 'text-yellow-800'
    },
    urgent: {
      container: 'bg-red-50 border-l-4 border-red-400 p-4',
      icon: '🚨',
      textColor: 'text-red-800'
    },
    info: {
      container: 'bg-blue-50 border-l-4 border-blue-400 p-4',
      icon: 'ℹ️',
      textColor: 'text-blue-800'
    }
  }

  const style = styles[type] || styles.info

  return (
    <div className={`${style.container} rounded-md mb-4`}>
      <div className="flex items-start">
        <span className="text-2xl mr-3">{style.icon}</span>
        <div className="flex-1">
          <p className={`font-semibold ${style.textColor} mb-2`}>{message}</p>
          {actionableSteps && actionableSteps.length > 0 && (
            <div className={`text-sm ${style.textColor} mt-2`}>
              <p className="font-medium mb-1">What to do:</p>
              <ul className="list-disc list-inside space-y-1">
                {actionableSteps.map((step, index) => (
                  <li key={index}>{step}</li>
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
