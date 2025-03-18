<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonToolbar, onIonViewDidEnter } from '@ionic/vue'
import { Knex } from 'knex'
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

const sales = ref<any[]>([])
const totalRecords = ref<number>(0)
const segment = ref<Segment>('all')

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
    .offset(!reset ? sales.value.length : 0)

  if (segment.value !== 'all') {
    const operator = segment.value === 'sales' ? '>' : '<'

    builder.where('total', operator, 0)
  }

  if (reset) {
    sales.value = await dbSelect(builder)
    totalRecords.value = await calculateTotalRecords(builder)

    return
  }

  sales.value.push(...(await dbSelect(builder)))
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
        <SalesList
          :key="segment"
          :sales="sales"
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
