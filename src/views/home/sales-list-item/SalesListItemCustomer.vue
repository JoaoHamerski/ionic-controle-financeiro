<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { personSharp } from 'ionicons/icons'

import { titleCase } from '@/support/helpers'

defineProps<{
  customerName: string
}>()
</script>

<template>
  <div :style="{ fontSize: '.8rem', color: 'var(--ion-color-medium)' }">
    <IonIcon :icon="personSharp" />
    {{ titleCase(customerName) }}
  </div>
</template>
