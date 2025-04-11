<script setup lang="ts">
import { IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/vue'
import { PhCalendarDots, PhGear, PhHouseLine } from '@phosphor-icons/vue'
import { ref } from 'vue'
import { computed } from 'vue'

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

const theme = ref({
  transitionDuration: '.25s',
})

const bar = ref()

const activeTabName = computed(() => bar.value?.tabState?.activeTab)

const isTabActive = (tab: TabItem) => tab.name == activeTabName.value
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />

      <IonTabBar
        slot="bottom"
        ref="bar"
      >
        <IonTabButton
          v-for="tab in TABS"
          :key="tab.name"
          :tab="tab.name"
          :href="tab.href"
        >
          <AppIcon
            class="icon"
            :weight="isTabActive(tab) ? 'fill' : 'regular'"
            :icon="tab.icon"
            size="26"
          />

          <IonLabel
            class="label"
            :class="isTabActive(tab) ? 'label-active' : ''"
          >
            {{ tab.label }}
          </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<style scoped>
.icon {
  transition: all v-bind('theme.transitionDuration');
}

.label {
  padding: 0.25rem 0.75rem;
  transition: all v-bind('theme.transitionDuration');
  border-radius: 1rem;
}

.label-active {
  background-color: rgba(var(--ion-color-primary-rgb), 0.2);
  font-weight: 600;
}

ion-tab-bar {
  padding: 0.2rem 0;
}

ion-tab-button {
  --ripple-color: transparent;
}

ion-tab-button:active .label,
ion-tab-button:active .icon {
  color: var(--ion-color-primary-shade);
}
</style>
