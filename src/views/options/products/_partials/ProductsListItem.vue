<script setup lang="ts">
import { IonButton, IonItem, IonLabel } from '@ionic/vue'
import { PhPen } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'
import { formatCurrencyBRL } from '@/support/helpers'

import { ProductRecord } from '../ProductsPage.vue'

defineEmits(['edit'])

defineProps<{
  product: ProductRecord
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div>{{ product.name }}</div>
      <div
        v-if="product.total_sold"
        :style="{ fontSize: '.85rem', color: 'var(--ion-color-medium)' }"
      >
        Total vendido: {{ formatCurrencyBRL(product.total_sold) }}
      </div>
    </IonLabel>
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
