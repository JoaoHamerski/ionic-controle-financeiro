<script setup lang="ts">
import { IonButton, IonContent } from '@ionic/vue'
import { PhArrowClockwise } from '@phosphor-icons/vue'

import OptionsInfoHeader from '../_partials/OptionsInfoHeader.vue'
import OptionsPageLayout from '../_partials/OptionsPageLayout.vue'

const onUpdateClick = () => {
  //
}
</script>

<template>
  <OptionsPageLayout title="Atualizações">
    <IonContent class="ion-padding">
      <div class="flex flex-col justify-between h-full">
        <OptionsInfoHeader
          :icon="PhArrowClockwise"
          title="Atualizações"
          description="Verifique e baixe novas versões do aplicativo"
        />
        <div class="flex mt-auto">
          <IonButton
            class="w-full"
            shape="round"
            @click="onUpdateClick"
          >
            Procurar atualizações
          </IonButton>
        </div>
      </div>
    </IonContent>
  </OptionsPageLayout>
</template>
