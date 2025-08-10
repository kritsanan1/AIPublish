import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import ContentManagement from '@/pages/content-management'

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

describe('Content Management Component', () => {
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

  it('renders content management interface', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContentManagement />
      </QueryClientProvider>
    )

    expect(screen.getByText('Content Management')).toBeInTheDocument()
    expect(screen.getByTestId('input-search')).toBeInTheDocument()
    expect(screen.getByTestId('select-filter')).toBeInTheDocument()
  })

  it('filters articles by search term', async () => {
    const mockArticles = [
      {
        id: '1',
        title: 'Test Article 1',
        content: 'Content for article 1',
        status: 'published',
        authorId: '1',
        views: 10,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '2',
        title: 'Another Article',
        content: 'Different content',
        status: 'draft',
        authorId: '1',
        views: 5,
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02'
      }
    ]

    const { apiRequest } = await import('@/lib/queryClient')
    vi.mocked(apiRequest).mockResolvedValueOnce(mockArticles)

    render(
      <QueryClientProvider client={queryClient}>
        <ContentManagement />
      </QueryClientProvider>
    )

    const searchInput = screen.getByTestId('input-search')
    fireEvent.change(searchInput, { target: { value: 'Test' } })

    expect(searchInput).toHaveValue('Test')
  })

  it('opens create article dialog', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContentManagement />
      </QueryClientProvider>
    )

    const createButton = screen.getByTestId('button-create-article')
    fireEvent.click(createButton)

    expect(screen.getByText('Create New Article')).toBeInTheDocument()
  })
})