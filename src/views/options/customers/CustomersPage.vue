<script setup lang="ts">
import { IonContent, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'

import AppEmptyResult from '@/components/AppEmptyResult.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Customer } from '@/types/models'

import OptionPageLayout from '../_partials/OptionPageLayout.vue'
import CustomersList from './_partials/CustomersList.vue'

const { knex } = useDatabaseStore()
const customers = ref<Customer[]>([])

onIonViewWillEnter(async () => {
  await fetch()
})

const fetch = async () => {
  const builder = knex.select('*').from('customers').orderByRaw('name COLLATE NOCASE ASC')

  customers.value = await dbSelect(builder)
}
</script>

<template>
  <OptionPageLayout title="Clientes">
    <IonContent>
      <CustomersList
        v-if="customers.length"
        :customers="customers"
        @submitted="fetch"
      />
      <AppEmptyResult v-else />
    </IonContent>
  </OptionPageLayout>
</template>
