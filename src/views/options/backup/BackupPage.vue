<script setup lang="ts">
import { IonContent, IonGrid, IonRow, onIonViewWillEnter } from '@ionic/vue'
import { PhFloppyDiskBack } from '@phosphor-icons/vue'
import { DateTime } from 'luxon'
import { ref } from 'vue'

import { useBackup } from '@/composables/use-backup'
import { useDatabaseStore } from '@/stores/database-store'
import { presentToast } from '@/support/toast'

import OptionsInfoHeader from '../_partials/OptionsInfoHeader.vue'
import OptionsPageLayout from '../_partials/OptionsPageLayout.vue'
import BackupInfo from './_paritals/BackupInfo.vue'
import BackupPageFooter from './_paritals/BackupPageFooter.vue'
import SaveBackupFileModal from './_paritals/SaveBackupFileModal.vue'

export type BackupFileInfo = {
  lastModified: DateTime
  filename: string
}

const { initDatabase } = useDatabaseStore()

const {
  pickBackupFile,
  saveBackupFile,
  getBackupFileInfo,
  getBackupFilename,
  setBackupFilename,
  importBackupFromFile,
} = useBackup()

const backupFileInfo = ref<BackupFileInfo | null>()

const isBackupFileModalOpen = ref<boolean>(false)

onIonViewWillEnter(async () => {
  await fetchBackupInfo()

  if (!backupFileInfo.value) {
    await setBackupFilename('')
  }
})

const fetchBackupInfo = async () => {
  const info = await getBackupFileInfo()

  if (!info) {
    return
  }

  backupFileInfo.value = {
    filename: await getBackupFilename(),
    lastModified: DateTime.fromMillis(info.mtime),
  }
}

const onSave = () => {
  if (backupFileInfo.value) {
    onBackupSubmit({ filename: backupFileInfo.value.filename })
    return
  }

  isBackupFileModalOpen.value = true
}

const onBackupSubmit = async ({ filename }: { filename: string }) => {
  if (isBackupFileModalOpen.value) {
    isBackupFileModalOpen.value = false
  }

  await saveBackupFile(filename)
  await fetchBackupInfo()
  presentToast({ message: 'Arquivo de backup salvo', color: 'success' })
}

const onRecover = async () => {
  const file = await pickBackupFile()

  try {
    await importBackupFromFile(file)
    await initDatabase()
  } catch (e) {
    console.error(e)
  }

  await fetchBackupInfo()
}
</script>

<template>
  <OptionsPageLayout title="Backup">
    <IonContent class="ion-padding">
      <IonGrid style="display: flex; flex-direction: column; height: 100%">
        <OptionsInfoHeader
          :icon="PhFloppyDiskBack"
          title="Salve ou recupere seus dados"
          description="O arquivo de dados ficará somente no seu aparelho, armazene-o em um local seguro, como na
        nuvem (Google Drive, Dropbox e etc...)"
        />
        <Transition
          name="fade"
          mode="out-in"
        >
          <BackupInfo
            v-if="backupFileInfo"
            :key="backupFileInfo.lastModified.millisecond"
            :backup-file-info="backupFileInfo"
          />
        </Transition>
        <IonRow style="flex-grow: 1" />
        <BackupPageFooter
          @save="onSave"
          @recover="onRecover"
        />
      </IonGrid>
    </IonContent>

    <SaveBackupFileModal
      :is-open="isBackupFileModalOpen"
      @did-dismiss="isBackupFileModalOpen = false"
      @submit="onBackupSubmit"
    />
  </OptionsPageLayout>
</template>
