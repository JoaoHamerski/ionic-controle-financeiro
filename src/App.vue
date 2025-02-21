<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
import { useDatabaseStore } from './database/database-store'

const databaseStore = useDatabaseStore()

onMounted(() => {
  databaseStore.initDatabase()
})
</script>

<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
