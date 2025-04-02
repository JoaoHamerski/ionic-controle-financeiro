<script setup lang="ts">
import { IonContent, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'

import AppEmptyResult from '@/components/AppEmptyResult.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Product } from '@/types/models'

import OptionPageLayout from '../_partials/OptionPageLayout.vue'
import ProductsList from './_partials/ProductsList.vue'

const { knex } = useDatabaseStore()
const products = ref<Product[]>([])

onIonViewWillEnter(async () => {
  await fetch()
})

const fetch = async () => {
  const builder = knex.select('*').from('products').orderByRaw('name COLLATE NOCASE ASC')

  products.value = await dbSelect(builder)
}
</script>

<template>
  <OptionPageLayout title="Produtos">
    <IonContent>
      <ProductsList
        v-if="products.length"
        :products="products"
        @submitted="fetch"
      />
      <AppEmptyResult v-else />
    </IonContent>
  </OptionPageLayout>
</template>
