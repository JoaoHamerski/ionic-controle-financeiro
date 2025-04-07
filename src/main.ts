import '@/bootstrap/styles'
import '@/support/datetime'
import '@/assets/fonts/Inter/inter.css'
import './plugins'
import 'tippy.js/dist/tippy.css'

import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { plugin as VueTippy } from 'vue-tippy'

import App from './App.vue'
import { seedDatabase } from './database/seed'
import router from './router'
import { useDatabaseStore } from './stores/database-store'

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => console.clear())
}

const pinia = createPinia()
const app = createApp(App).use(IonicVue).use(router).use(pinia).use(autoAnimatePlugin).use(VueTippy)

router.isReady().then(async () => {
  const { initDatabase } = useDatabaseStore()

  SafeAreaController.injectCSSVariables()

  await initDatabase()

  if (import.meta.env.DEV) {
    await seedDatabase()
  }

  app.mount('#app')
})
