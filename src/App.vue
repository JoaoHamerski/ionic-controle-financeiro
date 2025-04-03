<script setup lang="ts">
import { App } from '@capacitor/app'
import { Preferences } from '@capacitor/preferences'
import { IonApp, IonRouterOutlet, useBackButton } from '@ionic/vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { PREFERENCES } from './support/preferences-keys'

const router = useRouter()
const previousRoute = ref('')

onMounted(async () => {
  handleAppExit()
  handleBootForUpgrades()
})

const currentPath = computed(() => router.currentRoute.value.path)

const handleAppExit = () => {
  router.afterEach(() => {
    previousRoute.value = currentPath.value
  })

  useBackButton(0, async () => {
    if (currentPath.value === '/tabs/inicio') {
      await App.exitApp()
      return
    }

    if (previousRoute.value.includes('/tabs')) {
      router.replace('/tabs/inicio')
      return
    }

    router.back()
  })
}

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
