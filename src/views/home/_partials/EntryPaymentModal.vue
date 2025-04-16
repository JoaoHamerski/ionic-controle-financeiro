<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonModal, IonRow } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppInput from '@/components/AppInput.vue'
import AppModalHeader from '@/components/AppModalHeader.vue'
import { useForm } from '@/composables/use-form'
import { currencyBrlMask } from '@/support/masks'

const modal = useTemplateRef('modal')
const form = useForm({
  value: 'R$ ',
})
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <form>
      <div class="ion-padding">
        <AppModalHeader
          :icon="PhCurrencyCircleDollar"
          title="Novo pagamento"
          class="text-[var(--ion-color-success-shade)]"
        />

        <IonGrid>
          <IonRow>
            <IonCol>
              <AppInput
                v-model="form.data.value"
                v-maskito="currencyBrlMask"
                class="mb-10"
                name="value"
                label="Valor"
                placeholder="R$ "
                inputmode="numeric"
              >
                <IonButton
                  slot="end"
                  shape="round"
                  fill="clear"
                >
                  Resto
                </IonButton>
              </AppInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                class="w-full min-h-12"
                shape="round"
                fill="clear"
                color="dark"
                @click="modal?.$el.dismiss()"
              >
                Cancelar
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                class="w-full min-h-12"
                shape="round"
                color="success"
              >
                Pagar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    </form>
  </IonModal>
</template>

<style scoped>
ion-modal {
  --min-width: 90%;
}
</style>
