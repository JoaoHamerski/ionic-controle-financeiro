<script setup lang="ts">
import { ref } from 'vue'

import AppTypeaheadModal from '@/components/AppTypeaheadModal.vue'
import { Product } from '@/database/models'
import { dbStatement, dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

const { knex } = useDatabaseStore()

const emit = defineEmits(['product-selected'])
const products = ref<Product[]>([])

const onSearch = (search?: string) => {
  fetch(search)
}

const onModalWillPresent = () => {
  fetch()
}

const fetch = async (search?: string) => {
  const builder = knex.select(['id', 'name']).from('products').orderByRaw('name COLLATE NOCASE')

  if (search) {
    builder.whereLike('name', `%${search}%`)
  }

  const data = await dbSelect(builder)

  products.value = data
}

const createProduct = async (search: string) => {
  const data = await dbStatement(knex.insert({ name: search }).into('products'))

  if (!data) {
    throw new Error('Error on creating product')
  }

  selectProduct(data as Product)
}

const selectProduct = (product: Product) => {
  emit('product-selected', { product })
}
</script>

<template>
  <AppTypeaheadModal
    title="Selecione um produto"
    :items="products"
    item-prop="name"
    :input-attrs="{
      label: 'Produto',
      placeholder: 'Digite o nome...',
      helperText: 'Ou digite o nome para cadastrar',
    }"
    @select="selectProduct"
    @create="createProduct"
    @ion-modal-will-present="onModalWillPresent"
    @update:search="onSearch"
  />
</template>
