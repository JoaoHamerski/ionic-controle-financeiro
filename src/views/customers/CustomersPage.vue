<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  onIonViewWillEnter,
} from '@ionic/vue'
import { ref } from 'vue'

import { Customer } from '@/types/models'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import CustomersList from './_partials/CustomersList.vue'

const customers = ref<Customer[]>()
const { knex } = useDatabaseStore()

onIonViewWillEnter(async () => {
  const builder = knex.select('*').from('customers').orderByRaw('name COLLATE NOCASE')
  const values = await dbSelect(builder)

  customers.value = values
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Clientes</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <CustomersList
        v-if="customers"
        :customers="customers"
      />
    </IonContent>
  </IonPage>
</template>
