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
import { isNumber, range, upperFirst } from 'lodash'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import { ref } from 'vue'

import { PERIODS } from './balance-periods'

const isOpen = defineModel<boolean>()
const emit = defineEmits(['period-selected'])

const modal = ref()

const selectedPeriod = ref<number | string>('last-7-days')

const monthDates = computed<DateTime[]>(() =>
  range(0, 12).map((_, index) => DateTime.now().plus({ month: -index })),
)

const onPickerChange = (event: CustomEvent) => {
  selectedPeriod.value = event.detail.value
}

const onCancelClick = () => {
  modal.value.$el.dismiss()
}

const onConcludeClick = () => {
  modal.value.$el.dismiss()

  if (isNumber(selectedPeriod.value)) {
    const monthDate = monthDates.value.find(({ month }) => month === selectedPeriod.value)
    emit('period-selected', monthDate)
    return
  }

  if (['last-7-days', 'last-14-days'].includes(selectedPeriod.value)) {
    emit('period-selected', selectedPeriod.value)
  }
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
      <IonToolbar
        color="light"
        style="padding-top: 0 !important"
      >
        <IonButtons slot="start">
          <IonButton @click="onCancelClick">Cancelar</IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton @click="onConcludeClick">Concluir</IonButton>
        </IonButtons>
      </IonToolbar>

      <IonPicker class="ion-margin">
        <IonPickerColumn
          :value="selectedPeriod"
          @ion-change="onPickerChange"
        >
          <IonPickerColumnOption value="last-7-days">
            {{ PERIODS['last-7-days'].label }}
          </IonPickerColumnOption>
          <IonPickerColumnOption value="last-14-days">
            {{ PERIODS['last-14-days'].label }}
          </IonPickerColumnOption>
          <IonPickerColumnOption disabled>--</IonPickerColumnOption>

          <IonPickerColumnOption
            v-for="monthDate in monthDates"
            :key="monthDate.month"
            :value="monthDate.month"
          >
            {{ upperFirst(monthDate.monthLong!) }} / {{ monthDate.year }}
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
