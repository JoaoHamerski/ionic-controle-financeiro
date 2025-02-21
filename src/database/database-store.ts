import MIGRATIONS from '@/database/migrations'

import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const DATABASE_NAME = 'sales'

export const useDatabaseStore = defineStore('database', () => {
  const connection = new SQLiteConnection(CapacitorSQLite)
  const db = ref<SQLiteDBConnection>()

  const initDatabase = async () => {
    db.value = await initConnection()

    await db.value.open()

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
        await db.value!.execute(statement)
      }

      await db.value!.execute(`PRAGMA user_version = ${migration.version};`)
    }
  }

  const getDbVersion = async () => {
    const pragmaUserVersion = await db.value?.query('PRAGMA user_version;')

    return pragmaUserVersion?.values ? pragmaUserVersion.values[0]?.user_version : 0
  }

  return { db, initDatabase }
})
