<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { PhUserCircle } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppModalHeader from '@/components/AppModalHeader.vue'
import { Customer } from '@/types/models'

import CustomerForm from './CustomersForm.vue'

defineEmits(['submitted'])

defineProps<{
  customer: Customer | null
}>()

const modal = useTemplateRef('modal')
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div class="ion-padding">
      <AppModalHeader
        title="Alterar dados do cliente"
        :icon="PhUserCircle"
        class="text-[var(--ion-color-primary)]"
      />

      <CustomerForm
        :customer="customer"
        @submitted="$emit('submitted', $event)"
        @cancel="modal?.$el.dismiss()"
      />
    </div>
  </IonModal>
</template>
