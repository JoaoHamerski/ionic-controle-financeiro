<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { PhCashRegister } from '@phosphor-icons/vue'
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
      title="TIPO DE REGISTRO"
      color="primary"
      :icon="PhCashRegister"
    >
      <template #subtitle>
        Selecione o tipo de registro, <b>ENTRADA</b> (vendas) ou <b>SAÍDA</b> (despesas)
      </template>
    </EntriesFormStepHeader>

    <div class="px-2">
      <IonButton
        size="large"
        class="w-full"
        shape="round"
        :fill="localForm.data.type === 'inflow' ? 'solid' : 'outline'"
        @click="localForm.data.type = 'inflow'"
      >
        Entrada
      </IonButton>
      <IonButton
        size="large"
        class="w-full"
        shape="round"
        color="danger"
        :fill="localForm.data.type === 'outflow' ? 'solid' : 'outline'"
        @click="localForm.data.type = 'outflow'"
      >
        Saída
      </IonButton>
    </div>
  </div>
</template>
