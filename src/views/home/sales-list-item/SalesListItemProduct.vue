<script setup lang="ts">
import { formatCurrencyBRL } from '@/support/helpers'

defineProps<{
  item: any
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
      {{ item.product_name }}
    </h2>
    <span
      v-if="item.sale_quantity > 1"
      :style="{ fontSize: '.7rem', color: 'var(--ion-color-medium)' }"
    >
      ({{ item.sale_quantity }} x {{ formatCurrencyBRL(item.sale_price) }})
    </span>
  </div>
</template>
