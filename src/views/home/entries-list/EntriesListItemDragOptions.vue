<script setup lang="ts">
import { IonIcon, IonItemOption, IonItemOptions } from '@ionic/vue'
import { checkmarkCircleSharp, trashSharp } from 'ionicons/icons'

const emit = defineEmits(['pay', 'delete'])

defineProps<{
  entry: any
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
      v-if="entry.entry_total > 0 && !entry.entry_paid_at"
      color="success"
      @click="onPayClick(entry)"
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
      @click="onDeleteClick(entry)"
    >
      <IonIcon
        slot="top"
        :icon="trashSharp"
        :style="{ fontSize: '1.4rem', marginBottom: '0.5rem' }"
      />
      Excluir
    </IonItemOption>
  </IonItemOptions>
</template>
