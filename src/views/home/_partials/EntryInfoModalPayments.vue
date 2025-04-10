<script setup lang="ts">
import { IonItem, IonLabel, IonList, IonRippleEffect } from '@ionic/vue'
import { PhCaretCircleLeft, PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import { DateTime } from 'luxon'
import { inject, ref } from 'vue'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { formatCurrencyBRL } from '@/support/helpers'
import { Payment } from '@/types/models'

import { entryInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'

const { knex } = useDatabaseStore()

const payments = ref<Payment[]>([])

const isPaymentsExpanded = ref(false)
const isFetched = ref(false)

const entry = inject(entryInjectionKey) as EntryRecordHome

const remaining = computed(() =>
  entry.total_paid ? parseFloat((entry.entry_total - entry.total_paid).toFixed(2)) : 0,
)

const fetchPayments = async () => {
  const builder = knex
    .select('*')
    .from('payments')
    .where('entry_id', '=', entry.id)
    .orderBy('created_at', 'desc')

  payments.value = await dbSelect(builder)
  isFetched.value = true
}

const onPaymentsClick = async () => {
  if (isPaymentsExpanded.value) {
    isPaymentsExpanded.value = false
    return
  }

  isPaymentsExpanded.value = true
  await fetchPayments()
  isFetched.value = true
}
</script>

<template>
  <div>
    <h5
      class="relative ion-activatable overflow-hidden py-2 px-3 font-semibold flex justify-between items-center mb-0 color-[var(--ion-color-medium)]"
      @click="onPaymentsClick"
    >
      <div>
        <div class="flex items-center">
          <AppIcon
            :icon="PhCurrencyCircleDollar"
            class="mr-1"
            weight="fill"
          />
          <span>Pagamentos</span>
        </div>
        <span class="text-sm text-[var(--ion-color-medium)]">
          <template v-if="remaining > 0">
            {{ formatCurrencyBRL(Math.abs(remaining)) }} restante
          </template>
          <template v-else>Pago</template>
        </span>
      </div>
      <AppIcon
        class="text-[var(--ion-color-medium)] transition-all"
        :class="{
          '-rotate-90': isPaymentsExpanded,
        }"
        :icon="PhCaretCircleLeft"
        weight="fill"
        size="24"
      />
      <IonRippleEffect />
    </h5>

    <Transition
      enter-from-class="h-0"
      enter-to-class="h-[200px]"
      enter-active-class="transition-all"
      leave-from-class="h-[200px]"
      leave-to-class="h-0"
      leave-active-class="transition-all"
    >
      <div
        v-if="isPaymentsExpanded"
        class="max-h-[200px] overflow-auto"
      >
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
    </Transition>
  </div>
</template>
