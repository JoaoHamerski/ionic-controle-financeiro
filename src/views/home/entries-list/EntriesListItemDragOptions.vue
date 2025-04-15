<script setup lang="ts">
import { IonItemOption, IonItemOptions } from '@ionic/vue'
import { PhCheckCircle, PhTrash } from '@phosphor-icons/vue'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'

import { EntryRecordHome } from '../types'

const emit = defineEmits(['pay', 'delete'])

const { entry } = defineProps<{
  entry: EntryRecordHome
}>()

const onDeleteClick = (entry: any) => {
  emit('delete', { entry })
}

const onPayClick = async (entry: any) => {
  emit('pay', { entry })
}

const showPayButton = computed(
  () => entry.entry_total > 0 && (!entry.total_paid || entry.total_paid < entry.entry_total),
)
</script>

<template>
  <IonItemOptions side="end">
    <IonItemOption
      v-if="showPayButton"
      color="success"
      class="min-w-[90px]"
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
      class="min-w-[90px]"
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
