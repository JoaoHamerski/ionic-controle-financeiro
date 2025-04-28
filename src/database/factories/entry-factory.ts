import { MakePartial } from '@/types/helpers'
import { EntryInsert } from '@/types/models'

import { parseChances } from '.'

type EntryFactoryOptions = {
  data: Partial<EntryInsert>
  chances: {
    isInflow: number
  }
}

type MakeEntryFn = (
  options?: Partial<EntryFactoryOptions>,
) => MakePartial<EntryInsert, 'customer_id' | 'product_id'>

export const makeEntry: MakeEntryFn = (options = {}) => {
  const DEFAULT_CHANCES: EntryFactoryOptions['chances'] = {
    isInflow: 0.5,
  }

  const chances = parseChances({ ...DEFAULT_CHANCES, ...options.chances })

  return {}
}
