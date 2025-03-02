<script setup lang="ts">
import { Customer } from '@/database/models'
import { IonItem, IonLabel, IonList } from '@ionic/vue'

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
      <IonLabel>{{ customer.name }}</IonLabel>
    </IonItem>
  </IonList>
</template>
