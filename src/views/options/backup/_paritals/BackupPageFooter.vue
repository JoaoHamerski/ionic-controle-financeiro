<script setup lang="ts">
import { IonButton, IonCol, IonRow } from '@ionic/vue'

defineEmits(['save', 'recover'])
</script>

<template>
  <IonRow>
    <IonCol>
      <IonButton
        color="success"
        shape="round"
        fill="outline"
        style="width: 100%"
        @click="$emit('save')"
      >
        Salvar
      </IonButton>
    </IonCol>

    <IonCol>
      <IonButton
        color="primary"
        shape="round"
        fill="outline"
        style="width: 100%"
        @click="$emit('recover')"
      >
        Recuperar
      </IonButton>
    </IonCol>
  </IonRow>
</template>

<style scoped>
ion-button {
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
</style>
