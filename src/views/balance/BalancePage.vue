<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter } from '@ionic/vue'
import { ChartData } from 'chart.js'
import { get, groupBy, range, sum, sumBy } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import { ref } from 'vue'

import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { formatCurrencyBRL } from '@/support/helpers'

import BalanceChart from './_partials/BalanceChart.vue'
import BalanceMonthButton from './_partials/BalanceMonthButton.vue'
import BalanceMonthPickerModal from './_partials/BalanceMonthPickerModal.vue'
import BalanceTimeSegments from './_partials/BalanceTimeSegments.vue'
import { CHART_EXPENSES_DATASET, CHART_SALES_DATASET, CHART_SHARED_DATASET } from './chart-config'

export type BalanceMonthDate = {
  name: string
  number: number
  year: number
}

const { knex } = useDatabaseStore()

const selectedMonthDate = ref(DateTime.now())
const isPickerModalOpen = ref(false)

const salesData = ref<number[]>([])
const expensesData = ref<number[]>([])

const totalSales = computed(() => sum(salesData.value))
const totalExpenses = computed(() => sum(expensesData.value))

const chartSalesData = computed(
  () =>
    ({
      labels: range(1, selectedMonthDate.value.daysInMonth + 1),
      datasets: [
        {
          ...CHART_SHARED_DATASET,
          ...CHART_SALES_DATASET,
          data: salesData.value,
        },
      ],
    }) as ChartData,
)

const chartExpensesData = computed(
  () =>
    ({
      labels: range(1, selectedMonthDate.value.daysInMonth + 1),
      datasets: [
        {
          ...CHART_SHARED_DATASET,
          ...CHART_EXPENSES_DATASET,
          data: expensesData.value,
        },
      ],
    }) as ChartData,
)

const fetch = () => {
  const startDate = selectedMonthDate.value.startOf('month')
  const endDate = selectedMonthDate.value.endOf('month')

  fetchSales(startDate, endDate)
  fetchExpenses(startDate, endDate)
}

const fetchSales = async (startDate: DateTime, endDate: DateTime) => {
  const salesBuilder = getEntriesBuilder(startDate, endDate)

  salesBuilder.where('total', '>', 0)

  const data = await dbSelect(salesBuilder)
  salesData.value = groupTotalByDay(data)
}

const fetchExpenses = async (startDate: DateTime, endDate: DateTime) => {
  const expensesBuilder = getEntriesBuilder(startDate, endDate)

  expensesBuilder.where('total', '<', 0)

  const data = await dbSelect(expensesBuilder)
  expensesData.value = groupTotalByDay(data)
}

const getEntriesBuilder = (startDate: DateTime, endDate: DateTime) =>
  knex
    .select('*')
    .from('sales')
    .where('date', '>=', startDate.toISODate())
    .where('date', '<=', endDate.toISODate())

const groupTotalByDay = (entries: any[]) => {
  const _selectedMonthDate = selectedMonthDate.value
  const entriesByDate = groupBy(entries, 'date')

  return range(1, _selectedMonthDate.daysInMonth + 1).map((day) => {
    const date = _selectedMonthDate.set({ day })
    const dateEntries = get(entriesByDate, date.toISODate(), [])

    return Math.abs(sumBy(dateEntries, 'total'))
  })
}

const onMonthDateSelected = (monthDate: DateTime) => {
  selectedMonthDate.value = monthDate
  fetch()
}

onIonViewDidEnter(() => {
  fetch()
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle> Balanço Mensal </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <BalanceTimeSegments />

      <BalanceMonthPickerModal
        v-model="isPickerModalOpen"
        :selected-date="selectedMonthDate"
        @month-date-selected="onMonthDateSelected"
        @did-dismiss="isPickerModalOpen = false"
      />

      <BalanceMonthButton
        :month-date="selectedMonthDate"
        @click="isPickerModalOpen = true"
      />

      <div
        class="ion-margin"
        :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }"
      >
        <BalanceChart
          v-if="salesData.length"
          :title="`ENTRADAS (${formatCurrencyBRL(totalSales)})`"
          :data="chartSalesData"
        />

        <BalanceChart
          v-if="expensesData.length"
          :title="`SAÍDAS (${formatCurrencyBRL(totalExpenses)})`"
          :data="chartExpensesData"
        />
      </div>
    </IonContent>
  </IonPage>
</template>
