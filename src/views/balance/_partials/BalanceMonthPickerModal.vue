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
import { ref } from 'vue'

import { BalanceMonthDate } from '../BalancePage.vue'

const props = defineProps<{
  month: BalanceMonthDate
}>()

const isOpen = defineModel<boolean>()
const emit = defineEmits(['month-selected'])

const modal = ref()

const selectedMonthNumber = ref<number>(props.month.number)

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

const onPickerChange = (event: CustomEvent) => {
  selectedMonthNumber.value = event.detail.value
}

const onCancelClick = () => {
  modal.value.$el.dismiss()
}

const onConcludeClick = () => {
  const month = months.value.find(({ number }) => number === selectedMonthNumber.value)

  modal.value.$el.dismiss()
  emit('month-selected', month)
}
</script>

<template>
  <IonModal
    ref="modal"
    :is-open="isOpen"
    :initial-breakpoint="1"
    :breakpoints="[0, 1]"
  >
    <IonContent>
      <IonToolbar color="light">
        <IonButtons slot="start">
          <IonButton @click="onCancelClick">Cancelar</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton @click="onConcludeClick">Concluído</IonButton>
        </IonButtons>
      </IonToolbar>

      <IonPicker>
        <IonPickerColumn
          :value="selectedMonthNumber"
          @ion-change="onPickerChange"
        >
          <IonPickerColumnOption
            v-for="_month in months"
            :key="_month.number"
            :value="_month.number"
          >
            {{ upperFirst(_month.name) }} / {{ _month.year }}
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
