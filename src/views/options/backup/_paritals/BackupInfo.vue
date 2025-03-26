<script setup lang="ts">
import { Directory } from '@capacitor/filesystem'
import { IonCol, IonList, IonRow } from '@ionic/vue'
import humanizeDuration from 'humanize-duration'
import { upperFirst } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'

import BackupInfoItem from './BackupInfoItem.vue'

const props = defineProps<{
  lastBackupAt: DateTime
  fileName: string | null
}>()

const intervalId = ref<NodeJS.Timeout>()

onMounted(() => {
  const humanDuration = () =>
    humanizeDuration(props.lastBackupAt.diffNow().toMillis(), {
      language: 'pt',
      units: ['w', 'd', 'h', 'm'],
      round: true,
    })

  lastBackupAtToHumans.value = humanDuration()

  intervalId.value = setInterval(() => {
    lastBackupAtToHumans.value = humanDuration()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId.value)
})

const lastBackupAtToHumans = ref<string | null>(null)

const filePath = computed(
  () => `${upperFirst(Directory.Documents.toLowerCase())}/${props.fileName}`,
)
</script>

<template>
  <div>
    <IonRow>
      <IonCol> <h5>Informações do backup:</h5> </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <IonList lines="full">
          <BackupInfoItem
            label="Arquivo de backup"
            :value="filePath"
          />
          <BackupInfoItem
            v-if="lastBackupAtToHumans"
            label="Último backup feito há"
            :value="lastBackupAtToHumans"
          />
        </IonList>
      </IonCol>
    </IonRow>
  </div>
</template>
