<script setup lang="ts">
import { IonContent, onIonViewDidEnter } from '@ionic/vue'
import { ref } from 'vue'

import AppCenteredSpinner from '@/components/AppCenteredSpinner.vue'
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
const isLoaded = ref(false)

onIonViewDidEnter(async () => {
  await fetch()
  isLoaded.value = true
})

const fetch = async () => {
  const builder = knex
    .select(['products.*'])
    .sum('entries.value AS total_sold')
    .from('products')
    .leftJoin('entries', function () {
      // @ts-expect-error It expects 0 to be a string, but it won't work properly
      this.on('products.id', '=', 'entries.product_id').andOn('entries.value', '>', 0)
    })
    .orderByRaw('name COLLATE NOCASE ASC')
    .groupBy('products.id')

  products.value = await dbSelect(builder)
}
</script>

<template>
  <OptionsPageLayout title="Produtos">
    <IonContent>
      <Transition
        mode="out-in"
        name="fade-fast"
      >
        <AppCenteredSpinner v-if="!isLoaded" />
        <ProductsList
          v-else-if="products.length"
          :products="products"
          @submit="fetch"
        />
        <AppEmptyResult v-else />
      </Transition>
    </IonContent>
  </OptionsPageLayout>
</template>
