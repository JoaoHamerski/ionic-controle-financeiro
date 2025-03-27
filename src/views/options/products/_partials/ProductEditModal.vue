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
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div class="ion-margin">
      <div class="ion-margin-bottom ion-margin-top">
        <ProductForm
          id="product-form"
          :product="product"
          @submitted="
            () => {
              closeModal()
              $emit('submit')
            }
          "
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
