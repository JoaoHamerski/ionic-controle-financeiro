<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
import { onMounted, useTemplateRef } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { Product } from '@/types/models'

const { knex } = useDatabaseStore()

const emit = defineEmits(['submit'])

const props = defineProps<{
  product?: Product
}>()

const form = useForm(
  {
    name: '',
  },
  {
    name: { required: helpers.withMessage('Informe um nome', required) },
  },
)

const input = useTemplateRef('input')

onMounted(async () => {
  form.data.name = props.product?.name || ''

  setTimeout(() => {
    input.value?.$el.setFocus()
  }, 100)
})

const submit = async () => {
  if (!(await form.validate())) {
    return
  }

  const builder = knex
    .table('products')
    .update({ name: form.data.name })
    .where({ id: props.product!.id })

  await dbStatement(builder)

  emit('submit')
}
</script>

<template>
  <form
    @submit.prevent="submit"
    @focus.capture="form.clearErrorOnFocus"
  >
    <AppInput
      ref="input"
      v-model="form.data.name"
      label="Nome"
      name="name"
      :error="form.errors.name"
      autofocus
    />
  </form>
</template>
