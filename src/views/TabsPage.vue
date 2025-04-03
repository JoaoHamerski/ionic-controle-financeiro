<script setup lang="ts">
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/vue'
import { calendar, cog, home } from 'ionicons/icons'

type TabItem = {
  icon: string
  label: string
  href: string
  name: string
}

const TABS: TabItem[] = [
  {
    label: 'Início',
    href: '/tabs/inicio',
    icon: home,
    name: 'home',
  },
  {
    label: 'Balanço',
    href: '/tabs/balanco',
    icon: calendar,
    name: 'balance',
  },
  {
    label: 'Opções',
    href: '/tabs/opcoes',
    icon: cog,
    name: 'opcoes',
  },
]
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />

      <IonTabBar slot="bottom">
        <IonTabButton
          v-for="tab in TABS"
          :key="tab.name"
          :tab="tab.name"
          :href="tab.href"
        >
          <IonIcon :icon="tab.icon" />
          <IonLabel>{{ tab.label }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
