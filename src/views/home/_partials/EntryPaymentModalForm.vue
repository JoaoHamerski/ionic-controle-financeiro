<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { helpers, maxValue } from '@vuelidate/validators'
import { DateTime } from 'luxon'
import { computed } from 'vue'
import { ref } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { formatCurrencyBRL, parseCurrencyBRL } from '@/support/helpers'
import { currencyBrlMask } from '@/support/masks'

import { EntryRecordHome } from '../types'

const { knex } = useDatabaseStore()

const emit = defineEmits(['submitted', 'cancel'])

const props = defineProps<{
  entry: EntryRecordHome
}>()

const isLoading = ref(false)

const remaining = computed(() => props.entry.entry_total - (props.entry.total_paid || 0))

const form = useForm(
  {
    value: 'R$ ',
    value_raw: '',
    date: DateTime.now().toISODate(),
  },
  {
    value_raw: {
      maxValue: helpers.withMessage(
        `O valor deve ser menor que o resto (${formatCurrencyBRL(remaining.value)})`,
        maxValue(remaining),
      ),
    },
  },
)

const submit = async () => {
  form.data.value_raw = parseCurrencyBRL(form.data.value)

  if (!(await form.validate())) {
    return
  }

  isLoading.value = true

  await registerPayment()
  emit('submitted')

  isLoading.value = false
}

const registerPayment = async () => {
  const builder = knex
    .insert({
      entry_id: props.entry.id,
      value: form.data.value_raw,
    })
    .into('payments')

  await dbStatement(builder)
}

const onRemainingClick = () => {
  form.data.value_raw = `${remaining.value}`
  form.data.value = `${formatCurrencyBRL(remaining.value)}`
}
</script>

<template>
  <form
    @submit.prevent="submit"
    @focus.capture="form.clearErrorOnFocus"
  >
    <IonGrid>
      <IonRow class="ion-margin-bottom">
        <IonCol>
          <AppInput
            v-model="form.data.value"
            v-maskito="currencyBrlMask"
            name="value_raw"
            label="Valor"
            placeholder="R$ "
            inputmode="numeric"
            :error="form.errors.value_raw"
          >
            <IonButton
              slot="end"
              shape="round"
              fill="clear"
              @click="onRemainingClick"
            >
              Resto
            </IonButton>
          </AppInput>
        </IonCol>
      </IonRow>

      <IonRow class="ion-margin-bottom">
        <IonCol>
          <AppInput
            v-model="form.data.date"
            type="date"
            label="Data do pagamento"
            placeholder="dd/mm/aaaa"
          />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonButton
            class="w-full"
            shape="round"
            fill="clear"
            color="dark"
            @click="$emit('cancel')"
          >
            Cancelar
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            class="w-full"
            shape="round"
            color="success"
            type="submit"
            :disabled="isLoading"
          >
            Pagar
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  </form>
</template>
