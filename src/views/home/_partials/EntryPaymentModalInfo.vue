<script setup lang="ts">
import { provide } from 'vue'

import { entryInjectionKey } from '../injection-key'
import { EntryRecordHome } from '../types'

const props = defineProps<{
  entry: EntryRecordHome
}>()

provide(entryInjectionKey, props.entry)
</script>

<template>
  <div>
    <!--  -->
  </div>
</template>
