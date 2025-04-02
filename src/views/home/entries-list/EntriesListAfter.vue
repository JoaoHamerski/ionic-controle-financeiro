<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'
import { CSSProperties } from 'vue'

defineEmits(['load-more'])
defineProps<{
  hasMore: boolean
}>()

const itemStyle: CSSProperties = {
  textAlign: 'center',
  fontSize: '.8rem',
  fontWeight: 500,
}
</script>

<template>
  <IonItem
    v-if="hasMore"
    button
    :style="itemStyle"
    @click="$emit('load-more')"
  >
    <IonLabel :style="{ color: 'var(--ion-color-primary)' }">CARREGAR MAIS</IonLabel>
  </IonItem>
  <IonItem
    v-else
    :style="itemStyle"
  >
    <IonLabel :style="{ color: 'var(--ion-color-medium-tint)' }">Fim dos resultados</IonLabel>
  </IonItem>
</template>
