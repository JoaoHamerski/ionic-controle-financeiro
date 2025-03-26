<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

defineProps<{
  label: string
  value: string
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div style="font-size: 0.8rem; color: var(--ion-color-medium)">{{ label }}</div>
      <div style="font-size: 0.9rem">
        {{ value }}
      </div>
    </IonLabel>
  </IonItem>
</template>
