<script setup lang="ts">
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { ChartData, ChartDataset } from 'chart.js'
import { random } from 'lodash'
import { computed } from 'vue'

import { getCssVar } from '@/support/helpers'

import BalanceChart from './_partials/BalanceChart.vue'
import BalanceTimeSegments from './_partials/BalanceTimeSegments.vue'

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
      <IonToolbar>
        <IonTitle> Balanço Mensal </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <BalanceTimeSegments />

      <div
        class="ion-margin-top ion-margin-horizontal"
        :style="{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '.5rem',
          fontSize: '1.2rem',
          fontWeight: 600,
        }"
      >
        <IonButton
          strong
          fill="clear"
          shape="round"
          style="width: 100%"
        >
          <span>Janeiro</span>
        </IonButton>
      </div>

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
