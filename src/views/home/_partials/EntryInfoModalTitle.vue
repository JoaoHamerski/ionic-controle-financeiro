<script setup lang="ts">
import { inject } from 'vue'

import { isInflowInjectionKey } from '../injection-key'

const isInflow = inject(isInflowInjectionKey) as boolean
</script>

<template>
  <h3 class="ion-text-center rounded-2xl">
    {{ isInflow ? 'Entrada' : 'Saída' }}
  </h3>
</template>
