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
import { analytics, cog, home } from 'ionicons/icons'

type TabsItem = {
  icon: string
  label: string
  href: string
  tab: string
}

const TABS: TabsItem[] = [
  {
    label: 'Início',
    href: '/tabs/inicio',
    icon: home,
    tab: 'home',
  },
  {
    label: 'Balanço',
    href: '/tabs/balanco',
    icon: analytics,
    tab: 'balance',
  },
  {
    label: 'Opções',
    href: '/tabs/opcoes',
    icon: cog,
    tab: 'opcoes',
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
          :key="tab.tab"
          :tab="tab.tab"
          :href="tab.href"
        >
          <IonIcon :icon="tab.icon" />
          <IonLabel>{{ tab.label }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
