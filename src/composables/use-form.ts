import useVuelidate from '@vuelidate/core'
import { reactive, ref } from 'vue'

export const useForm = <T extends object>(formData: T, rules: any = {}) => {
  const data = reactive<T>(formData)
  const errors = reactive<Record<keyof T, string> | Record<string, any>>({})
  const localRules = ref(rules)

  const setRules = (rules = {}) => {
    localRules.value = rules
  }

  const validate = async () => {
    const v$ = useVuelidate(localRules.value, formData)
    const result = await v$.value.$validate()

    for (const error of v$.value.$errors) {
      // @ts-expect-error Idk what is wrong with this TS shit
      errors[error.$property] = error.$message
    }

    return result
  }

  const clearError = async (field: string) => {
    // @ts-expect-error Idk what is wrong with this TS shit
    delete errors[field]
  }

  const clearErrorOnFocus = async (event: Event) => {
    const target = event.target as HTMLInputElement

    clearError(target.name)
  }

  return { data, setRules, errors, validate, clearError, clearErrorOnFocus }
}
