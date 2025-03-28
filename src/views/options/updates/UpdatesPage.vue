<script setup lang="ts">
import { IonButton, IonContent, IonPage } from '@ionic/vue'

import OptionsHeader from '../_partials/OptionsHeader.vue'
// https://github.com/ReVanced/revanced-manager/releases/download/v1.24.0/revanced-manager-1.24.0.apk

const onDownloadClick = async () => {
  //
}
</script>

<template>
  <IonPage>
    <OptionsHeader
      has-back-button
      title="Atualizações"
    />
    <IonContent class="ion-padding">
      <IonButton @click="onDownloadClick">Download</IonButton>
    </IonContent>
  </IonPage>
</template>
