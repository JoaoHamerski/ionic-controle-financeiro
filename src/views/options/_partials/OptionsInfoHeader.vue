<script setup lang="ts">
import { IonCol, IonIcon, IonRow } from '@ionic/vue'

defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>

<template>
  <IonRow>
    <IonCol class="ion-text-center">
      <IonIcon
        color="primary"
        :icon="icon"
        style="font-size: 5rem"
      />
    </IonCol>
  </IonRow>
  <IonRow>
    <IonCol>
      <h3 class="ion-text-center">{{ title }}</h3>
    </IonCol>
  </IonRow>
  <IonRow>
    <IonCol>
      <p
        class="ion-text-center"
        style="color: var(--ion-color-medium)"
      >
        {{ description }}
      </p>
    </IonCol>
  </IonRow>
</template>
