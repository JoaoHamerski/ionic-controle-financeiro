<script setup lang="ts">
import { App } from '@capacitor/app'
import { Preferences } from '@capacitor/preferences'
import { IonApp, IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { PREFERENCES } from './support/preferences-keys'

const router = useRouter()
const previousRoute = ref('')
onMounted(async () => {
  handleAppExit()
  handleBootForUpgrades()
})

const handleAppExit = () => {
  router.afterEach(() => {
    previousRoute.value = router.currentRoute.value.path
  })
}

useBackButton(0, async () => {
  if (router.currentRoute.value.path === '/tabs/inicio') {
    await App.exitApp()
    return
  }

  if (previousRoute.value.includes('/tabs')) {
    router.replace('/tabs/inicio')
    return
  }

  router.back()
})

const handleBootForUpgrades = async () => {
  const currentVersion = (await App.getInfo()).version
  const oldVersion = (await Preferences.get({ key: PREFERENCES.CURRENT_VERSION_NAME })).value

  if (oldVersion && oldVersion !== currentVersion) {
    await Preferences.remove({ key: PREFERENCES.LATEST_RELEASE_DATA })
  }

  await Preferences.set({
    key: PREFERENCES.CURRENT_VERSION_NAME,
    value: (await App.getInfo()).version,
  })
}
</script>

<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
