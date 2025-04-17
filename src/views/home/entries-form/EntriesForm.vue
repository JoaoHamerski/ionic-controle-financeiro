<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { PhArrowCircleLeft, PhArrowCircleRight } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { computed } from 'vue'
import { markRaw } from 'vue'
import { provide } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { useForm } from '@/composables/use-form'

import { entryFormInjectionKey } from '../injection-key'
import EntriesFormStepOne from './EntriesFormStepOne.vue'
import EntriesFormSteps from './EntriesFormSteps.vue'

export type EntryForm = typeof form

const steps = ref([{ value: 'first', component: markRaw(EntriesFormStepOne), isActive: true }])

const activeStep = computed(() => steps.value.findIndex(({ isActive }) => isActive))

const form = useForm({ type: '' })

provide(entryFormInjectionKey, form)
</script>

<template>
  <div class="flex flex-col h-full">
    <EntriesFormSteps
      :steps-quantity="steps.length"
      :active-step="activeStep"
    />

    {{ form.data.type }}
    <template
      v-for="step in steps"
      :key="step.value"
    >
      <Component
        :is="step.component"
        v-show="step.isActive"
        v-model="form"
      />
    </template>

    <div class="flex mt-auto">
      <IonButton
        class="w-full"
        shape="round"
        fill="clear"
        :disabled="activeStep === 0"
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
