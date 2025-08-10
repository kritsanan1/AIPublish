import { describe, it, expect } from 'vitest'
import { isUnauthorizedError } from '@/lib/authUtils'

describe('Helper Functions', () => {
  describe('isUnauthorizedError', () => {
    it('returns true for unauthorized errors', () => {
      const error = new Error('401: Unauthorized')
      expect(isUnauthorizedError(error)).toBe(true)
    })

    it('returns false for other errors', () => {
      const error = new Error('500: Internal Server Error')
      expect(isUnauthorizedError(error)).toBe(false)
    })

    it('returns false for non-error objects', () => {
      const error = new Error('Something went wrong')
      expect(isUnauthorizedError(error)).toBe(false)
    })
  })
})