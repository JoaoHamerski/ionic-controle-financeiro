<script setup lang="ts">
import { IonButton, IonModal } from '@ionic/vue'
import { ref } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { Product } from '@/types/models'

defineProps<{
  product?: Product
}>()

const name = ref<string>()
</script>

<template>
  <IonModal>
    <div class="ion-margin">
      <h4
        style="margin-top: 0"
        class="ion-margin-bottom"
      >
        Altere o nome do produto
      </h4>
      <div class="ion-margin-bottom">
        <AppInput
          name="name"
          label="Nome"
        />
      </div>
      <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <IonButton fill="clear">Cancelar</IonButton>
        <IonButton fill="solid">Salvar</IonButton>
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

ion-modal h1 {
  margin: 20px 20px 10px 20px;
}

ion-modal ion-icon {
  margin-right: 6px;

  width: 48px;
  height: 48px;

  padding: 4px 0;

  color: #aaaaaa;
}

ion-modal .wrapper {
  margin-bottom: 10px;
}
</style>
