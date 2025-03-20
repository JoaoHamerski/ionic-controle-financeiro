<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonToolbar,
} from '@ionic/vue'
import { arrowBackOutline } from 'ionicons/icons'
import { ref } from 'vue'

import AppInput from './AppInput.vue'

const emit = defineEmits(['create', 'select'])
const search = defineModel<string>('search')

defineProps<{
  title: string
  inputAttrs: {
    label: string
    helperText?: string
    placeholder?: string
  }
  items: any[]
  itemProp: string | ((item: any) => string)
}>()

const modal = ref()

const onCreate = () => {
  emit('create', search.value)
}

const onSelect = (item: any) => {
  emit('select', item)
}

const onModalDidDismiss = () => {
  search.value = ''
}
</script>

<template>
  <IonModal
    ref="modal"
    @did-dismiss="onModalDidDismiss"
  >
    <IonHeader>
      <IonToolbar
        class="ion-horizontal-padding"
        color="primary"
      >
        <IonButtons slot="start">
          <IonButton @click="modal.$el.dismiss()">
            <IonIcon
              slot="icon-only"
              :icon="arrowBackOutline"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <div class="ion-text-center">
        <h3>{{ title }}</h3>
      </div>

      <div class="ion-padding">
        <AppInput
          v-model="search"
          v-bind="inputAttrs"
        />
      </div>

      <IonList lines="full">
        <IonItem
          v-if="!items.length"
          button
          @click="onCreate"
        >
          <IonLabel>{{ search }}</IonLabel>
          <IonLabel
            slot="end"
            color="primary"
            :style="{ fontWeight: 500 }"
          >
            Cadastrar e selecionar
          </IonLabel>
        </IonItem>

        <IonItem
          v-for="item in items"
          :key="item.id"
          button
          @click="onSelect(item)"
        >
          <IonLabel>
            {{ typeof itemProp === 'string' ? item[itemProp] : itemProp(item) }}
          </IonLabel>

          <IonLabel
            slot="end"
            color="primary"
            :style="{ fontWeight: 500 }"
          >
            Selecionar
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonModal>
</template>
<style scoped>
ion-toolbar ion-button {
  --padding-top: 15px;
  --padding-bottom: 15px;
}
</style>
