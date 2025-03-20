<script setup lang="ts">
import { ref } from 'vue'

import AppTypeaheadModal from '@/components/AppTypeaheadModal.vue'
import { dbSelect, dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Customer } from '@/types/models'

const { knex } = useDatabaseStore()

const emit = defineEmits(['customer-selected'])

const customers = ref<Customer[]>([])

const onSearch = (search?: string) => {
  fetch(search)
}

const onModalWillPresent = async () => {
  await fetch()
}

const fetch = async (search?: string) => {
  const builder = knex.select(['id', 'name']).from('customers').orderByRaw('name COLLATE NOCASE')

  if (search) {
    builder.whereLike('name', `%${search}%`)
  }

  const data = await dbSelect(builder)

  customers.value = data
}

const createCustomer = async (search: string) => {
  const data = await dbStatement(knex.insert({ name: search }).into('customers'))

  if (!data) {
    throw new Error('Error on creating customer')
  }

  selectCustomer(data as Customer)
}

const selectCustomer = (customer: Customer) => {
  emit('customer-selected', { customer })
}
</script>

<template>
  <AppTypeaheadModal
    title="Selecione um cliente"
    :items="customers"
    item-prop="name"
    :input-attrs="{
      label: 'Cliente',
      placeholder: 'Digite o nome...',
      helperText: 'Ou digite o nome para cadastrar',
    }"
    @select="selectCustomer"
    @create="createCustomer"
    @will-present="onModalWillPresent"
    @update:search="onSearch"
  />
</template>
