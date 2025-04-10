<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'
import { provide } from 'vue'

import { entryInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'
import EntriesListItemCustomer from './EntriesListItemCustomer.vue'
import EntriesListItemDate from './EntriesListItemDate.vue'
import EntriesListItemNote from './EntriesListItemNote.vue'
import EntriesListItemPrice from './EntriesListItemPrice.vue'
import EntriesListItemProduct from './EntriesListItemProduct.vue'

defineEmits(['entry-click'])

const props = defineProps<{
  entry: EntryRecordHome
}>()

provide(entryInjectionKey, props.entry)
</script>

<template>
  <IonItem
    button
    @click="$emit('entry-click', entry)"
  >
    <IonLabel v-auto-animate>
      <div style="display: flex; justify-content: space-between">
        <div style="width: 60%">
          <EntriesListItemPrice />
          <div class="entry-details-list">
            <EntriesListItemCustomer v-if="entry.entry_total > 0" />
            <EntriesListItemDate />
            <EntriesListItemNote v-if="entry.entry_note" />
          </div>
        </div>
        <EntriesListItemProduct />
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
