<script setup lang="ts">
import { formatCurrencyBRL } from '@/support/helpers'

defineProps<{
  total: number
}>()
</script>

<template>
  <h2
    :style="{
      fontWeight: 600,
      fontSize: '1.1rem',
      color: total > 0 ? 'var(--ion-color-success-shade)' : 'var(--ion-color-danger-shade)',
    }"
  >
    {{ formatCurrencyBRL(total) }}
  </h2>
</template>
