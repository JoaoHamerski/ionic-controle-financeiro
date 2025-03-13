<script setup lang="ts">
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue'
</script>

<template>
  <div>
    <IonSegment value="month">
      <IonSegmentButton value="month">
        <IonLabel>Mês</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="week">
        <IonLabel>Semana</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  </div>
</template>
