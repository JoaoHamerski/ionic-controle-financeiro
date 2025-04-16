<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/vue'
import { helpers, required } from '@vuelidate/validators'
import { onMounted, useTemplateRef } from 'vue'
import { ref } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import { ProductRecord } from '../ProductsPage.vue'

const { knex } = useDatabaseStore()

const emit = defineEmits(['submitted', 'cancel'])

const props = defineProps<{
  product?: ProductRecord
}>()

const isLoading = ref(false)

const form = useForm(
  {
    name: '',
  },
  {
    name: { required: helpers.withMessage('Informe um nome', required) },
  },
)

const input = useTemplateRef('input')

onMounted(() => {
  form.data.name = props.product?.name || ''

  setTimeout(() => {
    input.value?.$el.setFocus()
  }, 100)
})

const submit = async () => {
  if (!(await form.validate())) {
    return
  }

  isLoading.value = true

  const builder = knex
    .table('products')
    .update({ name: form.data.name })
    .where({ id: props.product!.id })

  await dbStatement(builder)

  emit('submitted')
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
            ref="input"
            v-model="form.data.name"
            label="Nome"
            name="name"
            :error="form.errors.name"
            autofocus
          />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton
            fill="clear"
            class="w-full"
            shape="round"
            @click="$emit('cancel')"
          >
            Cancelar
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            shape="round"
            class="w-full"
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
