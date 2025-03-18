<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonToolbar, onIonViewDidEnter } from '@ionic/vue'
import { ref } from 'vue'

import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { prefixColumns } from '@/support/helpers'

import HomeFabButton from './_partials/HomeFabButton.vue'
import HomeSegments from './_partials/HomeSegments.vue'
import CustomerCreateModal from './customer-form/CustomerCreateModal.vue'
import SaleCreateModal from './sale-form/SaleCreateModal.vue'
import SalesList from './sales-list/SalesList.vue'

type Segment = 'all' | 'sales' | 'expenses'

const { knex } = useDatabaseStore()

const isCreateSaleModalOpen = ref<boolean>(false)
const isCreateCustomerModalOpen = ref<boolean>(false)

const items = ref<any[]>([])
const totalRecords = ref<number>(0)
const offset = ref<number>(0)
const segment = ref<Segment>('all')

onIonViewDidEnter(async () => {
  await fetch()
  await calculateTotalRecords()
})

const fetch = async (reset: boolean = false) => {
  if (reset) {
    offset.value = 0
  }

  const builder = knex
    .select([
      'sales.id as id',
      ...(await prefixColumns('*', 'customers', 'customer')),
      ...(await prefixColumns('*', 'products', 'product')),
      ...(await prefixColumns('*', 'sales', 'sale')),
    ])
    .from('sales')
    .leftJoin('customers', 'sales.customer_id', '=', 'customers.id')
    .join('products', 'sales.product_id', '=', 'products.id')
    .orderBy('sales.date', 'desc')
    .orderBy('sales.created_at', 'desc')
    .limit(20)
    .offset(offset.value)

  if (segment.value === 'sales') {
    builder.where('total', '>', 0)
  }

  if (segment.value === 'expenses') {
    builder.where('total', '<', 0)
  }

  if (reset) {
    items.value = await dbSelect(builder)
    return
  }

  items.value.push(...(await dbSelect(builder)))
}

const calculateTotalRecords = async () => {
  const builder = knex.count('* as total').from('sales')

  if (segment.value === 'sales') {
    builder.where('total', '>', 0)
  }

  if (segment.value === 'expenses') {
    builder.where('total', '<', 0)
  }

  const data = await dbSelect(builder)

  totalRecords.value = data.length ? data[0].total : 0
  console.log(totalRecords.value)
}

const onSegmentChange = async (selectedSegment: Segment) => {
  segment.value = selectedSegment

  await fetch(true)
  await calculateTotalRecords()
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
        <SalesList
          :key="segment"
          :sales="items"
          :total-records="totalRecords"
          @refetch="fetch(true)"
          @load-more="fetch"
        />
      </Transition>

      <HomeFabButton
        @sale-click="isCreateSaleModalOpen = true"
        @customer-click="isCreateCustomerModalOpen = true"
      />
    </IonContent>

    <SaleCreateModal
      :is-open="isCreateSaleModalOpen"
      @submitted="fetch"
      @did-dismiss="isCreateSaleModalOpen = false"
    />

    <CustomerCreateModal
      :is-open="isCreateCustomerModalOpen"
      @did-dismiss="isCreateCustomerModalOpen = false"
    />
  </IonPage>
</template>
