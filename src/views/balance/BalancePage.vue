<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter } from '@ionic/vue'
import { PhCalendarDots } from '@phosphor-icons/vue'
import { get, groupBy, range, round, sum, sumBy } from 'lodash'
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { formatCurrencyBRL } from '@/support/helpers'

import { PERIODS } from './_partials/balance-periods'
import BalanceChart from './_partials/BalanceChart.vue'
import BalanceMonthButton from './_partials/BalanceMonthButton.vue'
import BalanceMonthPickerModal from './_partials/BalanceMonthPickerModal.vue'

export type SelectedPeriodType = DateTime | keyof typeof PERIODS

const { knex } = useDatabaseStore()

const selectedPeriod = ref<SelectedPeriodType>('last-7-days')
const isPickerModalOpen = ref(false)

const inflowsData = ref<number[]>([])
const outflowsData = ref<number[]>([])
const paymentsData = ref<number[]>([])

onIonViewDidEnter(async () => {
  await fetch()
})

const totalDays = computed(() => {
  if (typeof selectedPeriod.value === 'string') {
    const intervals = PERIODS[selectedPeriod.value].interval()

    return round(intervals[1].diff(intervals[0], 'days').days)
  }

  return selectedPeriod.value.daysInMonth!
})

const profit = computed(() => (sum(paymentsData.value) - sum(outflowsData.value)).toFixed(2))

const fetch = async () => {
  const [startDate, endDate] = getDateInterval()

  await fetchInflows(startDate, endDate)
  await fetchOutflows(startDate, endDate)
  await fetchPayments(startDate, endDate)
}

const getDateInterval = () => {
  const localSelectedPeriod = selectedPeriod.value

  if (typeof localSelectedPeriod === 'string') {
    return PERIODS[localSelectedPeriod].interval()
  }

  return [localSelectedPeriod.startOf('month'), localSelectedPeriod.endOf('month')]
}

const fetchInflows = async (startDate: DateTime, endDate: DateTime) => {
  const inflowsBuilder = getEntriesBuilder(startDate, endDate)

  inflowsBuilder.where('total', '>', 0)

  const data = await dbSelect(inflowsBuilder)
  inflowsData.value = groupTotalByDay(data)
}

const fetchOutflows = async (startDate: DateTime, endDate: DateTime) => {
  const outflowsBuilder = getEntriesBuilder(startDate, endDate)

  outflowsBuilder.where('total', '<', 0)

  const data = await dbSelect(outflowsBuilder)
  outflowsData.value = groupTotalByDay(data)
}

const fetchPayments = async (startDate: DateTime, endDate: DateTime) => {
  const paymentsBuilder = knex
    .select('*')
    .from('payments')
    .where('created_at', '>=', startDate.toSQL())
    .where('created_at', '<=', endDate.toSQL())

  const data = await dbSelect(paymentsBuilder)

  paymentsData.value = groupTotalByDay(data, true)
}

const getEntriesBuilder = (startDate: DateTime, endDate: DateTime) =>
  knex
    .select('*')
    .from('entries')
    .where('date', '>=', startDate.toISODate())
    .where('date', '<=', endDate.toISODate())

const getStartDate = (): DateTime => {
  if (typeof selectedPeriod.value === 'string') {
    return PERIODS[selectedPeriod.value].interval()[0]
  }

  return selectedPeriod.value.startOf('month')
}

const groupTotalByDay = (records: any[], isPayment: boolean = false) => {
  const recordsByDate = !isPayment
    ? groupBy(records, 'date')
    : groupBy(records, (record) => record.created_at.split(' ')[0])

  const startDate = getStartDate()

  return range(0, totalDays.value).map((index) => {
    const date = startDate.plus({ day: index })
    const dateRecords = get(recordsByDate, date.toISODate()!, [])

    return !isPayment
      ? round(Math.abs(sumBy(dateRecords, 'total')), 2)
      : round(sumBy(dateRecords, 'value'), 2)
  })
}

const onPeriodSelected = async (monthDate: DateTime) => {
  selectedPeriod.value = monthDate
  await fetch()
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>
          <div :style="{ display: 'flex', gap: '0.5rem' }">
            <AppIcon
              :icon="PhCalendarDots"
              weight="fill"
              size="22"
            />
            Balanço
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <BalanceMonthPickerModal
        v-model="isPickerModalOpen"
        :selected-period="selectedPeriod"
        @period-selected="onPeriodSelected"
        @did-dismiss="isPickerModalOpen = false"
      />

      <BalanceMonthButton
        :selected-period="selectedPeriod"
        @click="isPickerModalOpen = true"
      />

      <div
        class="ion-text-center"
        style="font-weight: 600; color: var(--ion-color-medium); font-size: 0.85rem"
      >
        Receita:
        {{ formatCurrencyBRL(profit) }}
      </div>
      <div
        class="ion-margin"
        style="display: flex; flex-direction: column; gap: 2rem"
      >
        <TransitionGroup name="fade">
          <BalanceChart
            v-if="inflowsData.length"
            title="ENTRADAS"
            :data="inflowsData"
            type="inflows"
            :total-days="totalDays"
            :selected-period="selectedPeriod"
          />
          <BalanceChart
            v-if="paymentsData.length"
            title="PAGAMENTOS"
            :data="paymentsData"
            type="payments"
            :total-days="totalDays"
            :selected-period="selectedPeriod"
          />
          <BalanceChart
            v-if="outflowsData.length"
            title="SAÍDAS"
            :data="outflowsData"
            type="outflows"
            :total-days="totalDays"
            :selected-period="selectedPeriod"
          />
        </TransitionGroup>
      </div>
    </IonContent>
  </IonPage>
</template>
