<script setup lang="ts">
import { IonCol, IonRow } from '@ionic/vue'

import { ReleaseUpdate } from '../updates-types'

defineProps<{
  release: ReleaseUpdate
}>()
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <Transition name="fade">
    <IonRow v-if="release.data">
      <IonCol>
        <h4>
          Nova versão disponível:
          <b style="color: var(--ion-color-primary)">{{ release.data.tag_name }}</b>
        </h4>
      </IonCol>
    </IonRow>
  </Transition>
  <Transition name="fade">
    <IonRow v-if="release.data">
      <IonCol>
        <div
          style="font-size: 0.9rem; color: var(--ion-color-medium)"
          v-html="release.bodyRendered"
        />
      </IonCol>
    </IonRow>
  </Transition>
</template>
