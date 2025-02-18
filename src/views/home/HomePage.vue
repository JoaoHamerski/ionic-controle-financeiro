<script setup lang="ts">
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import NewSaleModal from './_partials/NewSaleModal.vue'

import { add } from 'ionicons/icons'
import { ref } from 'vue'

const isModalOpen = ref<boolean>(false)
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle> Início </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <NewSaleModal
        :is-open="isModalOpen"
        @did-dismiss="isModalOpen = false"
      />

      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
      >
        <IonFabButton
          color="success"
          @click="isModalOpen = true"
        >
          <IonIcon :icon="add" />
        </IonFabButton>
      </IonFab>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-fab-button {
  margin-bottom: 1rem;
  margin-right: 0.5rem;

  --background: var(--ion-color-primary-shade);
  --color: var(--ion-color-dark);
}
</style>
