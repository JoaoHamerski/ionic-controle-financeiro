<script setup lang="ts">
import { IonContent, onIonViewDidEnter } from '@ionic/vue'
import { ref } from 'vue'

import AppCenteredSpinner from '@/components/AppCenteredSpinner.vue'
import AppEmptyResult from '@/components/AppEmptyResult.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Customer } from '@/types/models'

import OptionsPageLayout from '../_partials/OptionsPageLayout.vue'
import CustomersList from './_partials/CustomersList.vue'

export type CustomerRecord = Customer & {
  total_spent: number
}

const { knex } = useDatabaseStore()

const customers = ref<CustomerRecord[]>([])
const isLoaded = ref(false)

onIonViewDidEnter(async () => {
  await fetch()

  isLoaded.value = true
})

const fetch = async () => {
  const builder = knex
    .select(['customers.*'])
    .sum('entries.value AS total_spent')
    .from('customers')
    .leftJoin('entries', 'customers.id', 'entries.customer_id')
    .orderByRaw('name COLLATE NOCASE ASC')
    .groupBy('customers.id')

  customers.value = await dbSelect(builder)
}
</script>

<template>
  <OptionsPageLayout title="Clientes">
    <IonContent>
      <Transition
        mode="out-in"
        name="fade-fast"
      >
        <AppCenteredSpinner v-if="!isLoaded" />
        <CustomersList
          v-else-if="customers.length"
          :customers="customers"
          @submitted="fetch"
        />
        <AppEmptyResult v-else />
      </Transition>
    </IonContent>
  </OptionsPageLayout>
</template>
