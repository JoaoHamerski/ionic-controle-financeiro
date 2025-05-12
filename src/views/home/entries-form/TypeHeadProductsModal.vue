<script setup lang="ts">
import { ref } from 'vue'

import AppTypeaheadModal from '@/components/AppTypeaheadModal.vue'
import { dbSelect, dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Product } from '@/types/models'

const { knex } = useDatabaseStore()

const emit = defineEmits(['product-selected'])
const products = ref<Product[]>([])
const isLoaded = ref<boolean>(false)

const onSearch = (search?: string) => {
  fetch(search)
}

const onModalDidPresent = async () => {
  await fetch()
  isLoaded.value = true
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
      placeholder: 'Busque pelo nome...',
      helperText: 'Ou digite o nome para cadastrar',
    }"
    :is-loaded="isLoaded"
    @select="selectProduct"
    @create="createProduct"
    @did-present="onModalDidPresent"
    @update:search="onSearch"
  />
</template>
