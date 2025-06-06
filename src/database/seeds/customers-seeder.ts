import { faker } from '@faker-js/faker'
import { Knex } from 'knex'

import { dbStatement } from '@/services/db-service'
import { CustomerInsert } from '@/types/models'

import { makeCustomer } from '../factories/customer-factory'

export const seedCustomers = async (knex: Knex) => {
  const QUANTITY = faker.number.int({ min: 50, max: 100 })
  const customers: CustomerInsert[] = Array(QUANTITY)
    .fill(0)
    .map(() => makeCustomer({ chances: { hasPhone: 0.7 } }))

  await dbStatement(knex.insert(customers).into('customers'))
}
