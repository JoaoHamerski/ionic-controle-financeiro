<script setup lang="ts">
import { PhUser } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'
import { titleCase } from '@/support/helpers'

defineProps<{
  customerName: string
}>()
</script>

<template>
  <div>
    <AppIcon
      :icon="PhUser"
      weight="fill"
    />
    {{ titleCase(customerName) }}
  </div>
</template>
