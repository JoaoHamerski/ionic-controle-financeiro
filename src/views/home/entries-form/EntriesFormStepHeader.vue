<script setup lang="ts">
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'

const STYLES = [
  {
    name: 'primary',
    title: {
      backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.25)',
      color: 'var(--ion-color-primary-shade)',
    },
    icon: {
      color: 'var(--ion-color-primary)',
    },
  },
  {
    name: 'success',
    title: {
      backgroundColor: 'rgba(var(--ion-color-success-rgb), 0.25)',
      color: 'var(--ion-color-success-shade)',
    },
    icon: {
      color: 'var(--ion-color-success)',
    },
  },
]

const props = withDefaults(
  defineProps<{
    title: string
    color?: 'primary' | 'success'
    icon: any
  }>(),
  {
    color: 'primary',
  },
)

const style = computed(() => STYLES.find(({ name }) => name === props.color))
</script>

<template>
  <div>
    <div>
      <h4
        class="text-center rounded-full py-3"
        :style="{ ...(style?.title || {}), fontWeight: 600 }"
      >
        {{ title }}
      </h4>
    </div>
    <div class="text-center my-10">
      <AppIcon
        :icon="icon"
        size="90"
        :style="{ ...(style?.icon || {}) }"
        weight="fill"
      />
    </div>
    <div
      v-if="$slots['subtitle']"
      class="text-center mb-10 text-[var(--ion-color-medium)]"
    >
      <slot name="subtitle" />
    </div>
  </div>
</template>
