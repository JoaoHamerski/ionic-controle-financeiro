import { fakerPT_BR as faker } from '@faker-js/faker'

import { CustomerInsert } from '@/types/models'

import { parseChances } from '.'

export type CustomerFactoryOptions = {
  data: Partial<CustomerInsert>
  chances: {
    hasPhone: number
    isNameLowercased: number
  }
}

export type MakeCustomerFn = (options?: Partial<CustomerFactoryOptions>) => CustomerInsert

export const makeCustomer: MakeCustomerFn = (options = {}) => {
  const DEFAULT_CHANCES: CustomerFactoryOptions['chances'] = {
    hasPhone: 1,
    isNameLowercased: 0,
  }

  const chances = parseChances({ ...DEFAULT_CHANCES, ...options.chances })

  const name = faker.person.firstName() + ' ' + faker.person.lastName()
  const phone = () => faker.string.numeric({ length: { min: 10, max: 11 } })

  return {
    name: chances.hasPhone ? name.toLowerCase() : name,
    phone: chances.isNameLowercased ? phone() : null,
    ...(options.data || {}),
  }
}
