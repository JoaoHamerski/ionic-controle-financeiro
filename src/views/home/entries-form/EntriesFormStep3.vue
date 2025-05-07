<script setup lang="ts">
import { PhCurrencyCircleDollar } from '@phosphor-icons/vue'
import { inject } from 'vue'
import { watch } from 'vue'
import { computed } from 'vue'

import { entryFormInjectionKey } from '../injection-key'
import { EntryForm } from './EntriesForm.vue'
import EntriesFormStepHeader from './EntriesFormStepHeader.vue'

const emit = defineEmits(['update:form'])
const form = inject(entryFormInjectionKey) as EntryForm
const localForm = { ...form }

const componentData = computed(() =>
  form.data.type === 'inflow'
    ? {
        title: 'VALOR COBRADO',
      }
    : {
        title: 'VALOR GASTO',
      },
)

watch(
  () => localForm.data,
  () => {
    emit('update:form', form)
  },
)
</script>

<template>
  <div>
    <EntriesFormStepHeader
      :title="componentData.title"
      color="primary"
      :icon="PhCurrencyCircleDollar"
    >
      <template #subtitle> Preencha o valor </template>
    </EntriesFormStepHeader>
  </div>
</template>
