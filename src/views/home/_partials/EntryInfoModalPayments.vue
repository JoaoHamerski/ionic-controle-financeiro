<script setup lang="ts">
import { IonItem, IonLabel, IonList } from '@ionic/vue'
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import { DateTime } from 'luxon'
import { inject } from 'vue'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { formatCurrencyBRL } from '@/support/helpers'
import { Payment } from '@/types/models'

import { entryInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'

defineProps<{
  payments: Payment[]
}>()

const entry = inject(entryInjectionKey) as EntryRecordHome

const remaining = computed(() =>
  entry.total_paid ? (entry.entry_total - entry.total_paid).toFixed(2) : 0,
)
</script>

<template>
  <div>
    <h5 class="font-semibold flex items-center mb-0 color-[var(--ion-color-medium)]">
      <AppIcon
        :icon="PhCurrencyCircleDollar"
        class="mr-1"
        weight="fill"
      />
      <span>Pagamentos</span> &nbsp;
      <span class="text-sm text-[var(--ion-color-medium)]"
        >({{ formatCurrencyBRL(remaining) }} restante)</span
      >
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
</template>
