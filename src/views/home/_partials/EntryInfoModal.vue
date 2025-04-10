<script setup lang="ts">
import { IonModal, IonSpinner } from '@ionic/vue'
import { ref } from 'vue'
import { computed } from 'vue'
import { provide } from 'vue'

import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Payment } from '@/types/models'

import { entryInjectionKey, isInflowInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'
import EntryInfoModalData from './EntryInfoModalData.vue'
import EntryInfoModalPayments from './EntryInfoModalPayments.vue'
import EntryInfoModalProduct from './EntryInfoModalProduct.vue'
import EntryInfoModalTitle from './EntryInfoModalTitle.vue'

const props = defineProps<{
  entry: EntryRecordHome
}>()

const { knex } = useDatabaseStore()

const payments = ref<Payment[]>([])
const isFetched = ref(false)

const isInflow = computed(() => props.entry.entry_total > 0)

const fetchPayments = async () => {
  const builder = knex
    .select('*')
    .from('payments')
    .where('entry_id', '=', props.entry.id)
    .orderBy('created_at', 'desc')

  payments.value = await dbSelect(builder)
  isFetched.value = true
}

const onModalWillPresent = async () => {
  await fetchPayments()

  isFetched.value = true
}

provide(entryInjectionKey, props.entry)
provide(isInflowInjectionKey, isInflow.value)
</script>

<template>
  <IonModal
    class="modal-dialog"
    @did-present="onModalWillPresent"
  >
    <div
      style="min-width: 90vw"
      class="ion-padding"
    >
      <div v-if="isFetched">
        <EntryInfoModalTitle />
        <EntryInfoModalProduct />

        <EntryInfoModalData style="margin-bottom: 1rem" />

        <hr
          v-if="payments.length"
          class="bg-[var(--ion-color-medium)] opacity-25"
        />

        <EntryInfoModalPayments
          v-if="payments.length"
          style="margin-top: 1rem"
          :payments="payments"
        />
      </div>
      <div
        v-else
        class="text-center"
      >
        <IonSpinner color="medium" />
      </div>
    </div>
  </IonModal>
</template>
