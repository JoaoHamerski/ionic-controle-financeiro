<script setup lang="ts">
import { IonButton, IonModal } from '@ionic/vue'
import { useTemplateRef } from 'vue'

import { Product } from '@/types/models'

import ProductForm from './ProductForm.vue'

const modal = useTemplateRef('modal')

defineEmits(['submitted'])

defineProps<{
  product?: Product
}>()

const closeModal = () => {
  modal.value?.$el.dismiss()
}
</script>

<template>
  <IonModal ref="modal">
    <div class="ion-margin">
      <div class="ion-margin-bottom ion-margin-top">
        <ProductForm
          id="product-form"
          :product="product"
          @submitted="
            () => {
              closeModal()
              $emit('submitted')
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

<style scoped>
ion-modal {
  --width: fit-content;
  --min-width: 250px;
  --max-width: 90%;
  --border-radius: 6px;
  --height: fit-content;
  --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
}

ion-modal ion-icon {
  margin-right: 6px;

  width: 48px;
  height: 48px;

  padding: 4px 0;

  color: #aaaaaa;
}
</style>
