import useVuelidate from '@vuelidate/core'
import { reactive } from 'vue'

export const useForm = <T extends Record<string, any>>(formData: T, rules: any) => {
  const data = reactive<T>(formData)
  const errors = reactive<T>({} as T)
  const v$ = useVuelidate(rules, formData)

  const validate = async () => {
    const result = await v$.value.$validate()

    for (const error of v$.value.$errors) {
      errors[error.$property] = error.$message
    }

    return result
  }

  const clearError = async (field: keyof typeof data) => {
    delete errors[field]
  }

  const clearErrorOnFocus = async (event: Event) => {
    const target = event.target as HTMLInputElement

    clearError(target.name)
  }

  return { data, errors, validate, clearError, clearErrorOnFocus }
}
