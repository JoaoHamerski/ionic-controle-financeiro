<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { DateTime } from 'luxon'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { currencyBrlMask } from '@/support/masks'

const emit = defineEmits(['submitted', 'cancel'])

const form = useForm({
  value: 'R$ ',
  date: DateTime.now().toISODate(),
})

const submit = () => {
  emit('submitted')
}
</script>

<template>
  <form @submit.prevent="submit">
    <IonGrid>
      <IonRow class="ion-margin-bottom">
        <IonCol>
          <AppInput
            v-model="form.data.value"
            v-maskito="currencyBrlMask"
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

      <IonRow class="ion-margin-bottom">
        <IonCol>
          <AppInput
            v-model="form.data.date"
            type="date"
            label="Data do pagamento"
            placeholder="dd/mm/aaaa"
          />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonButton
            class="w-full"
            shape="round"
            fill="clear"
            color="dark"
            @click="$emit('cancel')"
          >
            Cancelar
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            class="w-full"
            shape="round"
            color="success"
            type="submit"
          >
            Pagar
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </form>
</template>
