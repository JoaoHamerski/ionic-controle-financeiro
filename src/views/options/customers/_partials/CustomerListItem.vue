<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/vue'
import { createOutline, logoWhatsapp } from 'ionicons/icons'

import { titleCase } from '@/support/helpers'
import { Customer } from '@/types/models'

defineEmits(['edit'])
defineProps<{
  customer: Customer
}>()
</script>

<template>
  <IonItem>
    <IonLabel>{{ titleCase(customer.name) }}</IonLabel>

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
      <IonIcon
        slot="icon-only"
        :icon="createOutline"
      />
    </IonButton>
  </IonItem>
</template>
