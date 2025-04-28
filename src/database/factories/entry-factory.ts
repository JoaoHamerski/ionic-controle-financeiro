import { PickPartial } from '@/types/helpers'
import { EntryInsert } from '@/types/models'

type EntryFactoryOptions = {
  data: Partial<EntryInsert>
  chances: {
    isInflow: number
  }
}

type MakeEntryFn = (
  options?: Partial<EntryFactoryOptions>,
) => PickPartial<EntryInsert, 'customer_id' | 'product_id'>

export const makeEntry: MakeEntryFn = (options = {}) => {
  return {}
}
