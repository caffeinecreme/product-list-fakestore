<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-bold text-gray-900">Product Inventory</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <ProductList
        :products="productStore.products"
        :loading="productStore.isLoading"
        :error="productStore.error"
        @add="openAddModal"
        @edit="openEditModal"
        @delete="confirmDelete"
        @refresh="productStore.fetchProducts"
      />

      <Modal
        v-if="showFormModal"
        :title="selectedProduct ? 'Edit Produk' : 'Tambah Produk Baru'"
        @close="showFormModal = false"
      >
        <ProductForm
          :product="selectedProduct"
          :is-submitting="productStore.isLoading"
          @submit="handleFormSubmit"
          @cancel="showFormModal = false"
        />
      </Modal>

      <Modal v-if="showDeleteModal" title="Hapus Produk" @close="showDeleteModal = false">
        <div>
          <p class="mb-4">
            Apakah Anda yakin ingin menghapus produk <strong>{{ productToDelete?.title }}</strong
            >?
          </p>
          <p class="mb-4 text-red-600">Tindakan ini tidak dapat dibatalkan.</p>

          <div class="flex justify-end space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
            <button
              @click="deleteProduct"
              class="btn btn-danger"
              :disabled="productStore.isLoading"
            >
              <template v-if="productStore.isLoading">
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
                Menghapus...
              </template>
              <template v-else> Hapus </template>
            </button>
          </div>
        </div>
      </Modal>

      <div
        v-if="toast.show"
        class="fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg transition-all transform duration-300"
        :class="{
          'bg-green-500 text-white': toast.type === 'success',
          'bg-red-500 text-white': toast.type === 'error',
        }"
      >
        {{ toast.message }}
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from './stores/productStore'
import type { Product, NewProduct } from './types/Product'
import ProductList from './components/ProductList.vue'
import ProductForm from './components/ProductForm.vue'
import Modal from './components/Modal.vue'

const productStore = useProductStore()

const showFormModal = ref(false)
const showDeleteModal = ref(false)
const selectedProduct = ref<Product | undefined>(undefined)
const productToDelete = ref<Product | undefined>(undefined)

const toast = ref({
  show: false,
  message: '',
  type: 'success' as 'success' | 'error',
})

onMounted(() => {
  productStore.fetchProducts()
})

const openAddModal = () => {
  selectedProduct.value = undefined
  showFormModal.value = true
}

const openEditModal = (product: Product) => {
  selectedProduct.value = product
  showFormModal.value = true
}

const confirmDelete = (id: number) => {
  productToDelete.value = productStore.getProductById(id)
  showDeleteModal.value = true
}

const handleFormSubmit = async (product: Product | NewProduct) => {
  try {
    if ('id' in product) {
      await productStore.updateProduct(product)
      showToast('Produk berhasil diperbarui!', 'success')
    } else {
      await productStore.addProduct(product)
      showToast('Produk baru berhasil ditambahkan!', 'success')
    }

    showFormModal.value = false
  } catch (error) {
    showToast('Terjadi kesalahan. Silakan coba lagi.', 'error')
  }
}

const deleteProduct = async () => {
  if (!productToDelete.value) return

  try {
    await productStore.deleteProduct(productToDelete.value.id)
    showToast('Produk berhasil dihapus!', 'success')
    showDeleteModal.value = false
  } catch (error) {
    showToast('Terjadi kesalahan. Silakan coba lagi.', 'error')
  }
}

const showToast = (message: string, type: 'success' | 'error') => {
  toast.value = {
    show: true,
    message,
    type,
  }

  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}
</script>
