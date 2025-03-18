<script setup lang="ts">
import { IonAlert, IonItemSliding, IonList, ItemSlidingCustomEvent } from '@ionic/vue'
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { computed } from 'vue'

import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { titleCase } from '@/support/helpers'

import { EntryRecordHome } from '../HomePage.vue'
import EntriesListAfter from './EntriesListAfter.vue'
import EntriesListItem from './EntriesListItem.vue'
import EntriesListItemDragOptions from './EntriesListItemDragOptions.vue'

const emit = defineEmits(['refetch', 'load-more'])

defineProps<{
  entries: any[]
  totalRecords: number
}>()

const list = ref()

const deleteAlert = ref<{
  isOpen: boolean
  entry: EntryRecordHome | null
}>({
  isOpen: false,
  entry: null,
})

const { knex } = useDatabaseStore()

const deleteAlertMessage = computed(() => {
  if (!deleteAlert.value.entry) {
    return 'Excluir'
  }

  if (deleteAlert.value.entry.entry_total > 0) {
    return `Excluir o pagamento de ${titleCase(deleteAlert.value.entry.customer_name)}`
  }

  if (deleteAlert.value.entry.entry_total < 0) {
    return `Excluir despesa`
  }

  return 'Excluir'
})

const onDelete = ({ sale }: { sale: any }) => {
  deleteAlert.value = {
    isOpen: true,
    entry: sale,
  }
}

const onDeleteAlertDismiss = async (event: ItemSlidingCustomEvent) => {
  if (event.detail.role === 'delete') {
    deleteSale(deleteAlert.value.entry)

    emit('refetch')
  }

  deleteAlert.value = {
    isOpen: false,
    entry: null,
  }

  await closeSlidingItems()
}

const deleteSale = async (entry: any) => {
  const builder = knex.table('entries').where('id', '=', entry.id).delete()

  await dbStatement(builder)
  await closeSlidingItems()

  emit('refetch')
}

const paySale = async (entry: any) => {
  const builder = knex.table('entries').where('id', '=', entry.id).update({
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
    <TransitionGroup
      key="sales-list"
      name="fade"
    >
      <IonItemSliding
        v-for="entry in entries"
        :key="entry.id"
      >
        <EntriesListItem :entry="entry" />
        <EntriesListItemDragOptions
          :sale="entry"
          @pay="onPay"
          @delete="onDelete"
        />
      </IonItemSliding>
    </TransitionGroup>

    <EntriesListAfter
      v-if="entries.length >= 20"
      :has-more="entries.length < totalRecords"
      @load-more="$emit('load-more')"
    />

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
