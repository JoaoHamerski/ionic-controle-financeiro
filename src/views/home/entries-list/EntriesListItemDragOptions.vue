<script setup lang="ts">
import { IonItemOption, IonItemOptions } from '@ionic/vue'
import { PhCheckCircle, PhTrash } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'

import { EntryRecordHome } from '../types'

const emit = defineEmits(['pay', 'delete'])

defineProps<{
  entry: EntryRecordHome
}>()

const onDeleteClick = (entry: any) => {
  emit('delete', { entry })
}

const onPayClick = async (entry: any) => {
  emit('pay', { entry })
}
</script>

<template>
  <IonItemOptions side="end">
    <IonItemOption
      v-if="entry.total_paid && entry.total_paid < entry.entry_total"
      color="success"
      @click="onPayClick(entry)"
    >
      <AppIcon
        slot="top"
        :icon="PhCheckCircle"
        weight="fill"
        size="24"
        :style="{ marginBottom: '.5rem' }"
      />
      Pagar
    </IonItemOption>
    <IonItemOption
      id="delete-alert"
      color="danger"
      @click="onDeleteClick(entry)"
    >
      <AppIcon
        slot="top"
        :icon="PhTrash"
        weight="fill"
        size="24"
        :style="{ marginBottom: '.5rem' }"
      />
      Excluir
    </IonItemOption>
  </IonItemOptions>
</template>
