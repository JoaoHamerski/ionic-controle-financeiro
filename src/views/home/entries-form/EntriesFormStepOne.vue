<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { PhCashRegister } from '@phosphor-icons/vue'
import { inject } from 'vue'
import { watch } from 'vue'

import { entryFormInjectionKey } from '../injection-key'
import EntriesFormStepHeader from './EntriesFormStepHeader.vue'

const emit = defineEmits(['update:form'])
const form = inject(entryFormInjectionKey)
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
    <div>
      <div>
        <IonButton
          size="large"
          class="w-full"
          shape="round"
          fill="outline"
          @click="localForm.data.type = 'Entrada'"
        >
          Entrada
        </IonButton>
        <IonButton
          size="large"
          class="w-full"
          shape="round"
          color="danger"
          fill="outline"
        >
          Saída
        </IonButton>
      </div>
    </div>
  </div>
</template>
