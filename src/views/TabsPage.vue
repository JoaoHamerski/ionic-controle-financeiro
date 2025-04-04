<script setup lang="ts">
import { IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue'
import { PhCalendarDots, PhGear, PhHouseLine } from '@phosphor-icons/vue'

import AppIcon from '@/components/AppIcon.vue'

type TabItem = {
  icon: any
  label: string
  href: string
  name: string
}

const TABS: TabItem[] = [
  {
    label: 'Início',
    href: '/tabs/inicio',
    icon: PhHouseLine,
    name: 'home',
  },
  {
    label: 'Balanço',
    href: '/tabs/balanco',
    icon: PhCalendarDots,
    name: 'balance',
  },
  {
    label: 'Opções',
    href: '/tabs/opcoes',
    icon: PhGear,
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
          <AppIcon
            weight="fill"
            :icon="tab.icon"
          />
          <IonLabel>{{ tab.label }}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>
