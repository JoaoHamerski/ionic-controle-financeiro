<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar,
} from '@ionic/vue'
import { arrowBack } from 'ionicons/icons'
import { useTemplateRef } from 'vue'

import { Customer } from '@/types/models'

import CustomerForm from './CustomerForm.vue'

const modal = useTemplateRef('modal')

defineProps<{
  customer?: Customer
}>()
</script>

<template>
  <IonModal ref="modal">
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons>
          <IonButton
            slot="start"
            @click="modal?.$el.dismiss()"
          >
            <IonIcon
              slot="icon-only"
              :icon="arrowBack"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <CustomerForm
        v-if="customer"
        :customer="customer"
      />
    </IonContent>
  </IonModal>
</template>
