<script setup lang="ts">
import { IonInput } from '@ionic/vue'

defineProps<{
  error?: string
}>()
</script>

<template>
  <IonInput
    type="text"
    :class="{
      'ion-invalid ion-touched': !!error,
    }"
    :error-text="error"
    fill="outline"
    label-placement="floating"
  />
</template>
