import { describe, it, expect } from 'vitest'
import { addHours, addMinutes } from 'date-fns'
import {
  calculateCookTime,
  calculateThawTime,
  calculateSchedule,
  hasEnoughThawTime,
  isCookingImminent
} from '../src/utils/calculations.js'
import {
  validateWeight,
  validateServingTime,
  validateInputs
} from '../src/utils/validation.js'

describe('calculateCookTime', () => {
  it('should calculate correct cook time for 16lb turkey (208 + 30 preheat = 238 min)', () => {
    const result = calculateCookTime(16)
    expect(result).toBe(238) // 16 * 13 + 30
  })

  it('should calculate correct cook time for 8lb turkey (minimum)', () => {
    const result = calculateCookTime(8)
    expect(result).toBe(134) // 8 * 13 + 30
  })

  it('should calculate correct cook time for 30lb turkey (maximum)', () => {
    const result = calculateCookTime(30)
    expect(result).toBe(420) // 30 * 13 + 30
  })
})

describe('calculateThawTime', () => {
  it('should calculate correct thaw time for 16lb frozen turkey (96 hours)', () => {
    const result = calculateThawTime(16)
    expect(result).toBe(96) // 16 * 6
  })

  it('should calculate correct thaw time for 8lb turkey', () => {
    const result = calculateThawTime(8)
    expect(result).toBe(48) // 8 * 6
  })

  it('should calculate correct thaw time for 30lb turkey', () => {
    const result = calculateThawTime(30)
    expect(result).toBe(180) // 30 * 6
  })
})

describe('calculateSchedule', () => {
  it('should calculate correct schedule for 16lb fresh turkey', () => {
    const servingTime = new Date('2024-11-28T15:00:00')
    const schedule = calculateSchedule(16, false, servingTime)

    expect(schedule.servingTime).toEqual(servingTime)
    expect(schedule.totalCookTimeMinutes).toBe(238)
    expect(schedule.cookTimeMinutes).toBe(208)
    expect(schedule.preheatTimeMinutes).toBe(30)
    expect(schedule.restTimeMinutes).toBe(25)
    expect(schedule.thawTimeHours).toBe(0)
    expect(schedule.startThawing).toBeNull()

    // Verify backwards calculation
    // Serving: 3:00 PM
    // Remove from oven: 3:00 PM - 25 min = 2:35 PM
    expect(schedule.removeFromOven).toEqual(addMinutes(servingTime, -25))

    // Put in oven: 2:35 PM - 208 min (3h 28m) = 11:07 AM
    expect(schedule.putInOven).toEqual(addMinutes(schedule.removeFromOven, -208))

    // Start preheat: 11:07 AM - 30 min = 10:37 AM
    expect(schedule.startPreheat).toEqual(addMinutes(schedule.putInOven, -30))
  })

  it('should calculate correct schedule for 16lb frozen turkey', () => {
    const servingTime = new Date('2024-11-28T15:00:00')
    const schedule = calculateSchedule(16, true, servingTime)

    expect(schedule.servingTime).toEqual(servingTime)
    expect(schedule.thawTimeHours).toBe(96)
    expect(schedule.startThawing).not.toBeNull()

    // Verify thaw time is calculated correctly
    // Start preheat - 96 hours = start thawing
    expect(schedule.startThawing).toEqual(addHours(schedule.startPreheat, -96))
  })

  it('should calculate correct schedule for 8lb fresh turkey', () => {
    const servingTime = new Date('2024-11-28T15:00:00')
    const schedule = calculateSchedule(8, false, servingTime)

    expect(schedule.totalCookTimeMinutes).toBe(134) // 8 * 13 + 30
    expect(schedule.cookTimeMinutes).toBe(104)
    expect(schedule.startThawing).toBeNull()
  })

  it('should calculate correct schedule for 30lb frozen turkey', () => {
    const servingTime = new Date('2024-11-28T15:00:00')
    const schedule = calculateSchedule(30, true, servingTime)

    expect(schedule.totalCookTimeMinutes).toBe(420) // 30 * 13 + 30
    expect(schedule.thawTimeHours).toBe(180) // 30 * 6
    expect(schedule.startThawing).not.toBeNull()
  })
})

