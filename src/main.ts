import App from './App.vue'

import '@/support/plugins'
import router from './router'

import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import '@/bootstrap/styles'

const pinia = createPinia()
const app = createApp(App).use(IonicVue).use(router).use(pinia)

router.isReady().then(() => {
  app.mount('#app')
})
