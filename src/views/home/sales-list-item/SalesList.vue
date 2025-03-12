<script setup lang="ts">
import { IonItemSliding, IonList } from '@ionic/vue'
import { ref } from 'vue'

import SalesListItem from './SalesListItem.vue'
import SalesListItemDragOptions from './SalesListItemDragOptions.vue'

const emit = defineEmits(['refetch'])

defineProps<{
  sales: any[]
}>()

const list = ref()

const onRefetch = async () => {
  await closeSlidingItems()
  emit('refetch')
}

const closeSlidingItems = async () => {
  await list.value.$el.closeSlidingItems()
}
</script>

<template>
  <IonList
    ref="list"
    lines="full"
  >
    <TransitionGroup name="fade">
      <IonItemSliding
        v-for="sale in sales"
        :key="sale.id"
      >
        <SalesListItem :sale="sale" />
        <SalesListItemDragOptions
          :sale="sale"
          @refetch="onRefetch"
          @close-sliding-items="closeSlidingItems"
        />
      </IonItemSliding>
    </TransitionGroup>
  </IonList>
</template>
