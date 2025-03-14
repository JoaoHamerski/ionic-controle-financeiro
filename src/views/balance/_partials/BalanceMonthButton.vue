<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'
import { chevronDownCircleSharp } from 'ionicons/icons'
import { DateTime } from 'luxon'

const emit = defineEmits(['click'])

defineProps<{
  monthDate: DateTime
}>()
</script>

<template>
  <div
    class="ion-margin-top ion-margin-horizontal"
    :style="{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '.5rem',
      fontSize: '1.2rem',
      fontWeight: 600,
    }"
  >
    <IonButton
      fill="clear"
      shape="round"
      style="width: 100%"
      :style="{
        fontSize: '1.2rem',
      }"
      @click="emit('click')"
    >
      <span :style="{ marginLeft: '1.5rem' }">
        {{ monthDate.monthLong }} / {{ monthDate.year }}
      </span>
      <IonIcon
        slot="end"
        :icon="chevronDownCircleSharp"
      />
    </IonButton>
  </div>
</template>
