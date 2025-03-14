import axios from 'axios'
import type { Product, NewProduct } from '../types/Product'

const apiClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productApi = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await apiClient.get('/products')
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async createProduct(product: NewProduct): Promise<Product> {
    try {
      return {
        id: Date.now(),
        ...product,
      }
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  async updateProduct(product: Product): Promise<Product> {
    try {
      return { ...product }
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  async deleteProduct(id: number): Promise<void> {
    try {
      return
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  },
}
