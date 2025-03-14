<script setup lang="ts">
import { IonButton, IonButtons, IonModal, IonPicker, IonToolbar } from '@ionic/vue'
import { ref } from 'vue'

let currentValue = 'javascript'

const modal = ref(null)

const onIonChange = (event: CustomEvent) => {
  currentValue = event.detail.value
}

const onDidDismiss = (event: CustomEvent) => {
  console.log('didDismiss', JSON.stringify(event.detail))
}
</script>

<template>
  <IonButton id="open-modal">Open modal</IonButton>
  <IonModal
    ref="modal"
    trigger="open-modal"
    is-open="true"
    @did-dismiss="onDidDismiss"
  >
    <IonToolbarpp>
      <IonButtons slot="start">
        <IonButton @click="modal.$el.dismiss(null, 'cancel')">Cancel</IonButton>
      </IonButtons>
      <IonButtons slot="end">
        <IonButton @click="modal.$el.dismiss(currentValue, 'confirm')">Done</IonButton>
      </IonButtons>
    </IonToolbarpp>
    <IonPicker>
      <IonPickerColumn
        :value="currentValue"
        @ion-change="onIonChange"
      >
        <IonPickerColumnOption
          value=""
          disabled="true"
          >--</IonPickerColumnOption
        >
        <IonPickerColumnOption value="javascript">Javascript</IonPickerColumnOption>
        <IonPickerColumnOption value="typescript">Typescript</IonPickerColumnOption>
        <IonPickerColumnOption value="rust">Rust</IonPickerColumnOption>
        <IonPickerColumnOption value="c#">C#</IonPickerColumnOption>
      </IonPickerColumn>
    </IonPicker>
  </IonModal>
</template>

<style>
ion-modal {
  --height: auto;

  align-items: end;
}

ion-picker {
  margin-bottom: var(--ion-safe-area-bottom);
}
</style>
