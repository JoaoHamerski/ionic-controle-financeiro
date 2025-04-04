<script setup lang="ts">
import { IonFab, IonFabButton } from '@ionic/vue'
import { PhPlus } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'

defineEmits(['click'])
</script>

<template>
  <IonFab
    slot="fixed"
    vertical="bottom"
    horizontal="end"
  >
    <IonFabButton
      color="success"
      @click="$emit('click')"
    >
      <AppIcon
        :icon="PhPlus"
        weight="bold"
        size="24"
      />
    </IonFabButton>
  </IonFab>
</template>

<style scoped>
ion-fab-button[data-label]::after {
  content: attr(data-label);
  position: absolute;
  color: var(--ion-color-light);
  right: 45px;
  bottom: 3px;
  background-color: rgba(var(--ion-color-dark-rgb), 0.7);
  padding: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 1rem;
}

ion-fab-button {
  margin-bottom: 1rem;
  margin-right: 0.5rem;

  --background: var(--ion-color-primary-shade);
  --color: var(--ion-color-dark);
}
</style>
