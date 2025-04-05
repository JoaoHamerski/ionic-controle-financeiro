import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'
import { type Knex, knex as knexBuilder } from 'knex'
import { last } from 'lodash'
import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

import MIGRATIONS from '@/database/migrations'

const DATABASE_NAME = 'sales'

export const useDatabaseStore = defineStore('database', () => {
  const connection = new SQLiteConnection(CapacitorSQLite)
  const database = ref<SQLiteDBConnection>() as Ref<SQLiteDBConnection>
  const knex = ref<Knex>() as Ref<Knex>

  const initDatabase = async () => {
    database.value = await initConnection()
    knex.value = knexBuilder({ client: 'sqlite3', useNullAsDefault: false })

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
    const reversedMigrations = MIGRATIONS.reverse()

    for (const migration of reversedMigrations) {
      if (migration.version <= dbVersion) {
        continue
      }

      for (const statement of migration.statements) {
        await database.value!.execute(statement)
      }
    }

    await database.value!.execute(`PRAGMA user_version = ${last(reversedMigrations)?.version};`)
  }

  const getDbVersion = async () => {
    const pragmaUserVersion = await database.value?.query('PRAGMA user_version;')

    return pragmaUserVersion?.values ? pragmaUserVersion.values[0]?.user_version : 0
  }

  return { database, initDatabase, knex, connection, migrateDatabase, initConnection }
})
