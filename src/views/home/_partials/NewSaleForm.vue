<script setup lang="ts">
import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { basketSharp } from 'ionicons/icons'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { currencyBrlMask, positiveIntMask } from '@/support/masks'

import FormHeaderRows from './FormHeaderRows.vue'

const form = useForm({
  price: '',
  quantity: 1,
  customer: {},
  product: {},
  is_paid: false,
  date: '',
})
</script>

<template>
  <form
    action=""
    style="height: 100%"
  >
    <IonContent>
      <IonGrid class="ion-margin-bottom">
        <FormHeaderRows
          text="Registre uma nova venda ou despesa"
          :icon="basketSharp"
        />

        <IonRow class="ion-margin-bottom">
          <IonCol>
            <AppInput
              v-model="form.data.price"
              v-maskito="currencyBrlMask"
              name="price"
              :error="form.errors.price"
              placeholder="R$ "
              clear-input
              label="Valor"
              inputmode="numeric"
            />
          </IonCol>
          <IonCol>
            <AppInput
              v-model="form.data.quantity"
              v-maskito="positiveIntMask()"
              name="quantity"
              label="Qtd."
              type="text"
              inputmode="numeric"
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </form>
</template>
