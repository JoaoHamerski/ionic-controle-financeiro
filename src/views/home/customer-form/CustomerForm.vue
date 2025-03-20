<script setup lang="ts">
import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonGrid,
  IonIcon,
  IonRow,
} from '@ionic/vue'
import type { MaskitoOptions } from '@maskito/core'
import { maskito as vMaskito } from '@maskito/vue'
import { helpers, minLength, required } from '@vuelidate/validators'
import { checkmark, peopleCircle } from 'ionicons/icons'
import { computed } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { stripNonDigits } from '@/support/helpers'
import { phoneMask } from '@/support/masks'

import CustomerFormHeader from './CustomerFormHeader.vue'

const emit = defineEmits(['submitted'])
const { knex } = useDatabaseStore()

const form = useForm(
  { name: '', phone: '', phoneRaw: '' },
  {
    name: { required: helpers.withMessage('Por favor, informe um nome', required) },
    phoneRaw: {
      minLength: helpers.withMessage(
        ({ $params }) => `O número deve ter no mínimo ${$params.min} dígitos`,
        minLength(10),
      ),
    },
  },
)

const phoneRaw = computed(() => stripNonDigits(form.data.phone))
const phoneDynamicMask = computed<MaskitoOptions>(() => phoneMask(phoneRaw.value))

const submit = async () => {
  form.data.phoneRaw = phoneRaw.value

  if (!(await form.validate())) {
    return
  }

  const { name, phone } = form.data

  await dbStatement(knex.insert({ name, phone }).into('customers'))

  emit('submitted')
}
</script>

<template>
  <form
    style="height: 100%"
    @submit="submit"
    @focus.capture="form.clearErrorOnFocus"
  >
    <IonContent>
      <IonGrid class="ion-margin-bottom">
        <CustomerFormHeader
          text="Cadastre um novo cliente"
          :icon="peopleCircle"
        />

        <IonRow class="ion-margin-bottom">
          <IonCol>
            <AppInput
              v-model="form.data.name"
              :error="form.errors.name"
              name="name"
              label="Nome"
              placeholder="Digite o nome..."
              autocapitalize="words"
              autocomplete="name"
              clear-input
            />
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonCol>
            <AppInput
              v-model="form.data.phone"
              v-maskito="phoneDynamicMask"
              :error="form.errors.phoneRaw"
              name="phoneRaw"
              type="text"
              inputmode="numeric"
              label="Celular (opcional)"
              placeholder="Digite o celular..."
              autocomplete="phone"
              clear-input
              enterkeyhint="done"
              @keypress.enter="submit"
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
    <IonFooter>
      <IonFab
        vertical="bottom"
        horizontal="end"
      >
        <IonFabButton
          type="submit"
          @click="submit"
        >
          <IonIcon :icon="checkmark" />
        </IonFabButton>
      </IonFab>
    </IonFooter>
  </form>
</template>

<style scoped>
ion-fab {
  margin-bottom: var(--ion-safe-area-bottom, 0);
}
</style>
