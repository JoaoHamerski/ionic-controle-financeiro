<script setup lang="ts">
import { IonButton, IonModal } from '@ionic/vue'
import { provide } from 'vue'
import { useTemplateRef } from 'vue'
import { computed } from 'vue'

import { entryInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'
import EntryInfo from './EntryInfo.vue'
import EntryInfoModalPayments from './EntryInfoModalPayments.vue'
import EntryInfoModalTitle from './EntryInfoModalTitle.vue'

const props = defineProps<{
  entry: EntryRecordHome
}>()

const modal = useTemplateRef('modal')

const isInflow = computed(() => props.entry.entry_total > 0)
provide(entryInjectionKey, props.entry)
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div
      style="min-width: 90vw"
      class="ion-padding"
    >
      <div>
        <EntryInfoModalTitle :is-inflow="isInflow" />

        <EntryInfo :entry="entry" />

        <EntryInfoModalPayments
          v-if="isInflow"
          style="margin-top: 1rem"
        />

        <IonButton
          class="w-full"
          fill="clear"
          shape="round"
          @click="modal?.$el.dismiss()"
        >
          Fechar
        </IonButton>
      </div>
    </div>
  </IonModal>
</template>
