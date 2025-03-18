<script setup lang="ts">
import {
  IonAlert,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonList,
  ItemSlidingCustomEvent,
} from '@ionic/vue'
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { computed } from 'vue'

import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { titleCase } from '@/support/helpers'

import SalesListItem from './SalesListItem.vue'
import SalesListItemDragOptions from './SalesListItemDragOptions.vue'

const emit = defineEmits(['refetch', 'load-more'])

defineProps<{
  sales: any[]
  totalRecords: number
}>()

const list = ref()

const deleteAlert = ref({
  isOpen: false,
  sale: null,
})

const { knex } = useDatabaseStore()

const deleteAlertMessage = computed(() => {
  if (!deleteAlert.value.sale) {
    return 'Excluir'
  }

  if (deleteAlert.value.sale.sale_total > 0) {
    return `Excluir o pagamento de ${titleCase(deleteAlert.value.sale.customer_name)}`
  }

  if (deleteAlert.value.sale.sale_total < 0) {
    return `Excluir despesa`
  }

  return 'Excluir'
})

const onDelete = ({ sale }: { sale: any }) => {
  deleteAlert.value = {
    isOpen: true,
    sale,
  }
}

const onDeleteAlertDismiss = async (event: ItemSlidingCustomEvent) => {
  if (event.detail.role === 'delete') {
    deleteSale(deleteAlert.value.sale)

    emit('refetch')
  }

  deleteAlert.value = {
    isOpen: false,
    sale: null,
  }

  await closeSlidingItems()
}

const deleteSale = async (sale: any) => {
  const builder = knex.table('sales').where('id', '=', sale.id).delete()

  await dbStatement(builder)
  await closeSlidingItems()

  emit('refetch')
}

const paySale = async (sale: any) => {
  const builder = knex.table('sales').where('id', '=', sale.id).update({
    paid_at: DateTime.now().toISO(),
  })

  await dbStatement(builder)
}

const onPay = async ({ sale }: { sale: any }) => {
  await paySale(sale)
  await closeSlidingItems()

  emit('refetch')
}

const closeSlidingItems = async () => {
  await list.value.$el.closeSlidingItems()
}
</script>

<template>
  <IonList
    ref="list"
    lines="full"
  >
    <div key="sales-list">
      <IonItemSliding
        v-for="sale in sales"
        :key="sale.id"
      >
        <SalesListItem :sale="sale" />
        <SalesListItemDragOptions
          :sale="sale"
          @pay="onPay"
          @delete="onDelete"
        />
      </IonItemSliding>

      <template v-if="sales.length >= 20">
        <IonItem
          v-if="sales.length < totalRecords"
          button
          :style="{
            textAlign: 'center',
            fontSize: '.8rem',
            fontWeight: 500,
          }"
          @click="$emit('load-more')"
        >
          <IonLabel :style="{ color: 'var(--ion-color-primary)' }">CARREGAR MAIS</IonLabel>
        </IonItem>
        <IonItem
          v-else
          :style="{
            textAlign: 'center',
            fontSize: '.8rem',
            fontWeight: 500,
          }"
        >
          <IonLabel :style="{ color: 'var(--ion-color-medium-tint)' }">Fim dos resultados</IonLabel>
        </IonItem>
      </template>
    </div>

    <IonAlert
      :is-open="deleteAlert.isOpen"
      header="Tem certeza?"
      :message="deleteAlertMessage"
      :buttons="[
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Sim, excluir', role: 'delete' },
      ]"
      @did-dismiss="onDeleteAlertDismiss"
    />
  </IonList>
</template>
