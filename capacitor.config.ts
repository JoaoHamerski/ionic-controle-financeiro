import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Vendas',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlayWebView: false,
      style: 'DARK',
    },
  },
}

export default config
