<script setup lang="ts">
import { PhNote } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'
import { limit } from '@/support/helpers'

defineProps<{
  note: string
}>()
</script>

<template>
  <div v-tippy="{ content: note.length > 25 ? note : '' }">
    <AppIcon
      style="margin-right: 0.25rem"
      :icon="PhNote"
      weight="fill"
    />
    <span>{{ limit(note, 25) }}</span>
  </div>
</template>
