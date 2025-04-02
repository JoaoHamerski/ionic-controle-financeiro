<script setup lang="ts">
import { App } from '@capacitor/app'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'
import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  onIonViewWillEnter,
  onIonViewWillLeave,
} from '@ionic/vue'
import { syncCircle } from 'ionicons/icons'
import { computed, ref } from 'vue'

import UpgradeApp from '@/plugins/upgrade-app-plugin'
import { PREFERENCES } from '@/support/preferences-keys'

import OptionsInfoHeader from '../_partials/OptionsInfoHeader.vue'
import OptionsPageLayout from '../_partials/OptionsPageLayout.vue'
import UpdatesNewReleaseInfo from './_partials/UpdatesNewReleaseInfo.vue'
import { IsFetchingUpdate, ReleaseUpdate } from './updates-types'

const PACKAGE_FILENAME = 'app-release.apk'

const GITHUB_MARKDOWN_ENDPOINT = 'https://api.github.com/markdown'
const LATEST_RELEASE_ENDPOINT =
  'https://api.github.com/repos/JoaoHamerski/ionic-controle-financeiro/releases/latest'

const isFetching = ref<IsFetchingUpdate>({ releaseInfo: false, download: false })
const isFetched = ref({ releaseInfo: false })

const release = ref<ReleaseUpdate>({
  data: null,
  filepath: '',
  bodyRendered: '',
  downloadProgress: 0,
})

const isPermissionDialogOpen = ref<boolean>(false)

onIonViewWillEnter(async () => {
  await handleCachedPkgDeleted()

  const latestReleaseStored = JSON.parse(
    (await Preferences.get({ key: PREFERENCES.LATEST_RELEASE_DATA })).value || '{}',
  )

  release.value = latestReleaseStored

  addDownloadProgressListener()
})

onIonViewWillLeave(async () => {
  await Filesystem.removeAllListeners()
})

const hasNewVersion = computed(() => {
  const { currentVersion, remoteVersion } = release.value

  return remoteVersion && currentVersion !== remoteVersion
})

const downloadButtonLabel = computed(() =>
  release.value.downloadProgress
    ? `Baixando (${release.value.downloadProgress}%)`
    : 'Baixar atualização',
)

const fetchingUpdateButtonLabel = computed(() =>
  !isFetching.value.releaseInfo ? 'Procurar atualização' : 'Procurando...',
)

const handleCachedPkgDeleted = async () => {
  try {
    await Filesystem.stat({
      path: PACKAGE_FILENAME,
      directory: Directory.Cache,
    })
  } catch (e) {
    await Preferences.remove({ key: PREFERENCES.LATEST_RELEASE_DATA })
  }
}

const addDownloadProgressListener = () => {
  Filesystem.addListener('progress', (progress) => {
    const percentage = (100 * progress.bytes) / progress.contentLength

    release.value.downloadProgress = +percentage.toFixed(0)
  })
}

const checkForUpdate = async () => {
  await Preferences.remove({ key: PREFERENCES.LATEST_RELEASE_DATA })
  isFetching.value.releaseInfo = true

  await fetchLatestRelease()
  await setVersionNames()

  isFetching.value.releaseInfo = false

  await Preferences.set({
    key: PREFERENCES.LATEST_RELEASE_DATA,
    value: JSON.stringify(release.value),
  })
}

const fetchLatestRelease = async () => {
  const response = await fetch(LATEST_RELEASE_ENDPOINT)
  const data = await response.json()

  Object.assign<object, Partial<typeof release.value>>(release.value, {
    bodyRendered: await getRenderedBody(data.body),
    data,
  })

  isFetched.value.releaseInfo = true
}

const getRenderedBody = async (markdownBody: string) => {
  const response = await fetch(GITHUB_MARKDOWN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      text: markdownBody,
    }),
  })

  return await response.text()
}

const setVersionNames = async () => {
  if (!release.value.data) {
    throw new Error('Latest release data not fetched')
  }

  Object.assign<object, Partial<typeof release.value>>(release.value, {
    remoteVersion: release.value.data.tag_name,
    currentVersion: (await App.getInfo()).version,
  })
}

const downloadReleasePkg = async () => {
  if (!release.value.data) {
    throw new Error('Latest release data not fetched')
  }

  const pkgUrl = release.value.data.assets[0].browser_download_url

  isFetching.value.download = true

  const { path } = await Filesystem.downloadFile({
    path: PACKAGE_FILENAME,
    url: pkgUrl,
    directory: Directory.Cache,
    progress: true,
  })

  release.value.filepath = path!

  isFetching.value.download = false
  Preferences.set({ key: PREFERENCES.LATEST_RELEASE_DATA, value: JSON.stringify(release.value) })
}

const onInstallClick = async () => {
  const { result } = await UpgradeApp.checkAppInstallPermission()

  if (!result) {
    isPermissionDialogOpen.value = true
    return
  }

  await installApp()
}

const installApp = async () => {
  if (!release.value.filepath) {
    throw new Error('Latest release filepath is not set')
  }

  await UpgradeApp.installApp({ path: release.value.filepath })
}

const onPermissionModalDismiss = async (event: CustomEvent) => {
  if (event.detail.role === 'destructive') {
    const { result } = await UpgradeApp.requestAppInstallPermission()

    if (result === 'GRANTED') {
      await installApp()
    }
  }

  isPermissionDialogOpen.value = false
}
</script>

<template>
  <OptionsPageLayout title="Atualizações">
    <IonContent class="ion-padding">
      <IonGrid style="display: flex; flex-direction: column; height: 100%">
        <OptionsInfoHeader
          title="Verificar atualizações"
          description="Baixe e instale novas versões do aplicativo"
          :icon="syncCircle"
        />

        <UpdatesNewReleaseInfo
          v-if="hasNewVersion"
          :release="release"
        />

        <div
          v-if="!hasNewVersion && isFetched.releaseInfo"
          class="ion-text-center ion-margin-top"
        >
          <h5 style="color: var(--ion-color-medium)">Versão mais recente instalada</h5>
        </div>

        <IonRow style="flex-grow: 1" />

        <IonRow>
          <IonCol>
            <Transition
              name="fade"
              mode="out-in"
            >
              <IonButton
                v-if="!hasNewVersion"
                style="width: 100%"
                shape="round"
                fill="outline"
                :disabled="isFetching.releaseInfo"
                @click="checkForUpdate"
              >
                {{ fetchingUpdateButtonLabel }}
              </IonButton>
              <IonButton
                v-else-if="hasNewVersion && !release.filepath"
                style="width: 100%"
                shape="round"
                color="success"
                fill="outline"
                :disabled="isFetching.download"
                @click="downloadReleasePkg"
              >
                {{ downloadButtonLabel }}
              </IonButton>
              <IonButton
                v-else-if="release.filepath"
                color="primary"
                shape="round"
                style="width: 100%"
                @click="onInstallClick"
              >
                Instalar atualização
              </IonButton>
            </Transition>
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
        @did-dismiss="onPermissionModalDismiss"
      />
    </IonContent>
  </OptionsPageLayout>
</template>

<style scoped>
ion-button {
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
</style>
