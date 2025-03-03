import App from './App.vue'

import '@/support/plugins'
import router from './router'

import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import '@/bootstrap/styles'
import { SplashScreen } from '@capacitor/splash-screen'
import { seedDatabase } from './database/seed'
import { useDatabaseStore } from './stores/database-store'

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => console.clear())
}

const pinia = createPinia()
const app = createApp(App).use(IonicVue).use(router).use(pinia)

router.isReady().then(async () => {
  const { initDatabase } = useDatabaseStore()

  await initDatabase()
  await seedDatabase()

  await SplashScreen.show()

  app.mount('#app')
})
