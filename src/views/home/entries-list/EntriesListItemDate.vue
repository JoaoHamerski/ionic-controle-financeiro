<script setup lang="ts">
import { PhCalendarDots } from '@phosphor-icons/vue'
import { upperFirst } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'

const props = defineProps<{
  date: string
}>()

const date = computed(() => DateTime.fromISO(props.date, { locale: 'pt-BR' }))
const now = computed(() => DateTime.now())
</script>

<template>
  <div>
    <AppIcon
      :icon="PhCalendarDots"
      weight="fill"
    />
    <template v-if="now.hasSame(date, 'day')"> Hoje </template>
    <template v-else-if="now.minus({ day: 1 }).hasSame(date, 'day')">Ontem</template>
    <template v-else>
      {{ upperFirst(date.toFormat('cccc')) }}
    </template>
    ({{ date.toFormat('dd/MM') }})
  </div>
</template>
