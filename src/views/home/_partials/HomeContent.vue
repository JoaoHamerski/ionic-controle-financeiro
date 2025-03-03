<script setup lang="ts">
import { formatCurrency } from '@/support/helpers'
import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue'
import { calendarSharp, checkmarkCircleSharp, personSharp, timeSharp } from 'ionicons/icons'
import { DateTime } from 'luxon'

defineProps<{
  items: any[]
}>()
</script>

<template>
  <IonList lines="full">
    <IonItem
      v-for="item in items"
      :key="item.id"
    >
      <IonLabel>
        <div>
          <div :style="{ display: 'flex', justifyContent: 'space-between' }">
            <div>
              <h2
                :style="{
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color:
                    item.sale_total > 0
                      ? 'var(--ion-color-success-shade)'
                      : 'var(--ion-color-danger-shade)',
                }"
              >
                {{ formatCurrency(item.sale_total) }}
              </h2>
              <div :style="{ fontSize: '.8rem', color: 'var(--ion-color-medium)' }">
                <IonIcon :icon="personSharp" />
                {{ item.customer_name }}
              </div>
              <div
                :style="{ fontSize: '.8rem', color: 'var(--ion-color-medium)', marginTop: '.2rem' }"
              >
                <IonIcon :icon="calendarSharp" />
                {{ DateTime.fromISO(item.sale_date).toLocaleString({ dateStyle: 'short' }) }}
              </div>
              <div
                v-if="item.sale_total > 0"
                :style="{ fontSize: '.8rem', color: 'var(--ion-color-medium)', marginTop: '.2rem' }"
              >
                <template v-if="item.sale_is_paid">
                  <IonIcon :icon="checkmarkCircleSharp" />
                  Pago
                </template>
                <template v-else>
                  <IonIcon :icon="timeSharp" />
                  Pagamento pendente
                </template>
              </div>
            </div>
            <div
              :style="{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
                gap: '.2rem',
              }"
            >
              <h2
                :style="{
                  fontSize: '.9rem',
                  fontWeight: 500,
                }"
              >
                {{ item.product_name }}
              </h2>
              <span
                v-if="item.sale_quantity > 1"
                :style="{ fontSize: '.7rem', color: 'var(--ion-color-medium)' }"
              >
                ({{ item.sale_quantity }} x {{ formatCurrency(item.sale_price) }})
              </span>
            </div>
          </div>
        </div>
      </IonLabel>
    </IonItem>
  </IonList>
</template>
