<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Nama Produk</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700">Harga ($)</label>
      <input
        id="price"
        v-model.number="formData.price"
        type="number"
        min="0"
        step="0.01"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700"
        >Deskripsi (opsional)</label
      >
      <textarea
        id="description"
        v-model="formData.description"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      ></textarea>
    </div>

    <div>
      <label for="image" class="block text-sm font-medium text-gray-700"
        >URL Gambar (opsional)</label
      >
      <input
        id="image"
        v-model="formData.image"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="https://example.com/image.jpg"
      />
    </div>

    <div class="flex justify-end space-x-3 pt-4">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
      >
        Batal
      </button>
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <template v-if="isSubmitting">
          <svg
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
          Menyimpan...
        </template>
        <template v-else>
          {{ isEditing ? 'Simpan Perubahan' : 'Tambah Produk' }}
        </template>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import type { Product, NewProduct } from '../types/Product'

const props = defineProps<{
  product?: Product
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: Product | NewProduct): void
  (e: 'cancel'): void
}>()

const formData = reactive<NewProduct>({
  title: '',
  price: 0,
  description: '',
  image: '',
})

const isEditing = computed(() => !!props.product)

onMounted(() => {
  if (props.product) {
    formData.title = props.product.title
    formData.price = props.product.price
    formData.description = props.product.description || ''
    formData.image = props.product.image || ''
  }
})

const handleSubmit = () => {
  if (isEditing.value && props.product) {
    emit('submit', {
      ...props.product,
      title: formData.title,
      price: formData.price,
      description: formData.description,
      image: formData.image,
    })
  } else {
    emit('submit', { ...formData })
  }
}
</script>
