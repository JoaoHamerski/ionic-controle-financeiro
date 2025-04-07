<script setup lang="ts">
import { IonButton, IonContent, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'

import AppEmptyResult from '@/components/AppEmptyResult.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { presentToast } from '@/support/toast'
import { Customer } from '@/types/models'

import OptionsPageLayout from '../_partials/OptionsPageLayout.vue'
import CustomersList from './_partials/CustomersList.vue'

export type CustomerRecord = Customer & {
  total_spent: number
}
const { knex } = useDatabaseStore()
const customers = ref<CustomerRecord[]>([])

onIonViewWillEnter(async () => {
  await fetch()
})

const fetch = async () => {
  const builder = knex
    .select(['customers.*'])
    .sum('entries.value AS total_spent')
    .from('customers')
    .join('entries', 'customers.id', 'entries.customer_id')
    .orderByRaw('name COLLATE NOCASE ASC')
    .groupBy('customers.id')

  customers.value = await dbSelect(builder)
}
</script>

<template>
  <OptionsPageLayout title="Clientes">
    <IonContent>
      <CustomersList
        v-if="customers.length"
        :customers="customers"
        @submit="fetch"
      />
      <AppEmptyResult v-else />
    </IonContent>
  </OptionsPageLayout>
</template>
