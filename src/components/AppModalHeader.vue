<script setup lang="ts">
import AppIcon from './AppIcon.vue'

defineProps<{
  icon: any
  title: string
}>()
</script>

<template>
  <div class="mb-10 text-center">
    <AppIcon
      :icon="icon"
      weight="fill"
      size="90"
    />
    <h3 style="font-weight: 600">
      {{ title }}
    </h3>
  </div>
</template>
