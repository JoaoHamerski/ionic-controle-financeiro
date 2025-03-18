<script setup lang="ts">
import { IonSelect } from '@ionic/vue'

defineProps<{
  error?: string
}>()
</script>

<template>
  <IonSelect
    v-bind="$attrs"
    :class="{
      'ion-invalid ion-touched': !!error,
    }"
    :error-text="error"
    fill="outline"
    label-placement="floating"
  >
    <slot />
  </IonSelect>
</template>
