<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'

import OptionsHeader from '../_partials/OptionsHeader.vue'
</script>

<template>
  <IonPage>
    <OptionsHeader
      title="Produtos"
      has-back-button
    />
    <IonContent> Produtos </IonContent>
  </IonPage>
</template>
