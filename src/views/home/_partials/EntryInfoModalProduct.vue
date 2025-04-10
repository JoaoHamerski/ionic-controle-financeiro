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
      class="text-center text-[var(--ion-color-medium)]"
      style="font-weight: 600"
    >
      {{ entry.product_name }}
      <span v-if="entry.entry_quantity > 1">({{ formatCurrencyBRL(entry.entry_value) }}) </span>
    </div>
    <div
      v-if="entry.entry_quantity > 1"
      class="text-center text-sm text-[var(--ion-color-medium)] mb-3"
    >
      Qtd. {{ entry.entry_quantity }}
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
  </div>
</template>
