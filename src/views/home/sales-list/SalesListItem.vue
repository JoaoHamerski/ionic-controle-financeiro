<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

import SalesListItemCustomer from './SalesListItemCustomer.vue'
import SalesListItemDate from './SalesListItemDate.vue'
import SalesListItemPaid from './SalesListItemPaid.vue'
import SalesListItemPrice from './SalesListItemPrice.vue'
import SalesListItemProduct from './SalesListItemProduct.vue'

defineProps<{
  sale: any
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <div>
          <SalesListItemPrice :total="sale.sale_total" />
          <SalesListItemCustomer
            v-if="sale.sale_total > 0"
            :customer-name="sale.customer_name"
          />
          <SalesListItemDate :date="sale.sale_date" />
          <SalesListItemPaid
            v-if="sale.sale_total > 0"
            :paid-at="!!sale.sale_paid_at"
          />
        </div>
        <SalesListItemProduct :sale="sale" />
      </div>
    </IonLabel>
  </IonItem>
</template>
