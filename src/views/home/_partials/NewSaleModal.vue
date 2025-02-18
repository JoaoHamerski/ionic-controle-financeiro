<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar,
} from '@ionic/vue'
import NewSaleForm from './NewSaleForm.vue'

import { arrowBackOutline } from 'ionicons/icons'
import { ref } from 'vue'

const modal = ref()
</script>

<template>
  <IonModal ref="modal">
    <IonHeader>
      <IonToolbar color="success">
        <IonButtons slot="start">
          <IonButton @click="modal.$el.dismiss()">
            <IonIcon
              slot="icon-only"
              :icon="arrowBackOutline"
            />
          </IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton shape="round"> Confirmar </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <NewSaleForm />
    </IonContent>
  </IonModal>
</template>

<style scoped>
ion-button {
  --padding-top: 15px;
  --padding-bottom: 15px;
}
</style>
