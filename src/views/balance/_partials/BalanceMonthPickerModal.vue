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

const props = defineProps<{
  selectedDate: DateTime
}>()

const isOpen = defineModel<boolean>()
const emit = defineEmits(['month-date-selected'])

const modal = ref()

const selectedMonthNumber = ref<number>(props.selectedDate.month)

const monthDates = computed<DateTime[]>(() =>
  range(0, 12).map((_, index) => DateTime.now().plus({ month: -index })),
)

const onPickerChange = (event: CustomEvent) => {
  selectedMonthNumber.value = event.detail.value
}

const onCancelClick = () => {
  modal.value.$el.dismiss()
}

const onConcludeClick = () => {
  const monthDate = monthDates.value.find(({ month }) => month === selectedMonthNumber.value)

  modal.value.$el.dismiss()
  emit('month-date-selected', monthDate)
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

      <IonPicker>
        <IonPickerColumn
          :value="selectedMonthNumber"
          @ion-change="onPickerChange"
        >
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
