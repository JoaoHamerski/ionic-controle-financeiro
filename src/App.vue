<script setup lang="ts">
import { seedDatabase } from '@/database/seed'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
import { useDatabaseStore } from './database/database-store'
const databaseStore = useDatabaseStore()

onMounted(async () => {
  await databaseStore.initDatabase()
  await seedDatabase()
})
</script>

<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
