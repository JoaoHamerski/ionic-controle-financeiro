<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'

import OptionsHeader from '../_partials/OptionsHeader.vue'
</script>

<template>
  <IonPage>
    <OptionsHeader
      title="Clientes"
      has-back-button
    />
    <IonContent> Clientes </IonContent>
  </IonPage>
</template>
