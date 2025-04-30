import { faker } from '@faker-js/faker'
import { Knex } from 'knex'

import { dbStatement } from '@/services/db-service'
import { CustomerInsert } from '@/types/models'

import { makeCustomer } from '../factories/customer-factory'

export const seedCustomers = async (knex: Knex) => {
  const QUANTITY = faker.number.int({ min: 3, max: 15 })
  const customers: CustomerInsert[] = Array(QUANTITY)
    .fill(0)
    .map(() => makeCustomer())

  await dbStatement(knex.insert(customers).into('customers'))
}
