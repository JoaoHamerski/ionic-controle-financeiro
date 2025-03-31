<script setup lang="ts">
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'
import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  onIonViewWillEnter,
} from '@ionic/vue'
import { syncCircle } from 'ionicons/icons'
import { ref } from 'vue'

import UpgradeApp from '@/plugins/upgrade-app-plugin'
import { PREFERENCES } from '@/support/preferences-keys'

import HeaderPageInfo from '../_partials/HeaderPageInfo.vue'
import OptionsHeader from '../_partials/OptionsHeader.vue'

const LATEST_RELEASE_ENDPOINT =
  'https://api.github.com/repos/JoaoHamerski/ionic-controle-financeiro/releases/latest'

const hasNewVersion = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const newApkPath = ref<string>('')
const isPermissionDialogOpen = ref<boolean>(false)

onIonViewWillEnter(async () => {
  const _hasNewVersion = (await Preferences.get({ key: PREFERENCES.HAS_NEW_VERSION })).value

  if (_hasNewVersion === 'true') {
    hasNewVersion.value = true
    newApkPath.value = (await Preferences.get({ key: PREFERENCES.LATEST_RELEASE_PATH })).value || ''
  }
})

const checkUpdate = async () => {
  isLoading.value = true

  const url = await fetchLatestVersion()

  if (!url) {
    throw new Error('Something went wrong while fetching package info')
  }

  const path = await downloadAppFile(url)

  const { result } = await UpgradeApp.hasNewVersion({ newPkgPath: path })

  if (result) {
    await Preferences.set({ key: PREFERENCES.HAS_NEW_VERSION, value: 'true' })
    await Preferences.set({ key: PREFERENCES.LATEST_RELEASE_PATH, value: path })

    hasNewVersion.value = true
  }

  isLoading.value = false
}

const downloadAppFile = async (url: string) => {
  const { path } = await Filesystem.downloadFile({
    url,
    path: 'app-release.apk',
    directory: Directory.Cache,
  })

  if (!path) {
    throw new Error('Path cannot be null')
  }

  return path
}

const fetchLatestVersion = async () => {
  const response = await fetch(LATEST_RELEASE_ENDPOINT)
  const data = await response.json()
  const latestVersionUrl = data.assets[0].browser_download_url

  return latestVersionUrl as string
}

const onInstallClick = async () => {
  const { result: hasPermission } = await UpgradeApp.checkAppInstallPermission()

  if (!hasPermission) {
    isPermissionDialogOpen.value = true
    return
  }

  await UpgradeApp.installApp({ path: newApkPath.value })
}

const onPermissionDialogDismiss = async (event: CustomEvent) => {
  if (event.detail.role === 'destructive') {
    const { result } = await UpgradeApp.requestAppInstallPermission()

    if (result === 'GRANTED') {
      await UpgradeApp.installApp({ path: newApkPath.value })
    }
  }

  isPermissionDialogOpen.value = false
}
</script>

<template>
  <IonPage>
    <OptionsHeader
      has-back-button
      title="Atualizações"
    />
    <IonContent class="ion-padding">
      <IonGrid style="display: flex; flex-direction: column; height: 100%">
        <HeaderPageInfo
          title="Verificar atualizações"
          description="Baixe e instale novas versões do aplicativo"
          :icon="syncCircle"
        />
        <IonRow v-if="isLoading">
          <IonCol> CARREGANDO... </IonCol>
        </IonRow>

        <IonRow style="flex-grow: 1" />

        <IonRow>
          <IonCol>
            <IonButton
              v-if="!hasNewVersion"
              style="width: 100%"
              shape="round"
              fill="outline"
              :disabled="isLoading"
              @click="checkUpdate"
            >
              Procurar atualizações
            </IonButton>
            <IonButton
              v-else
              style="width: 100%"
              shape="round"
              color="success"
              @click="onInstallClick"
            >
              Instalar nova versão
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonAlert
        :is-open="isPermissionDialogOpen"
        header="Permissão para instalar"
        message="Precisamos da sua permissão para instalar a nova versão"
        :buttons="[
          { text: 'Cancelar', role: 'cancel' },
          { text: 'Entendido', role: 'destructive' },
        ]"
        @did-dismiss="onPermissionDialogDismiss"
      />
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-button {
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
</style>
