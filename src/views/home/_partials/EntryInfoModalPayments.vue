<script setup lang="ts">
import { IonItem, IonLabel, IonList } from '@ionic/vue'
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import { DateTime } from 'luxon'

import AppIcon from '@/components/AppIcon.vue'
import { formatCurrencyBRL } from '@/support/helpers'
import { Payment } from '@/types/models'

defineProps<{
  payments: Payment[]
}>()
</script>
<template>
  <div>
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
</template>
