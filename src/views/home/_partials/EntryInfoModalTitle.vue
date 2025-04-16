<script setup lang="ts">
import { inject } from 'vue'

import { isInflowInjectionKey } from '../injection-key'

const isInflow = inject(isInflowInjectionKey) as boolean
</script>

<template>
  <h3
    style="margin-top: 0 !important"
    class="ion-text-center rounded py-3"
    :class="
      isInflow
        ? 'bg-[var(--ion-color-success)]/25 text-[var(--ion-color-success-shade)]'
        : 'bg-[var(--ion-color-danger)]/25 text-[var(--ion-color-danger-shade)]'
    "
  >
    {{ isInflow ? 'Entrada' : 'Saída' }}
  </h3>
</template>
