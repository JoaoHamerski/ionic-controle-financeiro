<script setup lang="ts">
import { IonIcon, IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue'
import { listOutline, trendingDown, trendingUp } from 'ionicons/icons'

defineEmits(['segment-changed'])
</script>

<template>
  <IonSegment
    value="all"
    color="light"
  >
    <IonSegmentButton
      value="all"
      @click="$emit('segment-changed', 'all')"
    >
      <IonIcon
        :icon="listOutline"
        color="white"
      />
      <IonLabel :style="{ color: 'var(--ion-color-light)' }">Tudo</IonLabel>
    </IonSegmentButton>

    <IonSegmentButton
      value="sales"
      @click="$emit('segment-changed', 'sales')"
    >
      <IonIcon
        :icon="trendingUp"
        color="white"
      />
      <IonLabel :style="{ color: 'var(--ion-color-light)' }">Entradas</IonLabel>
    </IonSegmentButton>

    <IonSegmentButton
      value="expenses"
      @click="$emit('segment-changed', 'expenses')"
    >
      <IonIcon
        :icon="trendingDown"
        color="white"
      />
      <IonLabel :style="{ color: 'var(--ion-color-light)' }">Saídas</IonLabel>
    </IonSegmentButton>
  </IonSegment>
</template>
