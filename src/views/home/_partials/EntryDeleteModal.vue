<script setup lang="ts">
import { IonAlert } from '@ionic/vue'
import { computed } from 'vue'

import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { formatCurrencyBRL, titleCase } from '@/support/helpers'

import { EntryRecordHome } from '../types'

const emit = defineEmits(['deleted', 'canceled'])
const props = defineProps<{
  entry: EntryRecordHome
}>()

const { knex } = useDatabaseStore()

const deleteAlertMessage = computed(() => {
  const entryToDelete = props.entry

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

const onDeleteAlertDismiss = async (event: any) => {
  if (event.detail.role === 'delete') {
    await deleteEntry()
    emit('deleted')
    return
  }

  emit('canceled')
}

const deleteEntry = async () => {
  const builder = knex.table('entries').where('id', '=', props.entry.id).limit(1).delete()

  await dbStatement(builder)
}
</script>

<template>
  <IonAlert
    header="Tem certeza?"
    :message="deleteAlertMessage"
    :buttons="[
      { text: 'Cancelar', role: 'cancel' },
      { text: 'Sim, excluir', role: 'delete' },
    ]"
    @did-dismiss="onDeleteAlertDismiss"
  />
</template>

<style scoped>
ion-alert {
  --min-width: 90% !important;
}
</style>
