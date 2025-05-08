<script setup lang="ts">
import { IonSelectOption } from '@ionic/vue'
import { PhPackage } from '@phosphor-icons/vue'
import { computed, inject, watch } from 'vue'

import AppSelect from '@/components/AppSelect.vue'
import { useModal } from '@/composables/use-modal'
import { Customer, Product } from '@/types/models'

import { entryFormInjectionKey } from '../injection-key'
import { EntryForm } from './EntriesForm.vue'
import EntriesFormStepHeader from './EntriesFormStepHeader.vue'
import TypeHeadCustomersModal from './TypeHeadCustomersModal.vue'
import TypeHeadProductsModal from './TypeHeadProductsModal.vue'

const emit = defineEmits(['update:form'])
const form = inject(entryFormInjectionKey) as EntryForm
const localForm = { ...form }

const productModal = useModal<Product>()
const customerModal = useModal<Customer>()

const componentProps = computed(() =>
  form.data.type === 'inflow'
    ? {
        title: 'PRODUTO E CLIENTE',
      }
    : {
        title: 'PRODUTO',
      },
)

const onProductSelected = ({ product }: { product: Product }) => {
  productModal.close()
  localForm.data.product = product
}

const onCustomerSelected = ({ customer }: { customer: Customer }) => {
  customerModal.close()
  localForm.data.customer = customer
}

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
      :title="componentProps.title"
      color="primary"
      :icon="PhPackage"
    />

    <form>
      <div class="px-2">
        <AppSelect
          label="Selecione o produto"
          name="product"
          :value="form.data.product?.id"
          class="mb-10"
          @click.capture.stop="productModal.open()"
        >
          <IonSelectOption
            v-if="form.data.product"
            :value="form.data.product?.id"
          >
            {{ form.data.product?.name }}
          </IonSelectOption>
        </AppSelect>

        <AppSelect
          v-if="form.data.type === 'inflow'"
          label="Selecione o cliente"
          name="customer"
          :value="form.data.customer?.id"
          @click.capture.stop="customerModal.open()"
        >
          <IonSelectOption
            v-if="form.data.customer"
            :value="form.data.customer?.id"
          >
            {{ form.data.customer?.name }}
          </IonSelectOption>
        </AppSelect>

        <TypeHeadProductsModal
          :is-open="productModal.isOpen.value"
          @product-selected="onProductSelected"
          @did-dismiss="productModal.close()"
        />
        <TypeHeadCustomersModal
          :is-open="customerModal.isOpen.value"
          @customer-selected="onCustomerSelected"
          @did-dismiss="customerModal.close()"
        />
      </div>
    </form>
  </div>
</template>
