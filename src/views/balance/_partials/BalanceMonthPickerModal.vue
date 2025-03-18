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

const props = defineProps<{
  selectedPeriod: DateTime | 'last-week' | 'current-week'
}>()

const isOpen = defineModel<boolean>()
const emit = defineEmits(['period-selected'])

const modal = ref()

const selectedPeriod = ref<number | string>((props.selectedPeriod as DateTime).month)

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

  if (['current-week', 'last-week'].includes(selectedPeriod.value)) {
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
      <IonToolbar color="light">
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
          <IonPickerColumnOption value="current-week">Semana atual</IonPickerColumnOption>
          <IonPickerColumnOption value="last-week">Semana passada</IonPickerColumnOption>
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
