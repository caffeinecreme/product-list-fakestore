<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div class="h-48 bg-white flex items-center justify-center p-5">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.title"
        class="h-full object-contain"
      />
      <div v-else class="text-gray-400 flex items-center justify-center h-full w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>

    <div class="p-4">
      <div class="flex justify-between items-start">
        <h3 class="font-semibold text-gray-900 mb-1">{{ product.title }}</h3>
        <span class="font-bold text-blue-600">${{ formatPrice(product.price) }}</span>
      </div>

      <p v-if="product.description" class="text-sm text-gray-600 mt-2 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="$emit('edit')" class="btn btn-primary text-sm">Edit</button>
        <button @click="$emit('delete')" class="btn btn-danger text-sm">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/Product'

defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}
</script>
