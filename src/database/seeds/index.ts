import { SQLiteDBConnection } from '@capacitor-community/sqlite'
import { Knex } from 'knex'

import { seedCustomers } from './customers-seeder'
import { seedEntries } from './entries-seeder'
import { seedPayments } from './payments-seeder'
import { seedProducts } from './products-seeder'

export const truncateAllTables = async (database: SQLiteDBConnection) => {
  const tables = await database.query("SELECT name FROM sqlite_master WHERE type='table'")

  for (const table of tables.values?.reverse() || []) {
    await database.execute(`DELETE FROM ${table.name}`)
  }
}

export const seedDatabase = async (knex: Knex) => {
  await seedCustomers(knex)
  await seedProducts(knex)
  await seedEntries(knex)
  await seedPayments(knex)
}
