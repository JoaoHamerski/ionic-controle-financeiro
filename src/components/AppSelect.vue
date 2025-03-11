<script setup lang="ts">
import { IonNote, IonSelect } from '@ionic/vue'

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

  <IonNote
    v-if="error"
    color="danger"
    style="font-size: 0.75rem; margin-left: 0.75rem"
  >
    {{ error }}
  </IonNote>
</template>
