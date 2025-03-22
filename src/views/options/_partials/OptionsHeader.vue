<script setup lang="ts">
import { IonBackButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue'
import { cog } from 'ionicons/icons'

defineProps<{
  title: string
  hasBackButton?: boolean
}>()
</script>

<template>
  <IonHeader>
    <IonToolbar color="primary">
      <IonButtons v-if="hasBackButton">
        <IonBackButton />
      </IonButtons>
      <IonTitle :slot="hasBackButton ? 'end' : 'start'">
        <div :style="{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }">
          <IonIcon :icon="cog" />
          {{ title }}
        </div>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
</template>
