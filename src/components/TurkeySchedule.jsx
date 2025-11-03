// TurkeySchedule component - Display calculated schedule
import { format } from 'date-fns'
import Button from './Button'
import WarningMessage from './WarningMessage'
import { hasEnoughThawTime, isCookingImminent } from '../utils/calculations'

function TurkeySchedule({ schedule, weight, status, onStartOver }) {
  const formatDateTime = (date) => {
    return format(date, 'EEE, MMM d @ h:mm a')
  }

  const formatTime = (date) => {
    return format(date, 'h:mm a')
  }

  // Check for warnings
  const warnings = []

  if (status === 'frozen' && schedule.startThawing) {
    const enoughTime = hasEnoughThawTime(schedule.startThawing, new Date())
    if (!enoughTime) {
      warnings.push({
        type: 'warning',
        message: 'Insufficient time to thaw in refrigerator!',
        actionableSteps: [
          'Consider purchasing a fresh turkey instead',
          'Use cold water thawing method (30 min per lb, change water every 30 min)',
          'Never thaw at room temperature (food safety risk)'
        ]
      })
    }
  }

  if (schedule.startPreheat) {
    const imminent = isCookingImminent(schedule.startPreheat, new Date())
    if (imminent) {
      warnings.push({
        type: 'urgent',
        message: 'Cooking time is less than 1 hour away!',
        actionableSteps: [
          'Start preheating your oven to 325°F NOW',
          'Prepare your roasting pan and rack',
          'Get your turkey ready'
        ]
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Warnings */}
      {warnings.map((warning, index) => (
        <WarningMessage
          key={index}
          type={warning.type}
          message={warning.message}
          actionableSteps={warning.actionableSteps}
        />
      ))}

      {/* Summary Header */}
      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your Turkey Schedule</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Weight:</span>
            <span className="font-semibold text-gray-800 ml-1">{weight} lbs</span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span className="font-semibold text-gray-800 ml-1 capitalize">{status}</span>
          </div>
          <div>
            <span className="text-gray-600">Serving:</span>
            <span className="font-semibold text-gray-800 ml-1">{formatTime(schedule.servingTime)}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Timeline</h3>

        {/* Start Thawing - Frozen only */}
        {status === 'frozen' && schedule.startThawing && (
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <span className="text-3xl">❄️</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">Start Thawing</div>
              <div className="text-sm text-gray-600">{formatDateTime(schedule.startThawing)}</div>
              <div className="text-xs text-gray-500 mt-1">
                Place turkey in refrigerator ({schedule.thawTimeHours} hours / {Math.round(schedule.thawTimeHours / 24)} days)
              </div>
            </div>
          </div>
        )}

        {/* Start Cooking (Preheat) */}
        <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
          <span className="text-3xl">🔥</span>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">Start Cooking</div>
            <div className="text-sm text-gray-600">{formatDateTime(schedule.startPreheat)}</div>
            <div className="text-xs text-gray-500 mt-1">
              Preheat oven to 325°F ({schedule.preheatTimeMinutes} min)
            </div>
          </div>
        </div>

        {/* Put in Oven */}
        <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <span className="text-3xl">🦃</span>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">Put Turkey in Oven</div>
            <div className="text-sm text-gray-600">{formatDateTime(schedule.putInOven)}</div>
            <div className="text-xs text-gray-500 mt-1">
              Cook for {schedule.cookTimeMinutes} minutes ({Math.floor(schedule.cookTimeMinutes / 60)}h {schedule.cookTimeMinutes % 60}m)
            </div>
          </div>
        </div>

        {/* Remove from Oven */}
        <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
          <span className="text-3xl">⏰</span>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">Remove from Oven</div>
            <div className="text-sm text-gray-600">{formatDateTime(schedule.removeFromOven)}</div>
            <div className="text-xs text-gray-500 mt-1">
              Internal temp should reach 165°F
            </div>
          </div>
        </div>

        {/* Ready to Serve */}
        <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
          <span className="text-3xl">🍗</span>
          <div className="flex-1">
            <div className="font-semibold text-gray-800">Ready to Serve</div>
            <div className="text-sm text-gray-600">{formatDateTime(schedule.servingTime)}</div>
            <div className="text-xs text-gray-500 mt-1">
              After {schedule.restTimeMinutes} min rest period
            </div>
          </div>
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Why the rest period?</h4>
        <p className="text-sm text-blue-800">
          Letting your turkey rest for {schedule.restTimeMinutes} minutes after cooking allows the juices to
          redistribute throughout the meat, making it more tender and flavorful. This also makes carving easier!
        </p>
      </div>

      {/* Start Over Button */}
      <div className="flex justify-center pt-4">
        <Button variant="secondary" onClick={onStartOver}>
          Start Over
        </Button>
      </div>
    </div>
  )
}

export default TurkeySchedule
