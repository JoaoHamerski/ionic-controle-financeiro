import { SQLiteDBConnection } from '@capacitor-community/sqlite'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { Knex } from 'knex'
import { DateTime } from 'luxon'

import { dbSelect, dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import { Customer, Entry } from '../types/models'

export const seedDatabase = async () => {
  const { database, knex } = useDatabaseStore()

  await truncateAllTables(database)
  // await seedCustomers(knex)
  // await seedProducts(knex)
  // await seedEntries(knex)
}

const truncateAllTables = async (database: SQLiteDBConnection) => {
  const tables = await database.query("SELECT name FROM sqlite_master WHERE type='table'")

  for (const table of tables.values || []) {
    await database.execute(`DELETE FROM ${table.name}`)
  }
}

const seedCustomers = async (knex: Knex) => {
  const data: Customer[] = []
  const QUANTITY = faker.number.int({ min: 20, max: 40 })

  for (let i = 1; i <= QUANTITY; i++) {
    const name = faker.person.firstName() + ' ' + faker.person.lastName()

    data.push({
      id: i,
      name: faker.datatype.boolean({ probability: 0.5 }) ? name.toLowerCase() : name,
      phone: faker.datatype.boolean({ probability: 0.5 })
        ? faker.string.numeric({ length: { min: 10, max: 11 } })
        : null,
      created_at: faker.date.past().toISOString(),
    })
  }

  await dbStatement(knex.insert(data).into('customers'))
}

const seedProducts = async (knex: Knex) => {
  const PRODUCTS = ['Feijão com arroz', 'Salada', 'Bife', 'Cachorro-quente', 'Sanduíche']

  const sql = knex
    .insert(
      PRODUCTS.map((name, index) => ({
        id: index,
        name,
        created_at: faker.date.past().toISOString(),
      })),
    )
    .into('products')

  await dbStatement(sql)
}

const seedEntries = async (knex: Knex) => {
  const QUANTITY = faker.number.int({ min: 100, max: 200 })

  const customers = (await dbSelect(knex.select('id').from('customers')))?.map(({ id }) => id)
  const products = (await dbSelect(knex.select('id').from('products')))?.map(({ id }) => id)
  const data: Entry[] = []

  for (let i = 1; i < QUANTITY; i++) {
    const value = +faker.number.float({ min: 10, max: 50 }).toFixed(1)
    const quantity = faker.number.int({ min: 1, max: 5 })
    const total = +(value * quantity).toFixed(1)
    const isInflow = faker.datatype.boolean({ probability: 0.8 })

    const now = DateTime.now()
    const created_at = faker.date.between({
      from: now.plus({ months: -4 }).toISODate(),
      to: now.toISODate(),
    })

    const paid_at = faker.date.between({
      from: created_at.toISOString(),
      to: now.toISODate(),
    })

    data.push({
      id: i,
      customer_id: isInflow ? faker.helpers.arrayElement(customers || []) : null,
      product_id: faker.helpers.arrayElement(products || []),
      value,
      quantity,
      total: isInflow ? total : -total,
      paid_at: faker.datatype.boolean({ probability: 0.7 }) ? paid_at.toISOString() : null,
      date: created_at.toISOString().split('T')[0],
      created_at: created_at.toISOString(),
    })
  }

  await dbStatement(knex.insert(data).into('entries'))
}
