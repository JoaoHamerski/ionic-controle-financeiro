<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

import { EntryRecordHome } from '../HomePage.vue'
import EntriesListItemCustomer from './EntriesListItemCustomer.vue'
import EntriesListItemDate from './EntriesListItemDate.vue'
import EntriesListItemNote from './EntriesListItemNote.vue'
import EntriesListItemPrice from './EntriesListItemPrice.vue'
import EntriesListItemProduct from './EntriesListItemProduct.vue'

defineProps<{
  entry: EntryRecordHome
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div style="display: flex; justify-content: space-between">
        <div style="width: 60%">
          <EntriesListItemPrice
            :total="entry.entry_total"
            :paid-at="entry.entry_paid_at"
          />
          <div class="entry-details-list">
            <EntriesListItemCustomer
              v-if="entry.entry_total > 0"
              :customer-name="entry.customer_name"
            />
            <EntriesListItemDate :date="entry.entry_date" />
            <EntriesListItemNote
              v-if="entry.entry_note"
              :note="entry.entry_note"
            />
          </div>
        </div>
        <EntriesListItemProduct :entry="entry" />
      </div>
    </IonLabel>
  </IonItem>
</template>

<style scoped>
.entry-details-list {
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  color: var(--ion-color-medium);
}

.entry-details-list div {
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
}
</style>
