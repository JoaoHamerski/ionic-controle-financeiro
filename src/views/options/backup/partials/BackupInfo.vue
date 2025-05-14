<script setup lang="ts">
import { StatResult } from '@capacitor/filesystem'
import { IonList } from '@ionic/vue'
import humanizeDuration from 'humanize-duration'
import { last } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'

import { humanFileSize } from '@/support/helpers'

import BackupInfoItem from './BackupInfoItem.vue'

const props = defineProps<{
  info: Partial<StatResult>
}>()

const filename = computed(() => last(props.info.uri?.split('/')))

const humanizedTime = computed(() => {
  const now = DateTime.now()
  const fileTime = DateTime.fromMillis(props.info?.mtime || 0)

  return humanizeDuration(now.diff(fileTime).toMillis(), {
    language: 'pt',
    largest: 2,
    units: ['mo', 'w', 'd', 'h', 'm'],
    round: true,
    conjunction: ' e ',
  })
})
</script>

<template>
  <IonList>
    <BackupInfoItem
      v-if="filename"
      label="Nome do arquivo"
      :text="filename"
    />

    <BackupInfoItem
      v-if="info.size"
      label="Tamanho"
      :text="humanFileSize(info.size)"
    />

    <BackupInfoItem
      v-if="info.mtime"
      label="Feito há"
      :text="humanizedTime === '0 minutos' ? 'Agora há pouco' : humanizedTime"
    />
  </IonList>
</template>
