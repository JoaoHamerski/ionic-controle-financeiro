<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { ref } from 'vue'

import { Product } from '@/types/models'

import ProductEditModal from './ProductsEditModal.vue'
import ProductsListItem from './ProductsListItem.vue'

defineEmits(['submit'])

defineProps<{
  products: Product[]
}>()

const editProductModal = ref<{
  isOpen: boolean
  product?: Product
}>({
  isOpen: false,
  product: undefined,
})

const onEdit = ({ product }: { product: Product }) => {
  editProductModal.value = {
    isOpen: true,
    product,
  }
}

const resetModal = () => {
  editProductModal.value = {
    isOpen: false,
    product: undefined,
  }
}
</script>

<template>
  <IonList lines="full">
    <ProductsListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @edit="onEdit"
    />
  </IonList>

  <ProductEditModal
    :is-open="editProductModal.isOpen"
    :product="editProductModal.product"
    @did-dismiss="resetModal"
    @submitted="$emit('submit')"
  />
</template>
