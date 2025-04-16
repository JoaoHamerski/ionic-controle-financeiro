<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { PhPackage } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppModalHeader from '@/components/AppModalHeader.vue'
import { presentToast } from '@/support/toast'

import { ProductRecord } from '../ProductsPage.vue'
import ProductForm from './ProductsForm.vue'

const emit = defineEmits(['submitted'])

defineProps<{
  product?: ProductRecord
}>()

const modal = useTemplateRef('modal')

const onFormSubmit = () => {
  modal.value?.$el.dismiss()

  emit('submitted')
  presentToast({ message: 'Produto atualizado', color: 'success' })
}
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div class="ion-padding">
      <AppModalHeader
        title="Altere o nome do produto"
        :icon="PhPackage"
        class="text-[var(--ion-color-primary-shade)]"
      />

      <ProductForm
        id="product-form"
        :product="product"
        @submitted="onFormSubmit"
        @cancel="modal?.$el.dismiss()"
      />
    </div>
  </IonModal>
</template>
