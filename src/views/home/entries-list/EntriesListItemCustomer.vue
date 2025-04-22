<script setup lang="ts">
import { PhUser } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'
import { titleCase } from '@/support/helpers'

import { EntryRecordHome } from '../types'

defineProps<{
  entry: EntryRecordHome
}>()
</script>

<template>
  <div>
    <AppIcon
      style="margin-right: 0.25rem"
      :icon="PhUser"
      weight="fill"
    />
    {{ titleCase(entry.customer_name) }}
  </div>
</template>
