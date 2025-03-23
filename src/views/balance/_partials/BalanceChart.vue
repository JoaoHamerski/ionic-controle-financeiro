<script setup lang="ts">
import {
  CategoryScale,
  Chart,
  ChartData,
  ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  TooltipItem,
} from 'chart.js'
import { range, sum } from 'lodash'
import { DateTime, WeekdayNumbers } from 'luxon'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'

import { formatCurrencyBRL } from '@/support/helpers'

import { SelectedPeriodType } from '../BalancePage.vue'
import {
  CHART_INFLOWS_DATASET,
  CHART_OUTFLOWS_DATASET,
  CHART_PAYMENTS_DATASET,
} from '../chart-config'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

type ChartType = 'inflows' | 'outflows' | 'payments'

const props = defineProps<{
  type: ChartType
  title: string
  data: number[]
  totalDays: number
  selectedPeriod: SelectedPeriodType
}>()

const chartLabels = computed(() => {
  if (typeof props.selectedPeriod === 'string') {
    return range(1, props.selectedPeriod === 'last-7-days' ? 8 : 15).map((index) =>
      DateTime.now()
        .set({ weekday: (index - 1) as WeekdayNumbers })
        .toFormat('EEE'),
    )
  }

  return range(1, props.totalDays + 1)
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
    }) as ChartData<'line'>,
)

const total = computed(() => sum(props.data))

const getChartTypeConfig = (type: ChartType) => {
  if (type === 'inflows') {
    return CHART_INFLOWS_DATASET
  }

  if (type === 'outflows') {
    return CHART_OUTFLOWS_DATASET
  }

  return CHART_PAYMENTS_DATASET
}

const chartOptions = computed(() => {
  const titleCallback =
    typeof props.selectedPeriod === 'object'
      ? (items: TooltipItem<'line'>[]) => `Dia ${items[0].label}`
      : (items: TooltipItem<'line'>[]) => items[0].label

  const labelCallback = (item: TooltipItem<'line'>) => formatCurrencyBRL(item.raw as string)

  return {
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: titleCallback,
          label: labelCallback,
        },
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  } as ChartOptions<'line'>
})
</script>

<template>
  <div :style="{ maxHeight: '22dvh' }">
    <div
      class="ion-text-center"
      :style="{ fontWeight: 500, fontSize: '.8rem' }"
    >
      {{ title }} <b :style="{ fontWeight: 800 }">({{ formatCurrencyBRL(total) }})</b>
    </div>
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
