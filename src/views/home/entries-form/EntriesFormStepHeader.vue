<script setup lang="ts">
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'

const COLOR_CLASSES = [
  {
    name: 'primary',
    titleClass: 'bg-[var(--ion-color-primary)]/25 text-[var(--ion-color-primary-shade)]',
    iconClass: 'text-[var(--ion-color-primary)]',
  },
  {
    name: 'success',
    titleClass: 'bg-[var(--ion-color-success)]/25 text-[var(--ion-color-success-shade)]',
    iconClass: 'text-[var(--ion-color-success)]',
  },
]

const props = withDefaults(
  defineProps<{
    color?: 'primary' | 'success'
    icon: any
  }>(),
  {
    color: 'primary',
  },
)

const colorClass = computed(() => COLOR_CLASSES.find(({ name }) => name === props.color))
</script>

<template>
  <div>
    <div>
      <h4
        class="text-center rounded-full py-3"
        :class="colorClass?.titleClass"
        style="font-weight: 600"
      >
        TIPO DE REGISTRO
      </h4>
    </div>
    <div class="text-center my-10">
      <AppIcon
        :icon="icon"
        size="90"
        :class="colorClass?.iconClass"
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
