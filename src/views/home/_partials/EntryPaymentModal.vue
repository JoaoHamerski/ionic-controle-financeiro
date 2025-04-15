<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { currencyBrlMask } from '@/support/masks'

const form = useForm({
  value: '',
})
</script>

<template>
  <IonModal class="modal-dialog">
    <form>
      <div class="ion-padding">
        <h4 class="text-center">Adicionar pagamento</h4>
        <AppInput
          v-model="form.data.value"
          v-maskito="currencyBrlMask"
          name="value"
          label="Valor"
          placeholder="R$ "
          inputmode="numeric"
        />
      </div>
    </form>
  </IonModal>
</template>

<style scoped>
ion-modal {
  --min-width: 90%;
}
</style>
