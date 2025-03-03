import { SplashScreen } from '@capacitor/splash-screen'
import { StatusBar } from '@capacitor/status-bar'

StatusBar.setOverlaysWebView({ overlay: true })
SplashScreen.show({ autoHide: false })
