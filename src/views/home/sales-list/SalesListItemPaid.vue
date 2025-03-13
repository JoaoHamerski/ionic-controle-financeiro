<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { checkmarkCircleSharp, timeSharp } from 'ionicons/icons'

defineProps<{
  isPaid: boolean
}>()
</script>

<template>
  <Transition
    name="fade"
    mode="out-in"
  >
    <div
      :key="isPaid ? 'paid' : 'not-paid'"
      :style="{
        fontSize: '.8rem',
        color: 'var(--ion-color-medium)',
        marginTop: '.2rem',
      }"
    >
      <template v-if="isPaid">
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
