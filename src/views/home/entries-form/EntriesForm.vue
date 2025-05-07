<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { PhArrowCircleLeft, PhArrowCircleRight } from '@phosphor-icons/vue'
import { isEmpty } from 'lodash'
import { ref } from 'vue'
import { markRaw } from 'vue'
import { provide } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { useForm } from '@/composables/use-form'
import { presentToast } from '@/support/toast'
import { Customer, Product } from '@/types/models'

import { entryFormInjectionKey } from '../injection-key'
import EntriesFormStep1 from './EntriesFormStep1.vue'
import EntriesFormStep2 from './EntriesFormStep2.vue'
import EntriesFormStep3 from './EntriesFormStep3.vue'
import EntriesFormSteps from './EntriesFormSteps.vue'

export type EntryForm = typeof form

const steps = ref([
  { step: 1, component: markRaw(EntriesFormStep1) },
  { step: 2, component: markRaw(EntriesFormStep2) },
  { step: 3, component: markRaw(EntriesFormStep3) },
])

const activeStep = ref(1)

const form = useForm<{
  type: 'inflow' | 'outflow' | ''
  product: Product | null
  customer: Customer | null
}>({
  type: '',
  product: null,
  customer: null,
})

provide(entryFormInjectionKey, form)

const nextStep = async () => {
  if (activeStep.value === 1 && !validateStep1()) {
    await presentToast({ color: 'danger', message: 'Por favor, selecione um tipo' })
    return
  }

  activeStep.value++
}

const validateStep1 = () => {
  if (isEmpty(form.data.type)) {
    return false
  }

  return true
}
</script>

<template>
  <div class="flex flex-col h-full">
    <EntriesFormSteps
      :steps-quantity="steps.length"
      :active-step="activeStep"
    />

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

    <div class="flex mt-auto">
      <IonButton
        class="w-full"
        shape="round"
        fill="clear"
        :disabled="activeStep === 1"
        @click="activeStep--"
      >
        <AppIcon
          slot="start"
          :icon="PhArrowCircleLeft"
          size="24"
          weight="fill"
          class="mr-2"
        />
        Anterior
      </IonButton>
      <IonButton
        class="w-full"
        shape="round"
        @click="nextStep"
      >
        <AppIcon
          slot="end"
          :icon="PhArrowCircleRight"
          size="24"
          weight="fill"
          class="ml-2"
        />
        Próximo
      </IonButton>
    </div>
  </div>
</template>
