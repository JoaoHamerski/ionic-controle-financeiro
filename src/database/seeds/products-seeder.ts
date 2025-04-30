import { Knex } from 'knex'

import PRODUCTS from '@/database/fixtures/products.json'
import { dbStatement } from '@/services/db-service'

import { makeProduct } from '../factories/product-factory'

export const seedProducts = async (knex: Knex) => {
  const products = PRODUCTS.map((name) => makeProduct({ data: { name } }))

  await dbStatement(knex.insert(products).into('products'))
}
