<script setup lang="ts">
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue'
import { PhList, PhTrendDown, PhTrendUp } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'

defineEmits(['segment-changed'])

type Segment = {
  value: 'all' | 'inflows' | 'outflows'
  icon: any
  label: string
}

const SEGMENTS: Segment[] = [
  { value: 'all', icon: PhList, label: 'TUDO' },
  { value: 'inflows', icon: PhTrendUp, label: 'ENTRADAS' },
  { value: 'outflows', icon: PhTrendDown, label: 'SAÍDAS' },
]
</script>

<template>
  <IonSegment
    value="all"
    color="light"
  >
    <IonSegmentButton
      v-for="segment in SEGMENTS"
      :key="segment.value"
      :value="segment.value"
      @click="$emit('segment-changed', segment.value)"
    >
      <AppIcon
        style="margin-top: 0.5rem"
        :icon="segment.icon"
        color="var(--ion-color-light)"
      />
      <IonLabel :style="{ color: 'var(--ion-color-light)', marginTop: 0 }">
        {{ segment.label }}
      </IonLabel>
    </IonSegmentButton>
  </IonSegment>
</template>
