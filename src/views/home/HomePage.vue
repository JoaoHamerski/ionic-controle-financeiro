<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonToolbar, onIonViewDidEnter } from '@ionic/vue'
import { Knex } from 'knex'
import { ref } from 'vue'

import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { prefixColumns } from '@/support/helpers'
import type { Prefix } from '@/types/helpers'
import type { Customer, Entry, Product } from '@/types/models'

import HomeFabButton from './_partials/HomeFabButton.vue'
import HomeSegments from './_partials/HomeSegments.vue'
import CustomerCreateModal from './customer-form/CustomerCreateModal.vue'
import EntriesCreateModal from './entries-form/EntriesCreateModal.vue'
import EntriesList from './entries-list/EntriesList.vue'

type Segment = 'all' | 'sales' | 'expenses'

export type EntryRecordHome = { id: string } & Prefix<Customer, 'customer'> &
  Prefix<Product, 'product'> &
  Prefix<Entry, 'entry'>

const { knex } = useDatabaseStore()

const segment = ref<Segment>('all')

const isCreateEntryModalOpen = ref<boolean>(false)
const isCreateCustomerModalOpen = ref<boolean>(false)

const entries = ref<EntryRecordHome[]>([])
const totalRecords = ref<number>(0)

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
      ...(await prefixColumns('*', 'customers', 'customer')),
      ...(await prefixColumns('*', 'products', 'product')),
      ...(await prefixColumns('*', 'entries', 'entry')),
    ])
    .from('entries')
    .leftJoin('customers', 'entries.customer_id', '=', 'customers.id')
    .join('products', 'entries.product_id', '=', 'products.id')
    .orderBy('entries.date', 'desc')
    .orderBy('entries.created_at', 'desc')
    .limit(20)
    .offset(!reset ? entries.value.length : 0)

  if (segment.value !== 'all') {
    const operator = segment.value === 'sales' ? '>' : '<'

    builder.where('total', operator, 0)
  }

  if (reset) {
    entries.value = await dbSelect(builder)
    totalRecords.value = await calculateTotalRecords(builder)

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

    <IonContent :style="{ backgroundColor: 'white', height: '100%' }">
      <Transition
        name="fade"
        mode="out-in"
      >
        <EntriesList
          :key="segment"
          :entries="entries"
          :total-records="totalRecords"
          @refetch="fetch(true)"
          @load-more="fetch"
        />
      </Transition>

      <HomeFabButton
        @entry-click="isCreateEntryModalOpen = true"
        @customer-click="isCreateCustomerModalOpen = true"
      />
    </IonContent>

    <EntriesCreateModal
      :is-open="isCreateEntryModalOpen"
      @submitted="fetch(true)"
      @did-dismiss="isCreateEntryModalOpen = false"
    />

    <CustomerCreateModal
      :is-open="isCreateCustomerModalOpen"
      @did-dismiss="isCreateCustomerModalOpen = false"
    />
  </IonPage>
</template>
