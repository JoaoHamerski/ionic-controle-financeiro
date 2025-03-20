<script setup lang="ts">
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/vue'
import { add, cart, peopleCircle } from 'ionicons/icons'

defineEmits(['entry-click', 'customer-click'])
</script>

<template>
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
        data-label="Nova entrada"
        @click="$emit('entry-click')"
      >
        <IonIcon :icon="cart" />
      </IonFabButton>
      <IonFabButton
        color="light"
        data-label="Novo cliente"
        @click="$emit('customer-click')"
      >
        <IonIcon :icon="peopleCircle" />
      </IonFabButton>
    </IonFabList>
  </IonFab>
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
