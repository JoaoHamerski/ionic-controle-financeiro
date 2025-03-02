import { dbInsert } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'
import { SQLiteDBConnection } from '@capacitor-community/sqlite'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { Knex } from 'knex'
import { Customer } from './models'

export const seedDatabase = async () => {
  const { database, builder } = useDatabaseStore()

  await truncateAllTables(database)
  await seedCustomers(database, builder)
}

const truncateAllTables = async (database: SQLiteDBConnection) => {
  const tables = await database.query("SELECT name FROM sqlite_master WHERE type='table'")

  for (const table of tables.values || []) {
    await database.execute(`DELETE FROM ${table.name}`)
  }
}

const seedCustomers = async (database: SQLiteDBConnection, builder: Knex) => {
  const customers: Customer[] = []
  const quantity = faker.number.int({ min: 20, max: 40 })

  for (let i = 0; i < quantity; i++) {
    customers.push({
      id: i,
      name: faker.person.fullName(),
      phone: faker.datatype.boolean({ probability: 0.5 })
        ? faker.string.numeric({ length: { min: 10, max: 11 } })
        : null,
      created_at: faker.date.past().toISOString(),
    })
  }

  await dbInsert(builder.insert(customers).into('customers'))
}
