<script setup lang="ts">
import { PhCalendarDots, PhUser } from '@phosphor-icons/vue'
import { DateTime } from 'luxon'
import { inject } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { titleCase } from '@/support/helpers'

import { entryInjectionKey, isInflowInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'

const entry = inject(entryInjectionKey) as EntryRecordHome
const isInflow = inject(isInflowInjectionKey) as boolean
</script>

<template>
  <div>
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
    <div class="text-center text-sm font-medium text-[var(--ion-color-medium)]">
      <AppIcon
        :icon="PhCalendarDots"
        weight="fill"
      />
      {{ DateTime.fromISO(entry.entry_date).toFormat('dd/MM/yyyy (cccc)') }}
    </div>
    <div
      v-if="entry.entry_note"
      class="ion-text-center text-[var(--ion-color-medium)]"
    >
      {{ entry.entry_note }}
    </div>
  </div>
</template>
