<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from '@ionic/vue'
import { basketSharp, funnelSharp, listOutline } from 'ionicons/icons'
import { onMounted, ref } from 'vue'

import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { prefixColumns } from '@/support/helpers'

import HomeFabButton from './_partials/HomeFabButton.vue'
import CreateCustomerModal from './customer/CreateCustomerModal.vue'
import CreateSaleModal from './sale/CreateSaleModal.vue'
import SalesList from './sales-list-item/SalesList.vue'

type Segment = 'all' | 'sales' | 'expenses'

const { knex } = useDatabaseStore()

const isCreateSaleModalOpen = ref<boolean>(false)
const isCreateCustomerModalOpen = ref<boolean>(false)

const items = ref<any[]>([])

const segment = ref<Segment>('all')

onMounted(async () => {
  fetch('all')
})

const fetch = async (fetchSegment: Segment) => {
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
    .limit(20)
    .orderBy('sales.date', 'desc')
    .orderBy('sales.created_at', 'desc')

  if (fetchSegment === 'sales') {
    builder.where('total', '>', 0)
  }

  if (fetchSegment === 'expenses') {
    builder.where('total', '<', 0)
  }

  items.value = await dbSelect(builder)
}

const onSegmentChange = async (selectedSegment: Segment) => {
  segment.value = selectedSegment

  fetch(selectedSegment)
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonSegment
          value="all"
          color="light"
        >
          <IonSegmentButton
            value="all"
            @click="onSegmentChange('all')"
          >
            <IonIcon
              :icon="listOutline"
              color="white"
            />
            <IonLabel :style="{ color: 'var(--ion-color-light)' }">Tudo</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton
            value="sales"
            @click="onSegmentChange('sales')"
          >
            <IonIcon
              :icon="basketSharp"
              color="white"
            />
            <IonLabel :style="{ color: 'var(--ion-color-light)' }">Vendas</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton
            value="expenses"
            @click="onSegmentChange('expenses')"
          >
            <IonIcon
              :icon="funnelSharp"
              color="white"
            />
            <IonLabel :style="{ color: 'var(--ion-color-light)' }">Despesas</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>

    <IonContent :style="{ backgroundColor: 'white' }">
      <Transition
        name="fade"
        mode="out-in"
      >
        <SalesList
          :key="segment"
          :items="items"
        />
      </Transition>

      <HomeFabButton
        @sale-click="isCreateSaleModalOpen = true"
        @customer-click="isCreateCustomerModalOpen = true"
      />
    </IonContent>

    <CreateSaleModal
      :is-open="isCreateSaleModalOpen"
      @submitted="fetch"
      @did-dismiss="isCreateSaleModalOpen = false"
    />

    <CreateCustomerModal
      :is-open="isCreateCustomerModalOpen"
      @did-dismiss="isCreateCustomerModalOpen = false"
    />
  </IonPage>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
