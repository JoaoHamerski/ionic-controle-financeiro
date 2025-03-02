<script setup lang="ts">
import { useForm } from '@/composables/use-form'
import { dbInsert } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { stripNonDigits } from '@/support/helpers'
import { phoneMask } from '@/support/masks'
import {
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonText,
} from '@ionic/vue'
import type { MaskitoOptions } from '@maskito/core'
import { maskito as vMaskito } from '@maskito/vue'
import { helpers, minLength, required } from '@vuelidate/validators'
import { checkmark, peopleCircle } from 'ionicons/icons'
import { computed } from 'vue'

const emit = defineEmits(['submitted'])
const { builder } = useDatabaseStore()

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
const phoneOptions = computed<MaskitoOptions>(() => phoneMask(phoneRaw.value))

const submit = async () => {
  form.data.phoneRaw = phoneRaw.value

  if (!(await form.validate())) {
    return
  }

  const { name, phone } = form.data

  await dbInsert(builder.insert({ name, phone }).into('customers'))

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
        <IonRow class="ion-text-center">
          <IonCol>
            <IonIcon
              class="highlight-icon"
              :icon="peopleCircle"
              color="success"
            />
          </IonCol>
        </IonRow>
        <IonRow class="ion-text-center ion-margin-bottom">
          <IonCol>
            <IonText>
              <h3>Cadastre um novo cliente</h3>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonCol>
            <IonInput
              v-model="form.data.name"
              :class="{
                'ion-invalid ion-touched': !!form.errors.name,
              }"
              :error-text="form.errors.name"
              name="name"
              label="Nome"
              label-placement="floating"
              fill="outline"
              placeholder="Digite o nome..."
              autocapitalize="words"
              autocomplete="name"
              clear-input
            />
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonCol>
            <IonInput
              v-model="form.data.phone"
              v-maskito="phoneOptions"
              :class="{
                'ion-invalid ion-touched': !!form.errors.phoneRaw,
              }"
              :error-text="form.errors.phoneRaw"
              name="phoneRaw"
              type="text"
              inputmode="numeric"
              fill="outline"
              label="Celular"
              label-placement="floating"
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
ion-icon.highlight-icon {
  font-size: 10rem;
}

ion-fab {
  margin-bottom: var(--ion-safe-area-bottom, 0);
}
</style>
