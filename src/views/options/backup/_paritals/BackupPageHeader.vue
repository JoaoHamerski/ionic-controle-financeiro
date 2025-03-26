<script setup lang="ts">
import { IonCol, IonIcon, IonRow } from '@ionic/vue'
import { saveSharp } from 'ionicons/icons'
</script>

<template>
  <IonRow>
    <IonCol class="ion-text-center">
      <IonIcon
        color="primary"
        :icon="saveSharp"
        style="font-size: 5rem"
      />
    </IonCol>
  </IonRow>

  <IonRow>
    <IonCol>
      <h3 class="ion-text-center">Salve ou recupere seus dados</h3>
    </IonCol>
  </IonRow>

  <IonRow>
    <IonCol>
      <p
        class="ion-text-center"
        style="color: var(--ion-color-medium)"
      >
        O arquivo de dados ficarão somente no seu aparelho, armazene-os em um local seguro, como na
        nuvem (Google Drive, Dropbox e etc...)
      </p>
    </IonCol>
  </IonRow>
</template>
