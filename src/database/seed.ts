import { SQLiteDBConnection } from '@capacitor-community/sqlite'
import { fakerPT_BR as faker } from '@faker-js/faker'
import { Knex } from 'knex'
import { chunk, sum } from 'lodash'
import { DateTime } from 'luxon'

import { dbSelect, dbStatement } from '@/services/db-service'
import { useDatabaseStore } from '@/stores/database-store'

import { Customer, Entry, Payment } from '../types/models'

export const seedDatabase = async () => {
  const { database, knex } = useDatabaseStore()

  await truncateAllTables(database)
  await seedCustomers(knex)
  await seedProducts(knex)
  await seedEntries(knex)
  await seedPayments(knex)
}

const truncateAllTables = async (database: SQLiteDBConnection) => {
  const tables = await database.query("SELECT name FROM sqlite_master WHERE type='table'")

  for (const table of tables.values?.reverse() || []) {
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
    const isInflow = faker.datatype.boolean({ probability: 0.4 })

    const now = DateTime.now()
    const created_at = faker.date.between({
      from: now.plus({ months: -4 }).toISODate(),
      to: now.toISODate(),
    })

    data.push({
      id: i,
      customer_id: isInflow ? faker.helpers.arrayElement(customers || []) : null,
      product_id: faker.helpers.arrayElement(products || []),
      value,
      quantity,
      note: faker.datatype.boolean({ probability: 0.4 }) ? faker.lorem.sentence() : null,
      total: isInflow ? total : -total,
      date: created_at.toISOString().split('T')[0],
      created_at: created_at.toISOString(),
    })
  }

  await dbStatement(knex.insert(data).into('entries'))
}

const seedPayments = async (knex: Knex) => {
  const entries: Pick<Entry, 'id' | 'total' | 'quantity' | 'created_at'>[] = await dbSelect(
    knex.select(['id', 'total', 'quantity', 'created_at']).from('entries').where('total', '>', 0),
  )

  const payments: Payment[] = []
  let id = 1

  entries.forEach((entry) => {
    const isPaid = faker.datatype.boolean({ probability: 0.6 })
    const isNotPaid = faker.datatype.boolean({ probability: 0.3 })
    const date = DateTime.fromISO(entry.created_at)

    let values = generateDistributedValues(entry.total)

    if (!isPaid) {
      values = values.slice(0, faker.number.int({ min: 1, max: values.length }))
    }

    if (!isNotPaid) {
      values = []
    }

    payments.push(
      ...values.map<Payment>((value) => ({
        id: id++,
        entry_id: entry.id,
        value,
        created_at: faker.date
          .between({
            from: date.minus({ days: 50 }).toISO()!,
            to: date.toISO()!,
          })
          .toISOString(),
      })),
    )
  })

  for (const _payments of chunk(payments, 100)) {
    await dbStatement(knex.insert(_payments).into('payments'))
  }
}

const generateDistributedValues = (total: number) => {
  const values: number[] = []
  let rest = total

  while (rest > 0) {
    const value = faker.number.float({
      min: parseFloat((total / 8).toFixed(2)),
      max: parseFloat((total / 4).toFixed(2)),
      fractionDigits: 2,
    })

    rest -= value

    if (rest < 0) {
      const totalValues = parseFloat(sum(values).toFixed(2))

      values.push(parseFloat((total - totalValues).toFixed(2)))
    } else {
      values.push(value)
    }
  }

  return values
}
