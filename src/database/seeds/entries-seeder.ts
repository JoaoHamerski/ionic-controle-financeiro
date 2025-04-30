import { faker } from '@faker-js/faker'
import { Knex } from 'knex'
import { map } from 'lodash-es'

import { dbSelect, dbStatement } from '@/services/db-service'

import { makeEntry } from '../factories/entry-factory'

export const seedEntries = async (knex: Knex) => {
  const QUANTITY = faker.number.int({ min: 100, max: 500 })
  const productIds = map(await dbSelect(knex.select('id').from('products')), 'id')
  const customerIds = map(await dbSelect(knex.select('id').from('customers')), 'id')

  const entries = Array(QUANTITY)
    .fill(0)
    .map(() =>
      makeEntry({
        data: {
          customer_id: faker.helpers.arrayElement(customerIds),
          product_id: faker.helpers.arrayElement(productIds),
        },
      }),
    )

  await dbStatement(knex.insert(entries).into('entries'))
}
