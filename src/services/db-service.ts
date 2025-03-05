import { Knex } from 'knex'

import { useDatabaseStore } from '@/stores/database-store'

export const dbInsert = async (builder: Knex.QueryBuilder) => {
  const { database } = useDatabaseStore()
  const native = builder.toSQL().toNative()

  const result = await database.run(native.sql, native.bindings as any[])

  if (result.changes?.changes === 1 && result.changes?.lastId) {
    // @ts-expect-error The "_single" attribute should exist
    return await dbSelectById(builder._single.table, result.changes.lastId)
  }

  return undefined
}

export const dbSelect = async (builder: Knex.QueryBuilder) => {
  const { database } = useDatabaseStore()
  const native = builder.toSQL().toNative()
  const result = await database.query(native.sql, native.bindings as any[])

  return result.values || []
}

export const dbSelectById = async (table: string, id: string | number) => {
  const { database, builder } = useDatabaseStore()

  const native = builder(table).where({ id }).toSQL().toNative()
  const result = await database.query(native.sql, native.bindings as any[])

  return result.values ? result.values[0] : null
}

export const dbTableColumns = async (table: string): Promise<string[]> => {
  const { database } = useDatabaseStore()

  const data = await database.query(`SELECT name FROM PRAGMA_TABLE_INFO('${table}')`)

  if (!data.values || !data.values?.length) {
    return []
  }

  return data.values.map(({ name }) => name)
}
