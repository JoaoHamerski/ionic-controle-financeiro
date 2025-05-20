<script setup lang="ts">
import { App } from '@capacitor/app'
import { IonApp, IonRouterOutlet, useBackButton } from '@ionic/vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const previousRoute = ref('')

onMounted(async () => {
  router.afterEach(() => {
    previousRoute.value = currentPath.value
  })

  handleBackButton()
})

const currentPath = computed(() => router.currentRoute.value.path)

const handleBackButton = () => {
  useBackButton(0, async () => {
    handleAppExit()
    handleTabsRedirect()
  })
}

const handleAppExit = async () => {
  if (currentPath.value === '/tabs/inicio') {
    await App.exitApp()
    return
  }
}

const handleTabsRedirect = () => {
  if (previousRoute.value.includes('/tabs')) {
    router.replace('/tabs/inicio')
    return
  }

  router.back()
}
</script>

<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
