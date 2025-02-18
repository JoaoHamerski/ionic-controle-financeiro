<script setup lang="ts">
import { IonHeader, IonTitle, IonToolbar } from '@ionic/vue'
</script>

<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle> <slot /> </IonTitle>
    </IonToolbar>
  </IonHeader>
</template>
