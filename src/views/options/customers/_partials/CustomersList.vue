<script setup lang="ts">
import { IonList } from '@ionic/vue'
import { reactive } from 'vue'

import { useModal } from '@/composables/use-modal'
import { presentToast } from '@/support/toast'

import { CustomerRecord } from '../CustomersPage.vue'
import CustomersEditModal from './CustomersEditModal.vue'
import CustomersListItem from './CustomersListItem.vue'

const emit = defineEmits(['submitted'])

defineProps<{
  customers: CustomerRecord[]
}>()

const modalCustomerEdit = reactive(useModal<CustomerRecord>())

const onSubmit = (payload: { isEdit: boolean }) => {
  modalCustomerEdit.close()

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
      @edit="modalCustomerEdit.open(customer)"
    />

    <CustomersEditModal
      :is-open="modalCustomerEdit.isOpen"
      :customer="modalCustomerEdit.data"
      @did-dismiss="modalCustomerEdit.close()"
      @submitted="onSubmit"
    />
  </IonList>
</template>
