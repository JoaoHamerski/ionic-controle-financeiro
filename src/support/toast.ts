import type { ToastOptions as IonToastOptions } from '@ionic/core'
import { toastController } from '@ionic/vue'
import {
  checkmarkCircleSharp,
  closeCircleSharp,
  informationCircleSharp,
  warningSharp,
} from 'ionicons/icons'

type ToastType = 'primary' | 'success' | 'danger' | 'warning'
type ToastOptions = IonToastOptions & {
  color: ToastType
}

const DEFAULT_OPTIONS: ToastOptions = {
  duration: 3000,
  position: 'bottom',
  color: 'primary',
  swipeGesture: 'vertical',
  buttons: ['Fechar'],
}

const getIcon = (type: ToastType): string => {
  if (type === 'success') {
    return checkmarkCircleSharp
  }

  if (type === 'danger') {
    return closeCircleSharp
  }

  if (type === 'warning') {
    return warningSharp
  }

  return informationCircleSharp
}

export const presentToast = async (options: Partial<ToastOptions> = {}) => {
  const toast = await toastController.create({
    ...DEFAULT_OPTIONS,
    ...options,
    icon: getIcon(options.color || DEFAULT_OPTIONS.color),
  })

  await toast.present()
}
