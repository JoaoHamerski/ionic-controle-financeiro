<script setup lang="ts">
import { App } from '@capacitor/app'
import { IonApp, IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue'
import { onMounted } from 'vue'

const ionRouter = useIonRouter()

onMounted(() => {
  useBackButton(-1, () => {
    if (!ionRouter.canGoBack()) {
      App.exitApp()
    }
  })
})
</script>

<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
