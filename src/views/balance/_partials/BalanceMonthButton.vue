<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { chevronDownCircleSharp } from 'ionicons/icons'

import { SelectedPeriodType } from '../BalancePage.vue'

const emit = defineEmits(['click'])

const props = defineProps<{
  selectedPeriod: SelectedPeriodType
}>()

const getSelectedPeriodLabel = () => {
  if (props.selectedPeriod === 'last-week') {
    return 'Semana passada'
  }

  if (props.selectedPeriod === 'current-week') {
    return 'Semana atual'
  }

  throw new Error(`value ${JSON.stringify(props.selectedPeriod)} is invalid`)
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
      <span
        v-if="typeof selectedPeriod === 'object'"
        :style="{ marginLeft: '1.5rem' }"
      >
        {{ selectedPeriod.monthLong }} / {{ selectedPeriod.year }}
      </span>
      <span v-else>
        {{ getSelectedPeriodLabel() }}
      </span>
      <IonIcon
        slot="end"
        :icon="chevronDownCircleSharp"
      />
    </IonButton>
  </div>
</template>
