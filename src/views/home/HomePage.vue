<script setup lang="ts">
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { add, cart, peopleCircle } from 'ionicons/icons'
import { onMounted, ref } from 'vue'

import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { prefixColumns } from '@/support/helpers'

import HomeContent from './_partials/HomeContent.vue'
import NewCustomerModal from './_partials/NewCustomerModal.vue'
import NewSaleModal from './_partials/NewSaleModal.vue'
const { builder } = useDatabaseStore()

const isSaleModalOpen = ref<boolean>(false)
const isClientModalOpen = ref<boolean>(false)
const items = ref<any[]>([])

onMounted(async () => {
  const builderQuery = builder
    .select([
      'sales.id as id',
      ...(await prefixColumns('*', 'customers', 'customer')),
      ...(await prefixColumns('*', 'products', 'product')),
      ...(await prefixColumns('*', 'sales', 'sale')),
    ])
    .from('sales')
    .join('customers', 'sales.customer_id', '=', 'customers.id')
    .join('products', 'sales.product_id', '=', 'products.id')
    .orderBy('sales.date', 'desc')

  items.value = await dbSelect(builderQuery)
})
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle> Início </IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <NewSaleModal
        :is-open="isSaleModalOpen"
        @did-dismiss="isSaleModalOpen = false"
      />
      <NewCustomerModal
        :is-open="isClientModalOpen"
        @did-dismiss="isClientModalOpen = false"
      />

      <HomeContent :items="items" />

      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
      >
        <IonFabButton color="success">
          <IonIcon :icon="add" />
        </IonFabButton>

        <IonFabList side="top">
          <IonFabButton
            color="light"
            data-label="Nova venda"
            @click="isSaleModalOpen = true"
          >
            <IonIcon :icon="cart" />
          </IonFabButton>
          <IonFabButton
            color="light"
            data-label="Novo cliente"
            @click="isClientModalOpen = true"
          >
            <IonIcon :icon="peopleCircle" />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-fab-button[data-label]::after {
  content: attr(data-label);
  position: absolute;
  color: var(--ion-color-light);
  right: 45px;
  bottom: 3px;
  background-color: rgba(var(--ion-color-dark-rgb), 0.7);
  padding: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 1rem;
}

ion-fab-button {
  margin-bottom: 1rem;
  margin-right: 0.5rem;

  --background: var(--ion-color-primary-shade);
  --color: var(--ion-color-dark);
}
</style>
