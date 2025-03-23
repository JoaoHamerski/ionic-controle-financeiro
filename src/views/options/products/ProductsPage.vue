<script setup lang="ts">
import { IonContent, IonPage, onIonViewWillEnter } from '@ionic/vue'
import { ref } from 'vue'

import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Product } from '@/types/models'

import OptionsHeader from '../_partials/OptionsHeader.vue'
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
  <IonPage>
    <OptionsHeader
      title="Produtos"
      has-back-button
    />
    <IonContent>
      <ProductsList
        :products="products"
        @submitted="fetch"
      />
    </IonContent>
  </IonPage>
</template>
