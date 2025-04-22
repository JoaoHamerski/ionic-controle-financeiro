<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

import { EntryRecordHome } from '../types'
import EntriesListItemCustomer from './EntriesListItemCustomer.vue'
import EntriesListItemDate from './EntriesListItemDate.vue'
import EntriesListItemNote from './EntriesListItemNote.vue'
import EntriesListItemPrice from './EntriesListItemPrice.vue'
import EntriesListItemProduct from './EntriesListItemProduct.vue'

defineEmits(['entry-click'])

defineProps<{
  entry: EntryRecordHome
}>()
</script>

<template>
  <IonItem
    button
    @click="$emit('entry-click', entry)"
  >
    <IonLabel>
      <div style="display: flex; justify-content: space-between">
        <div style="width: 60%">
          <EntriesListItemPrice
            :entry="entry"
            class="flex items-center mb-1"
          />

          <div class="flex flex-col text-[.8rem] text-[var(--ion-color-medium)]">
            <EntriesListItemCustomer
              v-if="entry.entry_total > 0"
              :entry="entry"
              class="flex items-center mb-1"
            />
            <EntriesListItemDate
              :entry="entry"
              class="flex items-center mb-1"
            />
            <EntriesListItemNote
              v-if="entry.entry_note"
              :entry="entry"
              class="flex items-center mb-1"
            />
          </div>
        </div>
        <EntriesListItemProduct :entry="entry" />
      </div>
    </IonLabel>
  </IonItem>
</template>
