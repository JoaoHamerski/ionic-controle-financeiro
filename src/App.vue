<script setup lang="ts">
import { seedDatabase } from '@/database/seed'
import { useDatabaseStore } from '@/stores/database-store'
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
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
