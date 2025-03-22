<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  onIonViewDidEnter,
} from '@ionic/vue'
import { calendar } from 'ionicons/icons'
import { get, groupBy, range, sumBy } from 'lodash'
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { computed } from 'vue'

import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import BalanceChart from './_partials/BalanceChart.vue'
import BalanceMonthButton from './_partials/BalanceMonthButton.vue'
import BalanceMonthPickerModal from './_partials/BalanceMonthPickerModal.vue'

export type SelectedPeriodType = DateTime | 'last-week' | 'current-week'

const { knex } = useDatabaseStore()

const selectedPeriod = ref<SelectedPeriodType>('current-week')
const isPickerModalOpen = ref(false)

const inflowsData = ref<number[]>([])
const outflowsData = ref<number[]>([])
const paymentsData = ref<number[]>([])

onIonViewDidEnter(async () => {
  await fetch()
})

const totalDays = computed(() => {
  if (selectedPeriod.value === 'current-week' || selectedPeriod.value === 'last-week') {
    return 7
  }

  return selectedPeriod.value.daysInMonth!
})

const fetch = async () => {
  const [startDate, endDate] = getDateInterval()

  await fetchInflows(startDate, endDate)
  await fetchOutflows(startDate, endDate)
  await fetchPayments(startDate, endDate)
}

const getDateInterval = () => {
  const localSelectedPeriod = selectedPeriod.value
  const now = DateTime.now()

  if (localSelectedPeriod === 'current-week') {
    return [
      now.startOf('week', { useLocaleWeeks: true }),
      now.endOf('week', { useLocaleWeeks: true }),
    ]
  }

  if (localSelectedPeriod === 'last-week') {
    const lastWeek = now.minus({ week: 1 })

    return [
      lastWeek.startOf('week', { useLocaleWeeks: true }),
      lastWeek.endOf('week', { useLocaleWeeks: true }),
    ]
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
    .from('entries')
    .where('paid_at', '>=', startDate.toISO())
    .where('paid_at', '<=', endDate.toISO())

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
  if (selectedPeriod.value === 'current-week') {
    return DateTime.now().startOf('week', { useLocaleWeeks: true })
  }

  if (selectedPeriod.value === 'last-week') {
    return DateTime.now().plus({ week: -1 }).startOf('week', { useLocaleWeeks: true })
  }

  return selectedPeriod.value.startOf('month')
}

const groupTotalByDay = (entries: any[], isPayment: boolean = false) => {
  const entriesByDate = !isPayment
    ? groupBy(entries, 'date')
    : groupBy(entries, (entry) => entry.paid_at.split('T')[0])

  const startDate = getStartDate()

  return range(0, totalDays.value).map((index) => {
    const date = startDate.plus({ day: index })
    const dateEntries = get(entriesByDate, date.toISODate()!, [])

    return Math.abs(sumBy(dateEntries, 'total'))
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
            <IonIcon :icon="calendar" />
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
        class="ion-margin"
        :style="{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }"
      >
        <Transition name="fade">
          <BalanceChart
            v-if="inflowsData.length"
            title="ENTRADAS"
            :data="inflowsData"
            type="inflows"
            :selected-period="selectedPeriod"
          />
        </Transition>

        <Transition name="fade">
          <BalanceChart
            v-if="paymentsData.length"
            title="PAGAMENTOS"
            :data="paymentsData"
            type="payments"
            :selected-period="selectedPeriod"
          />
        </Transition>

        <Transition name="fade">
          <BalanceChart
            v-if="outflowsData.length"
            title="SAÍDAS"
            :data="outflowsData"
            type="outflows"
            :selected-period="selectedPeriod"
          />
        </Transition>
      </div>
    </IonContent>
  </IonPage>
</template>
