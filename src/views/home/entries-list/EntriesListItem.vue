<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

import { EntryRecordHome } from '../HomePage.vue'
import EntriesListItemCustomer from './EntriesListItemCustomer.vue'
import EntriesListItemDate from './EntriesListItemDate.vue'
import EntriesListItemPrice from './EntriesListItemPrice.vue'
import EntriesListItemProduct from './EntriesListItemProduct.vue'

defineProps<{
  entry: EntryRecordHome
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <div>
          <EntriesListItemPrice
            :total="entry.entry_total"
            :paid-at="entry.entry_paid_at"
          />
          <EntriesListItemCustomer
            v-if="entry.entry_total > 0"
            :customer-name="entry.customer_name"
          />
          <EntriesListItemDate :date="entry.entry_date" />
        </div>
        <EntriesListItemProduct :entry="entry" />
      </div>
    </IonLabel>
  </IonItem>
</template>
