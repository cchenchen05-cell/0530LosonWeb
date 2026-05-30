import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
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
export type RegisterPayload = { username: string; password: string; name: string }
export type User = { id: string; username: string; name: string; role: string }
export type AuthResponse = { token: string; user: User }

export type Product = {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  categoryName?: string
  image?: string
  status: string
  createdAt: string
  updatedAt: string
}

export type Category = {
  id: string
  name: string
  description: string
  slug: string
  productCount?: number
  createdAt: string
}

export type Partner = {
  id: string
  name: string
  description: string
  logo?: string
  website?: string
  sortOrder: number
  status: string
  createdAt: string
}

export type Banner = {
  id: string
  title: string
  image: string
  link?: string
  sortOrder: number
  status: string
  createdAt: string
}

export type ContactInfo = {
  id: string
  phone: string
  email: string
  address: string
  description: string
  socialMedia?: Record<string, string>
}

export const authApi = {
  login: (data: LoginPayload) => api.post<AuthResponse>('/auth/login', data),
  register: (data: RegisterPayload) => api.post<AuthResponse>('/auth/register', data),
  getMe: () => api.get<User>('/auth/me'),
}

export const productsApi = {
  list: (params?: { page?: number; limit?: number; search?: string; categoryId?: string }) =>
    api.get<{ data: Product[]; total: number }>('/products', { params }),
  create: (data: Partial<Product>) => api.post<Product>('/products', data),
  update: (id: string, data: Partial<Product>) => api.put<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
}

export const categoriesApi = {
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get<{ data: Category[]; total: number }>('/categories', { params }),
  create: (data: Partial<Category>) => api.post<Category>('/categories', data),
  update: (id: string, data: Partial<Category>) => api.put<Category>(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
}

export const partnersApi = {
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get<{ data: Partner[]; total: number }>('/partners', { params }),
  create: (data: Partial<Partner>) => api.post<Partner>('/partners', data),
  update: (id: string, data: Partial<Partner>) => api.put<Partner>(`/partners/${id}`, data),
  delete: (id: string) => api.delete(`/partners/${id}`),
  updateSort: (id: string, sortOrder: number) => api.patch<Partner>(`/partners/${id}/sort`, { sortOrder }),
}

export const bannersApi = {
  list: (params?: { page?: number; limit?: number }) =>
    api.get<{ data: Banner[]; total: number }>('/banners', { params }),
  create: (data: Partial<Banner>) => api.post<Banner>('/banners', data),
  update: (id: string, data: Partial<Banner>) => api.put<Banner>(`/banners/${id}`, data),
  delete: (id: string) => api.delete(`/banners/${id}`),
  updateSort: (id: string, sortOrder: number) => api.patch<Banner>(`/banners/${id}/sort`, { sortOrder }),
}

export const contactInfoApi = {
  get: () => api.get<ContactInfo>('/contact-info'),
  update: (data: Partial<ContactInfo>) => api.put<ContactInfo>('/contact-info', data),
}

export const usersApi = {
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get<{ data: User[]; total: number }>('/users', { params }),
  create: (data: Partial<User>) => api.post<User>('/users', data),
  update: (id: string, data: Partial<User>) => api.put<User>(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
}

export { api as default }
