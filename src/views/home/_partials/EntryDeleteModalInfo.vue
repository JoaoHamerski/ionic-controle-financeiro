<script setup lang="ts">
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/vue'

import { EntryRecordHome } from '../types'

defineEmits(['confirm', 'cancel'])
defineProps<{
  entry: EntryRecordHome
}>()
</script>

<template>
  <IonGrid>
    <IonRow class="ion-margin-bottom">
      <IonCol>{{ entry }}</IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        <IonButton
          class="w-full"
          fill="clear"
          shape="round"
          color="danger"
          @click="$emit('cancel')"
        >
          Cancelar
        </IonButton>
      </IonCol>
      <IonCol>
        <IonButton
          class="w-full"
          shape="round"
          color="danger"
          @click="$emit('confirm')"
        >
          Excluir
        </IonButton>
      </IonCol>
    </IonRow>
  </IonGrid>
</template>
