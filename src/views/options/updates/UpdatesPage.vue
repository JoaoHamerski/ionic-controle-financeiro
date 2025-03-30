<script setup lang="ts">
import { IonButton, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue'
import { syncCircle } from 'ionicons/icons'

import UpgradeApp from '@/plugins/upgrade-app-plugin'

import HeaderPageInfo from '../_partials/HeaderPageInfo.vue'
import OptionsHeader from '../_partials/OptionsHeader.vue'
</script>

<template>
  <IonPage>
    <OptionsHeader
      has-back-button
      title="Atualizações"
    />
    <IonContent class="ion-padding">
      <IonGrid style="display: flex; flex-direction: column; height: 100%">
        <HeaderPageInfo
          title="Verificar atualizações"
          description="Baixe e instale novas versões do aplicativo"
          :icon="syncCircle"
        />
        <IonRow style="flex-grow: 1" />
        <IonRow>
          <IonButton
            style="width: 100%"
            shape="round"
            fill="outline"
          >
            Procurar atualizações
          </IonButton>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<style scoped>
ion-button {
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}
</style>
