<script setup lang="ts">
import { StatResult } from '@capacitor/filesystem'
import { IonButton, IonContent, onIonViewWillEnter } from '@ionic/vue'
import { PhArrowClockwise } from '@phosphor-icons/vue'
import { ref } from 'vue'

import { useBackup } from '@/composables/use-backup'
import { useModal } from '@/composables/use-modal'

import OptionsInfoHeader from '../_partials/OptionsInfoHeader.vue'
import OptionsPageLayout from '../_partials/OptionsPageLayout.vue'
import BackupImportModal from './partials/BackupImportModal.vue'
import BackupInfo from './partials/BackupInfo.vue'
import BackupSaveModal from './partials/BackupSaveModal.vue'

const { getBackupFileInfo } = useBackup()

const backupInfo = ref<StatResult | null>()
const saveBackupModal = useModal()
const importBackupModal = useModal()

onIonViewWillEnter(() => {
  loadLastBackupInfo()
})

const loadLastBackupInfo = async () => {
  backupInfo.value = await getBackupFileInfo()
}
</script>

<template>
  <OptionsPageLayout title="Backup">
    <IonContent class="ion-padding h-full">
      <div class="flex flex-col justify-between h-full">
        <OptionsInfoHeader
          :icon="PhArrowClockwise"
          title="Backup dos dados"
          description="O arquivo de backup é muito importante, pois é a única forma de recuperar os seus dados caso troque de aparelho ou reinstale o aplicativo"
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
            @click="importBackupModal.open()"
          >
            Importar
          </IonButton>
        </div>
      </div>
    </IonContent>

    <BackupSaveModal
      :is-open="saveBackupModal.isOpen.value"
      @backup-saved="loadLastBackupInfo"
      @did-dismiss="saveBackupModal.close()"
    />

    <BackupImportModal
      :is-open="importBackupModal.isOpen.value"
      @backup-imported="loadLastBackupInfo"
      @did-dismiss="importBackupModal.close()"
    />
  </OptionsPageLayout>
</template>
