<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { PhUserCircle } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppModalHeader from '@/components/AppModalHeader.vue'
import { Customer } from '@/types/models'

import CustomerForm from './CustomersForm.vue'

defineEmits(['submitted'])

defineProps<{
  customer?: Customer
}>()

const modal = useTemplateRef('modal')
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog min-w-[90%]"
  >
    <div class="ion-padding">
      <AppModalHeader
        title="Alterar dados do cliente"
        :icon="PhUserCircle"
        class="text-[var(--ion-color-primary-shade)]"
      />
      <CustomerForm
        :customer="customer"
        @submitted="$emit('submitted', $event)"
        @cancel="modal?.$el.dismiss()"
      />
    </div>
  </IonModal>
</template>
