<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonModal } from '@ionic/vue'
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
      class="ion-padding"
      style="min-width: 90vw"
    >
      <div v-if="isFetched">
        <h3
          class="ion-text-center"
          style="margin-top: 0; font-weight: 600"
        >
          {{ isInflow ? 'Entrada' : 'Saída' }}
        </h3>
        <div style="margin-bottom: 1rem">
          <div
            v-if="isInflow"
            class="ion-text-center"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--ion-color-medium);
              font-weight: 500;
              margin-bottom: 0.25rem;
            "
          >
            <AppIcon
              :icon="PhUser"
              weight="fill"
              style="margin-right: 0.25rem"
            />
            {{ titleCase(entry.customer_name) }}
          </div>
          <div
            style="
              text-align: center;
              color: var(--ion-color-medium);
              font-size: 0.9rem;
              font-weight: 400;
            "
          >
            <AppIcon
              :icon="PhCalendarDots"
              weight="fill"
            />
            {{ DateTime.fromISO(entry.entry_date).toFormat('dd/MM/yyyy (cccc)') }}
          </div>
        </div>
        <h4
          class="ion-text-center"
          style="font-weight: 600; margin-top: 0; margin-bottom: 0"
          :style="{
            color: isInflow ? 'var(--ion-color-success-shade)' : 'var(--ion-color-danger-shade)',
          }"
        >
          {{ formatCurrencyBRL(entry.entry_total) }}
        </h4>

        <div
          v-if="entry.entry_quantity"
          class="ion-text-center"
          style="font-size: 0.9rem; color: var(--ion-color-medium); margin-bottom: 1rem"
        >
          {{ formatCurrencyBRL(entry.entry_value) }} x {{ entry.entry_quantity }}
        </div>

        <div
          v-if="entry.entry_note"
          class="ion-text-center"
          style="color: var(--ion-color-medium)"
        >
          {{ entry.entry_note }}
        </div>

        <hr
          v-if="payments.length"
          style="background-color: var(--ion-color-medium); opacity: 0.25"
        />

        <div
          v-if="payments.length"
          style="margin-top: 1rem"
        >
          <h5
            style="
              font-weight: 500;
              display: flex;
              align-items: center;
              color: var(--ion-color-medium);
              margin-bottom: 0;
            "
          >
            <AppIcon
              :icon="PhCurrencyCircleDollar"
              style="margin-right: 0.25rem"
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
      <div v-else>Carregando</div>
    </div>
  </IonModal>
</template>
