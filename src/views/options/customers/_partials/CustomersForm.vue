<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/vue'
import { type MaskitoOptions, maskitoTransform } from '@maskito/core'
import { maskito as vMaskito } from '@maskito/vue'
import { helpers, minLength, required } from '@vuelidate/validators'
import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { stripNonDigits } from '@/support/helpers'
import { phoneMask } from '@/support/masks'
import { Customer } from '@/types/models'

type FormRecordData = Pick<typeof form.data, 'name' | 'phone'>

const emit = defineEmits(['submitted', 'cancel'])

const props = defineProps<{
  customer: Customer | null
}>()

const { knex } = useDatabaseStore()
const isLoading = ref(false)

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

  isLoading.value = true

  const { name, phone } = form.data

  if (!isEdit.value) {
    await create({ name, phone })
  } else {
    await update({ name, phone })
  }

  emit('submitted', { isEdit: isEdit.value })
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
    @submit.prevent="submit"
    @focus.capture="form.clearErrorOnFocus"
  >
    <IonGrid>
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
      <IonRow>
        <IonCol>
          <IonButton
            class="w-full"
            fill="clear"
            shape="round"
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
            type="submit"
            :disabled="isLoading"
          >
            Salvar
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </form>
</template>
