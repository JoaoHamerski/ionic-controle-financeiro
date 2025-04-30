import { fakerPT_BR as faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

import { MakePartial } from '@/types/helpers'
import { EntryInsert } from '@/types/models'

import { parseChances } from '.'

type EntryFactoryOptions = {
  data: Partial<EntryInsert>
  chances: {
    isInflow: number
    hasNote: number
  }
}

type MakeEntryFn = (
  options?: Partial<EntryFactoryOptions>,
) => MakePartial<EntryInsert, 'customer_id' | 'product_id'>

export const makeEntry: MakeEntryFn = (options = {}) => {
  const DEFAULT_CHANCES: EntryFactoryOptions['chances'] = {
    isInflow: 0.5,
    hasNote: 0.35,
  }

  const chances = parseChances({ ...DEFAULT_CHANCES, ...options.chances })

  const quantity = faker.number.int({ min: 1, max: 5 })
  const value = faker.number.float({ min: 10, max: 50, fractionDigits: 0 })
  const decimalPart = faker.helpers.arrayElement([0.99, 0.5, 0.49, 0.25, 0])
  const total = +(quantity * value).toFixed(2) + decimalPart

  const created_at = DateTime.now().minus({
    seconds: faker.number.int({ min: 60 * 60 * 24, max: 60 * 60 * 24 * 30 * 2 }),
  })

  return {
    quantity,
    value,
    total: chances.isInflow ? total : -total,
    note: chances.hasNote ? faker.lorem.words({ min: 3, max: 15 }) : null,
    date: created_at.toISODate()!,
    created_at: created_at.toSQL()!,
    ...options.data,
  }
}
