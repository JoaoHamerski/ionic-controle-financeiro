<script setup lang="ts">
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonToolbar,
} from '@ionic/vue'
import { PhArrowLeft } from '@phosphor-icons/vue'
import { ref } from 'vue'

import AppCenteredSpinner from './AppCenteredSpinner.vue'
import AppIcon from './AppIcon.vue'
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
  isLoaded: boolean
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
            <AppIcon
              slot="icon-only"
              :icon="PhArrowLeft"
              size="28"
              weight="bold"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <Transition
      name="fade-fast"
      mode="out-in"
    >
      <IonContent v-if="!isLoaded">
        <AppCenteredSpinner />
      </IonContent>
      <IonContent v-else>
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
            v-if="!items.length && search"
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
    </Transition>
  </IonModal>
</template>
