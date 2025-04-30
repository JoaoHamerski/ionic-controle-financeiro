import { faker } from '@faker-js/faker'
import { Knex } from 'knex'
import { shuffle } from 'lodash'

import PRODUCTS from '@/database/fixtures/products.json'
import { dbStatement } from '@/services/db-service'

import { makeProduct } from '../factories/product-factory'

export const seedProducts = async (knex: Knex) => {
  const QUANTITY = faker.number.int({ min: 5, max: 20 })
  const products = shuffle(PRODUCTS)
    .slice(0, QUANTITY)
    .map((name) => makeProduct({ data: { name } }))

  await dbStatement(knex.insert(products).into('products'))
}
