<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar,
} from '@ionic/vue'
import { arrowBackOutline, checkmark } from 'ionicons/icons'
import { ref } from 'vue'

import NewCustomerForm from './NewCustomerForm.vue'

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
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <NewCustomerForm @submitted="modal.$el.dismiss()" />
    </IonContent>

    <IonFooter>
      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
      >
        <IonFabButton> <IonIcon :icon="checkmark" /> </IonFabButton>
      </IonFab>
    </IonFooter>
  </IonModal>
</template>

<style scoped>
ion-button {
  --padding-top: 15px;
  --padding-bottom: 15px;
}
</style>
