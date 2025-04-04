<script setup lang="ts">
import { IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonRow } from '@ionic/vue'
import { type MaskitoOptions, maskitoTransform } from '@maskito/core'
import { maskito as vMaskito } from '@maskito/vue'
import { PhCheck, PhUserCircle } from '@phosphor-icons/vue'
import { helpers, minLength, required } from '@vuelidate/validators'
import { computed } from 'vue'
import { onMounted } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { stripNonDigits } from '@/support/helpers'
import { phoneMask } from '@/support/masks'
import { Customer } from '@/types/models'

import CustomerFormHeader from './CustomersFormHeader.vue'

type FormRecordData = Pick<typeof form.data, 'name' | 'phone'>

const emit = defineEmits(['submit'])

const props = defineProps<{
  customer?: Customer
}>()

const { knex } = useDatabaseStore()

onMounted(() => {
  if (props.customer) {
    populateForm()
  }
})

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

const isEdit = computed(() => !!props.customer)

const phoneRaw = computed(() => stripNonDigits(form.data.phone))
const phoneDynamicMask = computed<MaskitoOptions>(() => phoneMask(phoneRaw.value))

const populateForm = () => {
  const customer = props.customer!
  const phone = customer.phone ? maskitoTransform(customer.phone || '', phoneDynamicMask.value) : ''

  form.data.name = customer.name
  form.data.phone = phone
}

const submit = async () => {
  form.data.phoneRaw = phoneRaw.value

  if (!(await form.validate())) {
    return
  }

  const { name, phone } = form.data

  if (!isEdit.value) {
    await create({ name, phone })
  } else {
    await update({ name, phone })
  }

  emit('submit')
}

const create = async ({ name, phone }: FormRecordData) => {
  await dbStatement(knex.insert({ name, phone }).into('customers'))
}

const update = async ({ name, phone }: FormRecordData) => {
  await dbStatement(
    knex.table('customers').update({ name, phone }).where({ id: props.customer!.id }),
  )
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
          :text="!isEdit ? 'Cadastre um novo cliente' : 'Altere os dados do cliente'"
          :icon="PhUserCircle"
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
              helper-text="Informe para ter a opção de abrir no WhatsApp"
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
          <AppIcon
            :icon="PhCheck"
            size="28"
            weight="bold"
          />
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
