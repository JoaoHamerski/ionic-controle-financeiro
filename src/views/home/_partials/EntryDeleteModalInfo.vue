<script setup lang="ts">
import { IonCol, IonGrid, IonRow } from '@ionic/vue'
import { provide } from 'vue'
import { computed } from 'vue'

import { entryInjectionKey, isInflowInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'
import EntryInfoModalData from './EntryInfoModalData.vue'
import EntryInfoModalProduct from './EntryInfoModalProduct.vue'

const props = defineProps<{
  entry: EntryRecordHome
}>()

const isInflow = computed(() => props.entry.entry_total > 0)

provide(entryInjectionKey, props.entry)
provide(isInflowInjectionKey, isInflow.value)
</script>

<template>
  <IonGrid>
    <IonRow>
      <IonCol>
        <EntryInfoModalProduct class="mb-3" />
        <EntryInfoModalData class="mb-4" />
      </IonCol>
    </IonRow>
  </IonGrid>
</template>
