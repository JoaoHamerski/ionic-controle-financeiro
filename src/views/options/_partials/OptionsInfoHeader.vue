<script setup lang="ts">
import { IonCol, IonRow } from '@ionic/vue'

import AppIcon from '@/components/AppIcon.vue'

defineProps<{
  icon: any
  title: string
  description: string
}>()
</script>

<template>
  <IonRow>
    <IonCol class="ion-text-center">
      <AppIcon
        :icon="icon"
        style="font-size: 5rem"
        weight="fill"
        color="var(--ion-color-primary)"
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
