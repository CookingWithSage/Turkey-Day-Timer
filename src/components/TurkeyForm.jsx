// TurkeyForm component - Input form for turkey details
import { useState } from 'react'
import Button from './Button'
import { validateInputs } from '../utils/validation'
import { MIN_TURKEY_WEIGHT, MAX_TURKEY_WEIGHT } from '../constants/turkey'

function TurkeyForm({ onSubmit }) {
  const [weight, setWeight] = useState('')
  const [status, setStatus] = useState('fresh')
  const [servingDate, setServingDate] = useState('')
  const [servingTime, setServingTime] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleWeightBlur = () => {
    setTouched({ ...touched, weight: true })
    if (weight) {
      const weightNum = parseFloat(weight)
      const validation = validateInputs(weightNum, status, new Date())
      if (validation.errors.weight) {
        setErrors({ ...errors, weight: validation.errors.weight })
      } else {
        const { weight: _, ...restErrors } = errors
        setErrors(restErrors)
      }
    }
  }

  const handleServingDateTimeBlur = () => {
    setTouched({ ...touched, servingTime: true })
    if (servingDate && servingTime) {
      const dateTime = new Date(`${servingDate}T${servingTime}`)
      const validation = validateInputs(parseFloat(weight) || 0, status, dateTime)
      if (validation.errors.servingTime) {
        setErrors({ ...errors, servingTime: validation.errors.servingTime })
      } else {
        const { servingTime: _, ...restErrors } = errors
        setErrors(restErrors)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const weightNum = parseFloat(weight)
    const dateTime = new Date(`${servingDate}T${servingTime}`)

    const validation = validateInputs(weightNum, status, dateTime)

    if (!validation.isValid) {
      setErrors(validation.errors)
      setTouched({ weight: true, servingTime: true })
      return
    }

    setErrors({})
    onSubmit({
      weight: weightNum,
      status,
      servingTime: dateTime
    })
  }

  const isFormValid = () => {
    if (!weight || !servingDate || !servingTime) {
      console.log('Form incomplete:', { weight, servingDate, servingTime })
      return false
    }
    const weightNum = parseFloat(weight)
    const dateTime = new Date(`${servingDate}T${servingTime}`)
    console.log('Validating:', { weightNum, status, dateTime })
    const validation = validateInputs(weightNum, status, dateTime)
    console.log('Validation result:', validation)
    return validation.isValid
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* DEBUG INFO */}
      <div className="bg-gray-100 p-3 rounded text-xs">
        <strong>Debug Info:</strong>
        <div>Weight: {weight || 'empty'}</div>
        <div>Date: {servingDate || 'empty'}</div>
        <div>Time: {servingTime || 'empty'}</div>
        <div>Form Valid: {isFormValid() ? 'YES' : 'NO'}</div>
        <div>Errors: {JSON.stringify(errors)}</div>
      </div>

      {/* Weight Input */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
          Turkey Weight (lbs)
        </label>
        <input
          type="number"
          id="weight"
          min={MIN_TURKEY_WEIGHT}
          max={MAX_TURKEY_WEIGHT}
          step="0.5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onBlur={handleWeightBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            touched.weight && errors.weight ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter weight (8-30 lbs)"
        />
        <p className="text-xs text-gray-500 mt-1">Typically 1-1.5 lbs per person</p>
        {touched.weight && errors.weight && (
          <p className="text-sm text-red-600 mt-1">{errors.weight}</p>
        )}
      </div>

      {/* Status Radio Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Turkey Status
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="status"
              value="fresh"
              checked={status === 'fresh'}
              onChange={(e) => setStatus(e.target.value)}
              className="w-4 h-4 text-orange-600 focus:ring-orange-500"
            />
            <span className="ml-2 text-gray-700">Fresh</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="status"
              value="frozen"
              checked={status === 'frozen'}
              onChange={(e) => setStatus(e.target.value)}
              className="w-4 h-4 text-orange-600 focus:ring-orange-500"
            />
            <span className="ml-2 text-gray-700">Frozen</span>
          </label>
        </div>
      </div>

      {/* Serving Date & Time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Serving Date & Time
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            value={servingDate}
            onChange={(e) => setServingDate(e.target.value)}
            onBlur={handleServingDateTimeBlur}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              touched.servingTime && errors.servingTime ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <input
            type="time"
            value={servingTime}
            onChange={(e) => setServingTime(e.target.value)}
            onBlur={handleServingDateTimeBlur}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              touched.servingTime && errors.servingTime ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        </div>
        {touched.servingTime && errors.servingTime && (
          <p className="text-sm text-red-600 mt-1">{errors.servingTime}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        disabled={!isFormValid()}
      >
        Calculate Schedule
      </Button>
    </form>
  )
}

export default TurkeyForm
