<script setup lang="ts">
import { PhUser } from '@phosphor-icons/vue'
import { inject } from 'vue'

import AppIcon from '@/components/AppIcon.vue'
import { titleCase } from '@/support/helpers'

import { entryInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'

const entry = inject(entryInjectionKey) as EntryRecordHome
</script>

<template>
  <div>
    <AppIcon
      style="margin-right: 0.25rem"
      :icon="PhUser"
      weight="fill"
    />
    {{ titleCase(entry.customer_name) }}
  </div>
</template>
