<script setup lang="ts">
import { PhCheckCircle } from '@phosphor-icons/vue'
import { inject } from 'vue'
import { watch } from 'vue'

import { entryFormInjectionKey } from '../injection-key'
import { EntryForm } from './EntriesForm.vue'
import EntriesFormStepHeader from './EntriesFormStepHeader.vue'

const emit = defineEmits(['update:form'])
const form = inject(entryFormInjectionKey) as EntryForm
const localForm = { ...form }

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
      title="CONFIRME OS DADOS"
      color="success"
      :icon="PhCheckCircle"
    >
      <template #subtitle> Verifique os dados cadastrados e confirme </template>
    </EntriesFormStepHeader>

    <div class="px-2">Olá mundo</div>
  </div>
</template>
