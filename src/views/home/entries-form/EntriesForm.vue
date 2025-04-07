<script setup lang="ts">
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonGrid,
  IonRow,
  IonSelectOption,
} from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { PhCheck, PhMinus, PhPlus } from '@phosphor-icons/vue'
import { helpers, minValue, required } from '@vuelidate/validators'
import { DateTime } from 'luxon'
import { computed, ref } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import { useForm } from '@/composables/use-form'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { formatCurrencyBRL, parseCurrencyBRL } from '@/support/helpers'
import { currencyBrlMask, positiveIntMask } from '@/support/masks'
import { Customer, Product } from '@/types/models'

import TypeHeadCustomers from './TypeHeadCustomers.vue'
import TypeHeadProducts from './TypeHeadProducts.vue'

type EntryFormFields = {
  value: string
  quantity: number
  customer: Customer | null
  product: Product | null
  is_paid: boolean
  date: string
  note: string
  type: 'inflow' | 'outflow'
}

const { knex } = useDatabaseStore()

const emit = defineEmits(['submit'])

const form = useForm<EntryFormFields, keyof EntryFormFields>({
  type: 'inflow',
  value: '',
  quantity: 1,
  customer: null,
  product: null,
  is_paid: false,
  note: '',
  date: DateTime.now().toISODate(),
})

const isSelectCustomerModalOpen = ref(false)
const isSelectProductModalOpen = ref(false)
const isTimedOut = ref(false)

const rules = computed(() => {
  const localRules: Partial<Record<keyof EntryFormFields, object>> = {
    type: { required: helpers.withMessage('Selecione o tipo', required) },
    value: { required: helpers.withMessage('Informe um preço', required) },
    quantity: { minValue: helpers.withMessage('Mín. 1', minValue(1)) },
    product: { required: helpers.withMessage('Selecione um produto', required) },
    date: { required: helpers.withMessage('Informe uma data', required) },
  }

  if (form.data.type === 'inflow') {
    localRules.customer = {
      required: helpers.withMessage('Selecione um cliente', required),
    }
  }

  return localRules
})

const valueHelperText = computed(() => {
  if (form.data.quantity > 1 && form.data.value) {
    const total = form.data.quantity * +parseCurrencyBRL(form.data.value)
    return `Total: ${formatCurrencyBRL(Math.abs(total).toFixed(2))}`
  }

  return undefined
})

const increaseQuantity = () => {
  if (form.data.quantity >= 100) {
    return
  }

  form.data.quantity++
}

const decreaseQuantity = () => {
  if (form.data.quantity <= 1) {
    return
  }

  form.data.quantity--
}

const onCustomerSelected = ({ customer }: { customer: Customer }) => {
  isSelectCustomerModalOpen.value = false
  form.data.customer = customer
}

const onProductSelected = ({ product }: { product: Product }) => {
  isSelectProductModalOpen.value = false
  form.data.product = product
}

const onTypeChange = () => {
  form.data.customer = null
}

const submit = async () => {
  form.setRules(rules.value)

  if (!(await form.validate())) {
    return
  }

  await insert()
  emit('submit')
}

const insert = async () => {
  const value = +parseCurrencyBRL(form.data.value)
  const quantity = form.data.quantity
  const total = (value * quantity).toFixed(2)

  const data = {
    customer_id: form.data.customer?.id || null,
    product_id: form.data.product!.id,
    value,
    quantity,
    note: form.data.note || null,
    paid_at: form.data.is_paid ? DateTime.now().toISODate() : null,
    date: form.data.date,
    total: form.data.type === 'inflow' ? total : -total,
  }

  isTimedOut.value = true
  await dbStatement(knex.insert(data).into('entries'))

  setTimeout(() => {
    isTimedOut.value = false
  }, 1000)
}
</script>

