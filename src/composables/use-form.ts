import useVuelidate from '@vuelidate/core'
import { reactive, ref } from 'vue'

export const useForm = <T extends object>(
  formData: T,
  rules: Record<keyof T, any> | object = {},
) => {
  const data = reactive<T>(formData)
  const errors = reactive<Record<keyof T, string> | Record<string, any>>({})
  const localRules = ref(rules)

  const validate = async () => {
    const v$ = useVuelidate(localRules.value, formData)
    const result = await v$.value.$validate()

    clearError('*')

    for (const error of v$.value.$errors) {
      // @ts-expect-error Idk
      errors[error.$property] = error.$message
    }

    return result
  }

  const clearError = async (field: string | '*') => {
    if (field === '*') {
      for (const key in errors) {
        // @ts-expect-error Idk
        delete errors[key]
      }

      return
    }
    // @ts-expect-error Idk
    delete errors[field]
  }

  const clearErrorOnFocus = async (event: Event) => {
    const target = event.target as HTMLInputElement

    clearError(target.name)
  }

  const setRules = (newRules: typeof rules = {}) => {
    localRules.value = newRules
  }

  return { data, setRules, errors, validate, clearError, clearErrorOnFocus }
}
