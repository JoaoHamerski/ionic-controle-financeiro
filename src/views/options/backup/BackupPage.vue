<script setup lang="ts">
import { IonButton, IonContent, IonPage } from '@ionic/vue'

import { useDatabaseStore } from '@/stores/database-store'

import OptionsHeader from '../_partials/OptionsHeader.vue'

const backup = async () => {
  const { database } = useDatabaseStore()

  const data = await database.exportToJson('full', false)

  console.log(data)
}
</script>

<template>
  <IonPage>
    <OptionsHeader
      title="Backup"
      has-back-button
    />
    <IonContent>
      <IonButton @click="backup">Write</IonButton>
    </IonContent>
  </IonPage>
</template>
