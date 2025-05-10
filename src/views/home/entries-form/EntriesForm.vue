<script setup lang="ts">
import { helpers, required, requiredIf } from '@vuelidate/validators'
import { markRaw, provide, ref } from 'vue'
import { computed } from 'vue'
import { onMounted } from 'vue'

import { useForm } from '@/composables/use-form'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { parseCurrencyBRL } from '@/support/helpers'
import { presentToast } from '@/support/toast'
import { Customer, Product } from '@/types/models'

import { entryFormInjectionKey } from '../injection-key'
import EntriesFormBottom from './EntriesFormBottom.vue'
import EntriesFormStep1 from './EntriesFormStep1.vue'
import EntriesFormStep2 from './EntriesFormStep2.vue'
import EntriesFormStep3 from './EntriesFormStep3.vue'
import EntriesFormStep4 from './EntriesFormStep4.vue'
import EntriesFormSteps from './EntriesFormSteps.vue'

export type EntryForm = typeof form

type EntryFormData = {
  type: 'inflow' | 'outflow' | ''
  product: Product | null
  customer: Customer | null
  price: string
  quantity: number
}

const emit = defineEmits(['submitted'])

const { knex } = useDatabaseStore()

const steps = ref([
  { step: 1, component: markRaw(EntriesFormStep1) },
  { step: 2, component: markRaw(EntriesFormStep2) },
  { step: 3, component: markRaw(EntriesFormStep3) },
  { step: 4, component: markRaw(EntriesFormStep4) },
])

const activeStep = ref(1)
const previousStep = ref(0)

const form = useForm<EntryFormData>({
  type: '',
  product: null,
  customer: null,
  price: '',
  quantity: 1,
})

onMounted(() => {
  form.setRules({
    type: { required: helpers.withMessage('Por favor, selecione um tipo', required) },
    product: { required: helpers.withMessage('Por favor, selecione um produto', required) },
    customer: {
      requiredIf: helpers.withMessage(
        'Por favor, selecione um cliente',
        requiredIf(() => form.data.type === 'inflow'),
      ),
    },
    price: { required: helpers.withMessage('Informe um preço', required) },
    quantity: { required: helpers.withMessage('Informe a quantidade', required) },
  })
})

const isLastStep = computed(() => steps.value.length === activeStep.value)

const nextStep = async () => {
  await form.validate()

  if (activeStep.value === 1 && form.errors.type) {
    await presentToast({ color: 'danger', message: form.errors.type })
    return
  }

  if (activeStep.value === 2 && (form.errors.product || form.errors.customer)) {
    await presentToast({ color: 'danger', message: form.errors.product || form.errors.customer })
    return
  }

  if (activeStep.value === 3 && (form.errors.price || form.errors.quantity)) {
    await presentToast({ color: 'danger', message: form.errors.price || form.errors.quantity })
    return
  }

  if (isLastStep.value) {
    await submit()
  }

  if (!isLastStep.value) {
    previousStep.value = activeStep.value
    activeStep.value++
  }
}

const submit = async () => {
  const total = +(parseCurrencyBRL(form.data.price) * form.data.quantity).toFixed(2)
  const builder = knex
    .insert({
      customer_id: form.data.customer?.id || null,
      product_id: form.data.product?.id || null,
      value: parseCurrencyBRL(form.data.price),
      quantity: form.data.quantity,
      total: form.data.type === 'inflow' ? total : -total,
    })
    .into('entries')

  await dbStatement(builder)
  emit('submitted')
}

provide(entryFormInjectionKey, form)
</script>

<template>
  <div class="flex flex-col h-full">
    <EntriesFormSteps
      :steps-quantity="steps.length"
      :active-step="activeStep"
    />

    <Transition
      mode="out-in"
      enter-active-class="transition-all duration-250"
      leave-active-class="transition-all duration-250"
      :enter-from-class="
        activeStep > previousStep ? 'translate-x-20 opacity-0' : '-translate-x-20 opacity-0'
      "
      :leave-to-class="
        activeStep > previousStep ? '-translate-x-20 opacity-0' : ' translate-x-20 opacity-0'
      "
      leave-from-class="translate-x-0 opacity-100"
      enter-to-class="translate-x-0 opacity-100"
    >
      <div :key="activeStep">
        <template
          v-for="step in steps"
          :key="step.step"
        >
          <Component
            :is="step.component"
            v-if="step.step === activeStep"
            v-model="form"
          />
        </template>
      </div>
    </Transition>

    <EntriesFormBottom
      :active-step="activeStep"
      :is-last-step="isLastStep"
      @previous-click="activeStep--"
      @next-click="nextStep"
    />
  </div>
</template>

<style>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-left {
  animation-name: fadeInLeft;
  animation-duration: 0.25s;
}
</style>
