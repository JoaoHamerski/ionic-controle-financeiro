<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonToolbar, onIonViewDidEnter } from '@ionic/vue'
import { Knex } from 'knex'
import { ref } from 'vue'

import AppEmptyResult from '@/components/AppEmptyResult.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { prefixColumns } from '@/support/helpers'

import HomeFabButton from './_partials/HomeFabButton.vue'
import HomeSegments from './_partials/HomeSegments.vue'
import EntriesCreateModal from './entries-form/EntriesCreateModal.vue'
import EntriesList from './entries-list/EntriesList.vue'
import { EntryRecordHome } from './types'

export type HomeSegment = 'all' | 'inflows' | 'outflows'

const { knex } = useDatabaseStore()

const segment = ref<HomeSegment>('all')

const isCreateEntryModalOpen = ref<boolean>(false)

const entries = ref<EntryRecordHome[]>([])
const totalRecords = ref<number>(0)
const isFetched = ref<boolean>(false)

onIonViewDidEnter(async () => {
  await fetch(true)
})

const onSegmentChange = async (selectedSegment: HomeSegment) => {
  segment.value = selectedSegment

  await fetch(true)
}

const fetch = async (reset: boolean = false) => {
  const COLUMNS = [
    'entries.id as id',
    ...(await prefixColumns(['id', 'name', 'phone'], 'customers', 'customer')),
    ...(await prefixColumns(['id', 'name'], 'products', 'product')),
    ...(await prefixColumns('*', 'entries', 'entry')),
    knex.raw('ROUND(SUM(payments.value), 2) AS total_paid'),
  ]

  const builder = knex
    .select(COLUMNS)
    .from('entries')
    .leftJoin('customers', 'entries.customer_id', '=', 'customers.id')
    .leftJoin('payments', 'entries.id', '=', 'payments.entry_id')
    .leftJoin('products', 'entries.product_id', '=', 'products.id')
    .orderBy('entries.date', 'desc')
    .orderBy('entries.created_at', 'desc')
    .offset(!reset ? entries.value.length : 0)
    .limit(20)
    .groupBy('entries.id')

  if (reset) {
    totalRecords.value = await fetchTotalRecords()
    entries.value = await dbSelect(applyFilter(builder))

    isFetched.value = true

    return
  }

  entries.value.push(...(await dbSelect(builder)))
}

const applyFilter = (builder: Knex.QueryBuilder) => {
  if (segment.value !== 'all') {
    const operator = segment.value === 'inflows' ? '>' : '<'

    builder.where('entries.total', operator, 0)
  }

  return builder
}

const fetchTotalRecords = async () => {
  const builder = applyFilter(knex.count('* as total').from('entries'))
  const data = await dbSelect(builder)

  if (data.length) {
    return data[0].total
  }

  return 0
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <HomeSegments @segment-changed="onSegmentChange" />
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <Transition
        name="fade-fast"
        mode="out-in"
      >
        <EntriesList
          v-if="entries.length"
          :key="segment"
          :entries="entries"
          :total-records="totalRecords"
          :segment="segment"
          @refetch="fetch(true)"
          @load-more="fetch"
        />
        <AppEmptyResult
          v-else-if="isFetched"
          :key="`empty-${segment}`"
        />
      </Transition>

      <HomeFabButton @click="isCreateEntryModalOpen = true" />
    </IonContent>

    <EntriesCreateModal
      :is-open="isCreateEntryModalOpen"
      @submitted="fetch(true)"
      @did-dismiss="isCreateEntryModalOpen = false"
    />
  </IonPage>
</template>
