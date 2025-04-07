import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.controle.financeiro',
  appName: 'Controle Financeiro',
  webDir: 'dist',
  plugins: {
    Keyboard: {
      resizeOnFullScreen: true,
    },
  },
}

export default config
