// Core calculation logic for turkey timing
import { subMinutes, subHours, differenceInHours, isBefore } from 'date-fns'
import {
  COOK_TIME_PER_LB,
  OVEN_PREHEAT_TIME,
  REST_TIME,
  THAW_TIME_PER_LB
} from '../constants/turkey.js'

/**
 * Calculate total cook time (including preheat)
 * @param {number} weightLbs - Turkey weight in pounds
 * @returns {number} Total cook time in minutes
 */
export function calculateCookTime(weightLbs) {
  const cookTimeMinutes = weightLbs * COOK_TIME_PER_LB
  return cookTimeMinutes + OVEN_PREHEAT_TIME
}

/**
 * Calculate thaw time for frozen turkey
 * @param {number} weightLbs - Turkey weight in pounds
 * @returns {number} Thaw time in hours
 */
export function calculateThawTime(weightLbs) {
  return weightLbs * THAW_TIME_PER_LB
}

/**
 * Calculate complete turkey schedule
 * @param {number} weightLbs - Turkey weight in pounds
 * @param {boolean} isFrozen - True if frozen, false if fresh
 * @param {Date} servingTime - Desired serving time
 * @returns {Object} Schedule with all key times
 */
export function calculateSchedule(weightLbs, isFrozen, servingTime) {
  const totalCookTimeMinutes = calculateCookTime(weightLbs)
  const cookTimeMinutes = weightLbs * COOK_TIME_PER_LB

  // Work backwards from serving time
  // Step 1: Account for resting time
  const removeFromOven = subMinutes(servingTime, REST_TIME)

  // Step 2: Account for cook time (not including preheat)
  const putInOven = subMinutes(removeFromOven, cookTimeMinutes)

  // Step 3: Account for preheat
  const startPreheat = subMinutes(putInOven, OVEN_PREHEAT_TIME)

  // Step 4: If frozen, account for thaw time
  let startThawing = null
  if (isFrozen) {
    const thawTimeHours = calculateThawTime(weightLbs)
    startThawing = subHours(startPreheat, thawTimeHours)
  }

  return {
    servingTime,
    removeFromOven,
    putInOven,
    startPreheat,
    startThawing,
    totalCookTimeMinutes,
    cookTimeMinutes,
    preheatTimeMinutes: OVEN_PREHEAT_TIME,
    restTimeMinutes: REST_TIME,
    thawTimeHours: isFrozen ? calculateThawTime(weightLbs) : 0
  }
}

/**
 * Validate if there's enough time to thaw
 * @param {Date} startThawingTime - Calculated thaw start time
 * @param {Date} currentTime - Current date/time
 * @returns {boolean} True if enough time, false otherwise
 */
export function hasEnoughThawTime(startThawingTime, currentTime = new Date()) {
  // If startThawingTime is in the past (before current time), we have enough time
  return isBefore(startThawingTime, currentTime)
}

/**
 * Check if cooking needs to start very soon
 * @param {Date} startCookingTime - Calculated cook start time
 * @param {Date} currentTime - Current date/time
 * @returns {boolean} True if <1 hour until cook time
 */
export function isCookingImminent(startCookingTime, currentTime = new Date()) {
  const hoursDifference = differenceInHours(startCookingTime, currentTime)
  return hoursDifference < 1 && isBefore(currentTime, startCookingTime)
}
