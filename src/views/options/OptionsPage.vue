<script setup lang="ts">
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonPage } from '@ionic/vue'
import { grid, peopleCircle, save } from 'ionicons/icons'

import OptionsHeader from './_partials/OptionsHeader.vue'

type OptionItem = {
  label: string
  description?: string
  icon: string
  url?: string
}

const ITEMS: OptionItem[] = [
  {
    label: 'Clientes',
    icon: peopleCircle,
    description: 'Gerencie sua lista de clientes',
    url: '/tabs/opcoes/clientes',
  },
  {
    label: 'Produtos',
    icon: grid,
    description: 'Gerencie sua lista de produtos',
    url: '/tabs/opcoes/produtos',
  },
  {
    label: 'Backup dos dados',
    icon: save,
    description: 'Salve ou recupere seus dados',
    url: '/tabs/opcoes/backup',
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
          <IonIcon
            slot="start"
            :icon="item.icon"
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
