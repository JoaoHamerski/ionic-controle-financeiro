<script setup lang="ts">
import { IonContent, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'

import AppEmptyResult from '@/components/AppEmptyResult.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Product } from '@/types/models'

import OptionsPageLayout from '../_partials/OptionsPageLayout.vue'
import ProductsList from './_partials/ProductsList.vue'

export type ProductRecord = Product & {
  total_sold: number
}

const { knex } = useDatabaseStore()
const products = ref<ProductRecord[]>([])

onIonViewWillEnter(async () => {
  await fetch()
})

const fetch = async () => {
  const builder = knex
    .select('*')
    .sum('entries.value AS total_sold')
    .from('products')
    .join('entries', 'products.id', 'entries.product_id')
    .where('entries.value', '>', 0)
    .orderByRaw('name COLLATE NOCASE ASC')
    .groupBy('products.id')

  products.value = await dbSelect(builder)
}
</script>

<template>
  <OptionsPageLayout title="Produtos">
    <IonContent>
      <ProductsList
        v-if="products.length"
        :products="products"
        @submit="fetch"
      />
      <AppEmptyResult v-else />
    </IonContent>
  </OptionsPageLayout>
</template>
