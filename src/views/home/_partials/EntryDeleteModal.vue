<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonModal, IonRow } from '@ionic/vue'
import { PhTrash } from '@phosphor-icons/vue'
import { useTemplateRef } from 'vue'

import AppModalHeader from '@/components/AppModalHeader.vue'
import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import { EntryRecordHome } from '../types'
import EntryInfo from './EntryInfo.vue'

const props = defineProps<{
  entry: EntryRecordHome | null
}>()

const modal = useTemplateRef('modal')
const { knex } = useDatabaseStore()

const onConfirmDelete = async () => {
  await deleteEntry()
  modal.value?.$el.dismiss(null, 'deleted')
}

const deleteEntry = async () => {
  const builder = knex.table('entries').where('id', '=', props.entry!.id).limit(1).delete()

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
        subtitle="Os pagamentos também serão excluídos"
        :icon="PhTrash"
        class="text-[var(--ion-color-danger-shade)]"
      />

      <EntryInfo
        v-if="entry"
        :entry="entry"
      />

      <IonGrid>
        <IonRow>
          <IonCol>
            <IonButton
              class="w-full"
              fill="clear"
              shape="round"
              color="dark"
              @click="modal?.$el.dismiss(null, 'cancel')"
            >
              Cancelar
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              class="w-full"
              shape="round"
              color="danger"
              @click="onConfirmDelete"
            >
              Excluir
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  </IonModal>
</template>
