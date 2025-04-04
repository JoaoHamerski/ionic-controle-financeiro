<script setup lang="ts">
import { PhUser } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'
import { titleCase } from '@/support/helpers'

defineProps<{
  customerName: string
}>()
</script>

<template>
  <div :style="{ fontSize: '.8rem', color: 'var(--ion-color-medium)' }">
    <AppIcon
      :icon="PhUser"
      weight="fill"
    />
    {{ titleCase(customerName) }}
  </div>
</template>
