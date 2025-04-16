<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { ref } from 'vue'

import { presentToast } from '@/support/toast'

import { CustomerRecord } from '../CustomersPage.vue'
import CustomersEditModal from './CustomersEditModal.vue'
import CustomersListItem from './CustomersListItem.vue'

const emit = defineEmits(['submitted'])

defineProps<{
  customers: CustomerRecord[]
}>()

const editCustomerModal = ref<{
  isOpen: boolean
  customer?: CustomerRecord
}>({
  isOpen: false,
  customer: undefined,
})

const onEdit = ({ customer }: { customer: CustomerRecord }) => {
  editCustomerModal.value.isOpen = true
  editCustomerModal.value.customer = customer
}

const resetModal = () => {
  editCustomerModal.value = {
    isOpen: false,
    customer: undefined,
  }
}

const onSubmit = (payload: { isEdit: boolean }) => {
  resetModal()

  if (payload.isEdit) {
    presentToast({ message: 'Cliente atualizado ', color: 'success' })
  } else {
    presentToast({ message: 'Cliente cadastrado', color: 'success' })
  }

  emit('submitted')
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
      @submitted="onSubmit"
    />
  </IonList>
</template>
