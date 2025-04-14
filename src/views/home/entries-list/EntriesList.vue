<script setup lang="ts">
import { IonItemSliding, IonList } from '@ionic/vue'
import { ref } from 'vue'
import { reactive } from 'vue'

import { useModal } from '@/composables/use-modal'

import EntryDeleteModal from '../_partials/EntryDeleteModal.vue'
import EntryInfoModal from '../_partials/EntryInfoModal.vue'
import EntryPaymentModal from '../_partials/EntryPaymentModal.vue'
import { HomeSegment } from '../HomePage.vue'
import { EntryRecordHome } from '../types'
import EntriesListAfter from './EntriesListAfter.vue'
import EntriesListItem from './EntriesListItem.vue'
import EntriesListItemDragOptions from './EntriesListItemDragOptions.vue'

defineEmits(['refetch', 'load-more'])

defineProps<{
  entries: EntryRecordHome[]
  totalRecords: number
  segment: HomeSegment
}>()

const list = ref()

const deleteModal = reactive(useModal<EntryRecordHome>())
const infoModal = reactive(useModal<EntryRecordHome>())
const paymentModal = reactive(useModal<EntryRecordHome>())

const closeSlidingItems = async () => {
  await list.value.$el.closeSlidingItems()
}

const onDismissModal = async (modal: any) => {
  modal.close()
  await closeSlidingItems()
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
          @entry-click="infoModal.open(entry)"
        />

        <EntriesListItemDragOptions
          :entry="entry"
          @pay="paymentModal.open(entry)"
          @delete="deleteModal.open(entry)"
        />
      </IonItemSliding>
    </TransitionGroup>

    <EntriesListAfter
      v-if="entries.length >= 20"
      :has-more="entries.length < totalRecords"
      @load-more="$emit('load-more')"
    />

    <EntryPaymentModal
      v-if="paymentModal.data"
      :is-open="paymentModal.isOpen"
      :entry="paymentModal.data"
      @did-dismiss="onDismissModal(paymentModal)"
    />

    <EntryDeleteModal
      v-if="deleteModal.data"
      :is-open="deleteModal.isOpen"
      :entry="deleteModal.data"
      @deleted="$emit('refetch')"
      @did-dismiss="onDismissModal(deleteModal)"
    />

    <EntryInfoModal
      v-if="infoModal.data"
      :is-open="infoModal.isOpen"
      :entry="infoModal.data"
      @did-dismiss="onDismissModal(infoModal)"
    />
  </IonList>
</template>
