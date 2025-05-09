<script setup lang="ts">
defineProps<{
  isInflow: boolean
}>()
</script>

<template>
  <h3
    style="margin-top: 0 !important"
    class="ion-text-center rounded py-3"
    :style="
      isInflow
        ? {
            backgroundColor: 'rgba(var(--ion-color-success-rgb), .25)',
            color: 'var(--ion-color-success-shade)',
          }
        : {
            backgroundColor: 'rgba(var(--ion-color-danger-rgb), .25)',
            color: 'var(--ion-color-danger-shade)',
          }
    "
  >
    {{ isInflow ? 'Entrada' : 'Saída' }}
  </h3>
</template>