<template>
  <form
    style="height: 100%"
    @submit.prevent="submit"
    @focus.capture="form.clearErrorOnFocus"
  >
    <IonContent>
      <IonGrid class="ion-margin-bottom">
        <IonRow class="ion-margin-bottom">
          <IonCol class="ion-text-center">
            <h3>Nova venda ou despesa</h3>
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonCol>
            <AppSelect
              v-model="form.data.type"
              interface="popover"
              label="Tipo de entrada"
              :error="form.errors.type"
              @ion-change="onTypeChange"
            >
              <IonSelectOption value="inflow">Venda</IonSelectOption>
              <IonSelectOption value="outflow">Despesa</IonSelectOption>
            </AppSelect>
          </IonCol>
        </IonRow>

        <IonRow class="ion-margin-bottom">
          <IonCol size="6">
            <AppInput
              v-model="form.data.value"
              v-maskito="currencyBrlMask"
              name="value"
              :error="form.errors.value"
              placeholder="R$ "
              label="Valor"
              :helper-text="valueHelperText"
              inputmode="numeric"
            />
          </IonCol>
          <IonCol>
            <AppInput
              v-model="form.data.quantity"
              v-maskito="positiveIntMask()"
              :error="form.errors.quantity"
              name="quantity"
              label="Qtd."
              type="text"
              inputmode="numeric"
              style="text-align: center; margin: 0 !important; padding: 0 !important"
            >
              <IonButton
                slot="start"
                fill="clear"
                :disabled="form.data.quantity <= 1"
                @click.stop="decreaseQuantity"
              >
                <AppIcon
                  slot="icon-only"
                  :icon="PhMinus"
                  weight="bold"
                />
              </IonButton>
              <IonButton
                slot="end"
                fill="clear"
                :disabled="form.data.quantity >= 100"
                @click.stop="increaseQuantity"
              >
                <AppIcon
                  slot="icon-only"
                  :icon="PhPlus"
                  weight="bold"
                />
              </IonButton>
            </AppInput>
          </IonCol>
        </IonRow>

        <IonRow
          v-if="form.data.type === 'inflow'"
          class="ion-margin-bottom"
        >
          <IonCol>
            <AppSelect
              :value="form.data.customer?.id"
              :error="form.errors.customer"
              label="Cliente"
              name="customer"
              interface="popover"
              @click.capture.stop="isSelectCustomerModalOpen = true"
            >
              <IonSelectOption
                v-if="form.data.customer"
                :value="form.data.customer.id"
              >
                {{ form.data.customer.name }}
              </IonSelectOption>
            </AppSelect>
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonCol>
            <AppSelect
              :value="form.data.product?.id"
              :error="form.errors.product"
              name="product"
              interface="popover"
              label="Produto"
              @click.capture.stop="isSelectProductModalOpen = true"
            >
              <IonSelectOption
                v-if="form.data.product"
                :value="form.data.product.id"
              >
                {{ form.data.product.name }}
              </IonSelectOption>
            </AppSelect>
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonCol>
            <AppInput
              v-model="form.data.date"
              name="date"
              placeholder="Escolha uma data..."
              :error="form.errors.date"
              label="Data"
              type="date"
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <AppInput
              v-model="form.data.note"
              label="Anotação (opcional)"
              placeholder="Digite uma anotação..."
            />
          </IonCol>
        </IonRow>

        <IonRow
          v-if="form.data.type === 'inflow'"
          :style="{ textAlign: 'end' }"
        >
          <IonCol>
            <IonCheckbox
              v-model="form.data.is_paid"
              name="is_paid"
              label-placement="end"
            >
              Já foi pago
            </IonCheckbox>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>

    <IonFooter>
      <IonFab
        vertical="bottom"
        horizontal="end"
      >
        <IonFabButton
          type="submit"
          :disabled="isTimedOut"
          @click="submit"
        >
          <AppIcon
            :icon="PhCheck"
            size="28"
            weight="bold"
          />
        </IonFabButton>
      </IonFab>
    </IonFooter>

    <TypeHeadCustomers
      :is-open="isSelectCustomerModalOpen"
      @customer-selected="onCustomerSelected"
      @did-dismiss="isSelectCustomerModalOpen = false"
    />

    <TypeHeadProducts
      :is-open="isSelectProductModalOpen"
      @product-selected="onProductSelected"
      @did-dismiss="isSelectProductModalOpen = false"
    />
  </form>
</template>
