<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { checkmarkCircleSharp, timeSharp } from 'ionicons/icons'

defineProps<{
  paidAt: boolean
}>()
</script>

<template>
  <Transition
    name="fade"
    mode="out-in"
  >
    <div
      :key="paidAt ? 'paid' : 'not-paid'"
      :style="{
        fontSize: '.8rem',
        color: 'var(--ion-color-medium)',
        marginTop: '.2rem',
      }"
    >
      <template v-if="paidAt">
        <IonIcon :icon="checkmarkCircleSharp" />
        Pago
      </template>
      <template v-else>
        <IonIcon :icon="timeSharp" />
        Pagamento pendente
      </template>
    </div>
  </Transition>
</template>
