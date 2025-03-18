<script setup lang="ts">
import { IonIcon, IonItemOption, IonItemOptions } from '@ionic/vue'
import { checkmarkCircleSharp, trashSharp } from 'ionicons/icons'

const emit = defineEmits(['pay', 'delete'])

defineProps<{
  sale: any
}>()

const onDeleteClick = (sale: any) => {
  emit('delete', { sale })
}

const onPayClick = async (sale: any) => {
  emit('pay', { sale })
}
</script>

<template>
  <IonItemOptions side="end">
    <IonItemOption
      v-if="sale.sale_total > 0 && !sale.sale_paid_at"
      color="success"
      @click="onPayClick(sale)"
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
      @click="onDeleteClick(sale)"
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
