<script setup lang="ts">
import { IonCol, IonIcon, IonRow, IonText } from '@ionic/vue'

defineProps<{
  text?: string
  icon?: string
}>()
</script>

<template>
  <IonRow
    v-if="icon"
    class="ion-text-center"
  >
    <IonCol>
      <IonIcon
        :style="{ fontSize: '10rem' }"
        class="highlight-icon"
        :icon="icon"
        color="success"
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
