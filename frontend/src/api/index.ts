import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || '请求失败'
    console.error('API Error:', message)
    return Promise.reject(error)
  }
)

export interface Banner {
  id: number
  title: string
  image: string
}

export interface Product {
  id: number
  name: string
  description: string
  image: string
  category_id: number | null
  sort_order: number
}

export interface Category {
  id: number
  name: string
  icon: string
  sort_order: number
}

export interface Partner {
  id: number
  name: string
  logo: string
  sort_order: number
}

export interface ContactInfo {
  id: number
  phone: string
  email: string
  address: string
  map_url: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const getBanners = async (): Promise<Banner[]> => {
  const response = await api.get<{ data: Banner[] }>('/banners')
  return response.data.data
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<{ data: Category[] }>('/categories')
  return response.data.data
}

export const getProducts = async (params?: {
  page?: number
  limit?: number
  search?: string
  categoryId?: number
}): Promise<PaginatedResponse<Product>> => {
  const response = await api.get<PaginatedResponse<Product>>('/products', {
    params: {
      page: params?.page || 1,
      limit: params?.limit || 9,
      search: params?.search,
      categoryId: params?.categoryId,
    },
  })
  return response.data
}

export const getPartners = async (): Promise<Partner[]> => {
  const response = await api.get<{ data: Partner[] }>('/partners')
  return response.data.data
}

export const getContactInfo = async (): Promise<ContactInfo> => {
  const response = await api.get<{ data: ContactInfo }>('/contact-info')
  return response.data.data
}

export default api
