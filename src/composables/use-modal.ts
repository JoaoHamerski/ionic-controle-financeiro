import { computed, ref } from 'vue'

export type ModalCloseOptions = {
  reset?: boolean
  resetTimeout?: number
}

export const useModal = <T>() => {
  const modal = ref<{ isOpen: boolean; data: T | null }>({
    isOpen: false,
    data: null,
  })

  const isOpen = computed(() => modal.value.isOpen)
  const data = computed(() => modal.value.data)

  const open = (data: T) => {
    modal.value = {
      isOpen: true,
      data,
    }
  }

  const close = (options: ModalCloseOptions = { reset: true }) => {
    modal.value.isOpen = false

    if (options.reset === true && options.resetTimeout) {
      setTimeout(() => {
        modal.value.data = null
      }, options.resetTimeout)

      return
    }

    if (options.reset === true) {
      modal.value.data = null
    }
  }

  return { data, isOpen, open, close }
}
