<script setup lang="ts">
import { IonContent, IonGrid, IonPage, IonRow, onIonViewWillEnter } from '@ionic/vue'
import { DateTime } from 'luxon'
import { ref } from 'vue'

import { useBackup } from '@/composables/use-backup'
import { useDatabaseStore } from '@/stores/database-store'

import OptionsHeader from '../_partials/OptionsHeader.vue'
import BackupInfo from './_paritals/BackupInfo.vue'
import BackupPageFooter from './_paritals/BackupPageFooter.vue'
import BackupPageHeader from './_paritals/BackupPageHeader.vue'
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
  importBackupFromFile,
} = useBackup()

const backupFileInfo = ref<BackupFileInfo | null>()

const isBackupFileModalOpen = ref<boolean>(false)

onIonViewWillEnter(async () => {
  await fetchBackupInfo()
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
}

const onRecover = async () => {
  const file = await pickBackupFile()

  try {
    await importBackupFromFile(file)
    await initDatabase()
  } catch (e) {
    console.log(e)
  }

  await fetchBackupInfo()
}
</script>

<template>
  <IonPage>
    <OptionsHeader
      title="Backup"
      has-back-button
    />

    <IonContent class="ion-padding">
      <IonGrid style="display: flex; flex-direction: column; height: 100%">
        <BackupPageHeader />

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
  </IonPage>
</template>
