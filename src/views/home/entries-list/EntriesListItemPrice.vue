<script setup lang="ts">
import { PhCheckCircle, PhClock } from '@phosphor-icons/vue'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { formatCurrencyBRL } from '@/support/helpers'

const props = defineProps<{
  total: number
  paidAt: string | null
}>()

const isInflow = computed(() => props.total > 0)
</script>

<template>
  <h2 class="currency">
    <span
      :style="{
        color: isInflow ? 'var(--ion-color-success-shade)' : 'var(--ion-color-danger-shade)',
      }"
    >
      {{ formatCurrencyBRL(total) }}
    </span>

    <Transition name="fade">
      <AppIcon
        v-if="isInflow"
        :icon="paidAt ? PhCheckCircle : PhClock"
        weight="duotone"
        :style="{
          color: paidAt ? 'var(--ion-color-success-shade)' : 'var(--ion-color-medium)',
        }"
      />
    </Transition>
  </h2>
</template>

<style scoped>
.currency {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
