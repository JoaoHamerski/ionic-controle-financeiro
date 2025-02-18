import TabsPage from '@/views/TabsPage.vue'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

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
        path: 'clientes',
        component: () => import('@/views/clients/ClientsPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
