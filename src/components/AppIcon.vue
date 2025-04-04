<script setup lang="ts">
defineProps<{
  icon: any
}>()
</script>
<template>
  <Component
    :is="icon"
    size="26"
    weight="duotone"
  />
</template>
