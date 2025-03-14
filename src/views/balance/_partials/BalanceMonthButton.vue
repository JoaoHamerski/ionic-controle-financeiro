<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { chevronDownCircleSharp } from 'ionicons/icons'

import { BalanceMonthDate } from '../BalancePage.vue'

const emit = defineEmits(['click'])

defineProps<{
  monthDate: BalanceMonthDate
}>()
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
      strong
      fill="clear"
      shape="round"
      style="width: 100%"
      :style="{
        fontSize: '1.2rem',
      }"
      @click="emit('click')"
    >
      <span :style="{ marginLeft: '1.5rem' }"> {{ monthDate.name }} / {{ monthDate.year }} </span>
      <IonIcon
        slot="end"
        :icon="chevronDownCircleSharp"
      />
    </IonButton>
  </div>
</template>
