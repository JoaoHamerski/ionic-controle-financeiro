<script setup lang="ts">
import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonText,
} from '@ionic/vue'

import { checkmark, peopleCircle } from 'ionicons/icons'
</script>

<template>
  <IonContent>
    <IonGrid class="ion-margin-bottom">
      <IonRow class="ion-text-center">
        <IonCol>
          <IonIcon
            class="highlight-icon"
            :icon="peopleCircle"
            color="success"
          />
        </IonCol>
      </IonRow>
      <IonRow class="ion-text-center ion-margin-bottom">
        <IonCol>
          <IonText> <h3>Cadastre um novo cliente</h3> </IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonInput
            label="Nome"
            label-placement="floating"
            fill="outline"
            placeholder="Digite o nome..."
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonInput
            type="number"
            fill="outline"
            label="Celular"
            label-placement="floating"
            placeholder="Digite o celular..."
          />
        </IonCol>
      </IonRow>
    </IonGrid>
    <IonFab
      vertical="bottom"
      horizontal="end"
    >
      <IonFabButton> <IonIcon :icon="checkmark" /> </IonFabButton>
    </IonFab>
  </IonContent>
</template>

<style scoped>
ion-icon.highlight-icon {
  font-size: 10rem;
}

ion-fab {
  margin-bottom: var(--ion-safe-area-bottom, 0);
}
</style>
