<script setup lang="ts">
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/vue'
import { PhGear } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'

defineProps<{
  title: string
  hasBackButton?: boolean
}>()
</script>

<template>
  <IonHeader>
    <IonToolbar color="primary">
      <IonButtons v-if="hasBackButton">
        <IonBackButton />
      </IonButtons>
      <IonTitle :slot="hasBackButton ? 'end' : 'start'">
        <div :style="{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }">
          <AppIcon
            :icon="PhGear"
            weight="fill"
          />
          {{ title }}
        </div>
      </IonTitle>
    </IonToolbar>
  </IonHeader>
</template>
