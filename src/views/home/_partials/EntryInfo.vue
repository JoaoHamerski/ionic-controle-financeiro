<script setup lang="ts">
import { PhCalendarDots, PhUser } from '@phosphor-icons/vue'
import { DateTime } from 'luxon'
import { computed } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { formatCurrencyBRL, titleCase } from '@/support/helpers'

import { EntryRecordHome } from '../types'

const props = defineProps<{
  entry: EntryRecordHome
}>()

const isInflow = computed(() => props.entry.entry_total > 0)
</script>

<template>
  <div>
    <div>
      <h6
        class="text-center text-[var(--ion-color-medium)]"
        style="font-weight: 600; margin-bottom: 0"
      >
        {{ entry.product_name }}
        <span v-if="entry.entry_quantity > 1">({{ formatCurrencyBRL(entry.entry_value) }}) </span>
      </h6>
      <div
        v-if="entry.entry_quantity > 1"
        class="text-center text-sm text-[var(--ion-color-medium)]"
      >
        Qtd.: {{ entry.entry_quantity }}
      </div>
    </div>

    <h4
      class="ion-text-center py-1"
      :class="{
        'text-[var(--ion-color-success-shade)]': isInflow,
        'text-[var(--ion-color-danger-shade)]': !isInflow,
      }"
      style="font-weight: 800"
    >
      {{ formatCurrencyBRL(entry.entry_total) }}
    </h4>

    <div
      v-if="isInflow"
      class="ion-text-center flex items-center justify-center font-medium mb-1 text-[var(--ion-color-medium)]"
    >
      <AppIcon
        :icon="PhUser"
        weight="fill"
        class="mr-1"
      />
      {{ titleCase(entry.customer_name) }}
    </div>

    <div class="text-center font-medium text-[var(--ion-color-medium)] mb-2">
      <AppIcon
        :icon="PhCalendarDots"
        weight="fill"
      />
      {{ DateTime.fromISO(entry.entry_date).toFormat('dd/MM/yyyy (cccc)') }}
    </div>

    <div
      v-if="entry.entry_note"
      class="ion-text-center text-sm text-[var(--ion-color-medium)]"
    >
      {{ entry.entry_note }}
    </div>
  </div>
</template>
