<script setup lang="ts">
import { IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonList } from '@ionic/vue'
import { checkmarkCircleSharp, trashSharp } from 'ionicons/icons'

import SalesListItem from './SalesListItem.vue'

defineProps<{
  items: any[]
}>()
</script>

<template>
  <IonList lines="full">
    <IonItemSliding
      v-for="item in items"
      :key="item.id"
    >
      <SalesListItem :item="item" />

      <IonItemOptions side="end">
        <IonItemOption
          v-if="item.sale_total > 0 && !item.sale_is_paid"
          color="success"
        >
          <IonIcon
            slot="top"
            :icon="checkmarkCircleSharp"
            :style="{ fontSize: '1.4rem', marginBottom: '0.5rem' }"
          />
          Pagar
        </IonItemOption>
        <IonItemOption color="danger">
          <IonIcon
            slot="top"
            :icon="trashSharp"
            :style="{ fontSize: '1.4rem', marginBottom: '0.5rem' }"
          />
          Excluir
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  </IonList>
</template>
