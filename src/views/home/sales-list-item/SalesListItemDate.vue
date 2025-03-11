<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { calendarSharp } from 'ionicons/icons'
import { DateTime } from 'luxon'

defineProps<{
  date: string
}>()
</script>

<template>
  <div
    :style="{
      fontSize: '.8rem',
      color: 'var(--ion-color-medium)',
      marginTop: '.2rem',
    }"
  >
    <IonIcon :icon="calendarSharp" />
    {{ DateTime.fromISO(date).toLocaleString({ dateStyle: 'short' }) }}
  </div>
</template>
