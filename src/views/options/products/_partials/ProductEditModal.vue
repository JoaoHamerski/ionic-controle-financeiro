<script setup lang="ts">
import { IonButton, IonModal } from '@ionic/vue'
import { useTemplateRef } from 'vue'

import { Product } from '@/types/models'

import ProductForm from './ProductForm.vue'

const modal = useTemplateRef('modal')

defineEmits(['submit'])

defineProps<{
  product?: Product
}>()

const closeModal = () => {
  modal.value?.$el.dismiss()
}

const onFormSubmit = () => {
  closeModal()
  $emit('submit')
}
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div class="ion-margin">
      <h6 style="margin-top: 0">Altere o nome do produto</h6>

      <div class="ion-margin-bottom ion-margin-top">
        <ProductForm
          id="product-form"
          :product="product"
          @submit="onFormSubmit"
        />
      </div>

      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <IonButton
          fill="clear"
          @click="closeModal"
        >
          Cancelar
        </IonButton>

        <IonButton
          type="submit"
          fill="solid"
          form="product-form"
        >
          Alterar
        </IonButton>
      </div>
    </div>
  </IonModal>
</template>
