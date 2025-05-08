<script setup lang="ts">
import { IonButton } from '@ionic/vue'
const props = defineProps<{
  stepsQuantity: number
  activeStep: number
}>()

const isStepActive = (step: number) => step === props.activeStep
</script>

<template>
  <div class="text-center">
    <IonButton
      v-for="step in stepsQuantity"
      :key="step"
      shape="round"
      class="size-10"
      :disabled="step > activeStep"
      :fill="isStepActive(step) ? 'solid' : 'clear'"
    >
      <span slot="icon-only">{{ step }}</span>
    </IonButton>
  </div>
</template>
