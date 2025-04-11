<script setup lang="ts">
import { IonAlert, IonItemSliding, IonList, ItemSlidingCustomEvent } from '@ionic/vue'
import { DateTime } from 'luxon'
import { ref } from 'vue'
import { computed } from 'vue'
import { onMounted } from 'vue'

import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { formatCurrencyBRL, titleCase } from '@/support/helpers'

import EntryInfoModal from '../_partials/EntryInfoModal.vue'
import { HomeSegment } from '../HomePage.vue'
import { EntryRecordHome } from '../types'
import EntriesListAfter from './EntriesListAfter.vue'
import EntriesListItem from './EntriesListItem.vue'
import EntriesListItemDragOptions from './EntriesListItemDragOptions.vue'

type EntryModal = {
  isOpen: boolean
  entry: EntryRecordHome | null
}

const emit = defineEmits(['refetch', 'load-more', 'deleted'])

defineProps<{
  entries: EntryRecordHome[]
  totalRecords: number
  segment: HomeSegment
}>()

const isTransitionActive = ref(false)
const list = ref()

const deleteAlert = ref<EntryModal>({
  isOpen: false,
  entry: null,
})

const infoModal = ref<EntryModal>({
  isOpen: false,
  entry: null,
})

const { knex } = useDatabaseStore()

const deleteAlertMessage = computed(() => {
  const entryToDelete = deleteAlert.value.entry

  if (!entryToDelete) {
    return 'Excluir'
  }

  if (entryToDelete.entry_total > 0) {
    return `Excluir a entrada de ${formatCurrencyBRL(entryToDelete.entry_total)} de ${titleCase(entryToDelete.customer_name)}`
  }

  if (entryToDelete.entry_total < 0) {
    return `Excluir saída de ${formatCurrencyBRL(Math.abs(entryToDelete.entry_total))}`
  }

  return 'Excluir'
})

const onDeleteAlertDismiss = async (event: ItemSlidingCustomEvent) => {
  if (event.detail.role === 'delete') {
    deleteEntry(deleteAlert.value.entry)

    emit('refetch')
  }

  deleteAlert.value = {
    isOpen: false,
    entry: null,
  }

  await closeSlidingItems()
}

const deleteEntry = async (entry: any) => {
  const builder = knex.table('entries').where('id', '=', entry.id).delete()

  await dbStatement(builder)
  await closeSlidingItems()
}

const onDelete = ({ entry }: { entry: any }) => {
  deleteAlert.value = {
    isOpen: true,
    entry,
  }
}

const onPay = async ({ entry }: { entry: any }) => {
  await payEntry(entry)
  await closeSlidingItems()

  emit('refetch')
}

const payEntry = async (entry: any) => {
  const builder = knex.table('entries').where('id', '=', entry.id).update({
    paid_at: DateTime.now().toISO(),
  })

  await dbStatement(builder)
}

const closeSlidingItems = async () => {
  await list.value.$el.closeSlidingItems()
}

const onEntryClick = (entry: EntryRecordHome) => {
  infoModal.value = {
    isOpen: true,
    entry,
  }
}

const onEntryInfoModalDismiss = () => {
  infoModal.value = {
    isOpen: false,
    entry: null,
  }
}

onMounted(() => {
  setTimeout(() => {
    isTransitionActive.value = true
  }, 5000)
})
</script>

<template>
  <IonList
    ref="list"
    lines="full"
  >
    <TransitionGroup name="list">
      <IonItemSliding
        v-for="entry in entries"
        :key="entry.id"
      >
        <EntriesListItem
          :entry="entry"
          @entry-click="onEntryClick"
        />
        <EntriesListItemDragOptions
          :entry="entry"
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

    <EntryInfoModal
      v-if="infoModal.entry"
      :is-open="infoModal.isOpen"
      :entry="infoModal.entry"
      @did-dismiss="onEntryInfoModalDismiss"
    />
  </IonList>
</template>
