<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { ref } from 'vue'

import type { Customer } from '@/types/models'

import CustomerEditModal from './CustomerEditModal.vue'
import CustomerListItem from './CustomerListItem.vue'

const emit = defineEmits(['submitted'])

defineProps<{
  customers: Customer[]
}>()

const editCustomerModal = ref<{
  isOpen: boolean
  customer?: Customer
}>({
  isOpen: false,
  customer: undefined,
})

const onEdit = ({ customer }: { customer: Customer }) => {
  editCustomerModal.value.isOpen = true
  editCustomerModal.value.customer = customer
}

const resetModal = () => {
  editCustomerModal.value = {
    isOpen: false,
    customer: undefined,
  }
}

const onSubmitted = () => {
  resetModal()
  emit('submitted')
}
</script>

<template>
  <IonList lines="full">
    <CustomerListItem
      v-for="customer in customers"
      :key="customer.id"
      :customer="customer"
      @edit="onEdit"
    />

    <CustomerEditModal
      :is-open="editCustomerModal.isOpen"
      :customer="editCustomerModal.customer"
      @did-dismiss="resetModal"
      @submitted="onSubmitted"
    />
  </IonList>
</template>
