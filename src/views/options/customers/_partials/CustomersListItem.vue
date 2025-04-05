<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/vue'
import { PhPen } from '@phosphor-icons/vue'
import { logoWhatsapp } from 'ionicons/icons'

import AppIcon from '@/components/AppIcon.vue'
import { formatCurrencyBRL, titleCase } from '@/support/helpers'

import { CustomerRecord } from '../CustomersPage.vue'

defineEmits(['edit'])
defineProps<{
  customer: CustomerRecord
}>()
</script>

<template>
  <IonItem>
    <IonLabel>
      <div>{{ titleCase(customer.name) }}</div>
      <div
        :style="{
          fontSize: '.75rem',
          color: 'var(--ion-color-medium)',
        }"
      >
        Total gasto:
        {{ formatCurrencyBRL(customer.total_spent) }}
      </div>
    </IonLabel>

    <IonButton
      v-if="customer.phone"
      fill="clear"
      color="success"
      size="large"
      shape="round"
      target="_blank"
      :href="`https://wa.me/55${customer.phone}`"
    >
      <IonIcon
        slot="icon-only"
        :icon="logoWhatsapp"
      />
    </IonButton>

    <IonButton
      fill="clear"
      color="primary"
      size="large"
      shape="round"
      @click="$emit('edit', { customer })"
    >
      <AppIcon
        slot="icon-only"
        :icon="PhPen"
        size="26"
      />
    </IonButton>
  </IonItem>
</template>
