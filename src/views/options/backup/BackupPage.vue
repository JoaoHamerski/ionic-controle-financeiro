<script setup lang="ts">
import { IonButton, IonContent, IonPage } from '@ionic/vue'

import OptionsHeader from '../_partials/OptionsHeader.vue'

const onClick = async () => {
  alert('ola')
}
</script>

<template>
  <IonPage>
    <OptionsHeader
      title="Backup"
      has-back-button
    />
    <IonContent>
      <IonButton @click="onClick">Write</IonButton>
    </IonContent>
  </IonPage>
</template>
