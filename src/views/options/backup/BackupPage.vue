<script setup lang="ts">
import { StatResult } from '@capacitor/filesystem'
import { IonButton, IonContent, onIonViewWillEnter } from '@ionic/vue'
import { PhArrowClockwise } from '@phosphor-icons/vue'
import { ref } from 'vue'

import { useBackup } from '@/composables/use-backup'
import { useModal } from '@/composables/use-modal'

import OptionsInfoHeader from '../_partials/OptionsInfoHeader.vue'
import OptionsPageLayout from '../_partials/OptionsPageLayout.vue'
import BackupInfo from './partials/BackupInfo.vue'
import BackupSaveModal from './partials/BackupSaveModal.vue'

const { getBackupFileInfo } = useBackup()

onIonViewWillEnter(() => {
  loadLastBackupInfo()
})

const backupInfo = ref<StatResult | null>()
const saveBackupModal = useModal()

const loadLastBackupInfo = async () => {
  backupInfo.value = await getBackupFileInfo()
}

const onBackupSaved = () => {
  loadLastBackupInfo()
}
</script>

<template>
  <OptionsPageLayout title="Backup">
    <IonContent class="ion-padding h-full">
      <div class="flex flex-col justify-between h-full">
        <OptionsInfoHeader
          :icon="PhArrowClockwise"
          title="Backup dos dados"
          description="Salve ou importe os seus dados"
        />

        <BackupInfo
          v-if="backupInfo"
          :info="backupInfo"
        />

        <div class="flex mt-auto">
          <IonButton
            class="w-full"
            color="success"
            shape="round"
            @click="saveBackupModal.open()"
          >
            Salvar
          </IonButton>
          <IonButton
            class="w-full"
            shape="round"
          >
            Importar
          </IonButton>
        </div>
      </div>
    </IonContent>

    <BackupSaveModal
      :is-open="saveBackupModal.isOpen.value"
      @backup-saved="onBackupSaved"
      @did-dismiss="saveBackupModal.close()"
    />
  </OptionsPageLayout>
</template>
