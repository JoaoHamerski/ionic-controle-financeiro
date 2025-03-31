import { registerPlugin } from '@capacitor/core'

interface UpgradeAppPlugin {
  installApp(params: { path: string }): Promise<void>
  requestAppInstallPermission(): Promise<{ result: 'CANCELED' | 'GRANTED' }>
  checkAppInstallPermission(): Promise<{ result: boolean }>
  hasNewVersion(params: { newPkgPath: string }): Promise<{ result: boolean }>
}

const UpgradeApp = registerPlugin<UpgradeAppPlugin>('UpgradeApp')

export default UpgradeApp
