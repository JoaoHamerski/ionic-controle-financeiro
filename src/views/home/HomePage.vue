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

type Segment = 'all' | 'inflows' | 'outflows'

const { knex } = useDatabaseStore()

const segment = ref<Segment>('all')

const isCreateEntryModalOpen = ref<boolean>(false)

const entries = ref<EntryRecordHome[]>([])
const totalRecords = ref<number>(0)
const isFetched = ref<boolean>(false)

onIonViewDidEnter(async () => {
  await fetch(true)
})

const onSegmentChange = async (selectedSegment: Segment) => {
  segment.value = selectedSegment

  await fetch(true)
}

const fetch = async (reset: boolean = false) => {
  const builder = knex
    .select([
      'entries.id as id',
      ...(await prefixColumns(['id', 'name'], 'customers', 'customer')),
      ...(await prefixColumns(['id', 'name'], 'products', 'product')),
      ...(await prefixColumns('*', 'entries', 'entry')),
    ])
    .sum('payments.value AS total_paid')
    .from('entries')
    .leftJoin('customers', 'entries.customer_id', '=', 'customers.id')
    .join('products', 'entries.product_id', '=', 'products.id')
    .join('payments', 'entries.id', '=', 'payments.entry_id')
    .orderBy('entries.date', 'desc')
    .orderBy('entries.created_at', 'desc')
    .limit(20)
    .offset(!reset ? entries.value.length : 0)
    .groupBy('entries.id')

  if (segment.value !== 'all') {
    const operator = segment.value === 'inflows' ? '>' : '<'

    builder.where('total', operator, 0)
  }

  if (reset) {
    entries.value = await dbSelect(builder)
    totalRecords.value = await calculateTotalRecords(builder)

    isFetched.value = true
    console.log(entries.value)
    return
  }

  entries.value.push(...(await dbSelect(builder)))
}

const calculateTotalRecords = async (builder: Knex.QueryBuilder) => {
  builder.count('* as total')

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
        name="fade"
        mode="out-in"
      >
        <EntriesList
          v-if="entries.length"
          :key="segment"
          :entries="entries"
          :total-records="totalRecords"
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
      @submit="fetch(true)"
      @did-dismiss="isCreateEntryModalOpen = false"
    />
  </IonPage>
</template>
