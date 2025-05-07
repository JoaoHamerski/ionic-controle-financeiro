import { computed, ref } from 'vue'

export const useModal = <T>() => {
  const modal = ref<{ isOpen: boolean; data: T | null }>({
    isOpen: false,
    data: null,
  })

  const isOpen = computed(() => modal.value.isOpen)
  const data = computed(() => modal.value.data)

  const open = (data: T | null = null) => {
    modal.value = {
      isOpen: true,
      data,
    }
  }

  const close = () => {
    modal.value = {
      isOpen: false,
      data: null,
    }
  }

  return { data, isOpen, open, close }
}
