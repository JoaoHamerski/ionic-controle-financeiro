<template>
  <div
    class="ion-margin ion-text-center"
    :style="{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ion-color-medium)',
    }"
  >
    <div>
      <slot v-if="$slots['default']" />
      <template v-else>Nada por aqui ainda</template>
    </div>
  </div>
</template>
