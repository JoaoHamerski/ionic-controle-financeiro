<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonModal, IonSpinner } from '@ionic/vue'
import { PhCalendarDots, PhCurrencyCircleDollar, PhUser } from '@phosphor-icons/vue'
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { formatCurrencyBRL, titleCase } from '@/support/helpers'
import { Payment } from '@/types/models'

import { EntryRecordHome } from '../types'

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
        <h3 class="ion-text-center rounded-2xl">
          {{ isInflow ? 'Entrada' : 'Saída' }}
        </h3>

        <div
          class="text-center text-[var(--ion-color-medium)] mb-2"
          style="font-weight: 600"
        >
          {{ entry.product_name }}
        </div>
        <h4
          class="ion-text-center"
          :class="
            isInflow
              ? 'text-[var(--ion-color-success-shade)]'
              : 'text-[var(--ion-color-danger-shade)]'
          "
          style="margin-bottom: 0; margin-top: 0; font-weight: 800"
        >
          {{ formatCurrencyBRL(entry.entry_total) }}
        </h4>

        <div
          v-if="entry.entry_quantity"
          class="ion-text-center text-sm font-medium text-[var(--ion-color-medium)] mb-4"
        >
          {{ formatCurrencyBRL(entry.entry_value) }} x {{ entry.entry_quantity }}
        </div>

        <div style="margin-bottom: 1rem">
          <div
            v-if="isInflow"
            class="ion-text-center flex items-center justify-center font-medium mb-1 text-[var(--ion-color-medium)]"
          >
            <AppIcon
              :icon="PhUser"
              weight="fill"
              class="mr-1"
            />
            {{ titleCase(entry.customer_name) }}
          </div>
          <div class="text-center text-sm font-medium text-[var(--ion-color-medium)]">
            <AppIcon
              :icon="PhCalendarDots"
              weight="fill"
            />
            {{ DateTime.fromISO(entry.entry_date).toFormat('dd/MM/yyyy (cccc)') }}
          </div>
        </div>

        <div
          v-if="entry.entry_note"
          class="ion-text-center text-[var(--ion-color-medium)]"
        >
          {{ entry.entry_note }}
        </div>

        <hr
          v-if="payments.length"
          class="bg-[var(--ion-color-medium)] opacity-25"
        />

        <div
          v-if="payments.length"
          style="margin-top: 1rem"
        >
          <h5 class="font-semibold flex items-center mb-0 color-[var(--ion-color-medium)]">
            <AppIcon
              :icon="PhCurrencyCircleDollar"
              class="mr-1"
              weight="fill"
            />
            Pagamentos
          </h5>
          <IonList>
            <IonItem
              v-for="payment in payments"
              :key="payment.id"
              lines="none"
            >
              <IonLabel>
                <h4>{{ formatCurrencyBRL(payment.value) }}</h4>
                <p>{{ DateTime.fromISO(payment.created_at).toFormat('dd/MM/yyyy') }}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
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
