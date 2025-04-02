<script setup lang="ts">
import { IonPage } from '@ionic/vue'

import OptionsHeader from './OptionsHeader.vue'

defineProps<{
  title: string
}>()
</script>

<template>
  <IonPage>
    <OptionsHeader
      :title="title"
      has-back-button
    />
    <slot />
  </IonPage>
</template>
