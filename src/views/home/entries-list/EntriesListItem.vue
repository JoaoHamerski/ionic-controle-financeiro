<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

import EntriesListItemCustomer from './EntriesListItemCustomer.vue'
import EntriesListItemDate from './EntriesListItemDate.vue'
import EntriesListItemPaid from './EntriesListItemPaid.vue'
import EntriesListItemPrice from './EntriesListItemPrice.vue'
import EntriesListItemProduct from './EntriesListItemProduct.vue'

defineProps<{
  entry: any
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <div>
          <EntriesListItemPrice :total="entry.entry_total" />
          <EntriesListItemCustomer
            v-if="entry.entry_total > 0"
            :customer-name="entry.customer_name"
          />
          <EntriesListItemDate :date="entry.entry_date" />
          <EntriesListItemPaid
            v-if="entry.entry_total > 0"
            :paid-at="!!entry.entry_paid_at"
          />
        </div>
        <EntriesListItemProduct :sale="entry" />
      </div>
    </IonLabel>
  </IonItem>
</template>
