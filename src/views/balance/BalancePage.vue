<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { ChartData, ChartDataset } from 'chart.js'
import { random } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import { ref } from 'vue'

import { getCssVar } from '@/support/helpers'

import BalanceChart from './_partials/BalanceChart.vue'
import BalanceMonthButton from './_partials/BalanceMonthButton.vue'
import BalanceMonthPickerModal from './_partials/BalanceMonthPickerModal.vue'
import BalanceTimeSegments from './_partials/BalanceTimeSegments.vue'

export type BalanceMonthDate = {
  name: string
  number: number
  year: number
}

const currentMonth = DateTime.now()

const isPickerModalOpen = ref(false)

const selectedMonth = ref<BalanceMonthDate>({
  name: currentMonth.monthLong,
  number: currentMonth.month,
  year: currentMonth.year,
})

const chartDatasetShared = computed(
  () =>
    ({
      borderWidth: 2,
      animation: false,
      pointHitRadius: 10,
      pointRadius: 2,
    }) as ChartDataset,
)

const chartSalesData = computed(
  () =>
    ({
      labels: Array(31)
        .fill(1)
        .map((_, index) => index + 1),
      datasets: [
        {
          ...chartDatasetShared.value,
          label: 'Entradas',
          data: Array(31)
            .fill(1)
            .map(() => random(1, 50)),
          backgroundColor: getCssVar('--ion-color-success-shade'),
          borderColor: `rgba(${getCssVar('--ion-color-success-rgb')}, .5)`,
        },
      ],
    }) as ChartData,
)

const chartExpensesData = computed(
  () =>
    ({
      labels: Array(31)
        .fill(1)
        .map((_, index) => index + 1),
      datasets: [
        {
          ...chartDatasetShared.value,
          label: 'Saídas',
          data: Array(31)
            .fill(1)
            .map(() => random(1, 50)),
          backgroundColor: getCssVar('--ion-color-danger-shade'),
          borderColor: `rgba(${getCssVar('--ion-color-danger-rgb')}, .5)`,
        },
      ],
    }) as ChartData,
)
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
        :month="selectedMonth"
        @month-selected="selectedMonth = $event"
        @did-dismiss="isPickerModalOpen = false"
      />

      <BalanceMonthButton
        :month-date="selectedMonth"
        @click="isPickerModalOpen = true"
      />

      <div
        class="ion-margin"
        :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }"
      >
        <BalanceChart
          title="ENTRADAS"
          :data="chartSalesData"
        />

        <BalanceChart
          title="SAÍDAS"
          :data="chartExpensesData"
        />
      </div>
    </IonContent>
  </IonPage>
</template>
