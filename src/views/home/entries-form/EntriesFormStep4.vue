<script setup lang="ts">
import { IonItem, IonLabel, IonList } from '@ionic/vue'
import { PhCheckCircle, PhCurrencyDollar, PhPackage, PhUserCircle } from '@phosphor-icons/vue'
import { inject } from 'vue'
import { watch } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import AppInput from '@/components/AppInput.vue'
import { formatCurrencyBRL, parseCurrencyBRL } from '@/support/helpers'

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

    <div class="px-2">
      <IonList>
        <IonItem class="text-center font-bold">
          <IonLabel
            class="text-red-500"
            :style="{
              color:
                localForm.data.type === 'inflow'
                  ? 'var(--ion-color-success-shade)'
                  : 'var(--ion-color-danger)',
            }"
          >
            {{ localForm.data.type === 'inflow' ? 'ENTRADA' : 'SAÍDA' }}
          </IonLabel>
        </IonItem>

        <IonItem v-if="localForm.data.type === 'inflow' && localForm.data.customer">
          <AppIcon
            :icon="PhUserCircle"
            weight="fill"
            size="24"
            class="mr-3"
          />
          <IonLabel>
            {{ localForm.data.customer.name }}
          </IonLabel>
        </IonItem>

        <IonItem v-if="localForm.data.product">
          <AppIcon
            :icon="PhPackage"
            weight="fill"
            size="24"
            class="mr-3"
          />
          <IonLabel>
            {{ localForm.data.product.name }}
          </IonLabel>
          <IonLabel
            v-if="localForm.data.quantity > 1"
            slot="end"
            style="font-size: 0.8rem"
          >
            {{ localForm.data.quantity }} un.
          </IonLabel>
        </IonItem>

        <IonItem>
          <AppIcon
            :icon="PhCurrencyDollar"
            weight="fill"
            size="24"
            class="mr-3"
          />
          <IonLabel>
            <div>{{ formatCurrencyBRL(parseCurrencyBRL(localForm.data.price)) }}</div>
            <div
              v-if="localForm.data.quantity > 1"
              class="text-sm text-[var(--ion-color-medium)]"
            >
              Total:
              {{
                formatCurrencyBRL(parseCurrencyBRL(localForm.data.price) * localForm.data.quantity)
              }}
            </div>
          </IonLabel>
        </IonItem>
      </IonList>
      <div class="mt-5">
        <AppInput
          v-model="localForm.data.note"
          label="Nota (opcional)"
          helper-text="Adicione uma anotação sobre esse registro"
          placeholder="Digite a nota..."
        />
      </div>
    </div>
  </div>
</template>
