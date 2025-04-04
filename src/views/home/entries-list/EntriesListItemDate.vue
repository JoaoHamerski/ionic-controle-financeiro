<script setup lang="ts">
import { PhCalendarDots } from '@phosphor-icons/vue'
import { upperFirst } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'

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
    <AppIcon
      :icon="PhCalendarDots"
      weight="fill"
    />
    {{ upperFirst(luxonDate.toFormat('cccc')) }}
    ({{ luxonDate.toFormat('dd/MM') }})
  </div>
</template>
