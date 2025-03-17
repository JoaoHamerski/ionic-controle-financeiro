<script setup lang="ts">
import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'

import { formatCurrencyBRL } from '@/support/helpers'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

defineProps<{
  title: string
  data: any
}>()
</script>

<template>
  <div>
    <div
      class="ion-text-center"
      :style="{ fontWeight: 500, fontSize: '.8rem' }"
    >
      {{ title }}
    </div>
    <Line
      :data="data"
      :options="{
        plugins: {
          tooltip: {
            callbacks: {
              title: (item) => `Dia ${item[0].label}`,
              label: (item) => formatCurrencyBRL(item.raw as string),
            },
          },
        },
      }"
    />
  </div>
</template>
