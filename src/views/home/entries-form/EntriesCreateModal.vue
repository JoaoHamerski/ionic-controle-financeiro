<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonToolbar } from '@ionic/vue'
import { PhArrowLeft } from '@phosphor-icons/vue'
import { ref } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { presentToast } from '@/support/toast'

import EntriesForm from './EntriesForm.vue'

const emit = defineEmits(['submitted'])
const modal = ref()

const onFormSubmit = () => {
  modal.value.$el.dismiss()

  emit('submitted')
  presentToast({ message: 'Entrada registrada', color: 'success' })
}
</script>

<template>
  <IonModal ref="modal">
    <IonHeader>
      <IonToolbar color="success">
        <IonButtons slot="start">
          <IonButton @click="modal.$el.dismiss()">
            <AppIcon
              slot="icon-only"
              :icon="PhArrowLeft"
              size="26"
              weight="bold"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <EntriesForm @submit="onFormSubmit" />
    </IonContent>
  </IonModal>
</template>

<style scoped>
ion-toolbar ion-button {
  --padding-top: 15px;
  --padding-bottom: 15px;
}
</style>
