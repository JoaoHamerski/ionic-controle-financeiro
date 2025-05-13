<script setup lang="ts">
import { PickedFile } from '@capawesome/capacitor-file-picker'
import { IonButton, IonModal } from '@ionic/vue'
import { PhDownloadSimple } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'
import { ref } from 'vue'

import AppModalHeader from '@/components/AppModalHeader.vue'
import { useBackup } from '@/composables/use-backup'
import { useDatabaseStore } from '@/stores/database-store'
import { presentToast } from '@/support/toast'

import BackupInfo from './BackupInfo.vue'

const emit = defineEmits(['backup-imported'])

const { initDatabase } = useDatabaseStore()
const { pickBackupFile, importBackupFromFile, setBackupFilename } = useBackup()
const modal = useTemplateRef('modal')

const backupFile = ref<PickedFile>()

const onSelectClick = async () => {
  const file = await pickBackupFile()

  backupFile.value = file
}

const onConfirmClick = async () => {
  if (backupFile.value) {
    await importBackupFromFile(backupFile.value!)
    await initDatabase()

    await setBackupFilename(backupFile.value.name)

    presentToast({ color: 'success', message: 'Dados importados!' })

    modal.value?.$el.dismiss()

    emit('backup-imported')
  }
}
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div class="ion-padding">
      <AppModalHeader
        title="Importe seus dados"
        :icon="PhDownloadSimple"
        class="text-[var(--ion-color-primary)]"
        subtitle="Selecione o seu arquivo de dados"
      />

      <div
        v-if="backupFile"
        class="mb-5"
      >
        <div class="text-sm text-center font-semibold text-[var(--ion-color-medium)]">
          Arquivo a ser importado
        </div>
        <BackupInfo
          :info="{
            uri: decodeURIComponent(backupFile.path!),
            mtime: backupFile.modifiedAt,
            size: backupFile.size,
          }"
        />
      </div>

      <div class="flex">
        <IonButton
          shape="round"
          class="w-full"
          fill="clear"
          @click="modal?.$el.dismiss()"
        >
          Cancelar
        </IonButton>

        <IonButton
          v-if="backupFile"
          color="success"
          shape="round"
          class="w-full"
          @click="onConfirmClick"
        >
          Confirmar
        </IonButton>
        <IonButton
          v-else
          shape="round"
          class="w-full"
          @click="onSelectClick"
        >
          Selecionar
        </IonButton>
      </div>
    </div>
  </IonModal>
</template>
