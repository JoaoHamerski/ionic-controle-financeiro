<script setup lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonToolbar } from '@ionic/vue'
import { PhArrowLeft } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { Customer } from '@/types/models'

import CustomerForm from './CustomersForm.vue'

defineEmits(['submit'])

defineProps<{
  customer?: Customer
}>()

const modal = useTemplateRef('modal')
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
      <CustomerForm
        :customer="customer"
        @submitted="$emit('submit')"
      />
    </IonContent>
  </IonModal>
</template>
