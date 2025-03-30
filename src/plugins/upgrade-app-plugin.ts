import { registerPlugin } from '@capacitor/core'

interface UpgradeAppPlugin {
  requestAppInstallPermission(): Promise<{ result: 'CANCELED' | 'GRANTED' }>
  checkAppInstallPermission(): Promise<{ result: boolean }>
}

const UpgradeApp = registerPlugin<UpgradeAppPlugin>('UpgradeApp')

export default UpgradeApp
