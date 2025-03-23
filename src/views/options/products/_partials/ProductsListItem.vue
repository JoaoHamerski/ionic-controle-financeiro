<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/vue'
import { createOutline } from 'ionicons/icons'

import { Product } from '@/types/models'

defineEmits(['edit'])

defineProps<{
  product: Product
}>()
</script>

<template>
  <IonItem>
    <IonLabel>{{ product.name }}</IonLabel>
    <IonButton
      fill="clear"
      color="primary"
      size="large"
      shape="round"
      @click="$emit('edit', { product })"
    >
      <IonIcon
        slot="icon-only"
        :icon="createOutline"
      />
    </IonButton>
  </IonItem>
</template>
