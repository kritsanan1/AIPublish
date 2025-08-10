import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock fetch globally
global.fetch = vi.fn()

describe('Authentication API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('handles successful authentication', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockUser),
    } as any)

    // Import after mocking
    const { apiRequest } = await import('@/lib/queryClient')
    const result = await apiRequest('GET', '/api/auth/user')
    expect(result).toEqual(mockUser)
  })

  it('handles authentication failure', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    } as Response)

    await expect(apiRequest('GET', '/api/auth/user')).rejects.toThrow('401: Unauthorized')
  })

  it('handles network errors', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    await expect(apiRequest('GET', '/api/auth/user')).rejects.toThrow('Network error')
  })
})