<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonToolbar } from '@ionic/vue'
import { PhArrowLeft } from '@phosphor-icons/vue'
import { ref } from 'vue'

import AppIcon from '@/components/AppIcon.vue'

import EntriesForm from './EntriesForm.vue'
const modal = ref()
</script>

<template>
  <IonModal ref="modal">
    <IonHeader>
      <IonToolbar color="primary">
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
      <EntriesForm />
    </IonContent>
  </IonModal>
</template>
