<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

defineProps<{
  label: string
  text: string
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div class="text-sm font-semibold text-[var(--ion-color-medium)]">{{ label }}</div>
      <div>{{ text }}</div>
    </IonLabel>
  </IonItem>
</template>
