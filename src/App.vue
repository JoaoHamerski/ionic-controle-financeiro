<script setup lang="ts">
import { App } from '@capacitor/app'
import { Preferences } from '@capacitor/preferences'
import { IonApp, IonRouterOutlet, useBackButton, useIonRouter } from '@ionic/vue'
import { onMounted } from 'vue'

import { PREFERENCES } from './support/preferences-keys'

const ionRouter = useIonRouter()

onMounted(async () => {
  handleAppExit()
  handleBootAfterUpgrade()
})

const handleAppExit = () => {
  useBackButton(-1, async () => {
    if (!ionRouter.canGoBack()) {
      await App.exitApp()
    }
  })
}

const handleBootAfterUpgrade = async () => {
  const build = (await App.getInfo()).build
  const oldBuild = (await Preferences.get({ key: PREFERENCES.CURRENT_BUILD })).value

  if (!oldBuild) {
    await Preferences.set({ key: PREFERENCES.CURRENT_BUILD, value: build })
    return
  }

  if (build !== oldBuild) {
    await Preferences.remove({ key: PREFERENCES.HAS_NEW_VERSION })
    await Preferences.remove({ key: PREFERENCES.LATEST_RELEASE_PATH })
  }
}
</script>

<template>
  <IonApp>
    <IonRouterOutlet />
  </IonApp>
</template>
