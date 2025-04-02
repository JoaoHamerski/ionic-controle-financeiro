<script setup lang="ts">
import { App } from '@capacitor/app'
import { Preferences } from '@capacitor/preferences'
import { IonApp, IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue'
import { onMounted } from 'vue'

import { PREFERENCES } from './support/preferences-keys'

const ionRouter = useIonRouter()

onMounted(async () => {
  handleAppExit()
  handleBootForUpgrades()
})

const handleAppExit = () => {
  useBackButton(-1, async () => {
    if (!ionRouter.canGoBack()) {
      await App.exitApp()
    }
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
