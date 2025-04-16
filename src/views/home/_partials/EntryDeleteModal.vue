<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { PhTrash } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppModalHeader from '@/components/AppModalHeader.vue'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import { EntryRecordHome } from '../types'
import EntryDeleteModalInfo from './EntryDeleteModalInfo.vue'

const emit = defineEmits(['deleted'])

const props = defineProps<{
  entry: EntryRecordHome
}>()

const modal = useTemplateRef('modal')
const { knex } = useDatabaseStore()

const onConfirmDelete = async () => {
  await deleteEntry()
  emit('deleted')
}

const deleteEntry = async () => {
  const builder = knex.table('entries').where('id', '=', props.entry.id).limit(1).delete()

  await dbStatement(builder)
}
</script>

<template>
  <IonModal
    ref="modal"
    class="modal-dialog"
  >
    <div class="ion-padding">
      <AppModalHeader
        title="Você tem certeza?"
        :icon="PhTrash"
        class="text-[var(--ion-color-danger-shade)]"
      />
      <EntryDeleteModalInfo
        :entry="entry"
        @confirm="onConfirmDelete"
        @cancel="modal?.$el.dismiss()"
      />
    </div>
  </IonModal>
</template>
