<script setup lang="ts">
import { formatCurrencyBRL } from '@/support/helpers'

import { EntryRecordHome } from '../types'

defineProps<{
  entry: EntryRecordHome
}>()
</script>

<template>
  <div style="display: flex; flex-direction: column; text-align: right">
    <h2
      :style="{
        fontSize: '.9rem',
        fontWeight: 500,
      }"
    >
      {{ entry.product_name }}
    </h2>
    <span
      v-if="entry.entry_quantity > 1"
      style="font-size: 0.7rem; color: var(--ion-color-medium)"
    >
      ({{ entry.entry_quantity }} x {{ formatCurrencyBRL(entry.entry_value) }})
    </span>
  </div>
</template>
