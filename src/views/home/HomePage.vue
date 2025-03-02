<script setup lang="ts">
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'

import { add, cart, peopleCircle } from 'ionicons/icons'
import { ref } from 'vue'
import NewCustomerModal from './_partials/NewCustomerModal.vue'
import NewSaleModal from './_partials/NewSaleModal.vue'

const isSaleModalOpen = ref<boolean>(false)
const isClientModalOpen = ref<boolean>(false)
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
        :is-open="isSaleModalOpen"
        @did-dismiss="isSaleModalOpen = false"
      />
      <NewCustomerModal
        :is-open="isClientModalOpen"
        @did-dismiss="isClientModalOpen = false"
      />

      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
      >
        <IonFabButton color="success">
          <IonIcon :icon="add" />
        </IonFabButton>

        <IonFabList side="top">
          <IonFabButton
            color="light"
            data-label="Nova venda"
            @click="isSaleModalOpen = true"
          >
            <IonIcon :icon="cart" />
          </IonFabButton>
          <IonFabButton
            color="light"
            data-label="Novo cliente"
            @click="isClientModalOpen = true"
          >
            <IonIcon :icon="peopleCircle" />
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-fab-button[data-label]::after {
  content: attr(data-label);
  position: absolute;
  color: var(--ion-color-light);
  right: 45px;
  bottom: 3px;
  background-color: rgba(var(--ion-color-dark-rgb), 0.7);
  padding: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 1rem;
}

ion-fab-button {
  margin-bottom: 1rem;
  margin-right: 0.5rem;

  --background: var(--ion-color-primary-shade);
  --color: var(--ion-color-dark);
}
</style>
