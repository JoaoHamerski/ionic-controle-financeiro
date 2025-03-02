<script setup lang="ts">
import { Customer } from '@/database/models'
import { AppLauncher } from '@capacitor/app-launcher'
import { IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/vue'
import { logoWhatsapp } from 'ionicons/icons'
defineProps<{
  customers: Customer[]
}>()

const openInWhatsApp = async () => {
  await AppLauncher.canOpenUrl({ url: 'whatsapp.com' })
}
</script>

<template>
  <IonList lines="full">
    <IonItem
      v-for="customer in customers"
      :key="customer.id"
    >
      <IonLabel>
        {{ customer.name }}
      </IonLabel>
      <IonButton
        fill="clear"
        color="success"
        size="lg"
        shape="round"
        @click="openInWhatsApp"
      >
        <IonIcon
          slot="icon-only"
          :icon="logoWhatsapp"
        />
      </IonButton>
    </IonItem>
  </IonList>
</template>
