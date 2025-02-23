<script setup lang="ts">
import { useDatabaseStore } from '@/database/database-store'
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

const customers = ref()
const database = useDatabaseStore()

onIonViewWillEnter(async () => {
  const values = await dbSelect(database.builder.select('*').from('customers'))

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
    <IonContent class="ion-padding"> {{ customers }} </IonContent>
  </IonPage>
</template>
