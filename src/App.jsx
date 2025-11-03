import { useState } from 'react'
import TurkeyForm from './components/TurkeyForm'
import TurkeySchedule from './components/TurkeySchedule'
import { calculateSchedule } from './utils/calculations'

function App() {
  const [screen, setScreen] = useState('form') // 'form' or 'schedule'
  const [turkeyData, setTurkeyData] = useState(null)
  const [schedule, setSchedule] = useState(null)

  const handleFormSubmit = (formData) => {
    // Calculate the schedule
    const calculatedSchedule = calculateSchedule(
      formData.weight,
      formData.status === 'frozen',
      formData.servingTime
    )

    // Store the data and schedule
    setTurkeyData(formData)
    setSchedule(calculatedSchedule)

    // Switch to schedule screen
    setScreen('schedule')
  }

  const handleStartOver = () => {
    setScreen('form')
    setTurkeyData(null)
    setSchedule(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            <span role="img" aria-label="Turkey">🦃</span> Turkey Timer
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Perfect turkey timing for the holidays
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
            {screen === 'form' && (
              <div role="region" aria-label="Input form">
                <TurkeyForm onSubmit={handleFormSubmit} />
              </div>
            )}

            {screen === 'schedule' && schedule && turkeyData && (
              <TurkeySchedule
                schedule={schedule}
                weight={turkeyData.weight}
                status={turkeyData.status}
                onStartOver={handleStartOver}
              />
            )}
          </div>
        </main>

        <footer className="text-center mt-6 sm:mt-8 px-4">
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Cook times based on USDA guidelines. Always verify internal temperature reaches 165°F.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
