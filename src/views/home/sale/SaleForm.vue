<script setup lang="ts">
import {
  IonCheckbox,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonGrid,
  IonIcon,
  IonRow,
  IonSelectOption,
} from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { helpers, minValue, required } from '@vuelidate/validators'
import { checkmark } from 'ionicons/icons'
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { computed } from 'vue'

import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import { useForm } from '@/composables/use-form'
import { Customer, Product } from '@/database/models'
import { dbInsert } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { parseCurrencyBRL } from '@/support/helpers'
import { currencyBrlMask, positiveIntMask } from '@/support/masks'

import SelectCustomerModal from '../_partials/SelectCustomerModal.vue'
import SelectProductModal from '../_partials/SelectProductModal.vue'

type SaleFormFields = {
  price: string
  quantity: number
  customer: Customer | null
  product: Product | null
  is_paid: boolean
  date: string
  type: 'sale' | 'expense'
}

const { knex } = useDatabaseStore()

const emit = defineEmits(['submitted'])

const form = useForm<SaleFormFields, keyof SaleFormFields>({
  type: 'sale',
  price: '',
  quantity: 1,
  customer: null,
  product: null,
  is_paid: false,
  date: DateTime.now().toISODate(),
})

const isSelectCustomerModalOpen = ref(false)
const isSelectProductModalOpen = ref(false)

const rules = computed(() => {
  const localRules: Partial<Record<keyof SaleFormFields, object>> = {
    type: { required: helpers.withMessage('Por favor, selecione o tipo', required) },
    price: { required: helpers.withMessage('Por favor, informe um preço', required) },
    quantity: { minValue: helpers.withMessage('Mín. 1', minValue(1)) },
    product: { required: helpers.withMessage('Por favor, selecione um produto', required) },
    date: { required: helpers.withMessage('Por favor, informe uma data', required) },
  }

  if (form.data.type === 'sale') {
    localRules.customer = {
      required: helpers.withMessage('Por favor, selecione um cliente', required),
    }
  }

  return localRules
})

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
  emit('submitted')
}

const insert = async () => {
  const price = +parseCurrencyBRL(form.data.price)
  const quantity = form.data.quantity
  const total = (price * quantity).toFixed(2)

  const data = {
    customer_id: form.data.customer?.id || null,
    product_id: form.data.product!.id,
    price,
    quantity,
    is_paid: form.data.is_paid,
    date: form.data.date,
    total: form.data.type === 'sale' ? total : -total,
  }

  dbInsert(knex.insert(data).into('sales'))
}
</script>

<template>
  <form
    action=""
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
              <IonSelectOption value="sale">Venda</IonSelectOption>
              <IonSelectOption value="expense">Despesa</IonSelectOption>
            </AppSelect>
          </IonCol>
        </IonRow>

        <IonRow class="ion-margin-bottom">
          <IonCol size="9">
            <AppInput
              v-model="form.data.price"
              v-maskito="currencyBrlMask"
              name="price"
              :error="form.errors.price"
              placeholder="R$ "
              label="Valor"
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
            />
          </IonCol>
        </IonRow>
        <IonRow
          v-if="form.data.type === 'sale'"
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

        <IonRow v-if="form.data.type === 'sale'">
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
          @click="submit"
        >
          <IonIcon :icon="checkmark" />
        </IonFabButton>
      </IonFab>
    </IonFooter>

    <SelectCustomerModal
      :is-open="isSelectCustomerModalOpen"
      @customer-selected="onCustomerSelected"
      @did-dismiss="isSelectCustomerModalOpen = false"
    />

    <SelectProductModal
      :is-open="isSelectProductModalOpen"
      @product-selected="onProductSelected"
      @did-dismiss="isSelectProductModalOpen = false"
    />
  </form>
</template>
