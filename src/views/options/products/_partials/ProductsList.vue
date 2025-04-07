<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { ref } from 'vue'

import { ProductRecord } from '../ProductsPage.vue'
import ProductEditModal from './ProductsEditModal.vue'
import ProductsListItem from './ProductsListItem.vue'

defineEmits(['submit'])

defineProps<{
  products: ProductRecord[]
}>()

type EditProductModal = {
  isOpen: boolean
  product?: ProductRecord
}

const editProductModal = ref<EditProductModal>({
  isOpen: false,
  product: undefined,
})

const onEdit = ({ product }: { product: ProductRecord }) => {
  Object.assign(editProductModal.value, {
    isOpen: true,
    product,
  })
}

const resetModal = () => {
  Object.assign(editProductModal.value, {
    isOpen: false,
    product: undefined,
  })
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
    @submit="$emit('submit')"
  />
</template>
