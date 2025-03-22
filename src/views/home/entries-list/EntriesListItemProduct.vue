<script setup lang="ts">
import { formatCurrencyBRL } from '@/support/helpers'

import { EntryRecordHome } from '../HomePage.vue'

defineProps<{
  entry: EntryRecordHome
}>()
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      gap: '.2rem',
    }"
  >
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
      :style="{ fontSize: '.7rem', color: 'var(--ion-color-medium)' }"
    >
      ({{ entry.entry_quantity }} x {{ formatCurrencyBRL(entry.entry_value) }})
    </span>
  </div>
</template>
