<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'

onMounted(() => {
  alert('ola')
})
</script>

<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