describe('hasEnoughThawTime', () => {
  it('should return true when thaw start time is in the past', () => {
    const startThawingTime = new Date('2024-11-24T10:00:00')
    const currentTime = new Date('2024-11-28T10:00:00')
    expect(hasEnoughThawTime(startThawingTime, currentTime)).toBe(true)
  })

  it('should return false when thaw start time is in the future', () => {
    const startThawingTime = new Date('2024-11-28T10:00:00')
    const currentTime = new Date('2024-11-24T10:00:00')
    expect(hasEnoughThawTime(startThawingTime, currentTime)).toBe(false)
  })
})

describe('isCookingImminent', () => {
  it('should return true when cooking starts in less than 1 hour', () => {
    const currentTime = new Date('2024-11-28T10:00:00')
    const startCookingTime = new Date('2024-11-28T10:30:00')
    expect(isCookingImminent(startCookingTime, currentTime)).toBe(true)
  })

  it('should return false when cooking starts in more than 1 hour', () => {
    const currentTime = new Date('2024-11-28T10:00:00')
    const startCookingTime = new Date('2024-11-28T12:00:00')
    expect(isCookingImminent(startCookingTime, currentTime)).toBe(false)
  })

  it('should return false when cooking time has already passed', () => {
    const currentTime = new Date('2024-11-28T12:00:00')
    const startCookingTime = new Date('2024-11-28T10:00:00')
    expect(isCookingImminent(startCookingTime, currentTime)).toBe(false)
  })
})

describe('validateWeight', () => {
  it('should validate weight within valid range', () => {
    const result = validateWeight(16)
    expect(result.isValid).toBe(true)
    expect(result.error).toBeNull()
  })

  it('should reject weight below minimum', () => {
    const result = validateWeight(7)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('between 8 and 30')
  })

  it('should reject weight above maximum', () => {
    const result = validateWeight(31)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('between 8 and 30')
  })

  it('should accept minimum weight (8)', () => {
    const result = validateWeight(8)
    expect(result.isValid).toBe(true)
  })

  it('should accept maximum weight (30)', () => {
    const result = validateWeight(30)
    expect(result.isValid).toBe(true)
  })

  it('should reject non-numeric weight', () => {
    const result = validateWeight('sixteen')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('valid number')
  })

  it('should reject NaN', () => {
    const result = validateWeight(NaN)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('valid number')
  })
})

describe('validateServingTime', () => {
  it('should validate future serving time', () => {
    const futureTime = addHours(new Date(), 24)
    const result = validateServingTime(futureTime)
    expect(result.isValid).toBe(true)
    expect(result.error).toBeNull()
  })

  it('should reject past serving time', () => {
    const pastTime = addHours(new Date(), -24)
    const result = validateServingTime(pastTime)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('must be in the future')
  })

  it('should reject invalid date', () => {
    const result = validateServingTime('not a date')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('valid date')
  })

  it('should reject invalid Date object', () => {
    const result = validateServingTime(new Date('invalid'))
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('valid date')
  })
})

describe('validateInputs', () => {
  it('should validate all correct inputs', () => {
    const futureTime = addHours(new Date(), 24)
    const result = validateInputs(16, 'frozen', futureTime)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('should validate "fresh" status', () => {
    const futureTime = addHours(new Date(), 24)
    const result = validateInputs(16, 'fresh', futureTime)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('should collect multiple validation errors', () => {
    const pastTime = addHours(new Date(), -24)
    const result = validateInputs(5, 'thawed', pastTime)
    expect(result.isValid).toBe(false)
    expect(result.errors.weight).toBeDefined()
    expect(result.errors.status).toBeDefined()
    expect(result.errors.servingTime).toBeDefined()
  })

  it('should reject invalid status', () => {
    const futureTime = addHours(new Date(), 24)
    const result = validateInputs(16, 'defrosted', futureTime)
    expect(result.isValid).toBe(false)
    expect(result.errors.status).toContain('fresh')
    expect(result.errors.status).toContain('frozen')
  })

  it('should collect only relevant errors', () => {
    const futureTime = addHours(new Date(), 24)
    const result = validateInputs(5, 'frozen', futureTime)
    expect(result.isValid).toBe(false)
    expect(result.errors.weight).toBeDefined()
    expect(result.errors.status).toBeUndefined()
    expect(result.errors.servingTime).toBeUndefined()
  })
})
