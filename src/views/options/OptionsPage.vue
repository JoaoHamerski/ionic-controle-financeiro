<script setup lang="ts">
import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/vue'
import { PhArrowClockwise, PhFloppyDiskBack, PhPackage, PhUsersThree } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'

import OptionsHeader from './_partials/OptionsHeader.vue'

type OptionItem = {
  label: string
  description?: string
  icon: any
  url?: any
}

const ITEMS: OptionItem[] = [
  {
    label: 'Clientes',
    icon: PhUsersThree,
    description: 'Gerencie sua lista de clientes',
    url: '/opcoes/clientes',
  },
  {
    label: 'Produtos',
    icon: PhPackage,
    description: 'Gerencie sua lista de produtos',
    url: '/opcoes/produtos',
  },
  {
    label: 'Backup dos dados',
    icon: PhFloppyDiskBack,
    description: 'Salve ou recupere seus dados',
    url: '/opcoes/backup',
  },
  {
    label: 'Verificar atualizações',
    icon: PhArrowClockwise,
    url: '/opcoes/atualizacoes',
  },
]
</script>

<template>
  <IonPage>
    <OptionsHeader title="Opções" />
    <IonContent>
      <IonList lines="full">
        <IonItem
          v-for="item in ITEMS"
          :key="item.label"
          button
          detail
          :router-link="item.url"
        >
          <AppIcon
            slot="start"
            :icon="item.icon"
            size="26"
            weight="fill"
            color="var(--ion-color-medium)"
          />
          <IonLabel>
            <h2>{{ item.label }}</h2>
            <p v-if="item.description">{{ item.description }}</p>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>
