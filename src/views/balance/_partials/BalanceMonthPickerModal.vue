<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonModal,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonToolbar,
} from '@ionic/vue'
import { range, upperFirst } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'

import { BalanceMonthDate } from '../BalancePage.vue'

const isOpen = defineModel<boolean>()

const selectedMonth = defineModel<BalanceMonthDate>('month')
const currentValue = 1
const months = computed<BalanceMonthDate[]>(() =>
  range(0, 12).map((_, index) => {
    const monthDate = DateTime.now().plus({ month: -index })

    return {
      name: monthDate.monthLong,
      number: monthDate.month,
      year: monthDate.year,
    }
  }),
)

const onPickerChange = (event) => {
  console.log(event)
}
</script>

<template>
  <IonModal
    :is-open="isOpen"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
  >
    <IonContent>
      <IonToolbar color="light">
        <IonButtons slot="start">
          <IonButton>Cancelar</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton>Concluído</IonButton>
        </IonButtons>
      </IonToolbar>

      <IonPicker @ion-change="onPickerChange">
        <IonPickerColumn :value="currentValue">
          <IonPickerColumnOption
            v-for="month in months"
            :key="month.number"
            :value="month.number"
          >
            {{ upperFirst(month.name) }} / {{ month.year }}
          </IonPickerColumnOption>
        </IonPickerColumn>
      </IonPicker>
    </IonContent>
  </IonModal>
</template>

<style scoped>
ion-modal {
  --height: 350px;
}
</style>
