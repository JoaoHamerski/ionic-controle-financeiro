<script setup lang="ts">
import { useDatabaseStore } from '@/database/database-store'
import { Customer } from '@/database/models'
import { dbSelect } from '@/services/db-service'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  onIonViewWillEnter,
} from '@ionic/vue'
import { ref } from 'vue'
import CustomersList from './_partials/CustomersList.vue'

const customers = ref<Customer[]>()
const database = useDatabaseStore()

onIonViewWillEnter(async () => {
  const builder = database.builder.select('*').from('customers').orderBy('created_at', 'desc')
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
      <CustomersList :customers="customers!" />
    </IonContent>
  </IonPage>
</template>
