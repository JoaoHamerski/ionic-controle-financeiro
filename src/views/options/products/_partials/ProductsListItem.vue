<script setup lang="ts">
import { IonButton, IonItem, IonLabel } from '@ionic/vue'
import { PhPen } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'
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
      <AppIcon
        slot="icon-only"
        :icon="PhPen"
        size="24"
      />
    </IonButton>
  </IonItem>
</template>
