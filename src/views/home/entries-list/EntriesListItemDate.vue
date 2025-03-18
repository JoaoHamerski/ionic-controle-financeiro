<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { calendarSharp } from 'ionicons/icons'
import { upperFirst } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'

const props = defineProps<{
  date: string
}>()

const luxonDate = computed(() => DateTime.fromISO(props.date, { locale: 'pt-BR' }))
</script>

<template>
  <div
    :style="{
      fontSize: '.8rem',
      color: 'var(--ion-color-medium)',
      marginTop: '.2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '.25rem',
    }"
  >
    <IonIcon :icon="calendarSharp" />
    {{ upperFirst(luxonDate.toFormat('cccc')) }}
    ({{ luxonDate.toFormat('dd/MM') }})
  </div>
</template>
