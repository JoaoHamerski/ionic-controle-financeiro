import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'
import { type Knex, knex } from 'knex'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

import MIGRATIONS from '@/database/migrations'

const DATABASE_NAME = 'sales'

export const useDatabaseStore = defineStore('database', () => {
  const connection = new SQLiteConnection(CapacitorSQLite)
  const database = ref<SQLiteDBConnection>() as Ref<SQLiteDBConnection>
  const builder = ref<Knex>() as Ref<Knex>

  const initDatabase = async () => {
    database.value = await initConnection()
    builder.value = knex({ client: 'sqlite3', useNullAsDefault: false })

    await database.value.open()

    await migrateDatabase()
  }

  const initConnection = async () => {
    const connectionExists = await connection.isConnection(DATABASE_NAME, false)

    if (connectionExists.result) {
      return await connection.retrieveConnection(DATABASE_NAME, false)
    }

    return await connection.createConnection(DATABASE_NAME, false, 'no-encryption', 1, false)
  }

  const migrateDatabase = async () => {
    const dbVersion = await getDbVersion()

    for (const migration of MIGRATIONS) {
      if (migration.version < dbVersion) {
        continue
      }

      for (const statement of migration.statements) {
        await database.value!.execute(statement)
      }

      await database.value!.execute(`PRAGMA user_version = ${migration.version};`)
    }
  }

  const getDbVersion = async () => {
    const pragmaUserVersion = await database.value?.query('PRAGMA user_version;')

    return pragmaUserVersion?.values ? pragmaUserVersion.values[0]?.user_version : 0
  }

  return { database, initDatabase, builder }
})
