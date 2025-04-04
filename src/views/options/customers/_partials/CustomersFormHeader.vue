<script setup lang="ts">
import { IonCol, IonRow, IonText } from '@ionic/vue'

import AppIcon from '@/components/AppIcon.vue'

defineProps<{
  text?: string
  icon?: any
}>()
</script>

<template>
  <IonRow
    v-if="icon"
    class="ion-text-center"
  >
    <IonCol>
      <AppIcon
        class="highlight-icon"
        :icon="icon"
        color="var(--ion-color-primary)"
        weight="fill"
        size="100"
      />
    </IonCol>
  </IonRow>
  <IonRow
    v-if="text"
    class="ion-text-center ion-margin-bottom"
  >
    <IonCol>
      <IonText>
        <h3>{{ text }}</h3>
      </IonText>
    </IonCol>
  </IonRow>
</template>
