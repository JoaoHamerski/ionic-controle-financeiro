<script setup lang="ts">
import AppIcon from './AppIcon.vue'

defineProps<{
  icon: any
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-8 text-center">
    <AppIcon
      :icon="icon"
      weight="fill"
      size="90"
    />
    <h3 style="font-weight: 600">
      {{ title }}
    </h3>
    <div
      v-if="subtitle || $slots['subtitle']"
      class="text-sm text-[var(--ion-color-medium)]"
    >
      <template v-if="subtitle">{{ subtitle }}</template>
      <template v-else-if="$slots['subtitle']">
        <slot name="subtitle" />
      </template>
    </div>
  </div>
</template>
