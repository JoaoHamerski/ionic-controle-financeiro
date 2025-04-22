<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppModalHeader from '@/components/AppModalHeader.vue'
import { formatCurrencyBRL } from '@/support/helpers'

import { EntryRecordHome } from '../types'
import EntryInfo from './EntryInfo.vue'
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

      <template v-if="entry">
        <EntryInfo :entry="entry" />
        <hr class="bg-[var(--ion-color-medium)]/20 my-4" />
        <div
          class="flex text-lg text-[var(--ion-color-primary)] items-center justify-center text-center font-medium mb-2"
        >
          <b>{{ formatCurrencyBRL(entry.entry_total - entry.total_paid!) }}</b>
          <span>&nbsp;a ser pago</span>
        </div>
      </template>

      <EntryPaymentModalForm
        v-if="entry"
        :entry="entry"
        @submitted="modal?.$el.dismiss(null, 'paid')"
        @cancel="modal?.$el.dismiss()"
      />
    </div>
  </IonModal>
</template>
