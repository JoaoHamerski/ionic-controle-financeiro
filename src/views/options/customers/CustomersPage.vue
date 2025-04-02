<script setup lang="ts">
import { IonContent, IonPage, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'

import AppEmptyResult from '@/components/AppEmptyResult.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Customer } from '@/types/models'

import OptionsHeader from '../_partials/OptionsHeader.vue'
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
  <IonPage>
    <OptionsHeader
      title="Clientes"
      has-back-button
    />
    <IonContent>
      <CustomersList
        v-if="customers.length"
        :customers="customers"
        @submitted="fetch"
      />
      <AppEmptyResult v-else />
    </IonContent>
  </IonPage>
</template>
