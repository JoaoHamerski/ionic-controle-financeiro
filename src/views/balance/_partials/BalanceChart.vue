<script setup lang="ts">
import { CategoryScale, Chart, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'

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
      :style="{ fontWeight: 500 }"
    >
      {{ title }}
    </div>
    <Line :data="data" />
  </div>
</template>
