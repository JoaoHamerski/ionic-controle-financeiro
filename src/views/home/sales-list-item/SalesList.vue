<script setup lang="ts">
import { IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonList } from '@ionic/vue'
import { checkmarkCircleSharp, trashSharp } from 'ionicons/icons'

import { dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import SalesListItem from './SalesListItem.vue'

const emit = defineEmits(['refetch'])

defineProps<{
  items: any[]
}>()

const { knex } = useDatabaseStore()

const onPayClick = async (item: any) => {
  const builder = knex.table('sales').where('id', '=', item.id).update({
    is_paid: 1,
  })

  await dbStatement(builder)

  emit('refetch')
}

const onDeleteClick = async (item: any) => {
  const builder = knex.table('sales').where('id', '=', item.id).delete()

  await dbStatement(builder)

  emit('refetch')
}
</script>

<template>
  <IonList lines="full">
    <TransitionGroup name="fade">
      <IonItemSliding
        v-for="item in items"
        :key="item.id"
      >
        <SalesListItem :item="item" />
        <IonItemOptions side="end">
          <IonItemOption
            v-if="item.sale_total > 0 && !item.sale_is_paid"
            color="success"
            @click="onPayClick(item)"
          >
            <IonIcon
              slot="top"
              :icon="checkmarkCircleSharp"
              :style="{ fontSize: '1.4rem', marginBottom: '0.5rem' }"
            />
            Pagar
          </IonItemOption>
          <IonItemOption
            color="danger"
            @click="onDeleteClick(item)"
          >
            <IonIcon
              slot="top"
              :icon="trashSharp"
              :style="{ fontSize: '1.4rem', marginBottom: '0.5rem' }"
            />
            Excluir
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </TransitionGroup>
  </IonList>
</template>
