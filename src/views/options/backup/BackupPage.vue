<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'

import OptionsHeader from '../_partials/OptionsHeader.vue'
</script>

<template>
  <IonPage>
    <OptionsHeader
      title="Backup"
      has-back-button
    />
    <IonContent> Backup </IonContent>
  </IonPage>
</template>
