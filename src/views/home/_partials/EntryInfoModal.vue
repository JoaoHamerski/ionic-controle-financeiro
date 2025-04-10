<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { computed, provide } from 'vue'

import { entryInjectionKey, isInflowInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'
import EntryInfoModalData from './EntryInfoModalData.vue'
import EntryInfoModalPayments from './EntryInfoModalPayments.vue'
import EntryInfoModalProduct from './EntryInfoModalProduct.vue'
import EntryInfoModalTitle from './EntryInfoModalTitle.vue'

const props = defineProps<{
  entry: EntryRecordHome
}>()

const isInflow = computed(() => props.entry.entry_total > 0)

provide(entryInjectionKey, props.entry)
provide(isInflowInjectionKey, isInflow.value)
</script>

<template>
  <IonModal class="modal-dialog">
    <div
      style="min-width: 90vw"
      class="ion-padding"
    >
      <div>
        <EntryInfoModalTitle />
        <EntryInfoModalProduct class="mb-3" />

        <EntryInfoModalData class="mb-4" />

        <EntryInfoModalPayments
          v-if="entry.entry_total > 0"
          style="margin-top: 1rem"
        />
      </div>
    </div>
  </IonModal>
</template>
