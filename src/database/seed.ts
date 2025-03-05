import { SQLiteDBConnection } from '@capacitor-community/sqlite'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { Knex } from 'knex'

import { dbInsert, dbSelect } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import { Customer, Sale } from './models'

export const seedDatabase = async () => {
  const { database, builder } = useDatabaseStore()

  await truncateAllTables(database)
  await seedCustomers(builder)
  await seedProducts(builder)
  await seedSales(builder)
}

const truncateAllTables = async (database: SQLiteDBConnection) => {
  const tables = await database.query("SELECT name FROM sqlite_master WHERE type='table'")

  for (const table of tables.values || []) {
    await database.execute(`DELETE FROM ${table.name}`)
  }
}

const seedCustomers = async (builder: Knex) => {
  const data: Customer[] = []
  const QUANTITY = faker.number.int({ min: 20, max: 40 })

  for (let i = 1; i <= QUANTITY; i++) {
    data.push({
      id: i,
      name: faker.person.fullName(),
      phone: faker.datatype.boolean({ probability: 0.5 })
        ? faker.string.numeric({ length: { min: 10, max: 11 } })
        : null,
      created_at: faker.date.past().toISOString(),
    })
  }

  await dbInsert(builder.insert(data).into('customers'))
}

const seedProducts = async (builder: Knex) => {
  const PRODUCTS = ['Feijão com arroz', 'Salada', 'Bife', 'Cachorro-quente', 'Sanduíche']

  const sql = builder
    .insert(
      PRODUCTS.map((name, index) => ({
        id: index,
        name,
        created_at: faker.date.past().toISOString(),
      })),
    )
    .into('products')

  await dbInsert(sql)
}

const seedSales = async (builder: Knex) => {
  const QUANTITY = faker.number.int({ min: 100, max: 200 })

  const customers = (await dbSelect(builder.select('id').from('customers')))?.map(({ id }) => id)
  const products = (await dbSelect(builder.select('id').from('products')))?.map(({ id }) => id)
  const data: Sale[] = []

  for (let i = 1; i < QUANTITY; i++) {
    const price = +faker.number.float({ min: 10, max: 50 }).toFixed(1)
    const quantity = faker.number.int({ min: 1, max: 5 })
    const total = +(price * quantity).toFixed(1)
    const created_at = faker.date.between({ from: '2025-01-01', to: '2025-03-02' })

    data.push({
      id: i,
      customer_id: faker.helpers.arrayElement(customers || []),
      product_id: faker.helpers.arrayElement(products || []),
      price,
      quantity,
      total: faker.datatype.boolean({ probability: 0.8 }) ? total : -total,
      is_paid: faker.datatype.boolean({ probability: 0.8 }),
      date: created_at.toISOString(),
      created_at: created_at.toISOString(),
    })
  }

  await dbInsert(builder.insert(data).into('sales'))
}
