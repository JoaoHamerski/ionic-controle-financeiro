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
  info: StatResult
}>()

const filename = computed(() => last(props.info.uri.split('/')))

const humanizedTime = computed(() => {
  const now = DateTime.now()
  const fileTime = DateTime.fromMillis(props.info.mtime)

  return humanizeDuration(now.diff(fileTime).toMillis(), {
    language: 'pt',
    largest: 2,
    units: ['mo', 'w', 'd', 'h', 'm'],
    round: true,
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
      label="Tamanho"
      :text="humanFileSize(info.size)"
    />

    <BackupInfoItem
      label="Feito há"
      :text="humanizedTime"
    />
  </IonList>
</template>
