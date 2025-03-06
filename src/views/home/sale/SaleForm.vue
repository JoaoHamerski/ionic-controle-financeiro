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
  IonSelect,
  IonSelectOption,
} from '@ionic/vue'
import { maskito as vMaskito } from '@maskito/vue'
import { checkmark } from 'ionicons/icons'
import { DateTime } from 'luxon'
import { ref } from 'vue'

import AppInput from '@/components/AppInput.vue'
import { useForm } from '@/composables/use-form'
import { Customer, Product } from '@/database/models'
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
  type: 'sell' | 'expense'
}

const form = useForm<SaleFormFields, keyof SaleFormFields>({
  price: '',
  quantity: 1,
  customer: null,
  product: null,
  is_paid: false,
  date: DateTime.now().toISODate(),
  type: 'sell',
})

const isSelectCustomerModalOpen = ref(false)
const isSelectProductModalOpen = ref(false)

const onCustomerSelected = ({ customer }: { customer: Customer }) => {
  isSelectCustomerModalOpen.value = false
  form.data.customer = customer
}

const onProductSelected = ({ product }: { product: Product }) => {
  isSelectProductModalOpen.value = false
  form.data.product = product
}
</script>

<template>
  <form
    action=""
    style="height: 100%"
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
            <IonSelect
              v-model="form.data.type"
              interface="popover"
              label="Tipo de entrada"
              fill="outline"
              label-placement="floating"
            >
              <IonSelectOption value="sell">Venda</IonSelectOption>
              <IonSelectOption value="expense">Despesa</IonSelectOption>
            </IonSelect>
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
          v-if="form.data.type === 'sell'"
          class="ion-margin-bottom"
        >
          <IonCol>
            <IonSelect
              :value="form.data.customer?.id"
              label="Cliente"
              name="customer"
              interface="popover"
              fill="outline"
              label-placement="floating"
              @click.capture.stop="isSelectCustomerModalOpen = true"
            >
              <IonSelectOption
                v-if="form.data.customer"
                :value="form.data.customer.id"
              >
                {{ form.data.customer.name }}
              </IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>
        <IonRow class="ion-margin-bottom">
          <IonCol>
            <IonSelect
              :value="form.data.product?.id"
              name="product"
              interface="popover"
              label="Produto"
              fill="outline"
              label-placement="floating"
              @click.capture.stop="isSelectProductModalOpen = true"
            >
              <IonSelectOption
                v-if="form.data.product"
                :value="form.data.product.id"
              >
                {{ form.data.product.name }}
              </IonSelectOption>
            </IonSelect>
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

        <IonRow v-if="form.data.type === 'sell'">
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
        <IonFabButton type="submit">
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
      @did-dismiss="isSelectCustomerModalOpen = false"
    />
  </form>
</template>
