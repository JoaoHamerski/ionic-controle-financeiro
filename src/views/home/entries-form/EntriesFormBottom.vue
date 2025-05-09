<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { PhArrowCircleLeft, PhArrowCircleRight, PhCheckCircle } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'

defineEmits(['next-click', 'previous-click'])

defineProps<{
  activeStep: number
  isLastStep: boolean
}>()
</script>

<template>
  <div class="flex mt-auto">
    <IonButton
      class="w-full"
      shape="round"
      fill="clear"
      :disabled="activeStep === 1"
      @click="$emit('previous-click')"
    >
      <AppIcon
        slot="start"
        :icon="PhArrowCircleLeft"
        size="24"
        weight="fill"
        class="mr-2"
      />
      Anterior
    </IonButton>
    <IonButton
      class="w-full"
      shape="round"
      @click="$emit('next-click')"
    >
      <AppIcon
        slot="end"
        :icon="isLastStep ? PhCheckCircle : PhArrowCircleRight"
        size="24"
        weight="fill"
        class="ml-2"
      />
      {{ isLastStep ? 'Confirmar' : 'Próximo' }}
    </IonButton>
  </div>
</template>
