<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

import SalesListItemCustomer from './SalesListItemCustomer.vue'
import SalesListItemDate from './SalesListItemDate.vue'
import SalesListItemPaid from './SalesListItemPaid.vue'
import SalesListItemPrice from './SalesListItemPrice.vue'
import SalesListItemProduct from './SalesListItemProduct.vue'

defineProps<{
  item: any
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <div>
          <SalesListItemPrice :total="item.sale_total" />
          <SalesListItemCustomer
            v-if="item.sale_total > 0"
            :customer-name="item.customer_name"
          />
          <SalesListItemDate :date="item.sale_date" />
          <SalesListItemPaid
            v-if="item.sale_total > 0"
            :is-paid="!!item.sale_is_paid"
          />
        </div>
        <SalesListItemProduct :item="item" />
      </div>
    </IonLabel>
  </IonItem>
</template>
