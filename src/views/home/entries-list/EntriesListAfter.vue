<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'

defineEmits(['load-more'])
defineProps<{
  hasMore: boolean
}>()
</script>

<template>
  <IonItem
    v-if="hasMore"
    button
    :style="{
      textAlign: 'center',
      fontSize: '.8rem',
      fontWeight: 500,
    }"
    @click="$emit('load-more')"
  >
    <IonLabel :style="{ color: 'var(--ion-color-primary)' }">CARREGAR MAIS</IonLabel>
  </IonItem>
  <IonItem
    v-else
    :style="{
      textAlign: 'center',
      fontSize: '.8rem',
      fontWeight: 500,
    }"
  >
    <IonLabel :style="{ color: 'var(--ion-color-medium-tint)' }">Fim dos resultados</IonLabel>
  </IonItem>
</template>
