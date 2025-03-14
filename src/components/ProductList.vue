<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Product List</h2>
      <button @click="$emit('add')" class="btn btn-primary flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Add Product
      </button>
    </div>

    <div class="relative mb-6">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        class="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3"
        placeholder="Search product..."
      />
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <svg
        class="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
      role="alert"
    >
      <p>{{ error }}</p>
      <button @click="$emit('refresh')" class="mt-2 text-sm underline">Coba lagi</button>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <svg
        class="h-12 w-12 text-gray-400 mx-auto mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <p class="text-gray-600">Tidak ada produk ditemukan.</p>
      <button @click="$emit('add')" class="mt-4 btn btn-primary">Tambah Produk Pertama</button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @edit="$emit('edit', product)"
        @delete="$emit('delete', product.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../types/Product'
import ProductCard from './ProductCard.vue'

const props = defineProps<{
  products: Product[]
  loading: boolean
  error: string | null
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'edit', product: Product): void
  (e: 'delete', id: number): void
  (e: 'refresh'): void
}>()

const searchQuery = ref('')

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return props.products

  const query = searchQuery.value.toLowerCase()
  return props.products.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)),
  )
})
</script>
