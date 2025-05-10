<script setup lang="ts">
import { IonSpinner } from '@ionic/vue'

withDefaults(
  defineProps<{
    spinnerClass?: string
  }>(),
  {
    spinnerClass: 'size-10',
  },
)
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <IonSpinner
      color="primary"
      name="crescent"
      :class="spinnerClass"
    />
  </div>
</template>
