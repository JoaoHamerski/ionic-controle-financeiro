import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

import TabsPage from '@/views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/inicio',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/inicio',
      },
      {
        path: 'inicio',
        component: () => import('@/views/home/HomePage.vue'),
      },
      {
        path: 'balanco-mensal',
        component: () => import('@/views/monthly-balance/MonthlyBalancePage.vue'),
      },
      {
        path: 'opcoes',
        component: () => import('@/views/options/OptionsPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
