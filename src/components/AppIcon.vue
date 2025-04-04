<script setup lang="ts">
defineProps<{
  icon: any
}>()
</script>

<template>
  <Component
    :is="icon"
    v-bind="$attrs"
  />
</template>
