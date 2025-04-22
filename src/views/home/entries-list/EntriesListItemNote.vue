<script setup lang="ts">
import { PhNote } from '@phosphor-icons/vue'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { limit } from '@/support/helpers'

import { EntryRecordHome } from '../types'

const { entry } = defineProps<{
  entry: EntryRecordHome
}>()

const note = computed(() => entry.entry_note!)
</script>

<template>
  <div>
    <AppIcon
      style="margin-right: 0.25rem"
      :icon="PhNote"
      weight="fill"
    />
    <span>{{ limit(note, 25) }}</span>
  </div>
</template>
