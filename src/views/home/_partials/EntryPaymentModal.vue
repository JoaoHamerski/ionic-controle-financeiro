<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppModalHeader from '@/components/AppModalHeader.vue'

import { EntryRecordHome } from '../types'
import EntryPaymentModalForm from './EntryPaymentModalForm.vue'

defineProps<{
  entry: EntryRecordHome | null
}>()

const modal = useTemplateRef('modal')
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div class="ion-padding">
      <AppModalHeader
        :icon="PhCurrencyCircleDollar"
        title="Novo pagamento"
        class="text-[var(--ion-color-success-shade)]"
      />

      <div v-if="entry">
        {{ entry }}
      </div>

      <EntryPaymentModalForm @cancel="modal?.$el.dismiss()" />
    </div>
  </IonModal>
</template>

<style scoped>
ion-modal {
  --min-width: 90%;
}
</style>
