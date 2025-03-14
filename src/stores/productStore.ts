import { defineStore } from 'pinia'
import { productApi } from '../services/api'
import type { Product, NewProduct } from '../types/Product'

interface ProductState {
  products: Product[]
  isLoading: boolean
  error: string | null
}

export const useProductStore = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find((product) => product.id === id)
    },
  },

  actions: {
    async fetchProducts() {
      this.isLoading = true
      this.error = null

      try {
        const products = await productApi.getProducts()
        this.products = products
      } catch (error) {
        this.error = 'Gagal mengambil data produk. Silakan coba lagi.'
        console.error('Error fetchProducts:', error)
      } finally {
        this.isLoading = false
      }
    },

    async addProduct(product: NewProduct) {
      this.isLoading = true
      this.error = null

      try {
        const newProduct = await productApi.createProduct(product)
        this.products.push(newProduct)
        return newProduct
      } catch (error) {
        this.error = 'Gagal menambahkan produk. Silakan coba lagi.'
        console.error('Error addProduct:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateProduct(product: Product) {
      this.isLoading = true
      this.error = null

      try {
        const updatedProduct = await productApi.updateProduct(product)
        const index = this.products.findIndex((p) => p.id === product.id)

        if (index !== -1) {
          this.products[index] = updatedProduct
        }

        return updatedProduct
      } catch (error) {
        this.error = 'Gagal mengupdate produk. Silakan coba lagi.'
        console.error('Error updateProduct:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async deleteProduct(id: number) {
      this.isLoading = true
      this.error = null

      try {
        await productApi.deleteProduct(id)
        this.products = this.products.filter((product) => product.id !== id)
      } catch (error) {
        this.error = 'Gagal menghapus produk. Silakan coba lagi.'
        console.error('Error deleteProduct:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },
})
