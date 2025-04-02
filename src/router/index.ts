import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

import BalancePage from '@/views/balance/BalancePage.vue'
import HomePage from '@/views/home/HomePage.vue'
import BackupPage from '@/views/options/backup/BackupPage.vue'
import CustomersPage from '@/views/options/customers/CustomersPage.vue'
import OptionsPage from '@/views/options/OptionsPage.vue'
import ProductsPage from '@/views/options/products/ProductsPage.vue'
import UpdatesPage from '@/views/options/updates/UpdatesPage.vue'
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
        path: 'inicio',
        component: HomePage,
      },
      {
        path: 'balanco',
        component: BalancePage,
      },
      {
        path: 'opcoes',
        component: OptionsPage,
      },
      {
        path: 'opcoes/clientes',
        component: CustomersPage,
      },
      {
        path: 'opcoes/produtos',
        component: ProductsPage,
      },
      {
        path: 'opcoes/backup',
        component: BackupPage,
      },
      {
        path: 'opcoes/atualizacoes',
        component: UpdatesPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
