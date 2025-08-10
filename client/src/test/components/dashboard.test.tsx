import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import Dashboard from '@/pages/dashboard'

// Mock the hooks
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    isLoading: false,
    user: { id: '1', email: 'test@example.com' }
  })
}))

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

// Mock API responses
vi.mock('@/lib/queryClient', () => ({
  apiRequest: vi.fn(),
  queryClient: new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
}))

describe('Dashboard Component', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    })
    vi.clearAllMocks()
  })

  it('renders dashboard with authenticated user', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    )

    expect(screen.getByTestId('dashboard-container')).toBeInTheDocument()
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument()
  })

  it('displays analytics stats when data is loaded', async () => {
    mockApiRequest.mockResolvedValueOnce({
      totalArticles: 10,
      totalViews: 1500,
      totalUsers: 25,
      totalRevenue: 5000
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('บทความทั้งหมด')).toBeInTheDocument()
      expect(screen.getByText('จำนวนผู้เข้าชม')).toBeInTheDocument()
      expect(screen.getByText('ผู้ใช้งาน')).toBeInTheDocument()
      expect(screen.getByText('รายได้')).toBeInTheDocument()
    })
  })
})