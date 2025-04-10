<script setup lang="ts">
import { PhCheckCircle, PhClock } from '@phosphor-icons/vue'
import { computed } from 'vue'
import { inject } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { formatCurrencyBRL } from '@/support/helpers'

import { entryInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'

const entry = inject(entryInjectionKey) as EntryRecordHome

const isInflow = computed(() => entry.entry_total > 0)
const isPaid = computed(() => entry.total_paid && entry.total_paid >= entry.entry_total)
</script>

<template>
  <h2 class="currency">
    <span
      style="margin-right: 0.25rem"
      :style="{
        color: isInflow ? 'var(--ion-color-success-shade)' : 'var(--ion-color-danger-shade)',
      }"
    >
      {{ formatCurrencyBRL(entry.entry_total) }}
    </span>

    <Transition name="fade">
      <AppIcon
        v-if="isInflow"
        :icon="isPaid ? PhCheckCircle : PhClock"
        weight="duotone"
        :style="{
          color: isPaid ? 'var(--ion-color-success-shade)' : 'var(--ion-color-medium)',
        }"
      />
    </Transition>
  </h2>
</template>

<style scoped>
.currency {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  font-size: 1.1rem;
}
</style>
