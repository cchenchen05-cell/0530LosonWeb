import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || '请求失败'
    console.error('API Error:', message)
    return Promise.reject(error)
  }
)

export interface Banner {
  id: number
  title: string
  image: string
  link?: string
}

export interface Product {
  id: number
  name: string
  description: string
  image: string
  category: string
  price?: number
}

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Partner {
  id: number
  name: string
  logo: string
  website?: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  workingHours?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export const getBanners = async (): Promise<Banner[]> => {
  const response = await api.get<PaginatedResponse<Banner>>('/api/banners')
  return response.data.data
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<PaginatedResponse<Category>>('/api/categories')
  return response.data.data
}

export const getProducts = async (params?: {
  page?: number
  pageSize?: number
  search?: string
  category?: string
}): Promise<PaginatedResponse<Product>> => {
  const response = await api.get<PaginatedResponse<Product>>('/api/products', {
    params: {
      page: params?.page || 1,
      pageSize: params?.pageSize || 9,
      search: params?.search,
      category: params?.category,
    },
  })
  return response.data
}

export const getPartners = async (): Promise<Partner[]> => {
  const response = await api.get<PaginatedResponse<Partner>>('/api/partners')
  return response.data.data
}

export const getContactInfo = async (): Promise<ContactInfo> => {
  const response = await api.get<ContactInfo>('/api/contact')
  return response.data
}

export default api
