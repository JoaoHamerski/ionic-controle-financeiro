<script setup lang="ts">
import { inject } from 'vue'

import { formatCurrencyBRL } from '@/support/helpers'

import { entryInjectionKey, isInflowInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'

const entry = inject(entryInjectionKey) as EntryRecordHome
const isInflow = inject(isInflowInjectionKey) as boolean
</script>

<template>
  <div>
    <div
      class="text-center text-[var(--ion-color-medium)] mb-2"
      style="font-weight: 600"
    >
      {{ entry.product_name }}
    </div>
    <h4
      class="ion-text-center"
      :class="
        isInflow ? 'text-[var(--ion-color-success-shade)]' : 'text-[var(--ion-color-danger-shade)]'
      "
      style="margin-bottom: 0; margin-top: 0; font-weight: 800"
    >
      {{ formatCurrencyBRL(entry.entry_total) }}
    </h4>
    <div
      v-if="entry.entry_quantity"
      class="ion-text-center text-sm font-medium text-[var(--ion-color-medium)] mb-4"
    >
      {{ formatCurrencyBRL(entry.entry_value) }} x {{ entry.entry_quantity }}
    </div>
  </div>
</template>
