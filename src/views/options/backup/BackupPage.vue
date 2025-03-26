<script setup lang="ts">
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import { Preferences } from '@capacitor/preferences'
import { IonContent, IonGrid, IonPage, IonRow, onIonViewWillEnter } from '@ionic/vue'
import { DateTime } from 'luxon'
import { ref } from 'vue'

import { useDatabaseStore } from '@/stores/database-store'

import OptionsHeader from '../_partials/OptionsHeader.vue'
import BackupInfo from './_paritals/BackupInfo.vue'
import BackupPageFooter from './_paritals/BackupPageFooter.vue'
import BackupPageHeader from './_paritals/BackupPageHeader.vue'
import SaveBackupFileModal from './_paritals/SaveBackupFileModal.vue'

const lastBackupAt = ref<DateTime | null>(null)
const backupFilename = ref<string | null>(null)
const isBackupFileModalOpen = ref<boolean>(false)

onIonViewWillEnter(async () => {
  await fetchBackupFilename()

  if (backupFilename.value) {
    await fetchFileInfo()
  }
})

const fetchBackupFilename = async () => {
  backupFilename.value = (await Preferences.get({ key: 'backup-filename' })).value
}

const fetchFileInfo = async () => {
  try {
    const stat = await Filesystem.stat({
      path: backupFilename.value!,
      directory: Directory.Documents,
    })

    lastBackupAt.value = DateTime.fromMillis(stat.mtime)
  } catch (e) {
    console.error(e)
  }
}

const onFilenameSubmitted = async ({ filename }: { filename: string }) => {
  isBackupFileModalOpen.value = false

  await Preferences.set({ key: 'backup-filename', value: `${filename}` })

  await saveBackupFile(filename)
  await fetchBackupFilename()
  await fetchFileInfo()
}

const saveBackupFile = async (filename: string) => {
  const { database } = useDatabaseStore()
  const databaseExport = (await database.exportToJson('full', false)).export
  const backup = {
    data: databaseExport,
    metadata: { filename, created_at: DateTime.now().toISO() },
  }

  await Filesystem.writeFile({
    path: filename,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
    data: JSON.stringify(backup),
  })
}

const onSave = async () => {
  if (!lastBackupAt.value) {
    isBackupFileModalOpen.value = true
    return
  }

  await saveBackupFile(backupFilename.value!)
  await fetchFileInfo()
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
            v-if="lastBackupAt"
            :key="lastBackupAt.millisecond"
            :last-backup-at="lastBackupAt"
            :file-name="backupFilename"
          />
        </Transition>

        <IonRow style="flex-grow: 1" />

        <BackupPageFooter @save="onSave" />
      </IonGrid>
    </IonContent>

    <SaveBackupFileModal
      :is-open="isBackupFileModalOpen"
      @did-dismiss="isBackupFileModalOpen = false"
      @submitted="onFilenameSubmitted"
    />
  </IonPage>
</template>
