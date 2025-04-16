<script setup lang="ts">
import { IonItemSliding, IonList } from '@ionic/vue'
import { reactive, useTemplateRef } from 'vue'

import { useModal } from '@/composables/use-modal'
import { presentToast } from '@/support/toast'

import EntryDeleteModal from '../_partials/EntryDeleteModal.vue'
import EntryInfoModal from '../_partials/EntryInfoModal.vue'
import EntryPaymentModal from '../_partials/EntryPaymentModal.vue'
import { HomeSegment } from '../HomePage.vue'
import { EntryRecordHome } from '../types'
import EntriesListAfter from './EntriesListAfter.vue'
import EntriesListItem from './EntriesListItem.vue'
import EntriesListItemDragOptions from './EntriesListItemDragOptions.vue'

const emit = defineEmits(['refetch', 'load-more'])

defineProps<{
  entries: EntryRecordHome[]
  totalRecords: number
  segment: HomeSegment
}>()

const list = useTemplateRef('list')

const modalDelete = reactive(useModal<EntryRecordHome>())
const modalInfo = reactive(useModal<EntryRecordHome>())
const modalPayment = reactive(useModal<EntryRecordHome>())

const closeSlidingItems = async () => {
  if (!list.value) {
    return
  }

  await list.value.$el.closeSlidingItems()
}

const onDismissModal = async (modal: any) => {
  modal.close()
  await closeSlidingItems()
}

const onEntryDeleted = async () => {
  emit('refetch')
  await onDismissModal(modalDelete)
  await presentToast({ message: 'Registro deletado!', color: 'success' })
}
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
          @entry-click="modalInfo.open(entry)"
        />

        <EntriesListItemDragOptions
          :entry="entry"
          @pay="modalPayment.open(entry)"
          @delete="modalDelete.open(entry)"
        />
      </IonItemSliding>
    </TransitionGroup>

    <EntriesListAfter
      v-if="entries.length >= 20"
      :has-more="entries.length < totalRecords"
      @load-more="$emit('load-more')"
    />

    <EntryPaymentModal
      :is-open="modalPayment.isOpen"
      :entry="modalPayment.data"
      @did-dismiss="onDismissModal(modalPayment)"
    />

    <EntryDeleteModal
      v-if="modalDelete.data"
      :is-open="modalDelete.isOpen"
      :entry="modalDelete.data"
      @deleted="onEntryDeleted"
      @did-dismiss="onDismissModal(modalDelete)"
    />

    <EntryInfoModal
      v-if="modalInfo.data"
      :is-open="modalInfo.isOpen"
      :entry="modalInfo.data"
      @did-dismiss="onDismissModal(modalInfo)"
    />
  </IonList>
</template>
