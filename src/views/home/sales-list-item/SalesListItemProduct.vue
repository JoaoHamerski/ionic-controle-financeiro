<script setup lang="ts">
import { formatCurrencyBRL } from '@/support/helpers'

defineProps<{
  sale: any
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
      {{ sale.product_name }}
    </h2>
    <span
      v-if="sale.sale_quantity > 1"
      :style="{ fontSize: '.7rem', color: 'var(--ion-color-medium)' }"
    >
      ({{ sale.sale_quantity }} x {{ formatCurrencyBRL(sale.sale_price) }})
    </span>
  </div>
</template>
