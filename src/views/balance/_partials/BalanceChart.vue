<script setup lang="ts">
import {
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { range, sum } from 'lodash'
import { DateTime, WeekdayNumbers } from 'luxon'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

import { formatCurrencyBRL } from '@/support/helpers'

import { SelectedPeriodType } from '../BalancePage.vue'
import {
  CHART_EXPENSES_DATASET,
  CHART_PAYMENTS_DATASET,
  CHART_SALES_DATASET,
} from '../chart-config'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

type ChartType = 'sales' | 'expenses' | 'payments'

const props = defineProps<{
  type: ChartType
  title: string
  data: number[]
  selectedPeriod: SelectedPeriodType
}>()

const totalDays = computed(() => {
  if (props.selectedPeriod === 'current-week' || props.selectedPeriod == 'last-week') {
    return 7
  }

  return props.selectedPeriod.daysInMonth!
})

const chartLabels = computed(() => {
  if (props.selectedPeriod === 'current-week' || props.selectedPeriod === 'last-week') {
    return range(1, 8).map((index) =>
      DateTime.now()
        .set({ weekday: (index - 1) as WeekdayNumbers })
        .toFormat('EEE'),
    )
  }

  return range(1, totalDays.value + 1)
})

const chartData = computed(
  () =>
    ({
      labels: chartLabels.value,
      datasets: [
        {
          ...getChartTypeConfig(props.type),
          borderWidth: 2,
          pointHitRadius: 10,
          pointRadius: 3,
          data: props.data,
        },
      ],
    }) as ChartData,
)

const total = computed(() => sum(props.data))

const getChartTypeConfig = (type: ChartType) => {
  if (type === 'sales') {
    return CHART_SALES_DATASET
  }

  if (type === 'expenses') {
    return CHART_EXPENSES_DATASET
  }

  return CHART_PAYMENTS_DATASET
}
</script>

<template>
  <div style="max-height: 22dvh">
    <div
      class="ion-text-center"
      :style="{ fontWeight: 500, fontSize: '.8rem' }"
    >
      {{ title }} ({{ formatCurrencyBRL(total) }})
    </div>
    <Line
      :data="chartData"
      :options="{
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              title: (item) =>
                typeof selectedPeriod === 'object' ? `Dia ${item[0].label}` : item[0].label,
              label: (item) => formatCurrencyBRL(item.raw as string),
            },
          },
        },
        scales: {
          y: {
            min: 0,
          },
        },
      }"
    />
  </div>
</template>
