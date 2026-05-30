import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export type LoginPayload = { username: string; password: string }
export type User = { id: number; username: string; email: string; role: string }
export type AuthResponse = { token: string; user: User }

export type Product = {
  id: number
  name: string
  description: string
  image: string
  category_id: number | null
  sort_order: number
  created_at: string
  updated_at: string
}

export type Category = {
  id: number
  name: string
  icon: string
  sort_order: number
  created_at: string
  updated_at: string
}

export type Partner = {
  id: number
  name: string
  logo: string
  sort_order: number
  created_at: string
  updated_at: string
}

export type Banner = {
  id: number
  title: string
  image: string
  sort_order: number
  created_at: string
  updated_at: string
}

export type ContactInfo = {
  id: number
  phone: string
  email: string
  address: string
  map_url: string
  created_at: string
  updated_at: string
}

export type PaginatedData<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const authApi = {
  login: (data: LoginPayload) => api.post<AuthResponse>('/auth/login', data),
  getMe: () => api.get<{ user: User }>('/auth/me'),
}

export const productsApi = {
  list: (params?: { page?: number; limit?: number; search?: string; categoryId?: number }) =>
    api.get<PaginatedData<Product>>('/products', { params }),
  create: (data: Partial<Product>) => api.post<{ data: Product }>('/products', data),
  update: (id: number, data: Partial<Product>) => api.put<{ data: Product }>(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`),
  getById: (id: number) => api.get<{ data: Product }>(`/products/${id}`),
}

export const categoriesApi = {
  list: () => api.get<{ data: Category[] }>('/categories'),
  create: (data: Partial<Category>) => api.post<{ data: Category }>('/categories', data),
  update: (id: number, data: Partial<Category>) => api.put<{ data: Category }>(`/categories/${id}`, data),
  delete: (id: number) => api.delete(`/categories/${id}`),
}

export const partnersApi = {
  list: () => api.get<{ data: Partner[] }>('/partners'),
  create: (data: Partial<Partner>) => api.post<{ data: Partner }>('/partners', data),
  update: (id: number, data: Partial<Partner>) => api.put<{ data: Partner }>(`/partners/${id}`, data),
  delete: (id: number) => api.delete(`/partners/${id}`),
  updateSort: (id: number, sortOrder: number) => api.put<{ data: Partner }>(`/partners/${id}/sort`, { sortOrder }),
}

export const bannersApi = {
  list: () => api.get<{ data: Banner[] }>('/banners'),
  create: (data: Partial<Banner>) => api.post<{ data: Banner }>('/banners', data),
  update: (id: number, data: Partial<Banner>) => api.put<{ data: Banner }>(`/banners/${id}`, data),
  delete: (id: number) => api.delete(`/banners/${id}`),
  updateSort: (id: number, sortOrder: number) => api.put<{ data: Banner }>(`/banners/${id}/sort`, { sortOrder }),
}

export const contactInfoApi = {
  get: () => api.get<{ data: ContactInfo }>('/contact-info'),
  update: (data: Partial<ContactInfo>) => api.put<{ data: ContactInfo }>('/contact-info', data),
}

export const usersApi = {
  list: () => api.get<{ data: User[] }>('/users'),
  create: (data: { username: string; password: string; email: string; role: string }) => api.post<{ data: User }>('/users', data),
  update: (id: number, data: { username?: string; email?: string; role?: string; password?: string }) => api.put<{ data: User }>(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
}

export { api as default }
