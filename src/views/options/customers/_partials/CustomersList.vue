<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { ref } from 'vue'

import type { Customer } from '@/types/models'

import CustomersEditModal from './CustomersEditModal.vue'
import CustomersListItem from './CustomersListItem.vue'

const emit = defineEmits(['submit'])

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
  emit('submit')
}
</script>

<template>
  <IonList lines="full">
    <CustomersListItem
      v-for="customer in customers"
      :key="customer.id"
      :customer="customer"
      @edit="onEdit"
    />

    <CustomersEditModal
      :is-open="editCustomerModal.isOpen"
      :customer="editCustomerModal.customer"
      @did-dismiss="resetModal"
      @submitted="onSubmitted"
    />
  </IonList>
</template>
