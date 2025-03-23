<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { chevronDownCircleSharp } from 'ionicons/icons'

import { SelectedPeriodType } from '../BalancePage.vue'
import { PERIODS } from './balance-periods'

const emit = defineEmits(['click'])

const props = defineProps<{
  selectedPeriod: SelectedPeriodType
}>()

const getSelectedPeriodLabel = () => {
  const period = props.selectedPeriod

  if (typeof period === 'object') {
    return `${period.monthLong} / ${period.year}`
  }

  return PERIODS[period].label
}
</script>

<template>
  <div
    class="ion-margin-top ion-margin-horizontal"
    :style="{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '.5rem',
      fontSize: '1.2rem',
      fontWeight: 600,
    }"
  >
    <IonButton
      fill="clear"
      shape="round"
      style="width: 100%"
      :style="{
        fontSize: '1.2rem',
      }"
      @click="emit('click')"
    >
      <span :style="{ marginLeft: '1.5rem' }">
        {{ getSelectedPeriodLabel() }}
      </span>
      <IonIcon
        slot="end"
        :icon="chevronDownCircleSharp"
      />
    </IonButton>
  </div>
</template>
