<script setup lang="ts">
import { PhCheckCircle, PhClock } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'

defineProps<{
  paidAt: boolean
}>()
</script>

<template>
  <Transition
    name="fade"
    mode="out-in"
  >
    <div
      :key="paidAt ? 'paid' : 'not-paid'"
      :style="{
        fontSize: '.8rem',
        color: 'var(--ion-color-medium)',
        marginTop: '.2rem',
      }"
    >
      <template v-if="paidAt">
        <AppIcon
          :icon="PhCheckCircle"
          weight="fill"
        />
        Pago
      </template>
      <template v-else>
        <AppIcon
          :icon="PhClock"
          weight="fill"
        />
        Pagamento pendente
      </template>
    </div>
  </Transition>
</template>
