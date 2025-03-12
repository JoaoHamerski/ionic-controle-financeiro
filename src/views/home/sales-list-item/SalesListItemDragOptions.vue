<script setup lang="ts">
import {
  IonAlert,
  IonIcon,
  IonItemOption,
  IonItemOptions,
  ItemSlidingCustomEvent,
} from '@ionic/vue'
import { checkmarkCircleSharp, trashSharp } from 'ionicons/icons'
import { ref } from 'vue'
import { computed } from 'vue'

import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { titleCase } from '@/support/helpers'

const emit = defineEmits(['close-sliding-items', 'refetch'])

defineProps<{
  sale: any
}>()

const { knex } = useDatabaseStore()

const deleteAlert = ref({
  isOpen: false,
  sale: null,
})

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

const deleteSale = async (item: any) => {
  const builder = knex.table('sales').where('id', '=', item.id).delete()

  await dbStatement(builder)
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

  emit('close-sliding-items')
}

const openDeleteAlert = (sale: any) => {
  deleteAlert.value = {
    isOpen: true,
    sale,
  }
}

const onPayClick = async (item: any) => {
  const builder = knex.table('sales').where('id', '=', item.id).update({
    is_paid: 1,
  })

  await dbStatement(builder)

  emit('refetch')
}
</script>

<template>
  <IonItemOptions side="end">
    <IonItemOption
      v-if="sale.sale_total > 0 && !sale.sale_is_paid"
      color="success"
      @click="onPayClick(sale)"
    >
      <IonIcon
        slot="top"
        :icon="checkmarkCircleSharp"
        :style="{ fontSize: '1.4rem', marginBottom: '0.5rem' }"
      />
      Pagar
    </IonItemOption>
    <IonItemOption
      id="delete-alert"
      color="danger"
      @click="openDeleteAlert(sale)"
    >
      <IonIcon
        slot="top"
        :icon="trashSharp"
        :style="{ fontSize: '1.4rem', marginBottom: '0.5rem' }"
      />
      Excluir
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
    </IonItemOption>
  </IonItemOptions>
</template>
