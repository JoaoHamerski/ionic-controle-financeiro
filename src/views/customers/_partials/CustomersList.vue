<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue'
import { createOutline, logoWhatsapp } from 'ionicons/icons'

import { Customer } from '@/database/models'
import { titleCase } from '@/support/helpers'

defineProps<{
  customers: Customer[]
}>()
</script>

<template>
  <IonList lines="full">
    <IonItem
      v-for="customer in customers"
      :key="customer.id"
    >
      <IonLabel>
        {{ titleCase(customer.name) }}
      </IonLabel>
      <IonButton
        v-if="customer.phone"
        fill="clear"
        color="success"
        size="lg"
        shape="round"
        :href="`https://wa.me/55${customer.phone}`"
        target="_blank"
      >
        <IonIcon
          slot="icon-only"
          :icon="logoWhatsapp"
        />
      </IonButton>
      <IonButton
        fill="clear"
        size="lg"
        shape="round"
      >
        <IonIcon
          slot="icon-only"
          :icon="createOutline"
        />
      </IonButton>
    </IonItem>
  </IonList>
</template>
