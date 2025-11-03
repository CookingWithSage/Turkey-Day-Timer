// Input validation functions
import { isAfter } from 'date-fns'
import { MIN_TURKEY_WEIGHT, MAX_TURKEY_WEIGHT } from '../constants/turkey.js'

/**
 * Validate turkey weight
 * @param {number} weight - Weight in pounds
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export function validateWeight(weight) {
  // Check if weight is a number
  if (typeof weight !== 'number' || isNaN(weight)) {
    return { isValid: false, error: 'Weight must be a valid number' }
  }

  // Check if weight is within valid range
  if (weight < MIN_TURKEY_WEIGHT || weight > MAX_TURKEY_WEIGHT) {
    return {
      isValid: false,
      error: `Weight must be between ${MIN_TURKEY_WEIGHT} and ${MAX_TURKEY_WEIGHT} pounds`
    }
  }

  return { isValid: true, error: null }
}

/**
 * Validate serving time is in the future
 * @param {Date} servingTime - Desired serving time
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export function validateServingTime(servingTime) {
  // Check if servingTime is a valid Date object
  if (!(servingTime instanceof Date) || isNaN(servingTime.getTime())) {
    return { isValid: false, error: 'Serving time must be a valid date' }
  }

  // Check if serving time is in the future
  const now = new Date()
  if (!isAfter(servingTime, now)) {
    return { isValid: false, error: 'Serving time must be in the future' }
  }

  return { isValid: true, error: null }
}

/**
 * Validate all inputs
 * @param {number} weight - Turkey weight
 * @param {string} status - "fresh" or "frozen"
 * @param {Date} servingTime - Serving time
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export function validateInputs(weight, status, servingTime) {
  const errors = {}

  // Validate weight
  const weightValidation = validateWeight(weight)
  if (!weightValidation.isValid) {
    errors.weight = weightValidation.error
  }

  // Validate status
  if (status !== 'fresh' && status !== 'frozen') {
    errors.status = 'Status must be either "fresh" or "frozen"'
  }

  // Validate serving time
  const timeValidation = validateServingTime(servingTime)
  if (!timeValidation.isValid) {
    errors.servingTime = timeValidation.error
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
