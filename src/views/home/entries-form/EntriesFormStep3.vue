<script setup lang="ts">
import { IonButton } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { PhCurrencyCircleDollar, PhMinus, PhPlus } from '@phosphor-icons/vue'
import { inject } from 'vue'
import { watch } from 'vue'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import AppInput from '@/components/AppInput.vue'
import { parseCurrencyBRL } from '@/support/helpers'
import { formatCurrencyBRL } from '@/support/helpers'
import { currencyBrlMask, positiveIntMask } from '@/support/masks'

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

const total = computed(() => (parseCurrencyBRL(form.data.price) * form.data.quantity).toFixed(2))

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
      <template #subtitle>
        <b>{{ form.data.product?.name }}</b>
        <template v-if="form.data.customer">
          para <b>{{ form.data.customer.name }}</b>
        </template>
      </template>
    </EntriesFormStepHeader>

    <div class="px-2">
      <div>
        <AppInput
          v-model="localForm.data.price"
          v-maskito="currencyBrlMask"
          class="mb-5"
          label="Preço"
          placeholder="Digite o preço..."
          inputmode="numeric"
        />
      </div>

      <div class="flex gap-5 text-lg mb-10">
        <IonButton
          class="size-10 text-lg"
          :disabled="localForm.data.quantity <= 1"
          @click="localForm.data.quantity--"
        >
          <AppIcon
            slot="icon-only"
            :icon="PhMinus"
            weight="bold"
          />
        </IonButton>
        <AppInput
          v-model="localForm.data.quantity"
          v-maskito="positiveIntMask()"
          label="Quantidade"
          placeholder="Digite a qtd..."
          class="text-center"
          inputmode="numeric"
        />
        <IonButton
          class="size-10 text-lg"
          @click="localForm.data.quantity++"
        >
          <AppIcon
            slot="icon-only"
            :icon="PhPlus"
            weight="bold"
          />
        </IonButton>
      </div>

      <div class="text-center">
        <div>Total</div>
        <h1
          class="text-[var(--ion-color-success-shade)]"
          style="font-weight: bold; margin-top: 0"
        >
          {{ formatCurrencyBRL(total) }}
        </h1>
      </div>
    </div>
  </div>
</template>
