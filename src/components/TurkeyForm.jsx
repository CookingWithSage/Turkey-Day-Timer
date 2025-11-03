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
    if (!weight || !servingDate || !servingTime) return false
    const weightNum = parseFloat(weight)
    const dateTime = new Date(`${servingDate}T${servingTime}`)
    const validation = validateInputs(weightNum, status, dateTime)
    return validation.isValid
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Turkey cooking calculator form">
      {/* Weight Input */}
      <div>
        <label htmlFor="weight" className="block text-sm md:text-base font-medium text-gray-700 mb-2">
          Turkey Weight (lbs)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          min={MIN_TURKEY_WEIGHT}
          max={MAX_TURKEY_WEIGHT}
          step="0.5"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onBlur={handleWeightBlur}
          className={`w-full px-4 py-3 md:py-2 border rounded-lg text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
            touched.weight && errors.weight ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter weight (8-30 lbs)"
          aria-describedby="weight-helper weight-error"
          aria-invalid={touched.weight && errors.weight ? 'true' : 'false'}
        />
        <p id="weight-helper" className="text-xs md:text-sm text-gray-500 mt-1">
          Typically 1-1.5 lbs per person
        </p>
        {touched.weight && errors.weight && (
          <p id="weight-error" className="text-sm text-red-600 mt-1" role="alert">
            {errors.weight}
          </p>
        )}
      </div>

      {/* Status Radio Buttons */}
      <fieldset>
        <legend className="block text-sm md:text-base font-medium text-gray-700 mb-2">
          Turkey Status
        </legend>
        <div className="flex gap-4 md:gap-6">
          <label className="flex items-center cursor-pointer min-h-[44px]">
            <input
              type="radio"
              name="status"
              value="fresh"
              checked={status === 'fresh'}
              onChange={(e) => setStatus(e.target.value)}
              className="w-5 h-5 md:w-4 md:h-4 text-orange-600 focus:ring-orange-500 focus:ring-2"
              aria-label="Fresh turkey"
            />
            <span className="ml-2 text-base md:text-sm text-gray-700">Fresh</span>
          </label>
          <label className="flex items-center cursor-pointer min-h-[44px]">
            <input
              type="radio"
              name="status"
              value="frozen"
              checked={status === 'frozen'}
              onChange={(e) => setStatus(e.target.value)}
              className="w-5 h-5 md:w-4 md:h-4 text-orange-600 focus:ring-orange-500 focus:ring-2"
              aria-label="Frozen turkey"
            />
            <span className="ml-2 text-base md:text-sm text-gray-700">Frozen</span>
          </label>
        </div>
      </fieldset>

      {/* Serving Date & Time */}
      <div>
        <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
          Serving Date & Time
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="date"
            name="serving-date"
            value={servingDate}
            onChange={(e) => setServingDate(e.target.value)}
            onBlur={handleServingDateTimeBlur}
            className={`px-4 py-3 md:py-2 border rounded-lg text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
              touched.servingTime && errors.servingTime ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-label="Serving date"
            aria-describedby="datetime-error"
            aria-invalid={touched.servingTime && errors.servingTime ? 'true' : 'false'}
          />
          <input
            type="time"
            name="serving-time"
            value={servingTime}
            onChange={(e) => setServingTime(e.target.value)}
            onBlur={handleServingDateTimeBlur}
            className={`px-4 py-3 md:py-2 border rounded-lg text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
              touched.servingTime && errors.servingTime ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-label="Serving time"
            aria-describedby="datetime-error"
            aria-invalid={touched.servingTime && errors.servingTime ? 'true' : 'false'}
          />
        </div>
        {touched.servingTime && errors.servingTime && (
          <p id="datetime-error" className="text-sm text-red-600 mt-1" role="alert">
            {errors.servingTime}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          disabled={!isFormValid()}
          aria-label="Calculate turkey cooking schedule"
        >
          Calculate Schedule
        </Button>
      </div>
    </form>
  )
}

export default TurkeyForm
